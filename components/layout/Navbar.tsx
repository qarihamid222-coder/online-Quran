import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="shrink-0 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Online Quran
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/quran"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Surahs
          </Link>
          <Link
            href="/quran/juz"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Juz
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
