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
}

export interface SurahDetail extends SurahSummary {
  ayahs: Ayah[];
}
