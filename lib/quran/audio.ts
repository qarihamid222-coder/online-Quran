import {
  AUDIO_CDN_BASE_URL,
  AUDIO_CDN_SURAH_BASE_URL,
  DEFAULT_AUDIO_BITRATE,
  DEFAULT_RECITER_EDITION,
  TOTAL_SURAHS,
} from './constants';

const TOTAL_AYAHS_IN_QURAN = 6236;

function isValidGlobalAyahNumber(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= TOTAL_AYAHS_IN_QURAN;
}

function isValidSurahNumberForAudio(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= TOTAL_SURAHS;
}

/**
 * Recitation audio for a single ayah, addressed by its global (Quran-wide)
 * ayah number — e.g. `Ayah.numberInQuran`.
 */
export function getAyahAudioUrl(
  numberInQuran: number,
  edition: string = DEFAULT_RECITER_EDITION,
  bitrate: number = DEFAULT_AUDIO_BITRATE,
): string {
  if (!isValidGlobalAyahNumber(numberInQuran)) {
    throw new RangeError(`Invalid global ayah number: ${numberInQuran}.`);
  }

  return `${AUDIO_CDN_BASE_URL}/${bitrate}/${edition}/${numberInQuran}.mp3`;
}

/** Recitation audio for an entire surah, played as a single continuous track. */
export function getSurahAudioUrl(
  surahNumber: number,
  edition: string = DEFAULT_RECITER_EDITION,
  bitrate: number = DEFAULT_AUDIO_BITRATE,
): string {
  if (!isValidSurahNumberForAudio(surahNumber)) {
    throw new RangeError(`Invalid surah number: ${surahNumber}.`);
  }

  return `${AUDIO_CDN_SURAH_BASE_URL}/${bitrate}/${edition}/${surahNumber}.mp3`;
}
