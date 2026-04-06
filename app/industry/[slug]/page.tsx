"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getIndustryBySlug, getBundlesByIndustry, calculateBundlePrice, industries } from "@/lib/bundles-data"
import { products } from "@/lib/products-data"
import { ArrowRight, ChevronRight, Package, Users } from "lucide-react"

export default function IndustryPage() {
  const params = useParams()
  const industry = getIndustryBySlug(params.slug as string)
  const industryBundles = industry ? getBundlesByIndustry(params.slug as string) : []

  // Зберігаємо галузь в localStorage
  useEffect(() => {
    if (industry) {
      localStorage.setItem("selectedIndustry", industry.slug)
    }
  }, [industry])

  if (!industry) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Галузь не знайдено</h1>
          <Button asChild className="bg-[#00A651] hover:bg-[#00913D]">
            <Link href="/bundles">Переглянути всі комплекти</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  // Популярні товари для цієї галузі
  const popularProducts = industry.popularProducts.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#00A651]">
              Головна
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/bundles" className="hover:text-[#00A651]">
              Комплекти
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{industry.name}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-[#00A651]/10 via-white to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{industry.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{industry.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{industry.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>85% клієнтів цієї галузі замовляють ці товари разом</span>
          </div>
        </div>
      </section>

      {/* Bundles for Industry */}
      {industryBundles.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#00A651]" />
              Готові комплекти для {industry.name.split("/")[0].toLowerCase()}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industryBundles.map((bundle) => {
                const price = calculateBundlePrice(bundle)
                return (
                  <Link
                    key={bundle.id}
                    href={`/bundles/${bundle.slug}`}
                    className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={bundle.image || "/placeholder.svg"}
                        alt={bundle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-4 left-4 bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full">
                        -{bundle.discount}%
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00A651]">{bundle.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{bundle.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 line-through">{price.original.toLocaleString()} ₴</p>
                          <p className="text-2xl font-bold text-[#00A651]">{price.discounted.toLocaleString()} ₴</p>
                        </div>
                        <Button size="sm" className="bg-[#00A651] hover:bg-[#00913D]">
                          Детальніше
                        </Button>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Popular Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Популярне у галузі "{industry.name.split("/")[0]}"</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularProducts.map((product) =>
              product ? (
                <Link key={product.id} href={`/product/${product.slug}`} className="group">
                  <div className="bg-white rounded-2xl p-4 mb-3 aspect-square flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-sm text-gray-500">від {product.basePrice} ₴</p>
                  <h3 className="font-medium text-gray-900 group-hover:text-[#00A651]">{product.name}</h3>
                </Link>
              ) : null,
            )}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-[#00A651] text-[#00A651] hover:bg-[#00A651] hover:text-white bg-transparent"
            >
              <Link href="/category/drukovana-produktsiia">
                Переглянути весь каталог
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Інші галузі</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {industries
              .filter((i) => i.slug !== industry.slug)
              .slice(0, 4)
              .map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industry/${ind.slug}`}
                  className="group p-4 bg-gray-50 rounded-xl hover:bg-[#00A651]/10 transition-colors"
                >
                  <span className="text-2xl mb-2 block">{ind.icon}</span>
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#00A651]">{ind.name.split("/")[0]}</h3>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
