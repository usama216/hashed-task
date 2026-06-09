import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick?: () => void;
  illustration?: React.ReactNode;
  imageSrc?: string;
  className?: string;
}





function BannerIllustration({
  illustration,
  imageSrc,
  className,
}: {
  illustration?: React.ReactNode;
  imageSrc?: string;
  className?: string;
}) {
  if (illustration) {
    return <div className={className}>{illustration}</div>;
  }

  if (imageSrc) {
    return (
      <div className={className}>
        <Image
          src={imageSrc}
          alt=""
          width={447}
          height={204}
          unoptimized={imageSrc.endsWith(".svg")}
          className="h-auto w-full max-w-[380px] object-contain object-bottom"
        />
      </div>
    );
  }
}

export function CTABanner({
  title,
  description,
  buttonText,
  onButtonClick,
  illustration,
  imageSrc,
  className,
}: CTABannerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] bg-gradient-to-r from-[#f05a45] via-[#f07838] to-[#f5b942] lg:min-h-[220px]",
        className,
      )}
    >
      <div className="relative z-10 px-8 py-8 sm:px-10 sm:py-9 lg:px-12 lg:py-10 lg:pr-[42%]">
        <div className="relative max-w-[460px] text-left">
          <h3 className="text-[28px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[34px]">
            {title}
          </h3>
          <p className="mt-2 max-w-[500px] text-[14px] leading-[1.6] text-white sm:text-[15px]">
            {description}
          </p>

          <button
            type="button"
            onClick={onButtonClick}
            className="relative z-10 mt-5 rounded-[10px] bg-black px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1a1a1a]"
          >
            {buttonText}
          </button>
        </div>
      </div>

      <BannerIllustration
        illustration={illustration}
        imageSrc={imageSrc}
        className="mt-6 flex justify-center px-6 pb-6 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[42%] lg:max-w-[400px] lg:justify-end lg:px-0 lg:pb-0 lg:pr-5"
      />
    </div>
  );
}
