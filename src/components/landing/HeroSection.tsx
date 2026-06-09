"use client";

import { useEffect, useState } from "react";
import { LandingContainer } from "./ui/LandingContainer";
import { HeroBackgroundCarousel } from "./hero/HeroBackgroundCarousel";
import { HeroCarouselDots } from "./hero/HeroCarouselDots";
import { HeroNavbar } from "./hero/HeroNavbar";
import { HeroSearchBar } from "./hero/HeroSearchBar";

const SLIDE_COUNT = 3;
const AUTO_PLAY_MS = 5000;

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDE_COUNT);
    }, AUTO_PLAY_MS);

    return () => clearInterval(timer);
  }, [active]);

  return (
    <section className="relative flex h-dvh min-h-dvh w-full flex-col overflow-hidden">
      <HeroBackgroundCarousel active={active} count={SLIDE_COUNT} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />

      <HeroNavbar />

      <LandingContainer
        outerClassName="relative z-10 flex flex-1 flex-col"
        className="flex flex-1 flex-col pb-10 pt-28 sm:pt-32"
      >
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="max-w-[700px] text-center text-[36px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[56px]">
            Celebrate in venues
            <br />
            big and small
          </h1>

          <div className="mt-12 w-full sm:mt-14">
            <HeroSearchBar />
          </div>

          <div className="mt-10 sm:mt-12">
            <HeroCarouselDots count={SLIDE_COUNT} active={active} onSelect={setActive} />
          </div>
        </div>
      </LandingContainer>
    </section>
  );
}
