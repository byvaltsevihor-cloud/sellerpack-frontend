"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getBundleBySlug, calculateBundlePrice, industries, bundles } from "@/lib/bundles-data"
import { products } from "@/lib/products-data"
import { Package, Minus, Plus, ShoppingCart, CheckCircle, ChevronRight, FileSpreadsheet, FileText } from "lucide-react"

export default function BundleDetailPage() {
  const params = useParams()
  const bundle = getBundleBySlug(params.slug as string)

  const [quantities, setQuantities] = useState<Record<string, number>>(
    bundle ? Object.fromEntries(bundle.items.map((item) => [item.productSlug, item.quantity])) : {},
  )

  if (!bundle) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Комплект не знайдено</h1>
          <Button asChild className="bg-[#00A651] hover:bg-[#00913D]">
            <Link href="/bundles">Переглянути всі комплекти</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const industry = industries.find((i) => i.id === bundle.industry)
  const basePrice = calculateBundlePrice(bundle)

  // Розрахунок ціни з урахуванням змінених кількостей
  const calculateCustomPrice = () => {
    let total = 0
    bundle.items.forEach((item) => {
      const qty = quantities[item.productSlug] || item.quantity
      const pricePerUnit = item.basePrice / item.quantity
      total += pricePerUnit * qty
    })
    const discounted = Math.round(total * (1 - bundle.discount / 100))
    return { original: Math.round(total), discounted, savings: Math.round(total) - discounted }
  }

  const customPrice = calculateCustomPrice()

  const updateQuantity = (slug: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [slug]: Math.max(1, (prev[slug] || 1) + delta),
    }))
  }

  // Схожі комплекти
  const relatedBundles = bundles.filter((b) => b.id !== bundle.id && b.industry === bundle.industry).slice(0, 3)

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
            <span className="text-gray-900">{bundle.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#E53935] text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  Знижка -{bundle.discount}%
                </span>
                {bundle.seasonal && (
                  <span className="bg-[#00A651] text-white text-sm font-bold px-4 py-1.5 rounded-full">Сезонний</span>
                )}
                {industry && (
                  <span className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full">
                    {industry.icon} {industry.name.split("/")[0]}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{bundle.name}</h1>
              <p className="text-xl text-gray-600">{bundle.description}</p>
            </div>

            {/* Bundle Image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img src={bundle.image || "/placeholder.svg"} alt={bundle.name} className="w-full h-80 object-cover" />
            </div>

            {/* Items List */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#00A651]" />
                Що входить у комплект
              </h2>
              <div className="space-y-4">
                {bundle.items.map((item) => {
                  const product = products.find((p) => p.slug === item.productSlug)
                  const currentQty = quantities[item.productSlug] || item.quantity
                  const pricePerUnit = item.basePrice / item.quantity
                  const itemTotal = Math.round(pricePerUnit * currentQty)

                  return (
                    <div key={item.productSlug} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product?.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.productSlug}`}
                          className="font-semibold text-gray-900 hover:text-[#00A651] transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {Math.round(pricePerUnit)} ₴/шт. × {currentQty} шт.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productSlug, -Math.ceil(item.quantity * 0.1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-16 text-center font-medium">{currentQty}</span>
                        <button
                          onClick={() => updateQuantity(item.productSlug, Math.ceil(item.quantity * 0.1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{itemTotal.toLocaleString()} ₴</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-[#00A651]/5 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Переваги комплекту</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Гарантована знижка від суми товарів",
                  "Можливість змінювати кількості",
                  "Єдине замовлення - економія часу",
                  "Узгоджений дизайн всіх матеріалів",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00A651]" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Підсумок замовлення</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Сума товарів:</span>
                  <span className="line-through">{customPrice.original.toLocaleString()} ₴</span>
                </div>
                <div className="flex justify-between text-[#E53935]">
                  <span>Знижка -{bundle.discount}%:</span>
                  <span>-{customPrice.savings.toLocaleString()} ₴</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Разом:</span>
                  <span className="text-2xl font-bold text-[#00A651]">{customPrice.discounted.toLocaleString()} ₴</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-[#00A651] hover:bg-[#00913D] py-6 text-lg">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Додати в кошик
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <FileSpreadsheet className="w-4 h-4 mr-1" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <FileText className="w-4 h-4 mr-1" />
                    КП
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Потрібна консультація?</p>
                <a href="tel:+380441234567" className="text-[#00A651] font-semibold hover:underline">
                  +38 (044) 123-45-67
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Bundles */}
        {relatedBundles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Схожі комплекти</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBundles.map((b) => {
                const price = calculateBundlePrice(b)
                return (
                  <Link
                    key={b.id}
                    href={`/bundles/${b.slug}`}
                    className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-40">
                      <img
                        src={b.image || "/placeholder.svg"}
                        alt={b.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-[#E53935] text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{b.discount}%
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#00A651]">{b.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{b.description}</p>
                      <p className="text-lg font-bold text-[#00A651]">{price.discounted.toLocaleString()} ₴</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}
