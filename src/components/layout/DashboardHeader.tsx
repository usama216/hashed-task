"use client";

import { Button } from "@/components/ui/Button";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";

export function DashboardHeader() {
  const email = useAuthStore((state) => state.email);
  const { logoutUser, isLoading } = useLogout();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <h1 className="font-semibold text-slate-900">Dashboard</h1>

        <div className="flex items-center gap-3">
      
          <Button variant="secondary" size="sm" onClick={() => logoutUser()} loading={isLoading}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
