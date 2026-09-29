export interface Bookmark {
  numberInQuran: number;
  surahNumber: number;
  surahEnglishName: string;
  ayahNumber: number;
  snippet: string;
  createdAt: string;
}

const STORAGE_KEY = 'quran-bookmarks';
const SNIPPET_MAX_LENGTH = 140;
const EMPTY_BOOKMARKS: Bookmark[] = [];

type Listener = () => void;

let listeners: Listener[] = [];
let cachedSnapshot: Bookmark[] | null = null;

function isBookmark(value: unknown): value is Bookmark {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Bookmark).numberInQuran === 'number' &&
    typeof (value as Bookmark).surahNumber === 'number' &&
    typeof (value as Bookmark).ayahNumber === 'number' &&
    typeof (value as Bookmark).snippet === 'string'
  );
}

function readFromStorage(): Bookmark[] {
  if (typeof localStorage === 'undefined') return EMPTY_BOOKMARKS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_BOOKMARKS;

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isBookmark) : EMPTY_BOOKMARKS;
  } catch {
    return EMPTY_BOOKMARKS;
  }
}

function writeToStorage(bookmarks: Bookmark[]): void {
  cachedSnapshot = null;

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // Storage unavailable (quota exceeded, private mode, etc.) — ignore.
    }
  }

  for (const listener of listeners) listener();
}

export function truncateSnippet(text: string): string {
  if (text.length <= SNIPPET_MAX_LENGTH) return text;
  return `${text.slice(0, SNIPPET_MAX_LENGTH).trimEnd()}…`;
}

export function getBookmarksSnapshot(): Bookmark[] {
  if (cachedSnapshot === null) {
    cachedSnapshot = [...readFromStorage()].sort((a, b) => a.numberInQuran - b.numberInQuran);
  }
  return cachedSnapshot;
}

export function getServerBookmarksSnapshot(): Bookmark[] {
  return EMPTY_BOOKMARKS;
}

export function isBookmarked(numberInQuran: number): boolean {
  return readFromStorage().some((bookmark) => bookmark.numberInQuran === numberInQuran);
}

export function addBookmark(bookmark: Bookmark): void {
  const current = readFromStorage();
  if (current.some((existing) => existing.numberInQuran === bookmark.numberInQuran)) return;
  writeToStorage([...current, bookmark]);
}

export function removeBookmark(numberInQuran: number): void {
  const current = readFromStorage();
  writeToStorage(current.filter((bookmark) => bookmark.numberInQuran !== numberInQuran));
}

/** Adds the bookmark if it isn't already saved, otherwise removes it. Returns the new state. */
export function toggleBookmark(bookmark: Bookmark): boolean {
  const nowBookmarked = !isBookmarked(bookmark.numberInQuran);
  if (nowBookmarked) {
    addBookmark(bookmark);
  } else {
    removeBookmark(bookmark.numberInQuran);
  }
  return nowBookmarked;
}

export function subscribeToBookmarks(listener: Listener): () => void {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((existing) => existing !== listener);
  };
}
