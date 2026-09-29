export type ThemeMode = 'light' | 'dark' | 'system';

export const THEME_STORAGE_KEY = 'theme';

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

export function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function resolveIsDark(mode: ThemeMode): boolean {
  return mode === 'dark' || (mode === 'system' && systemPrefersDark());
}

export function applyTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', resolveIsDark(mode));
}

/**
 * Blocking script, inlined into <head>, that applies the stored theme before
 * first paint so there is no flash of the wrong theme. Kept as a plain string
 * (rather than importing the functions above) because it must run standalone,
 * before any application JavaScript has loaded.
 */
export const THEME_INIT_SCRIPT = `(function() {
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var isDark = stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();`;
