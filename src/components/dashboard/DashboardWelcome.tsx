"use client";

import { useAuthStore } from "@/stores/authStore";
import { useUsers } from "@/hooks/useUsers";
import { getDashboardStats } from "@/lib/utils/userStats";

export function DashboardWelcome() {
  const email = useAuthStore((state) => state.email);
  const { users, isLoading } = useUsers();
  const stats = isLoading ? null : getDashboardStats(users);

  const name = email?.split("@")[0] ?? "there";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-dark px-6 py-6 sm:px-8 sm:py-7">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/35 via-transparent to-brand-muted/25" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-1/3 h-28 w-28 rounded-full bg-brand-muted/20 blur-2xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-brand-muted">
            Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Hey, {name}
          </h1>
          <p className="mt-2 max-w-md text-sm text-brand-light/80">
            {stats
              ? `You have ${stats.total} users — ${stats.active} active right now.`
              : "Loading your team overview..."}
          </p>
        </div>

        {!isLoading && stats && (
          <div className="flex gap-6 sm:gap-8">
            <div className="text-center sm:text-right">
              <p className="text-2xl font-semibold tabular-nums text-white">{stats.active}</p>
              <p className="text-xs text-brand-muted">Active</p>
            </div>
            <div className="hidden h-10 w-px bg-white/15 sm:block" />
            <div className="text-center sm:text-right">
              <p className="text-2xl font-semibold tabular-nums text-brand">{stats.newUsers}</p>
              <p className="text-xs text-brand-muted">New</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
