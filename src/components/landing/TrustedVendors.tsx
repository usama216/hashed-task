"use client";

import { useMemo } from "react";
import { CarouselControls } from "./ui/CarouselControls";
import { CarouselTrack } from "./ui/CarouselTrack";
import { LandingContainer } from "./ui/LandingContainer";
import { CTABanner } from "./ui/CTABanner";
import { ImageCategoryCard } from "./ui/ImageCategoryCard";
import { SectionHeader } from "./ui/SectionHeader";
import { useHorizontalCarousel } from "./ui/useHorizontalCarousel";

const baseVendors = [
  {
    title: "Caterers",
    image: "/assets/Trustedvendors/vend-1.svg",
  },
  {
    title: "Decorators",
    image: "/assets/Trustedvendors/vend-2.svg",
  },
  {
    title: "Photographers",
    image: "/assets/Trustedvendors/vend-3.svg",
  },
  {
    title: "Entertainment",
    image: "/assets/Trustedvendors/vend-4.svg",
  },
];

export function TrustedVendors() {
  const vendors = useMemo(
    () =>
      Array.from({ length: 3 }, (_, groupIndex) =>
        baseVendors.map((vendor, index) => ({
          ...vendor,
          id: `vendor-${groupIndex}-${index}`,
        })),
      ).flat(),
    [],
  );

  const { trackRef, canScrollLeft, canScrollRight, updateScrollState, scrollPrev, scrollNext } =
    useHorizontalCarousel();

  return (
    <>
    <section id="trusted-vendors" className="w-full bg-[#fff9e5] py-[72px]">
      <LandingContainer>
        <SectionHeader
          title="Complete Your Event with our Trusted Vendors"
          subtitle="Venues are just the beginning. Discover caterers, decorators, photographers, entertainment, and more all in one place, ready to bring your event project to life."
        />

        <div className="relative mt-12">
          <div className="mx-auto w-full max-w-[calc(295px*4+20px*3)] overflow-hidden">
            <CarouselTrack
              trackRef={trackRef}
              onScroll={updateScrollState}
              innerClassName="justify-start"
            >
              {vendors.map((vendor) => (
                <ImageCategoryCard
                  key={vendor.id}
                  title={vendor.title}
                  image={vendor.image}
                  className="h-[400px] w-[295px]"
                />
              ))}
            </CarouselTrack>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[calc(295px*4+20px*3)] justify-end">
            <CarouselControls
              variant="light"
              onPrev={scrollPrev}
              onNext={scrollNext}
              canPrev={canScrollLeft}
              canNext={canScrollRight}
            />
          </div>
        </div>
      </LandingContainer>
    </section>
    <div className="w-full bg-[linear-gradient(to_bottom,#fff9e5_50%,#ffffff_50%)]">
      <LandingContainer>
        <CTABanner
          title="Grow Your Business with Venuze"
          description="Showcase your services to thousands of event organizers and creators searching for talent like yours."
          buttonText="Join as a Vendor"
          imageSrc="/assets/CTA/CTA-image.svg"
        />
      </LandingContainer>
    </div>
    </>
  );
}
