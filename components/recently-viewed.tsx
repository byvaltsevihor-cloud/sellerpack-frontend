"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { products, type Product } from "@/lib/products-data"
import { Clock } from "lucide-react"

const STORAGE_KEY = "recentlyViewed"
const MAX_ITEMS = 8

export function addToRecentlyViewed(productSlug: string) {
  if (typeof window === "undefined") return

  const stored = localStorage.getItem(STORAGE_KEY)
  let items: string[] = stored ? JSON.parse(stored) : []

  // Видаляємо якщо вже є
  items = items.filter((slug) => slug !== productSlug)

  // Додаємо на початок
  items.unshift(productSlug)

  // Обмежуємо кількість
  items = items.slice(0, MAX_ITEMS)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([])

  useEffect(() => {
    const slugs = getRecentlyViewed().filter((slug) => slug !== excludeSlug)
    const recent = slugs.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as Product[]
    setRecentProducts(recent.slice(0, 4))
  }, [excludeSlug])

  if (recentProducts.length === 0) return null

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          Недавно переглянуті
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="group">
              <div className="bg-white rounded-xl p-3 mb-2 aspect-square flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-xs text-gray-500">від {product.basePrice} ₴</p>
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#00A651] line-clamp-1">
                {product.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
