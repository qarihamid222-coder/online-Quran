import Link from 'next/link';

interface SurahDividerProps {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
}

export function SurahDivider({ surahNumber, surahEnglishName, surahName }: SurahDividerProps) {
  return (
    <li className="mt-6 mb-2 list-none first:mt-0">
      <Link
        href={`/quran/${surahNumber}`}
        className="flex items-center justify-between gap-3 rounded-lg bg-zinc-100 px-4 py-2 transition-colors hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      >
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Surah {surahNumber} · {surahEnglishName}
        </span>
        <span dir="rtl" lang="ar" className="font-arabic text-lg text-zinc-700 dark:text-zinc-300">
          {surahName}
        </span>
      </Link>
    </li>
  );
}
