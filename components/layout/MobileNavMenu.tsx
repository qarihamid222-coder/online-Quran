'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookmarksNavLink } from './BookmarksNavLink';
import { ThemeToggle } from './ThemeToggle';

export function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="flex h-9 w-9 items-center justify-center rounded-md text-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      >
        <span aria-hidden="true">{isOpen ? '✕' : '☰'}</span>
      </button>

      {isOpen ? (
        <div className="absolute inset-x-0 top-full border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-black">
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/quran"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Surahs
            </Link>
            <Link
              href="/quran/juz"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
            >
              Juz
            </Link>
            <div onClick={() => setIsOpen(false)}>
              <BookmarksNavLink />
            </div>
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </div>
  );
}
