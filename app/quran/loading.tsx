import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <Skeleton className="mb-6 h-8 w-32" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-[70px] w-full" />
        ))}
      </div>
    </div>
  );
}
