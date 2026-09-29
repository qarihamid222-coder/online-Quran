'use client';

import { useMemo, useState } from 'react';
import type { SurahSummary } from '@/lib/quran';
import { filterSurahs } from '@/lib/quran/search';
import { EmptyState } from '@/components/ui/EmptyState';
import { SurahList } from './SurahList';

interface SurahSearchProps {
  surahs: SurahSummary[];
}

export function SurahSearch({ surahs }: SurahSearchProps) {
  const [query, setQuery] = useState('');

  const filteredSurahs = useMemo(() => filterSurahs(surahs, query), [surahs, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search surahs by name, meaning, or number…"
        aria-label="Search surahs"
        className="mb-6 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
      />
      {filteredSurahs.length === 0 ? (
        <EmptyState title="No surahs found" description={`No surah matches "${query.trim()}".`} />
      ) : (
        <SurahList surahs={filteredSurahs} />
      )}
    </div>
  );
}
