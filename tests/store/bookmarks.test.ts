import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addBookmark,
  getBookmarksSnapshot,
  isBookmarked,
  removeBookmark,
  subscribeToBookmarks,
  toggleBookmark,
  truncateSnippet,
  type Bookmark,
} from '@/store/bookmarks';

function createFakeLocalStorage() {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
  };
}

function makeBookmark(overrides: Partial<Bookmark> = {}): Bookmark {
  return {
    numberInQuran: 262,
    surahNumber: 2,
    surahEnglishName: 'Al-Baqara',
    ayahNumber: 255,
    snippet: 'Allah - there is no deity except Him, the Ever-Living...',
    createdAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
  };
}

beforeEach(() => {
  vi.stubGlobal('localStorage', createFakeLocalStorage());
  // Force a fresh snapshot per test rather than reusing the module-level cache.
  removeBookmark(-1);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('truncateSnippet', () => {
  it('leaves short text untouched', () => {
    expect(truncateSnippet('short text')).toBe('short text');
  });

  it('truncates long text with an ellipsis', () => {
    const long = 'a'.repeat(200);
    const result = truncateSnippet(long);
    expect(result.length).toBeLessThan(long.length);
    expect(result.endsWith('…')).toBe(true);
  });
});

describe('bookmarks store', () => {
  it('starts empty', () => {
    expect(getBookmarksSnapshot()).toEqual([]);
    expect(isBookmarked(262)).toBe(false);
  });

  it('adds and lists a bookmark', () => {
    addBookmark(makeBookmark());
    expect(isBookmarked(262)).toBe(true);
    expect(getBookmarksSnapshot()).toHaveLength(1);
    expect(getBookmarksSnapshot()[0].surahEnglishName).toBe('Al-Baqara');
  });

  it('does not duplicate an existing bookmark', () => {
    addBookmark(makeBookmark());
    addBookmark(makeBookmark());
    expect(getBookmarksSnapshot()).toHaveLength(1);
  });

  it('removes a bookmark', () => {
    addBookmark(makeBookmark());
    removeBookmark(262);
    expect(isBookmarked(262)).toBe(false);
    expect(getBookmarksSnapshot()).toEqual([]);
  });

  it('toggles a bookmark on and off, returning the new state', () => {
    expect(toggleBookmark(makeBookmark())).toBe(true);
    expect(isBookmarked(262)).toBe(true);
    expect(toggleBookmark(makeBookmark())).toBe(false);
    expect(isBookmarked(262)).toBe(false);
  });

  it('keeps the snapshot sorted by global ayah number', () => {
    addBookmark(makeBookmark({ numberInQuran: 300, surahNumber: 3 }));
    addBookmark(makeBookmark({ numberInQuran: 5, surahNumber: 1 }));
    const numbers = getBookmarksSnapshot().map((b) => b.numberInQuran);
    expect(numbers).toEqual([5, 300]);
  });

  it('returns the same array reference when nothing has changed', () => {
    addBookmark(makeBookmark());
    expect(getBookmarksSnapshot()).toBe(getBookmarksSnapshot());
  });

  it('notifies subscribers on add and remove', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToBookmarks(listener);

    addBookmark(makeBookmark());
    expect(listener).toHaveBeenCalledTimes(1);

    removeBookmark(262);
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    addBookmark(makeBookmark());
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
