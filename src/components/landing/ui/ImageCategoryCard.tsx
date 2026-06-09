import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ImageCategoryCardProps {
  title: string;
  image?: string;
  imageAlt?: string;
  placeholderGradient?: string;
  className?: string;
}

export function ImageCategoryCard({
  title,
  image,
  imageAlt,
  placeholderGradient = "from-[#9ca3af] to-[#6b7280]",
  className,
}: ImageCategoryCardProps) {
  return (
    <article
      data-carousel-card
      className={cn(
        "group relative h-[380px] w-[285px] shrink-0 snap-start overflow-hidden rounded-[20px] sm:h-[400px] sm:w-[295px]",
        className,
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          unoptimized={image.endsWith(".svg")}
          sizes="295px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br", placeholderGradient)} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <h3 className="absolute bottom-6 left-5 right-5 text-[20px] font-semibold leading-tight text-white">
        {title}
      </h3>
    </article>
  );
}
