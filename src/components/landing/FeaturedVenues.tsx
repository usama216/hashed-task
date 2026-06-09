"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { CarouselTrack } from "./ui/CarouselTrack";
import { LandingContainer } from "./ui/LandingContainer";
import { cn } from "@/lib/utils/cn";

const CARD_GAP = 20;
const CARD_WIDTH = 290;

const categoryImages = [
  "/assets/categories/category-1.svg",
  "/assets/categories/category-2.svg",
  "/assets/categories/category-3.svg",
  "/assets/categories/category-4.svg",
];

const filters = [
  "ROOFTOP",
  "GALLERY",
  "RESTAURANT",
  "OUTDOOR",
  "STUDIO",
  "TERRACE",
  "BALLROOM",
] as const;

type Filter = (typeof filters)[number];

interface Venue {
  id: string;
  image: string;
  category: Filter;
  title: string;
  location: string;
  capacity: string;
  size: string;
  parking: string;
  more: number;
  price: number;
}

interface VenueSlot {
  title: string;
  location: string;
  price: number;
  capacity: string;
  size: string;
  parking: string;
  more: number;
}

const venuesByFilter: Record<Filter, [VenueSlot, VenueSlot, VenueSlot, VenueSlot]> = {
  ROOFTOP: [
    { title: "Rooftop Lounge with City Views", location: "Dubai, UAE", price: 55, capacity: "120+", size: "1,100 sq ft", parking: "Valet parking", more: 9 },
    { title: "Manhattan Penthouse Terrace", location: "New York, USA", price: 60, capacity: "80+", size: "900 sq ft", parking: "Garage on-site", more: 14 },
    { title: "Ocean Breeze Rooftop Deck", location: "Miami, FL", price: 50, capacity: "200+", size: "1,800 sq ft", parking: "Free parking", more: 11 },
    { title: "Hollywood Hills View Space", location: "Los Angeles, CA", price: 65, capacity: "150+", size: "1,400 sq ft", parking: "Street parking", more: 18 },
  ],
  GALLERY: [
    { title: "Contemporary White Cube Gallery", location: "London, SW1", price: 45, capacity: "60+", size: "2,400 sq ft", parking: "No parking", more: 6 },
    { title: "Haussmann Art Salon", location: "Paris, FR", price: 50, capacity: "45+", size: "1,600 sq ft", parking: "Street parking", more: 8 },
    { title: "Canal-Side Exhibition Hall", location: "Amsterdam, NL", price: 40, capacity: "100+", size: "2,100 sq ft", parking: "Bike parking", more: 10 },
    { title: "Gothic Quarter Creative Loft", location: "Barcelona, ES", price: 48, capacity: "70+", size: "1,250 sq ft", parking: "Nearby garage", more: 7 },
  ],
  RESTAURANT: [
    { title: "Private Dining Room — River North", location: "Chicago, IL", price: 70, capacity: "40+", size: "850 sq ft", parking: "Valet parking", more: 5 },
    { title: "Harborfront Chef's Table", location: "Boston, MA", price: 65, capacity: "30+", size: "720 sq ft", parking: "Garage on-site", more: 4 },
    { title: "Pike Place Market Event Space", location: "Seattle, WA", price: 55, capacity: "55+", size: "1,050 sq ft", parking: "Street parking", more: 9 },
    { title: "East Austin Supper Club", location: "Austin, TX", price: 50, capacity: "65+", size: "980 sq ft", parking: "Free parking", more: 12 },
  ],
  OUTDOOR: [
    { title: "Harbour Lawn Marquee Venue", location: "Sydney, AU", price: 58, capacity: "350+", size: "4,500 sq ft", parking: "On-site lot", more: 22 },
    { title: "Yarra River Garden Pavilion", location: "Melbourne, AU", price: 52, capacity: "280+", size: "3,800 sq ft", parking: "Free parking", more: 16 },
    { title: "Stanley Park Forest Clearing", location: "Vancouver, CA", price: 48, capacity: "400+", size: "5,200 sq ft", parking: "Bus drop-off", more: 20 },
    { title: "Waterfront Vineyard Estate", location: "Auckland, NZ", price: 45, capacity: "220+", size: "3,200 sq ft", parking: "Valet parking", more: 15 },
  ],
  STUDIO: [
    { title: "Kreuzberg Production Studio", location: "Berlin, DE", price: 42, capacity: "25+", size: "1,900 sq ft", parking: "Loading bay", more: 13 },
    { title: "Bavaria Film & Photo Loft", location: "Munich, DE", price: 44, capacity: "20+", size: "1,650 sq ft", parking: "Street parking", more: 10 },
    { title: "Speicherstadt Creative Warehouse", location: "Hamburg, DE", price: 40, capacity: "35+", size: "2,300 sq ft", parking: "Truck access", more: 17 },
    { title: "Mainhattan Broadcast Suite", location: "Frankfurt, DE", price: 46, capacity: "18+", size: "1,400 sq ft", parking: "Garage on-site", more: 8 },
  ],
  TERRACE: [
    { title: "Trastevere Rooftop Terrace", location: "Rome, IT", price: 53, capacity: "90+", size: "1,300 sq ft", parking: "Street parking", more: 11 },
    { title: "Navigli Canal Terrace Suite", location: "Milan, IT", price: 57, capacity: "75+", size: "1,150 sq ft", parking: "Nearby garage", more: 9 },
    { title: "Arno River View Terrace", location: "Florence, IT", price: 50, capacity: "60+", size: "1,000 sq ft", parking: "Limited parking", more: 7 },
    { title: "Bay of Naples Cliff Terrace", location: "Naples, IT", price: 48, capacity: "110+", size: "1,700 sq ft", parking: "Valet parking", more: 13 },
  ],
  BALLROOM: [
    { title: "Imperial Palace Grand Ballroom", location: "Vienna, AT", price: 80, capacity: "500+", size: "6,000 sq ft", parking: "Valet parking", more: 30 },
    { title: "Old Town Crystal Ballroom", location: "Prague, CZ", price: 75, capacity: "420+", size: "5,400 sq ft", parking: "Garage on-site", more: 28 },
    { title: "Danube Heritage Ballroom", location: "Budapest, HU", price: 70, capacity: "380+", size: "4,800 sq ft", parking: "Free parking", more: 24 },
    { title: "Royal Warsaw Event Hall", location: "Warsaw, PL", price: 68, capacity: "450+", size: "5,100 sq ft", parking: "On-site lot", more: 26 },
  ],
};

function buildVenuesForFilter(filter: Filter): Venue[] {
  const filterIndex = filters.indexOf(filter);
  const baseVenues = venuesByFilter[filter].map((slot, index) => ({
    id: `${filter}-${index}`,
    category: filter,
    image: categoryImages[(index + filterIndex) % categoryImages.length],
    ...slot,
  }));

  return Array.from({ length: 3 }, (_, groupIndex) =>
    baseVenues.map((venue, index) => ({
      ...venue,
      id: `${filter}-${groupIndex}-${index}`,
    })),
  ).flat();
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
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

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
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

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="10.5" cy="2.5" r="1.75" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="3.5" cy="7" r="1.75" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10.5" cy="11.5" r="1.75" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 6l4-2.5M5 8l4 2.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 12s-5-3.2-5-6.5a2.8 2.8 0 0 1 5-1.5 2.8 2.8 0 0 1 5 1.5C12 8.8 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M7 7.5V12M4.5 12h5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 12c0-2 1.57-3.5 3.5-3.5S8.5 10 8.5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="10" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.5 12c0-1.4-1.1-2.5-2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 4.5V2h2.5M9.5 2H12v2.5M12 9.5V12H9.5M4.5 12H2V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 9.5h10l-1-3.5H3L2 9.5zM3.5 9.5V7M10.5 9.5V7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="4.5" cy="9.5" r="1" fill="currentColor" />
      <circle cx="9.5" cy="9.5" r="1" fill="currentColor" />
    </svg>
  );
}

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article
      data-venue-card
      className="w-[290px] shrink-0 snap-start overflow-hidden rounded-[16px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
    >
      <div className="relative h-[210px] bg-[#d1d5db]">
        <Image
          src={venue.image}
          alt={venue.title}
          fill
          unoptimized
          sizes="290px"
          className="object-cover"
        />

        <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white">
          Verified
        </span>

        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            aria-label="Share"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm"
          >
            <ShareIcon />
          </button>
          <button
            type="button"
            aria-label="Save"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm"
          >
            <HeartIcon />
          </button>
        </div>

      </div>

      <div className="p-4">
        <h3 className="text-[15px] font-bold leading-snug text-[#111827]">{venue.title}</h3>

        <p className="mt-2 flex items-center gap-1 text-[13px] font-medium text-[#f05a45]">
          <PinIcon />
          {venue.location}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#9ca3af]">
          <span className="inline-flex items-center gap-1">
            <UsersIcon />
            {venue.capacity}
          </span>
          <span className="inline-flex items-center gap-1">
            <AreaIcon />
            {venue.size}
          </span>
          <span className="inline-flex items-center gap-1">
            <CarIcon />
            {venue.parking}
          </span>
        </div>
        <button type="button" className="mt-1 text-[12px] text-[#9ca3af] underline-offset-2 hover:underline">
          +{venue.more} more
        </button>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#f3f4f6] pt-4">
          <p className="text-[14px] text-[#374151]">
            From <span className="font-bold text-[#111827]">${venue.price}/hour</span>
          </p>
          <button
            type="button"
            className="shrink-0 rounded-full border border-[#f05a45] px-4 py-2 text-[13px] font-medium text-[#f05a45] transition-colors hover:bg-[#f05a45]/5"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedVenues() {
  const [activeFilter, setActiveFilter] = useState<Filter>("GALLERY");
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const displayedVenues = useMemo(
    () => buildVenuesForFilter(activeFilter),
    [activeFilter],
  );

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 4;
    setCanScrollLeft(overflow && el.scrollLeft > 4);
    setCanScrollRight(overflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: "instant" });
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [activeFilter]);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-venue-card]");
    const step = card ? card.offsetWidth + CARD_GAP : CARD_WIDTH + CARD_GAP;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
    setTimeout(updateScrollState, 320);
  };

  return (
    <section id="featured-venues" className="relative w-full overflow-hidden py-[72px]">
      <div className="featured-venues-bg absolute inset-0" />
      <div className="absolute inset-0 bg-black/50" />

      <LandingContainer className="relative z-10">
        <h2 className="text-center text-[40px] font-bold leading-tight tracking-[-0.02em] text-white">
          Featured Venues
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.06em] transition-colors",
                activeFilter === filter
                  ? "bg-[#f05a45] text-white"
                  : "bg-white/15 text-white hover:bg-white/25",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative mt-10">
          <div className="mx-auto w-full max-w-[calc(290px*4+20px*3)] overflow-hidden">
            <CarouselTrack
              trackRef={trackRef}
              onScroll={updateScrollState}
              innerClassName="justify-start"
            >
              {displayedVenues.map((venue) => (
                <VenueCard key={`${activeFilter}-${venue.id}`} venue={venue} />
              ))}
            </CarouselTrack>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[calc(290px*4+20px*3)] justify-end gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous venues"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-transparent text-white transition-colors hover:bg-white/10",
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
                "flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-transparent text-white transition-colors hover:bg-white/10",
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
