"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  bundles,
  industries,
  getPopularBundles,
  calculateBundlePrice,
  CUSTOM_BUNDLE_MIN_ITEMS,
  CUSTOM_BUNDLE_DISCOUNT,
} from "@/lib/bundles-data"
import { ArrowRight, Package, CheckCircle, Sparkles, Building2 } from "lucide-react"

export default function BundlesPage() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null)
  const popularBundles = getPopularBundles()

  const filteredBundles = activeIndustry
    ? bundles.filter((b) => {
        const industry = industries.find((i) => i.slug === activeIndustry)
        return b.industry === industry?.id
      })
    : bundles

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00A651]/10 via-white to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A651]/10 rounded-full mb-6">
              <Package className="w-4 h-4 text-[#00A651]" />
              <span className="text-sm font-medium text-[#00A651]">Готові рішення</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Комплекти продукції
              <br />
              <span className="text-[#00A651]">зі знижкою</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Готові набори для різних галузей бізнесу. Економте до 20% при замовленні комплекту замість окремих
              товарів.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-[#00A651]" />
                <span>Знижки 10-20%</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-[#00A651]" />
                <span>Можливість кастомізації</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-[#00A651]" />
                <span>Для різних галузей</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Bundle Banner */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#00A651] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Зберіть власний комплект</h3>
                <p className="text-sm text-gray-600">
                  Додайте {CUSTOM_BUNDLE_MIN_ITEMS}+ товарів у кошик та отримайте автоматичну знижку{" "}
                  <strong className="text-[#00A651]">-{CUSTOM_BUNDLE_DISCOUNT}%</strong>
                </p>
              </div>
            </div>
            <Button asChild className="bg-[#00A651] hover:bg-[#00913D]">
              <Link href="/category/drukovana-produktsiia">
                Переглянути каталог
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#00A651]" />
            Фільтр за галуззю
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveIndustry(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeIndustry === null ? "bg-[#00A651] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Всі комплекти
            </button>
            {industries.map((industry) => (
              <button
                key={industry.slug}
                onClick={() => setActiveIndustry(industry.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeIndustry === industry.slug
                    ? "bg-[#00A651] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-1.5">{industry.icon}</span>
                {industry.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Bundles */}
      {!activeIndustry && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Популярні комплекти</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularBundles.slice(0, 3).map((bundle) => {
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
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full">
                          -{bundle.discount}%
                        </span>
                        {bundle.seasonal && (
                          <span className="bg-[#00A651] text-white text-xs font-bold px-3 py-1 rounded-full">
                            Сезонний
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00A651] transition-colors">
                        {bundle.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{bundle.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 line-through">{price.original.toLocaleString()} ₴</p>
                          <p className="text-2xl font-bold text-[#00A651]">{price.discounted.toLocaleString()} ₴</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Економія</p>
                          <p className="text-lg font-semibold text-[#E53935]">{price.savings.toLocaleString()} ₴</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Bundles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {activeIndustry
              ? `Комплекти для: ${industries.find((i) => i.slug === activeIndustry)?.name}`
              : "Всі комплекти"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBundles.map((bundle) => {
              const price = calculateBundlePrice(bundle)
              const industry = industries.find((i) => i.id === bundle.industry)
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
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full">
                        -{bundle.discount}%
                      </span>
                    </div>
                    {industry && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                          {industry.icon} {industry.name.split("/")[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00A651] transition-colors">
                      {bundle.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{bundle.description}</p>
                    <div className="text-xs text-gray-500 mb-4">{bundle.items.length} товарів у комплекті</div>
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

      {/* Industries Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Популярне у вашій галузі</h2>
          <p className="text-gray-600 mb-8">
            Оберіть свою галузь, щоб побачити найпопулярніші товари серед ваших колег
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industry/${industry.slug}`}
                className="group p-6 bg-gray-50 rounded-2xl hover:bg-[#00A651]/10 transition-colors"
              >
                <span className="text-4xl mb-4 block">{industry.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#00A651] transition-colors">
                  {industry.name}
                </h3>
                <p className="text-sm text-gray-600">{industry.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
