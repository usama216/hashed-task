import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold">Login</h1>
        <p className="mb-6 text-sm text-slate-500">User management dashboard</p>
        <LoginForm />
      </div>
    </main>
  );
}
