import { describe, expect, it } from 'vitest';
import { getAyahAudioUrl, getSurahAudioUrl } from '@/lib/quran/audio';

describe('getAyahAudioUrl', () => {
  it('builds the default-reciter URL for a global ayah number', () => {
    expect(getAyahAudioUrl(1)).toBe('https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3');
    expect(getAyahAudioUrl(6236)).toBe(
      'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3',
    );
  });

  it('honors a custom edition and bitrate', () => {
    expect(getAyahAudioUrl(262, 'ar.husary', 64)).toBe(
      'https://cdn.islamic.network/quran/audio/64/ar.husary/262.mp3',
    );
  });

  it('rejects out-of-range or non-integer ayah numbers', () => {
    expect(() => getAyahAudioUrl(0)).toThrow(RangeError);
    expect(() => getAyahAudioUrl(6237)).toThrow(RangeError);
    expect(() => getAyahAudioUrl(1.5)).toThrow(RangeError);
  });
});

describe('getSurahAudioUrl', () => {
  it('builds the default-reciter URL for a surah number', () => {
    expect(getSurahAudioUrl(1)).toBe(
      'https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/1.mp3',
    );
    expect(getSurahAudioUrl(114)).toBe(
      'https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/114.mp3',
    );
  });

  it('honors a custom edition and bitrate', () => {
    expect(getSurahAudioUrl(2, 'ar.husary', 64)).toBe(
      'https://cdn.islamic.network/quran/audio-surah/64/ar.husary/2.mp3',
    );
  });

  it('rejects out-of-range or non-integer surah numbers', () => {
    expect(() => getSurahAudioUrl(0)).toThrow(RangeError);
    expect(() => getSurahAudioUrl(115)).toThrow(RangeError);
    expect(() => getSurahAudioUrl(1.5)).toThrow(RangeError);
  });
});
