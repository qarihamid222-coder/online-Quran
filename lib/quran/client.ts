import {
  ARABIC_EDITION,
  QURAN_API_BASE_URL,
  TOTAL_SURAHS,
  TRANSLATION_EDITIONS,
} from './constants';
import { getAyahAudioUrl } from './audio';
import type { Ayah, RevelationType, SurahDetail, SurahSummary } from './types';

export class QuranApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'QuranApiError';
    this.status = status;
  }
}

interface AlQuranApiEnvelope<T> {
  code: number;
  status: string;
  data: T;
}

interface RawSurahSummary {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface RawAyah {
  number: number;
  numberInSurah: number;
  text: string;
}

interface RawSurahEdition {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: RawAyah[];
  edition: {
    identifier: string;
  };
}

async function fetchQuranApi<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${QURAN_API_BASE_URL}${path}`);
  } catch {
    throw new QuranApiError(
      'Unable to reach the Quran data service. Check your connection and try again.',
    );
  }

  if (!response.ok) {
    throw new QuranApiError('The Quran data service returned an error.', response.status);
  }

  let json: AlQuranApiEnvelope<T>;
  try {
    json = (await response.json()) as AlQuranApiEnvelope<T>;
  } catch {
    throw new QuranApiError('The Quran data service returned an unreadable response.');
  }

  if (json.code !== 200 || json.data === undefined) {
    throw new QuranApiError('The Quran data service returned an unexpected response.');
  }

  return json.data;
}

function toRevelationType(value: string): RevelationType {
  return value === 'Meccan' ? 'Meccan' : 'Medinan';
}

function mapSurahSummary(raw: RawSurahSummary): SurahSummary {
  return {
    number: raw.number,
    name: raw.name,
    englishName: raw.englishName,
    englishNameTranslation: raw.englishNameTranslation,
    numberOfAyahs: raw.numberOfAyahs,
    revelationType: toRevelationType(raw.revelationType),
  };
}

export function isValidSurahNumber(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= TOTAL_SURAHS;
}

export async function fetchSurahList(): Promise<SurahSummary[]> {
  const data = await fetchQuranApi<RawSurahSummary[]>('/surah');
  return data.map(mapSurahSummary);
}

export async function fetchSurah(surahNumber: number): Promise<SurahDetail> {
  if (!isValidSurahNumber(surahNumber)) {
    throw new QuranApiError(`Invalid surah number: ${surahNumber}.`);
  }

  const editions = [ARABIC_EDITION, TRANSLATION_EDITIONS.english, TRANSLATION_EDITIONS.urdu].join(
    ',',
  );
  const data = await fetchQuranApi<RawSurahEdition[]>(`/surah/${surahNumber}/editions/${editions}`);

  const arabicEdition = data.find((edition) => edition.edition.identifier === ARABIC_EDITION);
  const englishEdition = data.find(
    (edition) => edition.edition.identifier === TRANSLATION_EDITIONS.english,
  );
  const urduEdition = data.find(
    (edition) => edition.edition.identifier === TRANSLATION_EDITIONS.urdu,
  );

  if (!arabicEdition) {
    throw new QuranApiError(
      'The Quran data service did not return the Arabic text for this surah.',
    );
  }

  const ayahs: Ayah[] = arabicEdition.ayahs.map((ayah, index) => ({
    number: ayah.numberInSurah,
    numberInQuran: ayah.number,
    arabicText: ayah.text,
    translations: {
      english: englishEdition?.ayahs[index]?.text,
      urdu: urduEdition?.ayahs[index]?.text,
    },
    audioUrl: getAyahAudioUrl(ayah.number),
  }));

  return {
    number: arabicEdition.number,
    name: arabicEdition.name,
    englishName: arabicEdition.englishName,
    englishNameTranslation: arabicEdition.englishNameTranslation,
    numberOfAyahs: arabicEdition.numberOfAyahs,
    revelationType: toRevelationType(arabicEdition.revelationType),
    ayahs,
  };
}
