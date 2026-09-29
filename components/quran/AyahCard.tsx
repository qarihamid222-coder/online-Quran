import type { Ayah } from '@/lib/quran';

interface AyahCardProps {
  ayah: Ayah;
}

export function AyahCard({ ayah }: AyahCardProps) {
  return (
    <li className="flex flex-col gap-3 border-b border-zinc-100 py-6 last:border-b-0 dark:border-zinc-900">
      <div className="flex items-start gap-3">
        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {ayah.number}
        </span>
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
    </li>
  );
}
