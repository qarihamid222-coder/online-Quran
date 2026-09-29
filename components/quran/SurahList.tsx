import type { SurahSummary } from '@/lib/quran';
import { SurahCard } from './SurahCard';

interface SurahListProps {
  surahs: SurahSummary[];
}

export function SurahList({ surahs }: SurahListProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {surahs.map((surah) => (
        <SurahCard key={surah.number} surah={surah} />
      ))}
    </div>
  );
}
