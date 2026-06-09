"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useHorizontalCarousel(
  cardSelector = "[data-carousel-card]",
  scrollBy: "card" | "container" = "card",
) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 4;
    setCanScrollLeft(overflow && el.scrollLeft > 4);
    setCanScrollRight(overflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    let step: number;
    if (scrollBy === "container") {
      step = el.clientWidth;
    } else {
      const card = el.querySelector<HTMLElement>(cardSelector);
      const gap = 20;
      step = card ? card.offsetWidth + gap : 304;
    }
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
    setTimeout(updateScrollState, 320);
  };

  return {
    trackRef,
    canScrollLeft,
    canScrollRight,
    updateScrollState,
    scrollPrev: () => scroll("left"),
    scrollNext: () => scroll("right"),
  };
}
