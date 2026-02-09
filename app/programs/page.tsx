import Link from 'next/link';

const programs = [
  {
    title: 'MBA',
    description: 'Классическая программа для менеджеров среднего и высшего звена.',
    href: '/programs/mba'
  },
  {
    title: 'EMBA',
    description: 'Executive формат для топ-менеджеров с модульным расписанием.',
    href: '/programs/emba'
  },
  {
    title: 'DBA',
    description: 'Докторская программа по управлению с исследовательской базой.',
    href: '/programs/dba'
  },
  {
    title: 'Short programs',
    description: 'Интенсивы по лидерству, финансам, маркетингу и цифровой трансформации.',
    href: '/programs/short'
  }
];

export default function ProgramsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Программы обучения</h1>
      <p className="mt-3 text-muted">
        GSB AlmaU предлагает линейку программ для предпринимателей и руководителей. Выберите формат,
        который подходит вашей карьере.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {programs.map((program) => (
          <Link key={program.title} href={program.href} className="glass rounded-3xl p-6">
            <h3 className="text-xl font-semibold">{program.title}</h3>
            <p className="mt-2 text-sm text-muted">{program.description}</p>
            <span className="mt-4 inline-flex text-sm text-brand-200">Подробнее →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
