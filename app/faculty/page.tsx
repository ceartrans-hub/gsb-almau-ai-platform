const faculty = [
  { name: 'Айгерим Тулегенова', role: 'PhD, финансы', focus: 'Корпоративные финансы, инвестиции' },
  { name: 'Дмитрий Ким', role: 'MBA, стратегия', focus: 'Рост компаний, стратегическое управление' },
  { name: 'Лейла Сабирова', role: 'DBA, маркетинг', focus: 'Брендинг, customer experience' },
  { name: 'Асхат Нурланов', role: 'EMBA, digital', focus: 'Цифровая трансформация и data-driven' }
];

export default function FacultyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Преподаватели</h1>
      <p className="mt-4 text-muted">
        Команда GSB AlmaU — это практики бизнеса, международные профессора и консультанты.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {faculty.map((teacher) => (
          <div key={teacher.name} className="glass rounded-3xl p-5">
            <div className="h-20 w-20 rounded-full bg-brand-500/20" />
            <h3 className="mt-4 text-lg font-semibold">{teacher.name}</h3>
            <p className="text-sm text-brand-200">{teacher.role}</p>
            <p className="mt-2 text-sm text-muted">{teacher.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
