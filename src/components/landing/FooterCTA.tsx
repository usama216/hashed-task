import { CTABanner } from "./ui/CTABanner";
import { LandingContainer } from "./ui/LandingContainer";

export function FooterCTA() {
  return (
    <section className="relative z-20 w-full bg-white pt-10">
      <LandingContainer className="relative -mb-20 sm:-mb-24">
        <CTABanner
          title="Turn Your Venue into a Destination"
          description="List your space on Venuze and unlock new revenue opportunities. Reach clients looking for venues just like yours."
          buttonText="List Your Venue"
          imageSrc="/assets/CTA/CTA-image.svg"
        />
      </LandingContainer>
    </section>
  );
}
