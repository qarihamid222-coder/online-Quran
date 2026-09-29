'use client';

import { createContext, useContext } from 'react';
import type { Ayah } from '@/lib/quran';

export interface AudioPlayerContextValue {
  ayahs: Ayah[];
  currentIndex: number | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  playFromIndex: (index: number) => void;
  togglePlayPause: () => void;
  retry: () => void;
}

export const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function useAudioPlayer(): AudioPlayerContextValue {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}
