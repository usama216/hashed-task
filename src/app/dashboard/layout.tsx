import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-slate-50">
      <div className="bg-grid pointer-events-none fixed inset-0 opacity-25" aria-hidden />
      <div
        className="pointer-events-none fixed -right-24 top-0 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -left-16 bottom-0 h-64 w-64 rounded-full bg-brand-dark/5 blur-3xl"
        aria-hidden
      />
      <div className="relative">
        <DashboardHeader />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
