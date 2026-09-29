'use client';

import { ErrorState } from '@/components/ui/ErrorState';

export default function QuranListError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <ErrorState
        title="Couldn't load the surahs"
        message={error.message || 'Something went wrong while loading the surah list.'}
        onRetry={retry}
      />
    </div>
  );
}
