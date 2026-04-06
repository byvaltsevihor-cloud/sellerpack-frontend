"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronRight, Grid3X3, List, SlidersHorizontal, X, Calculator, Bookmark } from "lucide-react"

// Categories from requirements
const categories = [
  { id: "polygraphy", label: "Поліграфія", count: 156 },
  { id: "wide_format", label: "Широкий формат", count: 45 },
  { id: "packaging", label: "Пакування", count: 38 },
]

const productTypes = [
  { id: "business_card", label: "Візитки", count: 24 },
  { id: "flyer", label: "Флаєри", count: 18 },
  { id: "brochure", label: "Брошури", count: 15 },
  { id: "poster", label: "Плакати", count: 22 },
  { id: "calendar", label: "Календарі", count: 28 },
  { id: "banner", label: "Банери", count: 12 },
  { id: "sticker", label: "Наліпки", count: 35 },
  { id: "bag", label: "Пакети", count: 14 },
  { id: "cup", label: "Стакани", count: 8 },
]

const sources = [
  { id: "artpress", label: "Art-Press", count: 89 },
  { id: "wolf", label: "Wolf", count: 76 },
  { id: "glyanec", label: "Глянець", count: 68 },
]

const quickFilters = [
  { id: "express", label: "Експрес-доставка (≤2 дні)" },
  { id: "all_sources", label: "Є у всіх друкарнях" },
]

// Sample products with price comparison data
const products = [
  {
    id: 1,
    slug: "business-card-90x50",
    name: "Візитки 90×50 мм",
    type: "business_card",
    category: "polygraphy",
    minPrice: 245,
    sourcesCount: 3,
    bestSource: { name: "Wolf", logo: "W", color: "#16A34A" },
    image: "/business-cards-premium.jpg",
    badge: "popular",
  },
  {
    id: 2,
    slug: "flyer-a5",
    name: "Флаєри А5",
    type: "flyer",
    category: "polygraphy",
    minPrice: 180,
    sourcesCount: 3,
    bestSource: { name: "Art-Press", logo: "AP", color: "#1E40AF" },
    image: "/a5-flyers-colorful.jpg",
    badge: "new",
  },
  {
    id: 3,
    slug: "brochure-a4",
    name: "Брошури А4",
    type: "brochure",
    category: "polygraphy",
    minPrice: 890,
    sourcesCount: 2,
    bestSource: { name: "Глянець", logo: "Г", color: "#DC2626" },
    image: "/a4-brochure-professional.jpg",
  },
  {
    id: 4,
    slug: "poster-a2",
    name: "Плакати А2",
    type: "poster",
    category: "polygraphy",
    minPrice: 35,
    sourcesCount: 3,
    bestSource: { name: "Wolf", logo: "W", color: "#16A34A" },
    image: "/a2-poster-printing.jpg",
  },
  {
    id: 5,
    slug: "banner-pvc",
    name: "Банер ПВХ",
    type: "banner",
    category: "wide_format",
    minPrice: 120,
    sourcesCount: 2,
    bestSource: { name: "Art-Press", logo: "AP", color: "#1E40AF" },
    image: "/pvc-banner-large-format.jpg",
  },
  {
    id: 6,
    slug: "paper-cup",
    name: "Паперові стакани",
    type: "cup",
    category: "packaging",
    minPrice: 2.5,
    sourcesCount: 3,
    bestSource: { name: "Wolf", logo: "W", color: "#16A34A" },
    image: "/paper-cups-custom-logo.jpg",
    badge: "sale",
  },
  {
    id: 7,
    slug: "quarterly-calendar",
    name: "Квартальний календар",
    type: "calendar",
    category: "polygraphy",
    minPrice: 85,
    sourcesCount: 3,
    bestSource: { name: "Глянець", logo: "Г", color: "#DC2626" },
    image: "/quarterly-wall-calendar-2026.jpg",
    badge: "new",
  },
  {
    id: 8,
    slug: "sticker-roll",
    name: "Етикетки в рулонах",
    type: "sticker",
    category: "polygraphy",
    minPrice: 450,
    sourcesCount: 2,
    bestSource: { name: "Art-Press", logo: "AP", color: "#1E40AF" },
    image: "/roll-stickers-labels-custom.jpg",
  },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    categories: true,
    productTypes: true,
    sources: true,
    quickFilters: true,
    priceRange: true,
  })
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    categories: [],
    productTypes: [],
    sources: [],
    quickFilters: [],
  })
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })

  const toggleFilter = (section: string) => {
    setExpandedFilters((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleFilterOption = (section: string, optionId: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: prev[section].includes(optionId)
        ? prev[section].filter((id) => id !== optionId)
        : [...prev[section], optionId],
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      productTypes: [],
      sources: [],
      quickFilters: [],
    })
    setPriceRange({ min: "", max: "" })
  }

  const totalSelectedFilters = Object.values(selectedFilters).flat().length + (priceRange.min || priceRange.max ? 1 : 0)

  const FilterSection = ({
    title,
    sectionKey,
    items,
  }: {
    title: string
    sectionKey: string
    items: { id: string; label: string; count?: number }[]
  }) => (
    <div className="border-b border-gray-200 py-4">
      <button onClick={() => toggleFilter(sectionKey)} className="flex items-center justify-between w-full text-left">
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${expandedFilters[sectionKey] ? "rotate-180" : ""}`}
        />
      </button>
      {expandedFilters[sectionKey] && (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedFilters[sectionKey]?.includes(item.id)}
                onCheckedChange={() => toggleFilterOption(sectionKey, item.id)}
                className="border-gray-300 data-[state=checked]:bg-[#00A651] data-[state=checked]:border-[#00A651]"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">{item.label}</span>
              {item.count !== undefined && <span className="text-xs text-gray-400">{item.count}</span>}
            </label>
          ))}
        </div>
      )}
    </div>
  )

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case "popular":
        return "bg-[#00A651] text-white"
      case "new":
        return "bg-blue-600 text-white"
      case "sale":
        return "bg-[#E53935] text-white"
      default:
        return ""
    }
  }

  const getBadgeLabel = (badge?: string) => {
    switch (badge) {
      case "popular":
        return "Популярне"
      case "new":
        return "Новинка"
      case "sale":
        return "Акція"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-[#00A651]">
              Головна
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Продукція</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Поліграфічна продукція</h1>
          <p className="text-gray-600">Порівняйте ціни від 3 друкарень</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Фільтри</h2>
                {totalSelectedFilters > 0 && (
                  <button onClick={clearAllFilters} className="text-sm text-[#00A651] hover:underline">
                    Очистити ({totalSelectedFilters})
                  </button>
                )}
              </div>

              <FilterSection title="Категорія" sectionKey="categories" items={categories} />
              <FilterSection title="Тип продукту" sectionKey="productTypes" items={productTypes} />
              <FilterSection title="Друкарня" sectionKey="sources" items={sources} />

              {/* Price Range */}
              <div className="border-b border-gray-200 py-4">
                <button
                  onClick={() => toggleFilter("priceRange")}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-medium text-gray-900">Ціновий діапазон</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedFilters["priceRange"] ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFilters["priceRange"] && (
                  <div className="mt-4 flex gap-2">
                    <input
                      type="number"
                      placeholder="від"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((p) => ({ ...p, min: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#00A651]"
                    />
                    <input
                      type="number"
                      placeholder="до"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((p) => ({ ...p, max: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#00A651]"
                    />
                  </div>
                )}
              </div>

              <FilterSection title="Швидкі фільтри" sectionKey="quickFilters" items={quickFilters} />

              {/* Quick Links */}
              <div className="mt-6 space-y-2">
                <Link
                  href="/calculator"
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Calculator className="w-5 h-5 text-[#00A651]" />
                  Швидкий калькулятор
                </Link>
                <Link
                  href="/compare"
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Bookmark className="w-5 h-5 text-[#00A651]" />
                  Збережені порівняння
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Фільтри
                  {totalSelectedFilters > 0 && (
                    <span className="bg-[#00A651] text-white text-xs px-1.5 py-0.5 rounded-full">
                      {totalSelectedFilters}
                    </span>
                  )}
                </button>
                <span className="text-sm text-gray-500">
                  Знайдено <strong className="text-gray-900">{products.length}</strong> товарів
                </span>
              </div>

              <div className="flex items-center gap-4">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-[#00A651]">
                  <option>За найкращою ціною</option>
                  <option>За ціною (зростання)</option>
                  <option>За ціною (спадання)</option>
                  <option>За к-стю друкарень</option>
                  <option>За назвою</option>
                </select>

                <div className="hidden sm:flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${
                      viewMode === "grid" ? "bg-gray-100 text-[#00A651]" : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${
                      viewMode === "list" ? "bg-gray-100 text-[#00A651]" : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Filters Tags */}
            {totalSelectedFilters > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(selectedFilters).map(([section, ids]) =>
                  ids.map((id) => {
                    const allItems = [...categories, ...productTypes, ...sources, ...quickFilters]
                    const item = allItems.find((i) => i.id === id)
                    return item ? (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full"
                      >
                        {item.label}
                        <button onClick={() => toggleFilterOption(section, id)} className="hover:text-[#E53935]">
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ) : null
                  }),
                )}
                {(priceRange.min || priceRange.max) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full">
                    Ціна: {priceRange.min || "0"} - {priceRange.max || "∞"} грн
                    <button onClick={() => setPriceRange({ min: "", max: "" })} className="hover:text-[#E53935]">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
              {products.map((product) =>
                viewMode === "grid" ? (
                  <Link
                    key={product.id}
                    href={`/products/${product.category}/${product.slug}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative bg-gray-50 rounded-lg p-4 mb-3 aspect-square flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                      />
                      {product.badge && (
                        <span
                          className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded ${getBadgeStyle(
                            product.badge,
                          )}`}
                        >
                          {getBadgeLabel(product.badge)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-900 mb-1 group-hover:text-[#00A651] transition-colors font-medium">
                      {product.name}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mb-2">від {product.minPrice} ₴</p>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                        style={{ backgroundColor: product.bestSource.color }}
                      >
                        {product.bestSource.logo}
                      </div>
                      <span className="text-xs text-gray-500">{product.sourcesCount} друкарні</span>
                    </div>
                  </Link>
                ) : (
                  <Link
                    key={product.id}
                    href={`/products/${product.category}/${product.slug}`}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#00A651] transition-colors cursor-pointer"
                  >
                    <div className="relative bg-gray-50 rounded-lg p-4 w-32 h-32 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                      {product.badge && (
                        <span
                          className={`absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded ${getBadgeStyle(
                            product.badge,
                          )}`}
                        >
                          {getBadgeLabel(product.badge)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-xl font-bold text-gray-900 mb-2">від {product.minPrice} ₴</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ backgroundColor: product.bestSource.color }}
                        >
                          {product.bestSource.logo}
                        </div>
                        <span className="text-sm text-gray-600">Найкраща ціна: {product.bestSource.name}</span>
                        <span className="text-sm text-gray-400">• {product.sourcesCount} друкарні</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button className="bg-[#00A651] hover:bg-[#00913D] text-white">Порівняти</Button>
                    </div>
                  </Link>
                ),
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                Попередня
              </button>
              <button className="px-4 py-2 bg-[#00A651] text-white rounded-md text-sm font-medium">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                Наступна
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Фільтри</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="px-4 pb-24">
              <FilterSection title="Категорія" sectionKey="categories" items={categories} />
              <FilterSection title="Тип продукту" sectionKey="productTypes" items={productTypes} />
              <FilterSection title="Друкарня" sectionKey="sources" items={sources} />
              <FilterSection title="Швидкі фільтри" sectionKey="quickFilters" items={quickFilters} />
            </div>
            <div className="fixed bottom-0 left-0 right-0 max-w-sm ml-auto bg-white border-t border-gray-200 p-4">
              <Button
                className="w-full bg-[#00A651] hover:bg-[#00913D] text-white"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Показати результати
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
