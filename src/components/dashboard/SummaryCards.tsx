"use client";

import { getDashboardStats } from "@/lib/utils/userStats";
import { useUsers } from "@/hooks/useUsers";
import { CardSkeleton } from "@/components/ui/Skeleton";

const labels = {
  total: "Total",
  active: "Active",
  inactive: "Inactive",
  newUsers: "New",
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

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {(Object.keys(labels) as Array<keyof typeof labels>).map((key) => (
        <div key={key} className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">{labels[key]}</p>
          <p className="mt-1 text-2xl font-semibold">{stats[key]}</p>
        </div>
      ))}
    </div>
  );
}
