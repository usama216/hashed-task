import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export interface CollageImage {
  src?: string;
  alt: string;
  placeholderGradient?: string;
  className?: string;
}

interface ImageCollageProps {
  images: CollageImage[];
  centerIcon?: React.ReactNode;
  className?: string;
}

function StageIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <path
        d="M6 28h24M8 28V14M28 28V14"
        stroke="#f05a45"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 14c0-4 4-6 10-6s10 2 10 6"
        stroke="#f05a45"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M6 10V6h4M30 10V6h-4" stroke="#f05a45" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 22h8" stroke="#f05a45" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CollageTile({ image, className }: { image: CollageImage; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#e5e7eb]",
        className,
      )}
    >
      {image.src ? (
        <Image src={image.src} alt={image.alt} fill sizes="(max-width:1024px) 50vw, 280px" className="object-cover" />
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br", image.placeholderGradient ?? "from-[#d1d5db] to-[#9ca3af]")} />
      )}
    </div>
  );
}

export function ImageCollage({ images, centerIcon, className }: ImageCollageProps) {
  const tiles = images.slice(0, 4);

  return (
    <div className={cn("relative mx-auto w-full max-w-[520px]", className)}>
      <div className="grid grid-cols-2 gap-4">
        <CollageTile image={tiles[0]} className="-translate-y-1" />
        <CollageTile image={tiles[1]} className="translate-y-2" />
        <CollageTile image={tiles[2]} className="-translate-y-1" />
        <CollageTile image={tiles[3]} className="translate-y-2" />
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f05a45]/30 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
    
      </div>
    </div>
  );
}
