interface StarRatingProps {
  count?: number;
}

export function StarRating({ count = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f5b942" aria-hidden>
          <path d="M7 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27l-3.52 1.85.67-3.93-2.85-2.78 3.94-.57L7 1.5z" />
        </svg>
      ))}
    </div>
  );
}
