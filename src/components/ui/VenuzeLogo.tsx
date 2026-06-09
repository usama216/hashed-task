import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const LOGO_ASPECT = 188 / 33;

interface VenuzeLogoProps {
  height?: number;
  className?: string;
  href?: string;
  /** Dark backdrop so the white wordmark stays visible on light backgrounds */
  onLight?: boolean;
}

export function VenuzeLogo({ height = 33, className, href = "/", onLight }: VenuzeLogoProps) {
  const width = Math.round(height * LOGO_ASPECT);

  const image = (
    <img
      src="/logo.svg"
      alt="venuze"
      width={width}
      height={height}
      className={cn("block shrink-0", className)}
    />
  );

  const content = onLight ? (
    <span className="inline-flex items-center rounded-lg bg-brand-dark px-3 py-2">{image}</span>
  ) : (
    image
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0">{content}</span>;
}
