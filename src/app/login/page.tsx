import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex h-dvh min-h-screen w-full">
      <div className="relative hidden w-[45%] shrink-0 flex-col justify-between bg-brand-dark p-10 lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-xs font-bold text-white">
            HS
          </div>
          <span className="text-sm font-medium text-brand-light">Hashed System</span>
        </div>

        <div>
          <h1 className="max-w-xs text-3xl font-semibold leading-snug tracking-tight text-white">
            Manage your team in one place
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-muted">
            Track users, roles, and activity from a single dashboard.
          </p>
        </div>

        <p></p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center bg-brand-light/30 px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-dark text-xs font-bold text-white">
                HS
              </div>
              <span className="text-sm font-medium text-brand-dark">Hashed System</span>
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
