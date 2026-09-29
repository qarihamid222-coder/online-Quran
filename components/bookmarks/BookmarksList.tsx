'use client';

import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';
import { removeBookmark } from '@/store/bookmarks';
import { EmptyState } from '@/components/ui/EmptyState';

export function BookmarksList() {
  const bookmarks = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <EmptyState
        title="No bookmarks yet"
        description="Tap “Bookmark” on any ayah while reading to save it here."
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {bookmarks.map((bookmark) => (
        <li
          key={bookmark.numberInQuran}
          className="flex items-start justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <Link
            href={`/quran/${bookmark.surahNumber}#ayah-${bookmark.numberInQuran}`}
            className="min-w-0 flex-1"
          >
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Surah {bookmark.surahNumber} · {bookmark.surahEnglishName}, ayah {bookmark.ayahNumber}
            </p>
            <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
              {bookmark.snippet}
            </p>
          </Link>
          <button
            type="button"
            onClick={() => removeBookmark(bookmark.numberInQuran)}
            className="shrink-0 text-xs font-medium text-zinc-400 hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
