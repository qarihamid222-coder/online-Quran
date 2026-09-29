export type RevelationType = 'Meccan' | 'Medinan';

export interface SurahSummary {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: RevelationType;
}

export interface AyahTranslations {
  english?: string;
  urdu?: string;
}

export interface Ayah {
  number: number;
  numberInQuran: number;
  arabicText: string;
  translations: AyahTranslations;
  audioUrl: string;
}

export interface SurahDetail extends SurahSummary {
  ayahs: Ayah[];
}

/** An ayah within a juz, tagged with the surah it belongs to (a juz can span multiple surahs). */
export interface JuzAyah extends Ayah {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
}

export interface JuzDetail {
  number: number;
  ayahs: JuzAyah[];
}
