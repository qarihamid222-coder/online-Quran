import Link from 'next/link';
import type { SurahSummary } from '@/lib/quran';

interface SurahCardProps {
  surah: SurahSummary;
}

export function SurahCard({ surah }: SurahCardProps) {
  return (
    <Link
      href={`/quran/${surah.number}`}
      className="group flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {surah.number}
        </span>
        <div>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">{surah.englishName}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {surah.englishNameTranslation} · {surah.numberOfAyahs} verses · {surah.revelationType}
          </p>
        </div>
      </div>
      <span
        dir="rtl"
        lang="ar"
        className="font-arabic shrink-0 text-xl text-zinc-800 dark:text-zinc-200"
      >
        {surah.name}
      </span>
    </Link>
  );
}
