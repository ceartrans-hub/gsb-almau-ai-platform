'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { SendHorizonal } from 'lucide-react';

const quickChips = [
  'Программы MBA/EMBA/DBA',
  'Стоимость',
  'Поступление',
  'Расписание',
  'Контакты',
  'Скачать презентацию',
  'Оставить заявку'
];

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      'Здравствуйте! Я AI-консультант GSB AlmaU. Подскажу по программам, стоимости, поступлению и помогу оставить заявку.'
  }
];

export function ChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '', comment: '', consent: false });
  const streamRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    streamRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const trackEvent = useCallback(async (event: string, payload?: Record<string, string>) => {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload })
    });
  }, []);

  useEffect(() => {
    trackEvent('chat_open');
  }, [trackEvent]);

  async function sendMessage(text: string) {
    if (!text.trim()) {
      return;
    }
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: nextMessages })
    });

    if (!response.body) {
      setLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantText = '';

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      assistantText += decoder.decode(value, { stream: true });
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: assistantText };
        return updated;
      });
    }

    setLoading(false);
  }

  function getUtmParams() {
    if (typeof window === 'undefined') {
      return {};
    }
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_content: params.get('utm_content'),
      utm_term: params.get('utm_term')
    };
  }

  async function submitLead() {
    if (!leadData.consent) {
      return;
    }
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const utm = getUtmParams();
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadData, pageUrl, utm })
    });
    await trackEvent('lead_submit');
    setLeadOpen(false);
    setLeadData({ name: '', phone: '', email: '', comment: '', consent: false });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr_220px]">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted">Подсказки</p>
        {quickChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => {
              trackEvent('chip_click', { chip });
              sendMessage(chip);
            }}
            className="rounded-full border border-white/10 bg-card px-4 py-2 text-left text-sm transition hover:border-brand-400 hover:text-foreground"
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="glass flex h-[520px] flex-col rounded-3xl p-6 shadow-glow">
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={clsx(
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                message.role === 'assistant'
                  ? 'bg-white/10 text-foreground'
                  : 'ml-auto bg-brand-500 text-white'
              )}
            >
              {message.content}
            </div>
          ))}
          {loading && (
            <div className="max-w-[80%] rounded-2xl bg-white/10 px-4 py-3 text-sm text-muted">
              Печатает...
            </div>
          )}
          <div ref={streamRef} />
        </div>
        <div className="mt-6 flex items-center gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendMessage(input);
              }
            }}
            placeholder="Задайте вопрос о поступлении, программах или стоимости"
            className="flex-1 rounded-full border border-white/10 bg-card px-4 py-3 text-sm text-foreground outline-none"
          />
          <button
            type="button"
            onClick={() => sendMessage(input)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
          <button
            type="button"
            onClick={() => {
              trackEvent('lead_open');
              setLeadOpen(true);
            }}
            className="rounded-full border border-brand-400/40 px-4 py-2 text-brand-200 transition hover:border-brand-400"
          >
            Оставить заявку
          </button>
          <span>AI отвечает на основе базы знаний GSB AlmaU.</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass rounded-2xl p-4">
          <p className="text-sm text-muted">Быстрые контакты</p>
          <div className="mt-3 space-y-2 text-sm">
            <p className="font-semibold text-foreground">+7 (727) 313-30-80</p>
            <p>gsb@almau.edu.kz</p>
            <p>WhatsApp · Telegram · Instagram</p>
          </div>
        </div>
        <div className="glass rounded-2xl p-4">
          <p className="text-sm text-muted">Приёмная комиссия</p>
          <p className="mt-3 text-sm">
            Мы перезвоним в течение 30 минут в рабочее время. Можно сразу
            выбрать консультацию на кампусе.
          </p>
        </div>
      </div>

      {leadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="glass w-full max-w-lg rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Оставить заявку</h3>
              <button type="button" onClick={() => setLeadOpen(false)} className="text-muted">
                Закрыть
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              <input
                placeholder="Имя"
                value={leadData.name}
                onChange={(event) => setLeadData({ ...leadData, name: event.target.value })}
                className="rounded-xl border border-white/10 bg-card px-4 py-3 text-sm"
              />
              <input
                placeholder="Телефон"
                value={leadData.phone}
                onChange={(event) => setLeadData({ ...leadData, phone: event.target.value })}
                className="rounded-xl border border-white/10 bg-card px-4 py-3 text-sm"
              />
              <input
                placeholder="Email"
                value={leadData.email}
                onChange={(event) => setLeadData({ ...leadData, email: event.target.value })}
                className="rounded-xl border border-white/10 bg-card px-4 py-3 text-sm"
              />
              <textarea
                placeholder="Комментарий"
                value={leadData.comment}
                onChange={(event) => setLeadData({ ...leadData, comment: event.target.value })}
                className="min-h-[100px] rounded-xl border border-white/10 bg-card px-4 py-3 text-sm"
              />
              <label className="flex items-start gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  checked={leadData.consent}
                  onChange={(event) => setLeadData({ ...leadData, consent: event.target.checked })}
                />
                Согласен на обработку персональных данных и получение консультации.
              </label>
            </div>
            <button
              type="button"
              onClick={submitLead}
              className="mt-4 w-full rounded-full bg-brand-500 px-4 py-3 text-sm text-white"
            >
              Отправить заявку
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
