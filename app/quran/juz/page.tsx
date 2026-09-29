import type { Metadata } from 'next';
import Link from 'next/link';
import { TOTAL_JUZ } from '@/lib/quran';

export const metadata: Metadata = {
  title: 'Juz — Online Quran',
  description: 'Browse the Quran by juz (para), all 30 parts.',
};

const JUZ_NUMBERS = Array.from({ length: TOTAL_JUZ }, (_, i) => i + 1);

export default function JuzIndexPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Juz</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {JUZ_NUMBERS.map((juzNumber) => (
          <Link
            key={juzNumber}
            href={`/quran/juz/${juzNumber}`}
            className="flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-6 text-center font-medium text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Juz {juzNumber}
          </Link>
        ))}
      </div>
    </div>
  );
}
