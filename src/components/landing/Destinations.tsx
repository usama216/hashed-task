import { LandingContainer } from "./ui/LandingContainer";
import { DestinationCard } from "./ui/DestinationCard";
import { SectionHeader } from "./ui/SectionHeader";

const destinations = [
  {
    city: "New York, USA",
    venueCount: 24,
    tagline: "Coastal energy, modern Venue",
    popular: "Rooftop",
    priceFrom: 50,
    image: "/assets/Destinations/destination-1.svg",
  },
  {
    city: "London, UK",
    venueCount: 108,
    tagline: "Historic charm by the Thames",
    popular: "Ballroom",
    priceFrom: 25,
    image: "/assets/Destinations/destination-2.svg",
  },
  {
    city: "Dubai, UAE",
    venueCount: 17,
    tagline: "Luxury settings by the sea",
    popular: "Rooftop",
    priceFrom: 50,
    image: "/assets/Destinations/destination-3.svg",
  },
];

export function Destinations() {
  return (
    <section className="w-full bg-white py-[72px]">
      <LandingContainer>
        <SectionHeader
          title="Discover Exceptional Destinations Across the Region"
          subtitle="From cosmopolitan cityscapes to cultural treasures, explore where celebrations come alive with local flavor."
          subtitleClassName="text-[#4b5563]"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.city} {...destination} />
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}
