"use client";

const HERO_BG = "/assets/HeroSection/hero-section.svg";

interface HeroBackgroundCarouselProps {
  active: number;
  count: number;
}

export function HeroBackgroundCarousel({ active, count }: HeroBackgroundCarouselProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1a1520]" aria-hidden>
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="min-w-full shrink-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${HERO_BG})`,
              backgroundPosition: index % 2 === 0 ? "center" : "60% center",
            }}
          />
        ))}
      </div>
    </div>
  );
}
