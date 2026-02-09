const steps = [
  'Оставьте заявку или свяжитесь с приёмной комиссией.',
  'Подготовьте пакет документов: диплом, резюме, мотивационное письмо.',
  'Пройдите интервью и вступительное тестирование.',
  'Получите оффер и подпишите договор.',
  'Начните обучение в выбранном потоке.'
];

export default function AdmissionsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Поступление</h1>
      <p className="mt-4 text-muted">
        Мы сопровождаем абитуриентов на каждом этапе — от консультации до начала обучения.
      </p>
      <ol className="mt-6 space-y-3 text-sm text-muted">
        {steps.map((step, index) => (
          <li key={step} className="glass rounded-2xl p-4">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-200">Шаг {index + 1}</span>
            <p className="mt-2 text-sm">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
