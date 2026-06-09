import { cn } from "@/lib/utils/cn";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export function ProcessStep({ number, title, description, className }: ProcessStepProps) {
  return (
    <div className={cn("relative flex gap-5", className)}>
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f05a45] text-[15px] font-bold text-white">
        {number}
      </div>
      <div className="pt-0.5">
        <h3 className="text-[18px] font-bold leading-snug text-[#0a0a0a]">{title}</h3>
        <p className="mt-2 text-[15px] leading-[1.65] text-[#6b7280]">{description}</p>
      </div>
    </div>
  );
}
