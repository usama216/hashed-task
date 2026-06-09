import { cn } from "@/lib/utils/cn";

interface StatCardProps {
  value: string;
  label: string;
  bgClass: string;
  variant?: "light" | "dark";
  className?: string;
}

export function StatCard({
  value,
  label,
  bgClass,
  variant = "light",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[16px] px-4 py-9 text-center",
        bgClass,
        className,
      )}
    >
      <p
        className={cn(
          "text-[36px] font-bold leading-none tracking-tight",
          variant === "light" ? "text-white" : "text-[#0a0a0a]",
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-3 text-[13px] font-medium leading-snug",
          variant === "light" ? "text-white/95" : "text-[#374151]",
        )}
      >
        {label}
      </p>
    </div>
  );
}
