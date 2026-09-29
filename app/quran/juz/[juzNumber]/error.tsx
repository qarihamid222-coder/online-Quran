'use client';

import { ErrorState } from '@/components/ui/ErrorState';

export default function JuzReaderError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <ErrorState
        title="Couldn't load this juz"
        message={error.message || 'Something went wrong while loading this juz.'}
        onRetry={retry}
      />
    </div>
  );
}
