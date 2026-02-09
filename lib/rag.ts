import { getOpenAIClient } from './openai';
import { getPool } from './db';

export type KnowledgeChunk = {
  id: number;
  content: string;
  source: string;
};

export async function embedText(text: string) {
  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input: text
  });
  return response.data[0].embedding;
}

export async function findRelevantChunks(query: string, limit = 6) {
  const pool = getPool();
  const embedding = await embedText(query);
  const result = await pool.query<KnowledgeChunk>(
    `SELECT id, content, source
     FROM knowledge_base
     ORDER BY embedding <-> $1
     LIMIT $2`,
    [embedding, limit]
  );
  return result.rows;
}

export function buildContext(chunks: KnowledgeChunk[]) {
  return chunks
    .map((chunk) => `Источник: ${chunk.source}\n${chunk.content}`)
    .join('\n\n');
}
