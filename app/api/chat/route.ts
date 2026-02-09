import { NextRequest } from 'next/server';
import { getOpenAIClient } from '../../../lib/openai';
import { buildContext, findRelevantChunks } from '../../../lib/rag';
import { rateLimit } from '../../../lib/rate-limit';
import programs from '../../../data/structured/programs.json';
import tuition from '../../../data/structured/tuition.json';
import admissions from '../../../data/structured/admissions.json';
import { sendLeadToBitrix } from '../../../lib/lead';

const systemPrompt =
  'Ты консультант приёмной комиссии и продаж GSB AlmaU. Отвечай только на основании базы знаний. Если не уверен — предложи оставить контакты или перейти в раздел Контакты. Не выдумывай.';

const tools = [
  {
    type: 'function',
    function: {
      name: 'getPrograms',
      description: 'Получить информацию о программах MBA/EMBA/DBA/short programs',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'getTuition',
      description: 'Получить данные по стоимости обучения',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'getAdmissions',
      description: 'Получить этапы поступления и список документов',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'createLead',
      description: 'Создать лид в CRM Bitrix24',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string' },
          comment: { type: 'string' },
          pageUrl: { type: 'string' },
          utm: {
            type: 'object',
            properties: {
              utm_source: { type: 'string' },
              utm_medium: { type: 'string' },
              utm_campaign: { type: 'string' },
              utm_content: { type: 'string' },
              utm_term: { type: 'string' }
            }
          }
        },
        required: ['name']
      }
    }
  }
];

async function callTool(name: string, args: Record<string, string>) {
  switch (name) {
    case 'getPrograms':
      return JSON.stringify(programs);
    case 'getTuition':
      return JSON.stringify(tuition);
    case 'getAdmissions':
      return JSON.stringify(admissions);
    case 'createLead':
      return JSON.stringify(await sendLeadToBitrix({
        name: args.name,
        phone: args.phone,
        email: args.email,
        comment: args.comment,
        pageUrl: args.pageUrl,
        utm: args.utm
      }));
    default:
      return '{}';
  }
}

function streamText(text: string) {
  const encoder = new TextEncoder();
  const chunks = text.match(/.{1,120}/g) ?? [];
  return new ReadableStream({
    start(controller) {
      chunks.forEach((chunk) => controller.enqueue(encoder.encode(chunk)));
      controller.close();
    }
  });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  if (!rateLimit(ip, 12, 60_000)) {
    return new Response('Слишком много запросов', { status: 429 });
  }

  const body = await request.json();
  const userMessages = body.messages ?? [];
  const userInput = userMessages[userMessages.length - 1]?.content || '';

  const chunks = await findRelevantChunks(userInput);
  const context = buildContext(chunks);

  const client = getOpenAIClient();
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'system', content: `Контекст базы знаний:\n${context}` },
    ...userMessages
  ];

  let completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    tools,
    tool_choice: 'auto'
  });

  if (completion.choices[0].message.tool_calls) {
    const toolMessages = [] as { role: 'tool'; content: string; tool_call_id: string }[];
    for (const toolCall of completion.choices[0].message.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments || '{}');
      const result = await callTool(toolCall.function.name, args);
      toolMessages.push({
        role: 'tool',
        content: result,
        tool_call_id: toolCall.id
      });
    }

    completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [...messages, completion.choices[0].message, ...toolMessages]
    });
  }

  const answer = completion.choices[0].message.content || 'Извините, не удалось сформировать ответ.';
  return new Response(streamText(answer), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache'
    }
  });
}
