import Link from 'next/link';
import { ChatAssistant } from '../components/chat-assistant';

const highlights = [
  {
    title: 'MBA, EMBA, DBA',
    description: 'Международные программы бизнес-образования с практическими кейсами и менторством.'
  },
  {
    title: 'Гибкие форматы',
    description: 'Вечерние, модульные и гибридные форматы обучения для занятых руководителей.'
  },
  {
    title: 'Сильное сообщество',
    description: 'Клуб выпускников, бизнес-нетворкинг и доступ к экспертам Центральной Азии.'
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <span className="rounded-full border border-brand-400/40 px-4 py-2 text-xs uppercase tracking-[0.3em] text-brand-200">
            GSB AlmaU · 2026
          </span>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Бизнес-образование нового поколения для лидеров Центральной Азии
          </h1>
          <p className="text-lg text-muted">
            Graduate School of Business AlmaU объединяет практиков, предпринимателей и преподавателей
            мирового уровня. Получите диплом MBA/EMBA/DBA и трансформируйте карьеру с поддержкой AI-консультанта.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/programs"
              className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
            >
              Выбрать программу
            </Link>
            <Link
              href="/contacts"
              className="rounded-full border border-white/10 px-6 py-3 text-sm text-foreground"
            >
              Связаться с нами
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="glass rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">AI-консультант</p>
          <h2 className="mt-3 text-2xl font-semibold">
            Получите персональный ответ за 30 секунд
          </h2>
          <p className="mt-2 text-sm text-muted">
            AI-ассистент работает по базе знаний GSB AlmaU и помогает подобрать программу, стоимость и шаги
            поступления.
          </p>
          <div className="mt-6">
            <ChatAssistant />
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h3 className="text-xl font-semibold">Почему GSB AlmaU</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• Международная аккредитация и партнерства с бизнес-школами Европы и США.</li>
            <li>• Преподаватели — действующие CEO, консультанты и предприниматели.</li>
            <li>• Карьерный центр и персональный куратор для каждого слушателя.</li>
          </ul>
        </div>
        <div className="glass rounded-3xl p-6">
          <h3 className="text-xl font-semibold">Готовы к консультации?</h3>
          <p className="mt-4 text-sm text-muted">
            Оставьте заявку или напишите в мессенджер — команда приёмной комиссии подготовит индивидуальный
            план поступления, расскажет о грантах и скидках.
          </p>
          <Link
            href="/contacts"
            className="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Получить консультацию
          </Link>
        </div>
      </section>
    </div>
  );
}
