interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
      <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
      {description ? (
        <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      ) : null}
    </div>
  );
}
