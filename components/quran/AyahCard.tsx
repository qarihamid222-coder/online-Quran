'use client';

import { useEffect, useState } from 'react';
import type { Ayah } from '@/lib/quran';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface AyahCardProps {
  ayah: Ayah;
  index: number;
}

export function AyahCard({ ayah, index }: AyahCardProps) {
  const { currentIndex, isPlaying, isLoading, playFromIndex, togglePlayPause } = useAudioPlayer();
  const isActive = currentIndex === index;
  const isActivePlaying = isActive && isPlaying;
  const isActiveLoading = isActive && isLoading;

  const anchorId = `ayah-${ayah.numberInQuran}`;
  const [isLinked, setIsLinked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // window.location.hash is only known client-side, after mount — the
    // browser has already scrolled to this anchor natively by this point;
    // this just adds a temporary highlight on top of that.
    if (window.location.hash !== `#${anchorId}`) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLinked(true);
    const timeout = setTimeout(() => setIsLinked(false), 3000);
    return () => clearTimeout(timeout);
  }, [anchorId]);

  function handleToggle() {
    if (isActive) {
      togglePlayPause();
    } else {
      playFromIndex(index);
    }
  }

  function handleCopyLink() {
    if (typeof window === 'undefined') return;

    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  return (
    <li
      id={anchorId}
      className={`flex scroll-mt-20 flex-col gap-3 border-b border-zinc-100 py-6 transition-colors last:border-b-0 dark:border-zinc-900 ${
        isLinked
          ? 'bg-amber-50 dark:bg-amber-950/30'
          : isActive
            ? 'bg-zinc-50 dark:bg-zinc-900/40'
            : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={handleToggle}
          aria-pressed={isActivePlaying}
          aria-label={isActivePlaying ? `Pause ayah ${ayah.number}` : `Play ayah ${ayah.number}`}
          className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          {isActiveLoading ? '…' : isActivePlaying ? '❚❚' : ayah.number}
        </button>
        <p
          dir="rtl"
          lang="ar"
          className="font-arabic flex-1 text-right text-2xl leading-loose text-zinc-900 dark:text-zinc-50"
        >
          {ayah.arabicText}
        </p>
      </div>
      {ayah.translations.english ? (
        <p className="pl-10 text-base text-zinc-700 dark:text-zinc-300">
          {ayah.translations.english}
        </p>
      ) : null}
      {ayah.translations.urdu ? (
        <p
          dir="rtl"
          lang="ur"
          className="pl-10 text-right text-base text-zinc-700 dark:text-zinc-300"
        >
          {ayah.translations.urdu}
        </p>
      ) : null}
      <button
        type="button"
        onClick={handleCopyLink}
        className="ml-10 self-start text-xs font-medium text-zinc-400 underline-offset-2 hover:text-zinc-600 hover:underline dark:text-zinc-500 dark:hover:text-zinc-300"
      >
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </li>
  );
}
