import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
        Online Quran
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
        Read the Holy Quran, anywhere
      </h1>
      <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Browse all 114 surahs with Arabic text, English and Urdu translations.
      </p>
      <Link
        href="/quran"
        className="mt-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Browse Surahs
      </Link>
    </div>
  );
}
