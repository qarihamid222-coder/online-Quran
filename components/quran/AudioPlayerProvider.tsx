'use client';

import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Ayah } from '@/lib/quran';
import { AudioPlayerContext, type AudioPlayerContextValue } from '@/hooks/useAudioPlayer';

interface AudioPlayerProviderProps {
  ayahs: Ayah[];
  children: ReactNode;
}

export function AudioPlayerProvider({ ayahs, children }: AudioPlayerProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playFromIndex = useCallback(
    (index: number) => {
      const ayah = ayahs[index];
      const audio = audioRef.current;
      if (!ayah || !audio) return;

      setError(null);
      setIsLoading(true);
      setCurrentIndex(index);
      audio.src = ayah.audioUrl;
      audio.play().catch(() => {
        setIsLoading(false);
        setIsPlaying(false);
        setError('Unable to play audio for this ayah.');
      });
    },
    [ayahs],
  );

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentIndex === null) {
      playFromIndex(0);
      return;
    }

    if (isPlaying) {
      audio.pause();
      return;
    }

    setError(null);
    audio.play().catch(() => {
      setError('Unable to play audio.');
    });
  }, [currentIndex, isPlaying, playFromIndex]);

  const retry = useCallback(() => {
    if (currentIndex !== null) {
      playFromIndex(currentIndex);
    }
  }, [currentIndex, playFromIndex]);

  const handleEnded = useCallback(() => {
    if (currentIndex === null) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex < ayahs.length) {
      playFromIndex(nextIndex);
    } else {
      setIsPlaying(false);
      setCurrentIndex(null);
    }
  }, [ayahs.length, currentIndex, playFromIndex]);

  const value = useMemo<AudioPlayerContextValue>(
    () => ({
      ayahs,
      currentIndex,
      isPlaying,
      isLoading,
      error,
      playFromIndex,
      togglePlayPause,
      retry,
    }),
    [ayahs, currentIndex, isPlaying, isLoading, error, playFromIndex, togglePlayPause, retry],
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => {
          setIsPlaying(true);
          setIsLoading(false);
        }}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onEnded={handleEnded}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
          setError('Unable to play audio. Please try again.');
        }}
        className="hidden"
      />
    </AudioPlayerContext.Provider>
  );
}
