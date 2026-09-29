import Link from 'next/link';

export function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Online Quran
        </Link>
        <Link
          href="/quran"
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Surahs
        </Link>
      </nav>
    </header>
  );
}
