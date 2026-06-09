import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
};

const pixelSizes = {
  sm: 32,
  md: 40,
  lg: 64,
};

export function Avatar({ src, alt, size = "md" }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-slate-100 ring-2 ring-white",
        sizes[size],
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={pixelSizes[size]}
        height={pixelSizes[size]}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
