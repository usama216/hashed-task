import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-[720px] text-center", className)}>
      <h2
        className={cn(
          "text-[40px] font-bold leading-[1.15] tracking-[-0.02em] text-[#0a0a0a]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mx-auto mt-5 max-w-[640px] text-[16px] leading-[1.65] text-[#6b7280]",
          subtitleClassName,
        )}
      >
        {subtitle}
      </p>
    </div>
  );
}
