import type { Ayah, SurahSummary } from './types';

/** Filters surahs by English name, meaning, Arabic name, or surah number. */
export function filterSurahs(surahs: SurahSummary[], query: string): SurahSummary[] {
  const trimmed = query.trim();
  if (!trimmed) return surahs;

  const normalizedQuery = trimmed.toLowerCase();

  return surahs.filter((surah) => {
    return (
      surah.englishName.toLowerCase().includes(normalizedQuery) ||
      surah.englishNameTranslation.toLowerCase().includes(normalizedQuery) ||
      surah.name.includes(trimmed) ||
      String(surah.number) === trimmed
    );
  });
}

/** Whether an ayah's text (Arabic, English, or Urdu) or its number matches a query. */
export function matchesAyahQuery(
  ayah: Pick<Ayah, 'number' | 'arabicText' | 'translations'>,
  query: string,
): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;

  const normalizedQuery = trimmed.toLowerCase();

  return (
    ayah.arabicText.includes(trimmed) ||
    (ayah.translations.english?.toLowerCase().includes(normalizedQuery) ?? false) ||
    (ayah.translations.urdu?.includes(trimmed) ?? false) ||
    String(ayah.number) === trimmed
  );
}
