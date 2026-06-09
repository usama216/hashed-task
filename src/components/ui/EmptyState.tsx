interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-14">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-zinc-400" aria-hidden>
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="text-sm text-zinc-500">{message}</p>
    </div>
  );
}
