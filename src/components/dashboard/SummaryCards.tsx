"use client";

import { getDashboardStats } from "@/lib/utils/userStats";
import { useUsers } from "@/hooks/useUsers";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 17c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 17c0-1.657 1.567-3 3.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7.5v5M12 7.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2v3M10 15v3M2 10h3M15 10h3M4.93 4.93l2.12 2.12M12.95 12.95l2.12 2.12M4.93 15.07l2.12-2.12M12.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const config = {
  total: {
    label: "Total users",
    accent: "text-brand-dark",
    iconBg: "bg-brand-dark/10",
    iconColor: "text-brand-dark",
    Icon: UsersIcon,
  },
  active: {
    label: "Active",
    accent: "text-brand",
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    Icon: CheckIcon,
  },
  inactive: {
    label: "Inactive",
    accent: "text-brand-muted",
    iconBg: "bg-brand-muted/15",
    iconColor: "text-brand-muted",
    Icon: PauseIcon,
  },
  newUsers: {
    label: "New this week",
    accent: "text-brand-dark",
    iconBg: "bg-gradient-to-br from-brand-dark/10 to-brand/10",
    iconColor: "text-brand",
    Icon: SparkIcon,
  },
} as const;

export function SummaryCards() {
  const { users, isLoading, isError } = useUsers();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-sm text-red-600">Stats failed to load.</p>;
  }

  const stats = getDashboardStats(users);
  const keys = Object.keys(config) as Array<keyof typeof config>;
  const delays = ["stagger-1", "stagger-2", "stagger-3", "stagger-4"] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {keys.map((key, i) => {
        const { Icon, label, accent, iconBg, iconColor } = config[key];

        return (
          <div
            key={key}
            className={cn(
              "animate-fade-up group relative overflow-hidden rounded-2xl border border-brand-light bg-white p-5 shadow-sm shadow-brand-dark/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md hover:shadow-brand/10",
              delays[i],
            )}
          >
            <div className="flex items-start justify-between">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", iconBg)}>
                <Icon className={iconColor} />
              </div>
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-zinc-400">
              {label}
            </p>
            <p className={cn("mt-1 text-3xl font-semibold tabular-nums tracking-tight", accent)}>
              {stats[key]}
            </p>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand transition-all duration-300 group-hover:w-full" />
          </div>
        );
      })}
    </div>
  );
}
