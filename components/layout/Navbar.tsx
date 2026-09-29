import Link from 'next/link';
import { BookmarksNavLink } from './BookmarksNavLink';
import { MobileNavMenu } from './MobileNavMenu';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <nav className="relative mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="shrink-0 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Online Quran
        </Link>
        <div className="hidden items-center gap-6 sm:flex">
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
          <BookmarksNavLink />
          <ThemeToggle />
        </div>
        <MobileNavMenu />
      </nav>
    </header>
  );
}
