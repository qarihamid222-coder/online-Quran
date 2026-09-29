import type { Metadata } from 'next';
import { SurahSearch } from '@/components/quran/SurahSearch';
import { EmptyState } from '@/components/ui/EmptyState';
import { fetchSurahList } from '@/lib/quran';

// Surah data comes from a live external API — render per request instead of
// attempting to prerender at build time.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Surahs — Online Quran',
  description: 'Browse all 114 surahs of the Holy Quran.',
};

export default async function QuranSurahListPage() {
  const surahs = await fetchSurahList();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Surahs</h1>
      {surahs.length === 0 ? (
        <EmptyState
          title="No surahs found"
          description="The Quran data service returned no surahs. Please try again later."
        />
      ) : (
        <SurahSearch surahs={surahs} />
      )}
    </div>
  );
}
