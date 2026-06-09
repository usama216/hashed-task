"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CarouselTrack } from "./ui/CarouselTrack";
import { LandingContainer } from "./ui/LandingContainer";
import { cn } from "@/lib/utils/cn";

const baseCategories = [
  {
    title: "Celebration Venues",
    count: 37,
    image: "/assets/categories/category-1.svg",
  },
  {
    title: "Private Party Venues",
    count: 37,
    image: "/assets/categories/category-2.svg",
  },
  {
    title: "Corporate Meetings",
    count: 37,
    image: "/assets/categories/category-3.svg",
  },
  {
    title: "Creative Studios",
    count: 37,
    image: "/assets/categories/category-4.svg",
  },
];

const CARD_GAP = 20;

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

export function VenueCategories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const categories = useMemo(
    () =>
      Array.from({ length: 3 }, (_, groupIndex) =>
        baseCategories.map((category, index) => ({
          ...category,
          id: `category-${groupIndex}-${index}`,
        })),
      ).flat(),
    [],
  );

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 4;
    setCanScrollLeft(overflow && el.scrollLeft > 4);
    setCanScrollRight(overflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [categories.length]);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-venue-card]");
    const step = card ? card.offsetWidth + CARD_GAP : 315;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
    setTimeout(updateScrollState, 320);
  };

  return (
    <section className="w-full bg-white py-[72px]">
      <LandingContainer>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[40px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0a0a0a]">
            Find The Best Venue For Any Occasion
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16px] leading-[1.65] text-[#6b7280]">
            Explore venues by category, from timeless ballrooms and rooftops with a view to modern
            studios and outdoor gardens, discover spaces designed to inspire unforgettable
            experiences.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="mx-auto w-full max-w-[calc(295px*4+20px*3)] overflow-hidden">
            <CarouselTrack
              trackRef={trackRef}
              onScroll={updateScrollState}
              innerClassName="justify-start"
            >
              {categories.map((category) => (
                <article
                  key={category.id}
                  data-venue-card
                  className="group relative h-[400px] w-[295px] shrink-0 snap-start overflow-hidden rounded-[20px]"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    unoptimized
                    sizes="295px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
                  <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 text-[12px] font-medium leading-none text-white backdrop-blur-[2px]">
                    {category.count} Venues
                  </span>
                  <h3 className="absolute bottom-6 left-5 right-5 text-[20px] font-semibold leading-tight text-white">
                    {category.title}
                  </h3>
                </article>
              ))}
            </CarouselTrack>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[calc(295px*4+20px*3)] justify-end gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous venues"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#374151] transition-colors hover:border-[#d1d5db] hover:bg-[#f9fafb]",
                !canScrollLeft && "cursor-not-allowed opacity-40",
              )}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next venues"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#374151] transition-colors hover:border-[#d1d5db] hover:bg-[#f9fafb]",
                !canScrollRight && "cursor-not-allowed opacity-40",
              )}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
