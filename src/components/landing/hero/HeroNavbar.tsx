"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { LandingContainer } from "../ui/LandingContainer";
import { VenuzeLogo } from "@/components/ui/VenuzeLogo";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 4.5L6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const navBtnClass =
  "inline-flex items-center gap-1.5 rounded-lg border border-[#f05a45] bg-white px-3.5 py-2 text-[13px] font-medium text-[#f05a45] shadow-sm transition-colors hover:bg-[#fff5f3]";

export function HeroNavbar() {
  const email = useAuthStore((state) => state.email);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoggedIn = mounted && !!email;

  return (
    <header className="absolute inset-x-0 top-0 z-20 pt-5">
      <LandingContainer className="flex items-center justify-between">
        <VenuzeLogo href="/" height={33} />

        <nav className="flex items-center gap-2.5 sm:gap-3">
          <button type="button" className={navBtnClass}>
            List your venue
            <ChevronDown className="text-[#f05a45]/70" />
          </button>
          <button type="button" className={navBtnClass}>
            List your service
            <ChevronDown className="text-[#f05a45]/70" />
          </button>

          {isLoggedIn ? (
            <Link href="/dashboard" className={`${navBtnClass} !px-2.5`} aria-label="Dashboard">
              <UserIcon />
            </Link>
          ) : (
            <Link href="/login" className={navBtnClass}>
              Login
            </Link>
          )}
        </nav>
      </LandingContainer>
    </header>
  );
}
