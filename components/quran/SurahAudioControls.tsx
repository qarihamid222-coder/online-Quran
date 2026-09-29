'use client';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

export function SurahAudioControls() {
  const {
    ayahs,
    currentIndex,
    isPlaying,
    isLoading,
    error,
    playFromIndex,
    togglePlayPause,
    retry,
  } = useAudioPlayer();

  const hasStarted = currentIndex !== null;
  const currentAyah = hasStarted ? ayahs[currentIndex] : undefined;

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => (hasStarted ? togglePlayPause() : playFromIndex(0))}
        className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isPlaying ? 'Pause Surah' : hasStarted ? 'Resume Surah' : 'Play Surah'}
      </button>

      {hasStarted && !error ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {isLoading ? 'Loading…' : `Ayah ${currentAyah?.number} of ${ayahs.length}`}
        </p>
      ) : null}

      {error ? (
        <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
          <span>{error}</span>
          <button type="button" onClick={retry} className="font-medium underline">
            Retry
          </button>
        </div>
      ) : null}
    </div>
  );
}
