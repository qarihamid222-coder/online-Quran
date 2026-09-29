import type { Metadata } from 'next';
import { BookmarksList } from '@/components/bookmarks/BookmarksList';

export const metadata: Metadata = {
  title: 'Bookmarks — Online Quran',
  description: 'Ayahs you have bookmarked for later.',
};

export default function BookmarksPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Bookmarks</h1>
      <BookmarksList />
    </div>
  );
}
