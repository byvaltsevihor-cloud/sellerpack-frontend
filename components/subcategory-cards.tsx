'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Package, ArrowRight } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface Subcategory {
  id: string
  databaseId: number
  name: string
  slug: string
  description?: string
  count?: number
  categoryImage?: string
}

interface SubcategoryCardsProps {
  subcategories: Subcategory[]
  lang: Locale
  parentSlug: string
}

export function SubcategoryCards({ subcategories, lang, parentSlug }: SubcategoryCardsProps) {
  if (subcategories.length === 0) return null

  const translations = {
    uk: {
      subcategories: 'Підкатегорії',
      products: 'товарів',
      viewAll: 'Переглянути',
    },
    en: {
      subcategories: 'Subcategories',
      products: 'products',
      viewAll: 'View all',
    },
  }

  const t = translations[lang]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-[#78be20]" />
        {t.subcategories}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {subcategories.map((subcategory) => (
          <Link
            key={subcategory.id}
            href={`/${lang}/category/${subcategory.slug}`}
            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-[#78be20]/30 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-32 bg-muted overflow-hidden">
              <Image
                src={subcategory.categoryImage || "/placeholder.svg"}
                alt={subcategory.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-[#78be20] transition-colors">
                {subcategory.name}
              </h3>

              <div className="flex items-center justify-between mt-2">
                {subcategory.count !== undefined && (
                  <span className="text-xs text-gray-500">
                    {subcategory.count} {t.products}
                  </span>
                )}
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#78be20] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
