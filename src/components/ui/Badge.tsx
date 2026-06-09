import { cn } from "@/lib/utils/cn";

type BadgeVariant =
  | "active"
  | "inactive"
  | "admin"
  | "editor"
  | "member"
  | "neutral";

const variants: Record<BadgeVariant, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  inactive: "bg-zinc-100 text-zinc-500 ring-zinc-400/15",
  admin: "bg-brand-dark text-white ring-brand-dark/20",
  editor: "bg-brand-light text-brand ring-brand/25",
  member: "bg-zinc-100 text-brand-dark/80 ring-brand-dark/10",
  neutral: "bg-zinc-100 text-zinc-600 ring-zinc-500/15",
};

const dots: Partial<Record<BadgeVariant, string>> = {
  active: "bg-emerald-500",
  inactive: "bg-zinc-400",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ variant = "neutral", children, className, dot }: BadgeProps) {
  const showDot = dot && dots[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ring-1 ring-inset",
        variants[variant],
        className,
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dots[variant])} />}
      {children}
    </span>
  );
}
