import { cn } from "@/lib/utils/cn";

interface LandingContainerProps {
  children: React.ReactNode;
  className?: string;
  outerClassName?: string;
}

export const landingContainerClass = "landing-container w-[90%] shrink-0";

export function LandingContainer({
  children,
  className,
  outerClassName,
}: LandingContainerProps) {
  return (
    <div className={cn("flex w-full justify-center", outerClassName)}>
      <div className={cn(landingContainerClass, className)}>{children}</div>
    </div>
  );
}
