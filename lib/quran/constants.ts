export const QURAN_API_BASE_URL = 'https://api.alquran.cloud/v1';

export const ARABIC_EDITION = 'quran-uthmani';

export const TRANSLATION_EDITIONS = {
  english: 'en.sahih',
  urdu: 'ur.jalandhry',
} as const;

export const TOTAL_SURAHS = 114;

// Audio is served from the same network (islamic.network) that powers the
// alquran.cloud API, at predictable URLs — no extra API call is needed to
// resolve an ayah or surah recitation.
export const AUDIO_CDN_BASE_URL = 'https://cdn.islamic.network/quran/audio';
export const AUDIO_CDN_SURAH_BASE_URL = 'https://cdn.islamic.network/quran/audio-surah';
export const DEFAULT_RECITER_EDITION = 'ar.alafasy';
export const DEFAULT_AUDIO_BITRATE = 128;
