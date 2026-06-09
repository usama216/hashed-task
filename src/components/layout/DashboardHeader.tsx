"use client";

import { Button } from "@/components/ui/Button";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

export function DashboardHeader() {
  const email = useAuthStore((state) => state.email);
  const { logoutUser, isLoading } = useLogout();

  const initial = email ? email.charAt(0).toUpperCase() : "?";

  return (
    <header className="sticky top-0 z-40 border-b border-brand-light bg-white/90 shadow-sm shadow-brand-dark/5 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm font-semibold tracking-tight text-brand-dark">Dashboard</p>

        <div className="flex items-center gap-2 sm:gap-3">
          {email && (
            <div className="hidden items-center gap-2 rounded-full border border-brand/20 bg-brand-light py-1 pl-1 pr-3 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                {initial}
              </div>
              <span className="max-w-[160px] truncate text-xs text-brand-dark">{email}</span>
            </div>
          )}
          <Button variant="secondary" size="sm" onClick={() => logoutUser()} loading={isLoading}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
