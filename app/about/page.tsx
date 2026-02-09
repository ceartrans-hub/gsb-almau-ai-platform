const values = [
  'Практико-ориентированное обучение, основанное на кейсах Центральной Азии.',
  'Фокус на устойчивом лидерстве и развитии предпринимательства.',
  'Международные аккредитации и партнерства с ведущими бизнес-школами.'
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">О школе</h1>
      <p className="mt-4 text-muted">
        Graduate School of Business AlmaU — бизнес-школа нового поколения, которая объединяет исследование,
        предпринимательство и управленческую практику.
      </p>
      <div className="mt-6 space-y-3">
        {values.map((value) => (
          <div key={value} className="glass rounded-2xl p-4 text-sm text-muted">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
