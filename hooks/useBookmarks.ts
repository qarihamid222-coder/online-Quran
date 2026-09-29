'use client';

import { useSyncExternalStore } from 'react';
import {
  getBookmarksSnapshot,
  getServerBookmarksSnapshot,
  subscribeToBookmarks,
  type Bookmark,
} from '@/store/bookmarks';

/** The current list of bookmarks, kept in sync with localStorage across every component. */
export function useBookmarks(): Bookmark[] {
  return useSyncExternalStore(
    subscribeToBookmarks,
    getBookmarksSnapshot,
    getServerBookmarksSnapshot,
  );
}
