import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AyahCard } from '@/components/quran/AyahCard';
import { SurahHeader } from '@/components/quran/SurahHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { TOTAL_SURAHS, fetchSurah, isValidSurahNumber } from '@/lib/quran';

// Surah data comes from a live external API — render per request instead of
// attempting to prerender at build time.
export const dynamic = 'force-dynamic';

function parseSurahNumber(surahId: string): number | null {
  const surahNumber = Number(surahId);
  return isValidSurahNumber(surahNumber) ? surahNumber : null;
}

export async function generateMetadata({
  params,
}: PageProps<'/quran/[surahId]'>): Promise<Metadata> {
  const { surahId } = await params;
  const surahNumber = parseSurahNumber(surahId);

  if (surahNumber === null) {
    return { title: 'Surah not found — Online Quran' };
  }

  return {
    title: `Surah ${surahNumber} — Online Quran`,
    description: `Read surah ${surahNumber} of the Holy Quran with Arabic text and translations.`,
  };
}

export default async function SurahReaderPage({ params }: PageProps<'/quran/[surahId]'>) {
  const { surahId } = await params;
  const surahNumber = parseSurahNumber(surahId);

  if (surahNumber === null) {
    notFound();
  }

  const surah = await fetchSurah(surahNumber);

  const previousSurah = surahNumber > 1 ? surahNumber - 1 : null;
  const nextSurah = surahNumber < TOTAL_SURAHS ? surahNumber + 1 : null;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <SurahHeader surah={surah} />

      {surah.ayahs.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No verses available"
            description="This surah currently has no verses available from the Quran data service."
          />
        </div>
      ) : (
        <ol className="mt-2">
          {surah.ayahs.map((ayah) => (
            <AyahCard key={ayah.number} ayah={ayah} />
          ))}
        </ol>
      )}

      <nav className="mt-10 flex items-center justify-between gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        {previousSurah ? (
          <Link
            href={`/quran/${previousSurah}`}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← Surah {previousSurah}
          </Link>
        ) : (
          <span />
        )}
        <Link
          href="/quran"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          All Surahs
        </Link>
        {nextSurah ? (
          <Link
            href={`/quran/${nextSurah}`}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Surah {nextSurah} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
