import { cn } from "@/lib/utils/cn";

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M11 4L6 9l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M7 4l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  variant?: "light" | "dark";
  className?: string;
}

export function CarouselControls({
  onPrev,
  onNext,
  canPrev,
  canNext,
  variant = "light",
  className,
}: CarouselControlsProps) {
  const btnClass =
    variant === "light"
      ? "border-[#e5e7eb] bg-white text-[#374151] hover:border-[#d1d5db] hover:bg-[#f9fafb]"
      : "border-white/60 bg-transparent text-white hover:bg-white/10";

  return (
    <div className={cn("flex justify-end gap-3", className)}>
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
          btnClass,
          !canPrev && "cursor-not-allowed opacity-40",
        )}
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
          btnClass,
          !canNext && "cursor-not-allowed opacity-40",
        )}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
