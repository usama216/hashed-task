"use client";

import { useId } from "react";
import { cn } from "@/lib/utils/cn";

interface VenuzeIconProps {
  size?: number;
  className?: string;
}

export function VenuzeIcon({ size = 32, className }: VenuzeIconProps) {
  const gradId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f5b942" />
          <stop offset="1" stopColor="#f05a45" />
        </linearGradient>
      </defs>
      <path d="M8 8h8l8 24 8-24h8L20 36 8 8z" fill={`url(#${gradId})`} />
    </svg>
  );
}
