'use client';

import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY, applyTheme, isThemeMode, type ThemeMode } from '@/lib/theme';

const OPTIONS: { mode: ThemeMode; label: string; icon: string }[] = [
  { mode: 'light', label: 'Light', icon: '☀️' },
  { mode: 'dark', label: 'Dark', icon: '🌙' },
  { mode: 'system', label: 'System', icon: '💻' },
];

export function ThemeToggle() {
  // The blocking init script already applied the correct class before paint;
  // read back what it decided so this control starts in sync.
  const [mode, setMode] = useState<ThemeMode>('system');

  useEffect(() => {
    // Read localStorage only after mount: the server (and the client's first
    // render) can't know it, so reading it during render would mismatch the
    // server-rendered markup. The blocking init script already painted the
    // right theme; this just syncs the toggle's own selected state to it.
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(isThemeMode(stored) ? stored : 'system');
  }, []);

  useEffect(() => {
    if (mode !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme('system');
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [mode]);

  function selectMode(nextMode: ThemeMode) {
    setMode(nextMode);
    localStorage.setItem(THEME_STORAGE_KEY, nextMode);
    applyTheme(nextMode);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center gap-0.5 rounded-full border border-zinc-200 p-0.5 dark:border-zinc-800"
    >
      {OPTIONS.map((option) => {
        const isSelected = mode === option.mode;
        return (
          <button
            key={option.mode}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
            title={option.label}
            onClick={() => selectMode(option.mode)}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors ${
              isSelected
                ? 'bg-zinc-900 dark:bg-zinc-50'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <span aria-hidden="true">{option.icon}</span>
          </button>
        );
      })}
    </div>
  );
}
