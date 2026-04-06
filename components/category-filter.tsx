'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { type Locale, type Dictionary } from "@/lib/i18n"

interface Category {
  id: string
  name: string
  slug: string
  count?: number
}

interface CategoryFilterProps {
  categories: Category[]
  lang?: Locale
  dict?: Dictionary
}

export function CategoryFilter({ categories, lang = 'uk', dict }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const category = searchParams.get('category')
    setSelectedCategory(category)
  }, [searchParams])

  const handleCategoryClick = (slug: string) => {
    if (selectedCategory === slug) {
      // Deselect if clicking same category
      router.push('/products', { scroll: false })
      setSelectedCategory(null)
    } else {
      router.push(`/products?category=${slug}`, { scroll: false })
      setSelectedCategory(slug)
    }
    setIsOpen(false)
  }

  const clearFilter = () => {
    router.push('/products', { scroll: false })
    setSelectedCategory(null)
  }

  const selectedCategoryName = categories.find(c => c.slug === selectedCategory)?.name

  return (
    <div className="mb-6">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 mb-4"
      >
        <span className="flex items-center gap-2 font-medium">
          <Filter className="w-4 h-4" />
          Фільтр за категорією
        </span>
        {selectedCategoryName && (
          <span className="text-sm text-[#78be20]">{selectedCategoryName}</span>
        )}
      </button>

      {/* Filter Panel */}
      <div className={`
        ${isOpen ? 'block' : 'hidden'} lg:block
        bg-white rounded-lg p-6 border border-gray-200
      `}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#78be20]" />
            Категорії
          </h3>
          {selectedCategory && (
            <button
              onClick={clearFilter}
              className="text-sm text-gray-600 hover:text-[#78be20] flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Скинути
            </button>
          )}
        </div>

        {/* Active Filter Badge */}
        {selectedCategoryName && (
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 bg-[#78be20] text-white px-3 py-1 rounded-full text-sm">
              {selectedCategoryName}
              <button
                onClick={clearFilter}
                className="hover:bg-white/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="space-y-2">
          {categories.length === 0 ? (
            <p className="text-gray-500 text-sm">Немає категорій</p>
          ) : (
            categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg transition-all
                  flex items-center justify-between
                  ${selectedCategory === category.slug
                    ? 'bg-[#78be20] text-white font-semibold'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                <span>{category.name}</span>
                {category.count !== undefined && (
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${selectedCategory === category.slug
                      ? 'bg-white/20'
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {category.count}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
