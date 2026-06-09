"use client";

import { cn } from "@/lib/utils/cn";

interface HeroCarouselDotsProps {
  count?: number;
  active: number;
  onSelect: (index: number) => void;
}

export function HeroCarouselDots({ count = 3, active, onSelect }: HeroCarouselDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Slide ${i + 1}`}
          aria-current={active === i ? "true" : undefined}
          onClick={() => onSelect(i)}
          className={cn(
            "h-2 rounded-full transition-all",
            active === i ? "w-7 bg-[#f5b942]" : "w-2 bg-white/40 hover:bg-white/60",
          )}
        />
      ))}
    </div>
  );
}
