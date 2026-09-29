'use client';

import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';

export function BookmarksNavLink() {
  const bookmarks = useBookmarks();

  return (
    <Link
      href="/bookmarks"
      className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
    >
      Bookmarks
      {bookmarks.length > 0 ? (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-200 px-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {bookmarks.length}
        </span>
      ) : null}
    </Link>
  );
}
