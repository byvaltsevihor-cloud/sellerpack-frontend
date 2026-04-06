"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Package,
  ArrowRight,
  Gift,
  Tag,
  Ribbon,
  Shield,
  Star,
  Layers,
  Box,
  CircleDot,
  Sticker,
  type LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";

// Category icon mapping based on slug
const categoryIcons: Record<string, LucideIcon> = {
  // Ukrainian slugs
  "labels": Tag,
  "tapes": Ribbon,
  "security-labels": Shield,
  "special-labels": Star,
  // Common slugs
  "etiketky": Tag,
  "strichky": Ribbon,
  "bezpekovi-etiketky": Shield,
  "specialni-etiketky": Star,
  // Fallback patterns
  "sticker": Sticker,
  "packaging": Box,
  "holographic": CircleDot,
  "custom": Layers,
};

// Get icon for category based on slug
function getCategoryIcon(slug: string): LucideIcon {
  // Direct match
  if (categoryIcons[slug]) {
    return categoryIcons[slug];
  }

  // Pattern matching for common keywords
  const lowerSlug = slug.toLowerCase();
  if (lowerSlug.includes("label") || lowerSlug.includes("etiket")) return Tag;
  if (lowerSlug.includes("tape") || lowerSlug.includes("strich") || lowerSlug.includes("ribbon")) return Ribbon;
  if (lowerSlug.includes("security") || lowerSlug.includes("bezpek") || lowerSlug.includes("holograph")) return Shield;
  if (lowerSlug.includes("special") || lowerSlug.includes("special")) return Star;
  if (lowerSlug.includes("pack") || lowerSlug.includes("box")) return Box;

  // Default icon
  return Package;
}

// Category-specific promo content
interface CategoryPromo {
  title: { uk: string; en: string };
  description: { uk: string; en: string };
  discount?: string;
  badge?: { uk: string; en: string };
  color: string;
}

const categoryPromos: Record<string, CategoryPromo> = {
  "labels": {
    title: { uk: "Етикетки на замовлення", en: "Custom Labels" },
    description: { uk: "Від 1000 шт. з безкоштовною доставкою", en: "From 1000 pcs with free shipping" },
    discount: "-15%",
    badge: { uk: "Популярне", en: "Popular" },
    color: "from-blue-500/20 to-blue-600/30",
  },
  "tapes": {
    title: { uk: "Брендовані стрічки", en: "Branded Tapes" },
    description: { uk: "Друк логотипу до 4 кольорів", en: "Logo print up to 4 colors" },
    discount: "-10%",
    badge: { uk: "Новинка", en: "New" },
    color: "from-amber-500/20 to-amber-600/30",
  },
  "security-labels": {
    title: { uk: "Захист від підробок", en: "Anti-Counterfeit" },
    description: { uk: "Голограми та VOID етикетки", en: "Holograms & VOID labels" },
    badge: { uk: "Безпека", en: "Security" },
    color: "from-red-500/20 to-red-600/30",
  },
  "special-labels": {
    title: { uk: "Унікальні рішення", en: "Unique Solutions" },
    description: { uk: "Фольгування, тиснення, УФ-лак", en: "Foil, embossing, UV coating" },
    discount: "-20%",
    badge: { uk: "Преміум", en: "Premium" },
    color: "from-purple-500/20 to-purple-600/30",
  },
};

// Get promo for category
function getCategoryPromo(slug: string | null): CategoryPromo | null {
  if (!slug) return null;

  // Direct match
  if (categoryPromos[slug]) {
    return categoryPromos[slug];
  }

  // Pattern matching
  const lowerSlug = slug.toLowerCase();
  if (lowerSlug.includes("label") || lowerSlug.includes("etiket")) return categoryPromos["labels"];
  if (lowerSlug.includes("tape") || lowerSlug.includes("strich")) return categoryPromos["tapes"];
  if (lowerSlug.includes("security") || lowerSlug.includes("bezpek")) return categoryPromos["security-labels"];
  if (lowerSlug.includes("special")) return categoryPromos["special-labels"];

  return null;
}

interface Category {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  parentDatabaseId?: number;
  categoryImage?: string;
}

interface FeaturedProduct {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  popularityScore?: number;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
  productCategories?: {
    nodes: { slug: string }[];
  };
}

interface MegaMenuProps {
  categories: Category[];
  featuredProducts: FeaturedProduct[];
  lang: Locale;
  trigger: React.ReactNode;
  className?: string;
}

export function MegaMenu({
  categories,
  featuredProducts,
  lang,
  trigger,
  className,
}: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [menuTop, setMenuTop] = useState(64);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Separate parent categories and subcategories
  const parentCategories = categories.filter(
    (cat) => !cat.parentDatabaseId || cat.parentDatabaseId === 0
  );

  // Get products for a specific category
  const getProductsForCategory = (categorySlug: string) => {
    return featuredProducts
      .filter((product) =>
        product.productCategories?.nodes.some((cat) => cat.slug === categorySlug)
      )
      .slice(0, 4);
  };

  // Get default products (top popularity)
  const defaultProducts = featuredProducts.slice(0, 4);

  // Products to display based on hover
  const displayProducts = hoveredCategory
    ? getProductsForCategory(hoveredCategory)
    : defaultProducts;

  // If no products for category, show default
  const productsToShow = displayProducts.length > 0 ? displayProducts : defaultProducts;

  const t = {
    allProducts: lang === "uk" ? "Всі товари" : "All Products",
    popularProducts: lang === "uk" ? "Популярне" : "Popular",
    viewAll: lang === "uk" ? "Дивитись всі" : "View All",
    categories: lang === "uk" ? "Категорії" : "Categories",
    seasonalPromo: lang === "uk" ? "Акції" : "Promotions",
    newYearPromo: lang === "uk" ? "Новорічні знижки" : "New Year Sale",
    upTo: lang === "uk" ? "до" : "up to",
    details: lang === "uk" ? "Детальніше" : "Details",
    quickLinks: lang === "uk" ? "Швидкі посилання" : "Quick Links",
    newArrivals: lang === "uk" ? "Новинки" : "New Arrivals",
    bestsellers: lang === "uk" ? "Бестселери" : "Bestsellers",
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Calculate menu position
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      setMenuTop(rect.bottom);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredCategory(null);
    }, 150);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setHoveredCategory(null);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      {/* Trigger Button */}
      <button
        className={cn(
          "flex items-center gap-1 py-4 border-b-2 transition-colors",
          isOpen
            ? "border-[#78be20] text-[#78be20]"
            : "border-transparent hover:border-[#78be20] hover:text-[#78be20]"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Mega Menu Dropdown */}
      <div
        className={cn(
          "absolute left-0 top-full z-50 w-[900px] bg-white rounded-b-lg shadow-xl border border-t-0 border-gray-200",
          "transition-all duration-200 origin-top-left",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        )}
      >
        <div className="grid grid-cols-12 gap-0">
          {/* Column 1: Categories with Images */}
          <div className="col-span-5 p-5 border-r border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {t.categories}
              </h3>
              <Link
                href={`/${lang}/products`}
                className="text-xs text-[#78be20] hover:underline flex items-center gap-1"
                onClick={() => setIsOpen(false)}
              >
                {t.allProducts}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-1">
              {parentCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${lang}/category/${category.slug}`}
                  className={cn(
                    "group flex items-center gap-3 p-2 rounded-lg transition-all",
                    hoveredCategory === category.slug
                      ? "bg-[#78be20]/10"
                      : "hover:bg-gray-50"
                  )}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setHoveredCategory(category.slug)}
                >
                  {/* Category Image */}
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    {category.categoryImage ? (
                      <Image
                        src={category.categoryImage}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Category Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "font-medium text-sm transition-colors",
                          hoveredCategory === category.slug
                            ? "text-[#78be20]"
                            : "text-gray-800 group-hover:text-[#78be20]"
                        )}
                      >
                        {category.name}
                      </span>
                      {category.count && category.count > 0 && (
                        <span className="text-xs text-gray-400 ml-2">
                          {category.count}
                        </span>
                      )}
                    </div>
                  </div>

                  <ArrowRight
                    className={cn(
                      "w-4 h-4 transition-all",
                      hoveredCategory === category.slug
                        ? "text-[#78be20] translate-x-0 opacity-100"
                        : "text-gray-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Popular Products (changes on category hover) */}
          <div className="col-span-4 p-5 border-r border-gray-100">
            {(() => {
              const currentCategory = hoveredCategory
                ? parentCategories.find((c) => c.slug === hoveredCategory)
                : null;
              const CategoryIcon = currentCategory
                ? getCategoryIcon(currentCategory.slug)
                : Tag;
              return (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CategoryIcon className="w-3 h-3" />
                  {currentCategory?.name || t.popularProducts}
                </h3>
              );
            })()}

            <div className="space-y-2">
              {productsToShow.map((product) => (
                <Link
                  key={product.id}
                  href={`/${lang}/products/${product.slug}`}
                  className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative w-10 h-10 bg-muted rounded-sm overflow-hidden flex-shrink-0 border border-border">
                    <Image
                      src={product.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
                      alt={product.featuredImage?.node?.altText || product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="40px"
                    />
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-[#78be20] line-clamp-2 transition-colors flex-1">
                    {product.title}
                  </span>
                </Link>
              ))}
            </div>

            {hoveredCategory && (
              <Link
                href={`/${lang}/category/${hoveredCategory}`}
                className="mt-3 flex items-center justify-center gap-2 w-full py-2 text-[#78be20] text-sm font-medium hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {t.viewAll} →
              </Link>
            )}
          </div>

          {/* Column 3: Promo Sidebar - Dynamic based on category */}
          {(() => {
            const promo = getCategoryPromo(hoveredCategory);
            const CategoryIcon = hoveredCategory ? getCategoryIcon(hoveredCategory) : Gift;

            return (
              <div className="col-span-3 p-5 bg-gradient-to-br from-[#78be20]/5 to-[#78be20]/10">
                {/* Dynamic Promo Banner */}
                <div
                  className={cn(
                    "rounded-lg p-4 mb-4 transition-all duration-300",
                    promo
                      ? `bg-gradient-to-br ${promo.color}`
                      : "bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300"
                  )}
                >
                  {promo ? (
                    <>
                      {/* Badge */}
                      {promo.badge && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-gray-700 mb-2">
                          {promo.badge[lang]}
                        </span>
                      )}

                      {/* Title with icon */}
                      <div className="flex items-center gap-2 mb-2">
                        <CategoryIcon className="w-5 h-5 text-gray-700" />
                        <span className="text-sm font-bold text-gray-800">
                          {promo.title[lang]}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="text-gray-600 text-sm mb-3">
                        {promo.description[lang]}
                      </div>

                      {/* Discount badge */}
                      {promo.discount && (
                        <div className="inline-flex items-center gap-1 bg-[#78be20] text-white text-sm font-bold px-3 py-1 rounded-full">
                          <Gift className="w-3.5 h-3.5" />
                          {promo.discount}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Default placeholder */}
                      <div className="flex items-center gap-2 mb-2 text-gray-400">
                        <Gift className="w-5 h-5" />
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          {t.seasonalPromo}
                        </span>
                      </div>
                      <div className="text-gray-500 text-sm mb-2">
                        {lang === "uk"
                          ? "Наведіть на категорію для перегляду акцій"
                          : "Hover over a category to see promotions"}
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {t.quickLinks}
                  </h4>
                  <div className="space-y-1">
                    <Link
                      href={hoveredCategory ? `/${lang}/category/${hoveredCategory}` : `/${lang}/products`}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#78be20] transition-colors p-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#78be20]" />
                      {t.newArrivals}
                    </Link>
                    <Link
                      href={hoveredCategory ? `/${lang}/category/${hoveredCategory}` : `/${lang}/products`}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#78be20] transition-colors p-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#78be20]" />
                      {t.bestsellers}
                    </Link>
                  </div>
                </div>

                {/* CTA Button - Simple & Clean */}
                <Link
                  href={hoveredCategory ? `/${lang}/category/${hoveredCategory}` : `/${lang}/products`}
                  className="mt-4 group/btn flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-md bg-[#78be20] hover:bg-[#6aa81c] text-white text-xs font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {hoveredCategory
                    ? (lang === "uk" ? "Перейти" : "Go")
                    : (lang === "uk" ? "Всі товари" : "All products")}
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 -z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
