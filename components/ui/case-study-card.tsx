"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  description: string;
  image: string;
  client?: string;
  category?: string;
  href: string;
  className?: string;
}

export function CaseStudyCard({
  title,
  description,
  image,
  client,
  category,
  href,
  className,
}: CaseStudyCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "case-study-card group block",
        className
      )}
    >
      {/* Image container */}
      <div className="relative aspect-category overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-400 ease-smooth group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Category badge */}
        {category && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-white/90 text-foreground rounded backdrop-blur-sm">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {client && (
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {client}
          </p>
        )}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-sellerpack-green transition-colors duration-250">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>

        {/* Read more link */}
        <span className="inline-flex items-center gap-2 text-sm font-medium text-sellerpack-green">
          Детальніше
          <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

interface CaseStudyGridProps {
  cases: {
    title: string;
    description: string;
    image: string;
    client?: string;
    category?: string;
    href: string;
  }[];
  className?: string;
}

export function CaseStudyGrid({ cases, className }: CaseStudyGridProps) {
  if (cases.length === 0) return null;

  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      className
    )}>
      {cases.map((caseItem, index) => (
        <CaseStudyCard key={index} {...caseItem} />
      ))}
    </div>
  );
}

interface CaseStudyFeaturedProps {
  title: string;
  description: string;
  image: string;
  client?: string;
  category?: string;
  href: string;
  features?: string[];
  className?: string;
}

export function CaseStudyFeatured({
  title,
  description,
  image,
  client,
  category,
  href,
  features,
  className,
}: CaseStudyFeaturedProps) {
  return (
    <div className={cn("case-study-card group", className)}>
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative aspect-square md:aspect-auto overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-400 ease-smooth group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {category && (
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-white/90 text-foreground rounded backdrop-blur-sm">
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          {client && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              {client}
            </p>
          )}
          <h3 className="text-2xl font-semibold text-foreground mb-3">
            {title}
          </h3>
          <p className="text-muted-foreground mb-6">
            {description}
          </p>

          {features && features.length > 0 && (
            <ul className="space-y-2 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 bg-sellerpack-green rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-sellerpack-green hover:text-sellerpack-green-dark transition-colors duration-250"
          >
            Переглянути кейс
            <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
