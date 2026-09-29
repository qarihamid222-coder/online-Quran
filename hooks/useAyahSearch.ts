'use client';

import { createContext, useContext } from 'react';

export interface AyahSearchContextValue {
  query: string;
  setQuery: (query: string) => void;
  isMatch: (ayahNumberInQuran: number) => boolean;
}

export const AyahSearchContext = createContext<AyahSearchContextValue | null>(null);

export function useAyahSearch(): AyahSearchContextValue {
  const context = useContext(AyahSearchContext);
  if (!context) {
    throw new Error('useAyahSearch must be used within an AyahSearchProvider');
  }
  return context;
}
