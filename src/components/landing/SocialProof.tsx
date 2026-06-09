"use client";

import { CarouselControls } from "./ui/CarouselControls";
import { LandingContainer } from "./ui/LandingContainer";
import { SectionHeader } from "./ui/SectionHeader";
import { StatCard } from "./ui/StatCard";
import { TestimonialCard } from "./ui/TestimonialCard";
import { useHorizontalCarousel } from "./ui/useHorizontalCarousel";

const stats = [
  {
    value: "1,500+",
    label: "Venues Vetted & Approved",
    bgClass: "bg-[#f4a89a]",
    variant: "light" as const,
  },
  {
    value: "7,500+",
    label: "Events Successfully Hosted",
    bgClass: "bg-[#f05a45]",
    variant: "light" as const,
  },
  {
    value: "35+",
    label: "Cities Across the Region",
    bgClass: "bg-[#f0783a]",
    variant: "light" as const,
  },
  {
    value: "4.9★",
    label: "Average Host Rating",
    bgClass: "bg-[#f5c842]",
    variant: "dark" as const,
  },
];

const testimonialImages = [
  "/assets/Testimonials/person-1.svg",
  "/assets/Testimonials/person-2.svg",
];

const testimonials = [
  {
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    name: "Michael Carter",
    imageAlt: "Michael Carter",
    imageSrc: testimonialImages[0],
    imageBg: "bg-[#ddd6fe]",
  },
  {
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    name: "by Ayesha M.",
    imageAlt: "Ayesha M.",
    imageSrc: testimonialImages[1],
    imageBg: "bg-[#a5f3fc]",
  },
  {
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    name: "James Wilson",
    imageAlt: "James Wilson",
    imageSrc: testimonialImages[0],
    imageBg: "bg-[#fde68a]",
  },
  {
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    name: "Sarah Kim",
    imageAlt: "Sarah Kim",
    imageSrc: testimonialImages[1],
    imageBg: "bg-[#fbcfe8]",
  },
];

function chunkPairs<T>(items: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

export function SocialProof() {
  const testimonialSlides = chunkPairs(testimonials);
  const { trackRef, canScrollLeft, canScrollRight, updateScrollState, scrollPrev, scrollNext } =
    useHorizontalCarousel("[data-carousel-slide]", "container");

  return (
    <section className="w-full bg-gradient-to-br from-[#fff6dc] via-[#fff0ea] to-[#fde4ea] py-[72px]">
      <LandingContainer>
        <SectionHeader
          title="Trusted by Event Creators Who Demand Excellence"
          subtitle="Join thousands of planners and hosts who love our seamless discovery and booking experience."
          subtitleClassName="text-[#374151]"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              bgClass={stat.bgClass}
              variant={stat.variant}
            />
          ))}
        </div>

        <div className="relative mt-6">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              onScroll={updateScrollState}
              className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {testimonialSlides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  data-carousel-slide
                  className="flex min-w-full shrink-0 snap-start justify-center gap-5"
                >
                  {slide.map((item) => (
                    <TestimonialCard
                      key={item.name}
                      quote={item.quote}
                      name={item.name}
                      imageSrc={item.imageSrc}
                      imageAlt={item.imageAlt}
                      imageBg={item.imageBg}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <CarouselControls
            className="mt-6"
            variant="light"
            onPrev={scrollPrev}
            onNext={scrollNext}
            canPrev={canScrollLeft}
            canNext={canScrollRight}
          />
        </div>
      </LandingContainer>
    </section>
  );
}
