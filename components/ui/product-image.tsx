"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export type ImageType = "main" | "angle" | "macro" | "variant" | "context" | "case";

interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  type?: ImageType;
  showBadge?: boolean;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  enableZoom?: boolean;
  enable3D?: boolean;
  blurDataURL?: string;
}

const imageTypeLabels: Record<ImageType, string> = {
  main: "Основне",
  angle: "Ракурс",
  macro: "Макро",
  variant: "Варіант",
  context: "Контекст",
  case: "Кейс",
};

export function ProductImage({
  src,
  alt,
  width,
  height,
  type = "main",
  showBadge = false,
  priority = false,
  fill = false,
  className,
  containerClassName,
  enableZoom = true,
  enable3D = false,
  blurDataURL,
}: ProductImageProps) {
  return (
    <div
      className={cn(
        "product-image-container",
        enableZoom && "image-zoom-container",
        enable3D && "product-image-3d",
        containerClassName
      )}
    >
      {showBadge && type && (
        <span className="image-type-badge">{imageTypeLabels[type]}</span>
      )}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-contain", className)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 400}
          height={height || 300}
          priority={priority}
          className={cn("object-contain", className)}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
        />
      )}
    </div>
  );
}

interface ProductImageGridProps {
  images: {
    src: string;
    alt: string;
    type?: ImageType;
  }[];
  className?: string;
}

export function ProductImageGrid({ images, className }: ProductImageGridProps) {
  if (images.length === 0) return null;

  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);

  return (
    <div className={cn("grid gap-4", className)}>
      {/* Main large image */}
      <div className="aspect-product-square w-full">
        <ProductImage
          src={mainImage.src}
          alt={mainImage.alt}
          type={mainImage.type || "main"}
          fill
          priority
          enable3D
          containerClassName="w-full h-full"
        />
      </div>

      {/* Thumbnail grid */}
      {thumbnails.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {thumbnails.map((img, index) => (
            <div key={index} className="aspect-square">
              <ProductImage
                src={img.src}
                alt={img.alt}
                type={img.type}
                showBadge
                fill
                containerClassName="w-full h-full cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
