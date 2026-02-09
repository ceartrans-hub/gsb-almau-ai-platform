import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">GSB AlmaU</p>
          <p>Алматы, ул. Розыбакиева 227</p>
          <p>+7 (727) 313-30-80 · gsb@almau.edu.kz</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin" className="transition hover:text-foreground">Админка</Link>
          <Link href="/contacts" className="transition hover:text-foreground">Контакты</Link>
          <Link href="/programs" className="transition hover:text-foreground">Программы</Link>
        </div>
        <p>© 2026 GSB AlmaU. Все права защищены.</p>
      </div>
    </footer>
  );
}
