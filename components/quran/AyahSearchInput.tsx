'use client';

import { useAyahSearch } from '@/hooks/useAyahSearch';

export function AyahSearchInput() {
  const { query, setQuery } = useAyahSearch();

  return (
    <input
      type="search"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Search this page (Arabic, English, or Urdu)…"
      aria-label="Search verses on this page"
      className="mt-4 w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
    />
  );
}
