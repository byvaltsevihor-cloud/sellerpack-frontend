"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Zoom from "react-medium-image-zoom";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoomable from "yet-another-react-lightbox/plugins/zoom";
import { cn } from "@/lib/utils";
import { Package, ZoomIn, Expand } from "lucide-react";

// Simple blur placeholder (10x10 gray gradient)
const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjNmNGY2Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZTVlN2ViIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";

// Import styles
import "react-medium-image-zoom/dist/styles.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export type ImageType = "main" | "angle" | "macro" | "variant" | "context" | "case";

export interface GalleryImage {
  id: number;
  type: ImageType;
  sourceUrl: string;
  mediumUrl: string;
  thumbnailUrl: string;
  altText: string;
  width: number;
  height: number;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  productTitle: string;
  className?: string;
}

const imageTypeLabels: Record<ImageType, { uk: string; en: string }> = {
  main: { uk: "Основне", en: "Main" },
  angle: { uk: "Ракурс", en: "Angle" },
  macro: { uk: "Макро", en: "Macro" },
  variant: { uk: "Варіант", en: "Variant" },
  context: { uk: "Контекст", en: "Context" },
  case: { uk: "Кейс", en: "Case" },
};

const imageTypeBadgeColors: Record<ImageType, string> = {
  main: "bg-sellerpack-green text-white",
  angle: "bg-blue-500 text-white",
  macro: "bg-purple-500 text-white",
  variant: "bg-orange-500 text-white",
  context: "bg-teal-500 text-white",
  case: "bg-gray-600 text-white",
};

export function ProductGallery({ images, productTitle, className }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  // Subscribe to main carousel changes
  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, onSelect]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="relative aspect-square w-full bg-muted overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt="No image available"
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  const currentImage = images[selectedIndex];
  const isMacro = currentImage?.type === "macro";

  // Prepare slides for lightbox
  const lightboxSlides = images.map((img) => ({
    src: img.sourceUrl,
    alt: img.altText || productTitle,
    width: img.width || 1200,
    height: img.height || 1200,
  }));

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg bg-white" ref={mainRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative flex-[0_0_100%] min-w-0 aspect-square"
              >
                {image.type === "macro" ? (
                  // Macro images get inline zoom
                  <Zoom>
                    <Image
                      src={image.mediumUrl || image.sourceUrl}
                      alt={image.altText || `${productTitle} - ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </Zoom>
                ) : (
                  // Other images - clickable for lightbox
                  <button
                    onClick={() => openLightbox(index)}
                    className="w-full h-full relative group cursor-zoom-in"
                  >
                    <Image
                      src={image.mediumUrl || image.sourceUrl}
                      alt={image.altText || `${productTitle} - ${index + 1}`}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-lg">
                        <Expand className="w-5 h-5 text-gray-700" />
                      </span>
                    </div>
                  </button>
                )}

                {/* Image type badge */}
                <div
                  className={cn(
                    "absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium",
                    imageTypeBadgeColors[image.type]
                  )}
                >
                  {imageTypeLabels[image.type].uk}
                  {image.type === "macro" && (
                    <ZoomIn className="w-3 h-3 inline-block ml-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => mainApi?.scrollPrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => mainApi?.scrollNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="overflow-hidden" ref={thumbRef}>
          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => onThumbClick(index)}
                className={cn(
                  "relative flex-[0_0_auto] w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all",
                  selectedIndex === index
                    ? "border-sellerpack-green ring-2 ring-sellerpack-green/30"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <Image
                  src={image.thumbnailUrl || image.mediumUrl}
                  alt={image.altText || `Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
                {/* Mini type indicator */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 text-[9px] text-center py-0.5 font-medium",
                    imageTypeBadgeColors[image.type]
                  )}
                >
                  {imageTypeLabels[image.type].uk}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hint for macro images */}
      {isMacro && (
        <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
          <ZoomIn className="w-3 h-3" />
          Клікніть на зображення для збільшення текстури
        </p>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Thumbnails, Zoomable]}
        thumbnails={{
          position: "bottom",
          width: 80,
          height: 80,
          gap: 8,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        carousel={{
          finite: images.length <= 3,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        }}
      />
    </div>
  );
}

// Simpler gallery for when only featured image exists (fallback)
interface SimpleFallbackGalleryProps {
  featuredImage: {
    sourceUrl: string;
    altText?: string;
  } | null;
  productTitle: string;
  className?: string;
}

export function SimpleFallbackGallery({
  featuredImage,
  productTitle,
  className
}: SimpleFallbackGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!featuredImage?.sourceUrl) {
    return (
      <div className={cn("aspect-square w-full bg-muted overflow-hidden relative", className)}>
        <Image
          src="/placeholder.svg"
          alt="No image available"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <button
        onClick={() => setLightboxOpen(true)}
        className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden group cursor-zoom-in"
      >
        <Image
          src={featuredImage.sourceUrl}
          alt={featuredImage.altText || productTitle}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-lg">
            <Expand className="w-5 h-5 text-gray-700" />
          </span>
        </div>
      </button>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{
          src: featuredImage.sourceUrl,
          alt: featuredImage.altText || productTitle
        }]}
        plugins={[Zoomable]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        }}
      />
    </div>
  );
}
