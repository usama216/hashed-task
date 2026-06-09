import { LoginForm } from "@/components/auth/LoginForm";
import { VenuzeLogo } from "@/components/ui/VenuzeLogo";

export default function LoginPage() {
  return (
    <main className="flex h-dvh min-h-screen w-full">
      <div className="relative hidden w-[45%] shrink-0 flex-col justify-between overflow-hidden bg-brand-dark p-10 lg:flex">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-brand-muted/15 blur-3xl" />

        <VenuzeLogo href="/" height={33} />

        <div className="relative">
          <h1 className="max-w-xs text-3xl font-semibold leading-snug tracking-tight text-white">
            Find and manage venues in one place
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            Sign in to access your dashboard and manage your team.
          </p>
        </div>

        <p className="relative text-xs text-white/30">© venuze</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center bg-slate-50 px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="mb-6">
              <VenuzeLogo href="/" height={30} onLight />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-brand-dark">Sign in</h2>
            <p className="mt-1.5 text-sm text-zinc-500">Enter your credentials to continue</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
