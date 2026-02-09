export default function ContactsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Контакты</h1>
      <p className="mt-4 text-muted">
        Свяжитесь с приёмной комиссией GSB AlmaU. Мы доступны в мессенджерах и по телефону.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-semibold">Приёмная комиссия</h3>
          <p className="mt-2 text-sm text-muted">+7 (727) 313-30-80</p>
          <p className="text-sm text-muted">gsb@almau.edu.kz</p>
          <p className="text-sm text-muted">WhatsApp · Telegram · Instagram</p>
        </div>
        <div className="glass rounded-3xl p-6">
          <h3 className="text-lg font-semibold">Адрес</h3>
          <p className="mt-2 text-sm text-muted">г. Алматы, ул. Розыбакиева 227</p>
          <p className="text-sm text-muted">Бизнес-кампус AlmaU</p>
          <div className="mt-4 h-40 rounded-2xl bg-brand-500/20" />
        </div>
      </div>
    </div>
  );
}
