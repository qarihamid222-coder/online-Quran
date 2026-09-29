import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex flex-col items-center gap-3 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="mt-6 flex flex-col gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))}
      </div>
    </div>
  );
}
