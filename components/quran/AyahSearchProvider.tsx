'use client';

import { useMemo, useState, type ReactNode } from 'react';
import type { Ayah } from '@/lib/quran';
import { matchesAyahQuery } from '@/lib/quran/search';
import { AyahSearchContext, type AyahSearchContextValue } from '@/hooks/useAyahSearch';

interface AyahSearchProviderProps {
  ayahs: Ayah[];
  children: ReactNode;
}

export function AyahSearchProvider({ ayahs, children }: AyahSearchProviderProps) {
  const [query, setQuery] = useState('');

  const matchingNumbers = useMemo(() => {
    if (!query.trim()) return null;
    return new Set(
      ayahs.filter((ayah) => matchesAyahQuery(ayah, query)).map((ayah) => ayah.numberInQuran),
    );
  }, [ayahs, query]);

  const value = useMemo<AyahSearchContextValue>(
    () => ({
      query,
      setQuery,
      isMatch: (ayahNumberInQuran: number) =>
        matchingNumbers === null || matchingNumbers.has(ayahNumberInQuran),
    }),
    [query, matchingNumbers],
  );

  return <AyahSearchContext.Provider value={value}>{children}</AyahSearchContext.Provider>;
}
