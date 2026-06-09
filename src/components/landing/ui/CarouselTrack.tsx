import { cn } from "@/lib/utils/cn";
import type { Ref } from "react";

interface CarouselTrackProps {
  trackRef?: Ref<HTMLDivElement>;
  onScroll?: () => void;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function CarouselTrack({
  trackRef,
  onScroll,
  children,
  className,
  innerClassName,
}: CarouselTrackProps) {
  return (
    <div
      ref={trackRef}
      onScroll={onScroll}
      className={cn(
        "snap-x snap-mandatory overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      <div className={cn("flex w-max min-w-full justify-center gap-5", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
