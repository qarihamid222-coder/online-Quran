import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { AudioPlayerProvider } from '@/components/quran/AudioPlayerProvider';
import { AyahCard } from '@/components/quran/AyahCard';
import { SurahAudioControls } from '@/components/quran/SurahAudioControls';
import { SurahDivider } from '@/components/quran/SurahDivider';
import { EmptyState } from '@/components/ui/EmptyState';
import { TOTAL_JUZ, fetchJuz, isValidJuzNumber } from '@/lib/quran';

// Juz data comes from a live external API — render per request instead of
// attempting to prerender at build time.
export const dynamic = 'force-dynamic';

function parseJuzNumber(juzId: string): number | null {
  const juzNumber = Number(juzId);
  return isValidJuzNumber(juzNumber) ? juzNumber : null;
}

export async function generateMetadata({
  params,
}: PageProps<'/quran/juz/[juzNumber]'>): Promise<Metadata> {
  const { juzNumber: juzId } = await params;
  const juzNumber = parseJuzNumber(juzId);

  if (juzNumber === null) {
    return { title: 'Juz not found — Online Quran' };
  }

  return {
    title: `Juz ${juzNumber} — Online Quran`,
    description: `Read juz ${juzNumber} of the Holy Quran with Arabic text and translations.`,
  };
}

export default async function JuzReaderPage({ params }: PageProps<'/quran/juz/[juzNumber]'>) {
  const { juzNumber: juzId } = await params;
  const juzNumber = parseJuzNumber(juzId);

  if (juzNumber === null) {
    notFound();
  }

  const juz = await fetchJuz(juzNumber);

  const previousJuz = juzNumber > 1 ? juzNumber - 1 : null;
  const nextJuz = juzNumber < TOTAL_JUZ ? juzNumber + 1 : null;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="flex flex-col items-center gap-2 border-b border-zinc-200 pb-6 text-center dark:border-zinc-800">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Juz</p>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Juz {juz.number}</h1>
      </header>

      {juz.ayahs.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No verses available"
            description="This juz currently has no verses available from the Quran data service."
          />
        </div>
      ) : (
        <AudioPlayerProvider ayahs={juz.ayahs}>
          <SurahAudioControls />
          <ol className="mt-2">
            {juz.ayahs.map((ayah, index) => {
              const showDivider = ayah.surahNumber !== juz.ayahs[index - 1]?.surahNumber;

              return (
                <Fragment key={ayah.numberInQuran}>
                  {showDivider ? (
                    <SurahDivider
                      surahNumber={ayah.surahNumber}
                      surahName={ayah.surahName}
                      surahEnglishName={ayah.surahEnglishName}
                    />
                  ) : null}
                  <AyahCard ayah={ayah} index={index} />
                </Fragment>
              );
            })}
          </ol>
        </AudioPlayerProvider>
      )}

      <nav className="mt-10 flex items-center justify-between gap-4 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        {previousJuz ? (
          <Link
            href={`/quran/juz/${previousJuz}`}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← Juz {previousJuz}
          </Link>
        ) : (
          <span />
        )}
        <Link
          href="/quran/juz"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          All Juz
        </Link>
        {nextJuz ? (
          <Link
            href={`/quran/juz/${nextJuz}`}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Juz {nextJuz} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
