import Image from "next/image";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/utils/cn";

interface TestimonialCardProps {
  quote: string;
  name: string;
  imageSrc?: string;
  imageAlt: string;
  imageBg?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  imageSrc,
  imageAlt,
  imageBg = "bg-[#e9d5ff]",
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex h-full w-[calc(50%-10px)] max-w-[580px] shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex w-[165px] shrink-0 items-end justify-center overflow-hidden sm:w-[175px]",
          imageBg,
        )}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={200}
            height={240}
            unoptimized={imageSrc.endsWith(".svg")}
            className="h-full w-full object-cover object-bottom"
          />
        ) : (
          <div className="flex h-full min-h-[185px] w-full items-end justify-center">
            <svg
              viewBox="0 0 120 200"
              fill="none"
              className="h-[88%] w-[88%]"
              aria-hidden
            >
              <ellipse cx="60" cy="175" rx="42" ry="18" fill="rgba(0,0,0,0.06)" />
              <circle cx="60" cy="72" r="34" fill="rgba(255,255,255,0.35)" />
              <path
                d="M18 175c0-24 18.8-44 42-44s42 20 42 44"
                fill="rgba(255,255,255,0.35)"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-6 sm:py-7">
        <p className="text-[14px] leading-[1.65] text-[#6b7280]">{quote}</p>
        <p className="mt-4 text-[15px] font-bold text-[#0a0a0a]">{name}</p>
        <div className="mt-2">
          <StarRating />
        </div>
      </div>
    </article>
  );
}
