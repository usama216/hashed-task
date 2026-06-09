import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface DestinationCardProps {
  city: string;
  venueCount: number;
  tagline: string;
  popular: string;
  priceFrom: number;
  image?: string;
  imageAlt?: string;
  placeholderGradient?: string;
  className?: string;
}

export function DestinationCard({
  city,
  venueCount,
  tagline,
  popular,
  priceFrom,
  image,
  imageAlt,
  placeholderGradient = "from-[#6b7280] to-[#374151]",
  className,
}: DestinationCardProps) {
  return (
    <article
      className={cn(
        "group relative h-[420px] overflow-hidden rounded-[20px]",
        className,
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={imageAlt ?? city}
          fill
          unoptimized={image.endsWith(".svg")}
          sizes="(max-width:768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br", placeholderGradient)} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />

      <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 text-[12px] font-medium leading-none text-white backdrop-blur-[2px]">
        {venueCount} Venues
      </span>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-[22px] font-bold leading-tight text-white">{city}</h3>
        <p className="mt-1.5 text-[14px] text-white/85">{tagline}</p>
        <div className="mt-4 flex items-end justify-between gap-3 text-[13px] text-white/90">
          <span>Popular: {popular}</span>
          <span className="shrink-0 font-bold text-white">From ${priceFrom} per hour</span>
        </div>
      </div>
    </article>
  );
}
