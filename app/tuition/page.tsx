const tuition = [
  { program: 'MBA', price: 'от 4 200 000 ₸', notes: 'Возможна рассрочка и скидки для выпускников AlmaU.' },
  { program: 'EMBA', price: 'от 6 500 000 ₸', notes: 'Модульный формат, включены международные модули.' },
  { program: 'DBA', price: 'от 8 900 000 ₸', notes: 'Индивидуальный трек и исследовательская поддержка.' },
  { program: 'Short programs', price: 'от 350 000 ₸', notes: 'Стоимость зависит от интенсивности и длительности.' }
];

export default function TuitionPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Стоимость</h1>
      <p className="mt-4 text-muted">
        Стоимость указана ориентировочно. Точные условия и гранты уточняйте у консультанта.
      </p>
      <div className="mt-8 space-y-4">
        {tuition.map((item) => (
          <div key={item.program} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{item.program}</h3>
              <span className="text-brand-200">{item.price}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{item.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
