import Link from 'next/link';

export default function SurahNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Surah not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        The surah you&rsquo;re looking for doesn&rsquo;t exist. The Quran has 114 surahs, numbered 1
        to 114.
      </p>
      <Link
        href="/quran"
        className="mt-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Browse all Surahs
      </Link>
    </div>
  );
}
