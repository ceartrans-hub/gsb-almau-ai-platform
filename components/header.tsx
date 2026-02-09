'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/programs', label: 'Программы' },
  { href: '/admissions', label: 'Поступление' },
  { href: '/tuition', label: 'Стоимость' },
  { href: '/faculty', label: 'Преподаватели' },
  { href: '/about', label: 'О школе' },
  { href: '/contacts', label: 'Контакты' }
];

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="GSB AlmaU" width={40} height={40} />
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-muted">Graduate School of Business</p>
            <p className="text-lg font-semibold">AlmaU</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card text-muted transition hover:text-foreground"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
