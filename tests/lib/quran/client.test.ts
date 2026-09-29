import { afterEach, describe, expect, it, vi } from 'vitest';
import { QuranApiError, fetchSurah, fetchSurahList, isValidSurahNumber } from '@/lib/quran/client';

function jsonResponse(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  return {
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => body,
  } as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('isValidSurahNumber', () => {
  it('accepts integers from 1 to 114', () => {
    expect(isValidSurahNumber(1)).toBe(true);
    expect(isValidSurahNumber(114)).toBe(true);
    expect(isValidSurahNumber(57)).toBe(true);
  });

  it('rejects out-of-range and non-integer values', () => {
    expect(isValidSurahNumber(0)).toBe(false);
    expect(isValidSurahNumber(115)).toBe(false);
    expect(isValidSurahNumber(-1)).toBe(false);
    expect(isValidSurahNumber(1.5)).toBe(false);
    expect(isValidSurahNumber(Number.NaN)).toBe(false);
  });
});

describe('fetchSurahList', () => {
  it('maps the API response into SurahSummary objects', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        code: 200,
        status: 'OK',
        data: [
          {
            number: 1,
            name: 'سُورَةُ الْفَاتِحَةِ',
            englishName: 'Al-Faatiha',
            englishNameTranslation: 'The Opening',
            numberOfAyahs: 7,
            revelationType: 'Meccan',
          },
        ],
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const surahs = await fetchSurahList();

    expect(fetchMock).toHaveBeenCalledWith('https://api.alquran.cloud/v1/surah');
    expect(surahs).toEqual([
      {
        number: 1,
        name: 'سُورَةُ الْفَاتِحَةِ',
        englishName: 'Al-Faatiha',
        englishNameTranslation: 'The Opening',
        numberOfAyahs: 7,
        revelationType: 'Meccan',
      },
    ]);
  });

  it('throws a QuranApiError when the network request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')));

    await expect(fetchSurahList()).rejects.toBeInstanceOf(QuranApiError);
  });

  it('throws a QuranApiError when the response is not ok', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, { ok: false, status: 500 })));

    await expect(fetchSurahList()).rejects.toMatchObject({
      name: 'QuranApiError',
      status: 500,
    });
  });

  it('throws a QuranApiError when the envelope reports a non-200 code', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ code: 400, status: 'Bad Request' })),
    );

    await expect(fetchSurahList()).rejects.toBeInstanceOf(QuranApiError);
  });
});

describe('fetchSurah', () => {
  it('rejects invalid surah numbers without calling fetch', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchSurah(0)).rejects.toBeInstanceOf(QuranApiError);
    await expect(fetchSurah(200)).rejects.toBeInstanceOf(QuranApiError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('merges Arabic text with English and Urdu translations by ayah position', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        code: 200,
        status: 'OK',
        data: [
          {
            number: 1,
            name: 'سُورَةُ الْفَاتِحَةِ',
            englishName: 'Al-Faatiha',
            englishNameTranslation: 'The Opening',
            revelationType: 'Meccan',
            numberOfAyahs: 2,
            ayahs: [
              { number: 1, numberInSurah: 1, text: 'بِسْمِ اللَّهِ' },
              { number: 2, numberInSurah: 2, text: 'الْحَمْدُ لِلَّهِ' },
            ],
            edition: { identifier: 'quran-uthmani' },
          },
          {
            number: 1,
            name: 'The Opening',
            englishName: 'Al-Faatiha',
            englishNameTranslation: 'The Opening',
            revelationType: 'Meccan',
            numberOfAyahs: 2,
            ayahs: [
              { number: 1, numberInSurah: 1, text: 'In the name of Allah' },
              { number: 2, numberInSurah: 2, text: 'Praise be to Allah' },
            ],
            edition: { identifier: 'en.sahih' },
          },
          {
            number: 1,
            name: 'الفاتحہ',
            englishName: 'Al-Faatiha',
            englishNameTranslation: 'The Opening',
            revelationType: 'Meccan',
            numberOfAyahs: 2,
            ayahs: [
              { number: 1, numberInSurah: 1, text: 'اللہ کے نام سے' },
              { number: 2, numberInSurah: 2, text: 'سب تعریفیں اللہ کے لیے' },
            ],
            edition: { identifier: 'ur.jalandhry' },
          },
        ],
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const surah = await fetchSurah(1);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.alquran.cloud/v1/surah/1/editions/quran-uthmani,en.sahih,ur.jalandhry',
    );
    expect(surah.number).toBe(1);
    expect(surah.ayahs).toHaveLength(2);
    expect(surah.ayahs[0]).toEqual({
      number: 1,
      numberInQuran: 1,
      arabicText: 'بِسْمِ اللَّهِ',
      translations: {
        english: 'In the name of Allah',
        urdu: 'اللہ کے نام سے',
      },
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    });
  });

  it('throws a QuranApiError when the Arabic edition is missing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({
          code: 200,
          status: 'OK',
          data: [
            {
              number: 1,
              name: 'The Opening',
              englishName: 'Al-Faatiha',
              englishNameTranslation: 'The Opening',
              revelationType: 'Meccan',
              numberOfAyahs: 1,
              ayahs: [{ number: 1, numberInSurah: 1, text: 'In the name of Allah' }],
              edition: { identifier: 'en.sahih' },
            },
          ],
        }),
      ),
    );

    await expect(fetchSurah(1)).rejects.toBeInstanceOf(QuranApiError);
  });
});
