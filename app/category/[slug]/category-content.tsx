"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Header, MenuCategory } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronRight, Grid3X3, List, SlidersHorizontal, X } from "lucide-react"

interface WPProduct {
  id: string
  name: string
  slug: string
  description: string
  basePrice: number
  images: string[]
  category: string
  categorySlug: string
  sku: string
}

interface CategoryData {
  name: string
  slug: string
  description: string
  count: number
}

interface CategoryContentProps {
  category: CategoryData | null
  products: WPProduct[]
  menuCategories: MenuCategory[]
  slug: string
}

// Filter data
const industries = [
  { id: "retail", label: "Роздрібна торгівля" },
  { id: "horeca", label: "HORECA" },
  { id: "corporate", label: "Корпоративний сектор" },
  { id: "medical", label: "Медицина" },
  { id: "education", label: "Освіта" },
  { id: "beauty", label: "Б'юті індустрія" },
]

const printTypes = [
  { id: "flexo", label: "Флексографія" },
  { id: "digital", label: "Цифровий друк" },
  { id: "offset", label: "Офсетний друк" },
  { id: "foil", label: "Фольгування" },
  { id: "embossing", label: "Тиснення" },
]

function ProductCard({ product, viewMode }: { product: WPProduct; viewMode: "grid" | "list" }) {
  if (viewMode === "grid") {
    return (
      <Link href={`/product/${product.slug}`} className="group cursor-pointer block">
        <div className="relative bg-gray-50 rounded-lg p-4 mb-3 aspect-square flex items-center justify-center overflow-hidden">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-[#00A651] text-white text-xs font-semibold px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-0.5">{product.sku}</p>
        <p className="text-sm text-gray-900 mb-1 group-hover:text-[#00A651] transition-colors line-clamp-2">
          {product.name}
        </p>
        <p className="text-sm font-semibold text-gray-900 mb-2">від {product.basePrice} ₴</p>
      </Link>
    )
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#00A651] transition-colors cursor-pointer"
    >
      <div className="relative bg-gray-50 rounded-lg p-4 w-32 h-32 flex-shrink-0 flex items-center justify-center">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
        <h3 className="text-base font-medium text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-lg font-semibold text-gray-900">від {product.basePrice} ₴</p>
      </div>
      <div className="flex items-center">
        <Button className="bg-[#00A651] hover:bg-[#00913D] text-white">Детальніше</Button>
      </div>
    </Link>
  )
}

export default function CategoryContent({ category, products, menuCategories, slug }: CategoryContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    industries: true,
    printTypes: true,
  })
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    industries: [],
    printTypes: [],
  })
  const [sortBy, setSortBy] = useState("popular")

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
    setSelectedFilters({ industries: [], printTypes: [] })
  }

  const totalSelectedFilters = Object.values(selectedFilters).flat().length

  const sortedProducts = useMemo(() => {
    const sorted = [...products]
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.basePrice - b.basePrice)
      case "price-desc":
        return sorted.sort((a, b) => b.basePrice - a.basePrice)
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name, "uk"))
      default:
        return sorted
    }
  }, [products, sortBy])

  const FilterSection = ({
    title,
    sectionKey,
    items,
  }: {
    title: string
    sectionKey: string
    items: { id: string; label: string }[]
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
                checked={selectedFilters[sectionKey].includes(item.id)}
                onCheckedChange={() => toggleFilterOption(sectionKey, item.id)}
                className="border-gray-300 data-[state=checked]:bg-[#00A651] data-[state=checked]:border-[#00A651]"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 flex-1">{item.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={menuCategories} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Категорію не знайдено</h1>
          <p className="text-gray-600 mb-8">На жаль, категорії "{slug}" не існує.</p>
          <Button asChild className="bg-[#00A651] hover:bg-[#00913D]">
            <Link href="/">На головну</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header categories={menuCategories} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00A651]">
              Головна
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
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
              <FilterSection title="Галузі" sectionKey="industries" items={industries} />
              <FilterSection title="Типи друку" sectionKey="printTypes" items={printTypes} />
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
                  Знайдено <strong className="text-gray-900">{sortedProducts.length}</strong> товарів
                </span>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-[#00A651] bg-white"
                >
                  <option value="popular">За популярністю</option>
                  <option value="price-asc">За ціною (зростання)</option>
                  <option value="price-desc">За ціною (спадання)</option>
                  <option value="name">За назвою</option>
                </select>

                <div className="hidden sm:flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-gray-100 text-[#00A651]" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-gray-100 text-[#00A651]" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">У цій категорії поки немає товарів</p>
                <Button asChild variant="outline">
                  <Link href="/">Повернутися на головну</Link>
                </Button>
              </div>
            )}
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
            <div className="px-4 py-4">
              <FilterSection title="Галузі" sectionKey="industries" items={industries} />
              <FilterSection title="Типи друку" sectionKey="printTypes" items={printTypes} />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4">
              <Button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-[#00A651] hover:bg-[#00913D] text-white">
                Показати результати ({sortedProducts.length})
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
