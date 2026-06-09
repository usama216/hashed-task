import { LandingContainer } from "../ui/LandingContainer";
import { FooterContactForm } from "./FooterContactForm";
import { FooterLinkColumn } from "./FooterLinkColumn";
import { FooterLogo } from "./FooterLogo";
import { FooterSocial } from "./FooterSocial";

const linkColumns = [
  {
    title: "Venuze",
    links: [
      { label: "About", href: "#" },
      { label: "News", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Investors", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Listings your venue", href: "#" },
      { label: "Listing your service", href: "#" },
      { label: "Help center", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Venue types", href: "#" },
      { label: "Venue features", href: "#" },
      { label: "Service options", href: "#" },
      { label: "Locations", href: "#" },
    ],
  },
  {
    title: "Legal & Privacy",
    links: [
      { label: "Terms of service", href: "#" },
      { label: "Payment & refund policy", href: "#" },
      { label: "Host agreement", href: "#" },
      { label: "Vendor agreement", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 w-full overflow-hidden rounded-t-[28px] bg-black text-white sm:rounded-t-[32px]">
      <LandingContainer className="pb-12 pt-40 sm:pb-14 sm:pt-52">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <FooterLogo />
              <p className="max-w-[520px] text-[22px] font-bold leading-[1.35] tracking-[-0.01em] text-white sm:text-[24px]">
                Make it memorable—book the perfect venue and the pros who make it shine.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
              {linkColumns.map((column) => (
                <FooterLinkColumn key={column.title} title={column.title} links={column.links} />
              ))}
            </div>
          </div>

          <FooterContactForm />
        </div>
      </LandingContainer>

      <div className="border-t border-[#2a2a2a]">
        <LandingContainer className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <FooterSocial />
          <p className="text-[13px] text-[#a1a1a1]">© 2026 Venuze. All rights reserved.</p>
        </LandingContainer>
      </div>
    </footer>
  );
}
