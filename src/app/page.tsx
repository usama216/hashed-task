import { Destinations } from "@/components/landing/Destinations";
import { FooterCTA } from "@/components/landing/FooterCTA";
import { FeaturedVenues } from "@/components/landing/FeaturedVenues";
import { SiteFooter } from "@/components/landing/footer/SiteFooter";
import { HeroSection } from "@/components/landing/HeroSection";
import { SocialProof } from "@/components/landing/SocialProof";
import { TrustedVendors } from "@/components/landing/TrustedVendors";
import { VenueCategories } from "@/components/landing/VenueCategories";
import { VenuePath } from "@/components/landing/VenuePath";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen w-full bg-white">
        <HeroSection />
        <VenueCategories />
        <FeaturedVenues />
        <TrustedVendors />
        <VenuePath />
        <SocialProof />
        <Destinations />
      </main>
      <FooterCTA />
      <SiteFooter />
    </>
  );
}
