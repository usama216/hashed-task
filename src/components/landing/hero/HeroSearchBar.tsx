"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";
import { HeroSearchField, type HeroSearchOption } from "./HeroSearchField";

type SearchTab = "venue" | "vendors";
type FieldKey = "where" | "when" | "third";

const locationOptions: HeroSearchOption[] = [
  { value: "dubai", label: "Dubai, UAE" },
  { value: "abu-dhabi", label: "Abu Dhabi, UAE" },
  { value: "new-york", label: "New York, USA" },
  { value: "london", label: "London, UK" },
  { value: "paris", label: "Paris, FR" },
  { value: "singapore", label: "Singapore" },
];

const whenOptions: HeroSearchOption[] = [
  { value: "anytime", label: "Anytime" },
  { value: "today", label: "Today" },
  { value: "this-weekend", label: "This Weekend" },
  { value: "next-week", label: "Next Week" },
  { value: "next-month", label: "Next Month" },
  { value: "custom", label: "Pick a date" },
];

const guestOptions: HeroSearchOption[] = [
  { value: "any", label: "Any" },
  { value: "1-10", label: "1-10" },
  { value: "10-20", label: "10-20" },
  { value: "20-50", label: "20-50" },
  { value: "50-100", label: "50-100" },
  { value: "100+", label: "100+" },
];

const serviceOptions: HeroSearchOption[] = [
  { value: "any", label: "All Services" },
  { value: "caterers", label: "Caterers" },
  { value: "decorators", label: "Decorators" },
  { value: "photographers", label: "Photographers" },
  { value: "entertainment", label: "Entertainment" },
  { value: "florists", label: "Florists" },
];

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function getLabel(options: HeroSearchOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function HeroSearchBar() {
  const [tab, setTab] = useState<SearchTab>("venue");
  const [where, setWhere] = useState("dubai");
  const [when, setWhen] = useState("anytime");
  const [guests, setGuests] = useState("10-20");
  const [service, setService] = useState("any");
  const [openField, setOpenField] = useState<FieldKey | null>(null);

  const handleSearch = () => {
    setOpenField(null);
    const location = getLabel(locationOptions, where);
    const date = getLabel(whenOptions, when);
    const third =
      tab === "venue"
        ? getLabel(guestOptions, guests)
        : getLabel(serviceOptions, service);

    toast.success(
      tab === "venue"
        ? `Searching venues in ${location} for ${third} guests (${date})`
        : `Searching ${third} in ${location} (${date})`,
    );

    const target = tab === "venue" ? "featured-venues" : "trusted-vendors";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const thirdField =
    tab === "venue"
      ? {
          label: "Guests",
          value: guests,
          options: guestOptions,
          onChange: setGuests,
        }
      : {
          label: "Service",
          value: service,
          options: serviceOptions,
          onChange: setService,
        };

  return (
    <div className="relative mx-auto w-full max-w-[900px]">
      <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[62%]">
        <div className="flex rounded-full bg-white p-1 shadow-md">
          <button
            type="button"
            onClick={() => {
              setTab("venue");
              setOpenField(null);
            }}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
              tab === "venue" ? "bg-[#f05a45] text-white" : "text-[#374151] hover:text-[#111827]",
            )}
          >
            Venue
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("vendors");
              setOpenField(null);
            }}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
              tab === "vendors" ? "bg-[#f05a45] text-white" : "text-[#374151] hover:text-[#111827]",
            )}
          >
            Vendors
          </button>
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
        className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
      >
        <div className="flex flex-col pt-5 sm:flex-row sm:items-stretch sm:pt-0">
          <div className="flex flex-1 flex-col divide-y divide-[#f3f4f6] sm:flex-row sm:divide-x sm:divide-y-0">
            <HeroSearchField
              label="Where"
              value={where}
              options={locationOptions}
              isOpen={openField === "where"}
              onOpen={() => setOpenField("where")}
              onClose={() => setOpenField(null)}
              onChange={setWhere}
            />
            <HeroSearchField
              label="When"
              value={when}
              options={whenOptions}
              isOpen={openField === "when"}
              onOpen={() => setOpenField("when")}
              onClose={() => setOpenField(null)}
              onChange={setWhen}
            />
            <HeroSearchField
              label={thirdField.label}
              value={thirdField.value}
              options={thirdField.options}
              isOpen={openField === "third"}
              onOpen={() => setOpenField("third")}
              onClose={() => setOpenField(null)}
              onChange={thirdField.onChange}
            />
          </div>
          <button
            type="submit"
            className="m-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#f05a45] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#e04f3c] sm:m-2 sm:px-8"
          >
            <SearchIcon />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
