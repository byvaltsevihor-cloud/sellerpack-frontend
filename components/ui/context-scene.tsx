"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SceneType = "office" | "warehouse" | "reception" | "conference" | "retail" | "industrial";

interface ContextSceneProps {
  src: string;
  alt: string;
  sceneType?: SceneType;
  title?: string;
  subtitle?: string;
  href?: string;
  overlay?: "light" | "dark" | "gradient" | "none";
  className?: string;
}

const sceneTypeLabels: Record<SceneType, string> = {
  office: "Офіс",
  warehouse: "Склад",
  reception: "Ресепшн",
  conference: "Конференц-зала",
  retail: "Роздрібна торгівля",
  industrial: "Виробництво",
};

export function ContextScene({
  src,
  alt,
  sceneType,
  title,
  subtitle,
  href,
  overlay = "gradient",
  className,
}: ContextSceneProps) {
  const content = (
    <div
      className={cn(
        "context-scene group relative",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-400 ease-smooth group-hover:scale-105"
        sizes="100vw"
      />

      {/* Overlay variations */}
      {overlay === "light" && (
        <div className="absolute inset-0 bg-white/20" />
      )}
      {overlay === "dark" && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      {overlay === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}

      {/* Scene type badge */}
      {sceneType && (
        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-white/90 text-foreground rounded backdrop-blur-sm z-10">
          {sceneTypeLabels[sceneType]}
        </span>
      )}

      {/* Title and subtitle */}
      {(title || subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {subtitle && (
            <p className="text-sm text-white/80 mb-1">{subtitle}</p>
          )}
          {title && (
            <h3 className="text-xl md:text-2xl font-semibold text-white">
              {title}
            </h3>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

interface ContextSceneHeroProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function ContextSceneHero({
  src,
  alt,
  title,
  subtitle,
  ctaText,
  ctaHref,
  className,
}: ContextSceneHeroProps) {
  return (
    <div className={cn("relative aspect-hero w-full overflow-hidden rounded-sm", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-xl">
            {subtitle && (
              <p className="text-sm md:text-base text-white/80 mb-3 uppercase tracking-wider">
                {subtitle}
              </p>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-sellerpack-green text-white font-medium rounded hover:bg-sellerpack-green-dark transition-colors duration-250"
              >
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContextSceneGridProps {
  scenes: {
    src: string;
    alt: string;
    sceneType?: SceneType;
    title?: string;
    href?: string;
  }[];
  className?: string;
}

export function ContextSceneGrid({ scenes, className }: ContextSceneGridProps) {
  if (scenes.length === 0) return null;

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {scenes.map((scene, index) => (
        <ContextScene
          key={index}
          src={scene.src}
          alt={scene.alt}
          sceneType={scene.sceneType}
          title={scene.title}
          href={scene.href}
          className="aspect-category"
        />
      ))}
    </div>
  );
}

interface ContextSceneBentoProps {
  mainScene: {
    src: string;
    alt: string;
    title: string;
    subtitle?: string;
    href?: string;
  };
  sideScenes: {
    src: string;
    alt: string;
    title?: string;
    href?: string;
  }[];
  className?: string;
}

export function ContextSceneBento({ mainScene, sideScenes, className }: ContextSceneBentoProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {/* Main large scene */}
      <ContextScene
        src={mainScene.src}
        alt={mainScene.alt}
        title={mainScene.title}
        subtitle={mainScene.subtitle}
        href={mainScene.href}
        className="aspect-square md:aspect-auto md:row-span-2"
      />

      {/* Side scenes */}
      <div className="grid grid-cols-2 gap-4">
        {sideScenes.slice(0, 4).map((scene, index) => (
          <ContextScene
            key={index}
            src={scene.src}
            alt={scene.alt}
            title={scene.title}
            href={scene.href}
            className="aspect-square"
            overlay="dark"
          />
        ))}
      </div>
    </div>
  );
}
