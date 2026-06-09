import { ImageCollage } from "./ui/ImageCollage";
import { LandingContainer } from "./ui/LandingContainer";
import { ProcessSteps } from "./ui/ProcessSteps";
import { SectionHeader } from "./ui/SectionHeader";

const collageImages = [
  {
    alt: "Guest taking a photo at an event",
    placeholderGradient: "from-[#fca5a5] to-[#b91c1c]",
  },
  {
    alt: "Woman dancing at a celebration",
    placeholderGradient: "from-[#fdba74] to-[#ea580c]",
  },
  {
    alt: "Couple exchanging a gift",
    placeholderGradient: "from-[#f9a8d4] to-[#db2777]",
  },
  {
    alt: "Team hands stacked together",
    placeholderGradient: "from-[#86efac] to-[#16a34a]",
  },
];

const steps = [
  {
    title: "Search & filter",
    description:
      "Browse our curated collection of venues and event professionals. Use smart filters, high-quality visuals, and authentic reviews to find options that fit your needs, style, and budget.",
  },
  {
    title: "Compare & message",
    description:
      "Communicate directly with venue hosts and service providers. Request tailored quotes, discuss requirements, and design every detail of your event or project with confidence.",
  },
  {
    title: "Book & add services",
    description:
      "Secure your choices with ease through our protected booking system. With clear agreements, secure payments, and ongoing support, you can move forward knowing everything is handled.",
  },
];

export function VenuePath() {
  return (
    <section className="w-full bg-white py-[72px]">
      <LandingContainer>
        <SectionHeader
          title="Your Path to the Perfect Venue"
          subtitle="Planning an event, production, or gathering shouldn't feel complicated. Our streamlined process connects you with the right venues and trusted professionals, taking the stress out of logistics so you can focus on what matters most making it a success."
          subtitleClassName="max-w-[760px] text-[#4b5563]"
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ImageCollage images={collageImages} />
          <ProcessSteps steps={steps} />
        </div>
      </LandingContainer>
    </section>
  );
}
