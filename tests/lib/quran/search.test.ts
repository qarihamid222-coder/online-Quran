import { describe, expect, it } from 'vitest';
import { filterSurahs, matchesAyahQuery } from '@/lib/quran/search';
import type { Ayah, SurahSummary } from '@/lib/quran/types';

const SURAHS: SurahSummary[] = [
  {
    number: 1,
    name: 'سُورَةُ الْفَاتِحَةِ',
    englishName: 'Al-Faatiha',
    englishNameTranslation: 'The Opening',
    numberOfAyahs: 7,
    revelationType: 'Meccan',
  },
  {
    number: 2,
    name: 'سُورَةُ الْبَقَرَةِ',
    englishName: 'Al-Baqara',
    englishNameTranslation: 'The Cow',
    numberOfAyahs: 286,
    revelationType: 'Medinan',
  },
  {
    number: 112,
    name: 'سُورَةُ الْإِخْلَاصِ',
    englishName: 'Al-Ikhlaas',
    englishNameTranslation: 'The Sincerity',
    numberOfAyahs: 4,
    revelationType: 'Meccan',
  },
];

describe('filterSurahs', () => {
  it('returns every surah for an empty or blank query', () => {
    expect(filterSurahs(SURAHS, '')).toEqual(SURAHS);
    expect(filterSurahs(SURAHS, '   ')).toEqual(SURAHS);
  });

  it('matches by English name, case-insensitively', () => {
    expect(filterSurahs(SURAHS, 'baqara').map((s) => s.number)).toEqual([2]);
    expect(filterSurahs(SURAHS, 'AL-FAATIHA').map((s) => s.number)).toEqual([1]);
  });

  it('matches by English meaning/translation', () => {
    expect(filterSurahs(SURAHS, 'cow').map((s) => s.number)).toEqual([2]);
    expect(filterSurahs(SURAHS, 'sincerity').map((s) => s.number)).toEqual([112]);
  });

  it('matches by Arabic name', () => {
    expect(filterSurahs(SURAHS, 'الْبَقَرَةِ').map((s) => s.number)).toEqual([2]);
  });

  it('matches by exact surah number', () => {
    expect(filterSurahs(SURAHS, '112').map((s) => s.number)).toEqual([112]);
    // "1" should not match surah 112 as a substring of the number.
    expect(filterSurahs(SURAHS, '1').map((s) => s.number)).toEqual([1]);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterSurahs(SURAHS, 'nonexistent')).toEqual([]);
  });
});

function makeAyah(overrides: Partial<Ayah> = {}): Ayah {
  return {
    number: 1,
    numberInQuran: 1,
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translations: {
      english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      urdu: 'اللہ کے نام سے',
    },
    audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    ...overrides,
  };
}

describe('matchesAyahQuery', () => {
  it('matches everything for an empty or blank query', () => {
    expect(matchesAyahQuery(makeAyah(), '')).toBe(true);
    expect(matchesAyahQuery(makeAyah(), '   ')).toBe(true);
  });

  it('matches English translation text, case-insensitively', () => {
    expect(matchesAyahQuery(makeAyah(), 'merciful')).toBe(true);
    expect(matchesAyahQuery(makeAyah(), 'MERCIFUL')).toBe(true);
    expect(matchesAyahQuery(makeAyah(), 'unrelated')).toBe(false);
  });

  it('matches Arabic text', () => {
    expect(matchesAyahQuery(makeAyah(), 'الرَّحْمَٰنِ')).toBe(true);
  });

  it('matches Urdu translation text', () => {
    expect(matchesAyahQuery(makeAyah(), 'اللہ کے نام سے')).toBe(true);
  });

  it('matches the ayah number', () => {
    expect(matchesAyahQuery(makeAyah({ number: 5 }), '5')).toBe(true);
    expect(matchesAyahQuery(makeAyah({ number: 5 }), '6')).toBe(false);
  });

  it('handles a missing translation gracefully', () => {
    const ayah = makeAyah({ translations: {} });
    expect(matchesAyahQuery(ayah, 'merciful')).toBe(false);
  });
});
