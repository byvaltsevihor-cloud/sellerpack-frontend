"use client"

import { useState } from "react"
import Link from "next/link"
import { Header, MenuCategory } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Bookmark,
  Copy,
  Check,
  ShoppingCart,
  Package,
  Truck,
  Shield,
  MessageSquare,
} from "lucide-react"

interface WPProduct {
  id: string
  name: string
  slug: string
  description: string
  content: string
  basePrice: number
  images: string[]
  category: string
  categorySlug: string
  sku: string
}

interface ProductContentProps {
  product: WPProduct | null
  menuCategories: MenuCategory[]
  slug: string
}

function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square">
        <img
          src={images[activeIndex] || "/placeholder.svg"}
          alt={`${productName} - зображення ${activeIndex + 1}`}
          className="w-full h-full object-contain p-4"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                activeIndex === idx ? "border-[#00A651]" : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`${productName} - мініатюра ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductContent({ product, menuCategories, slug }: ProductContentProps) {
  const [quantity, setQuantity] = useState(100)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={menuCategories} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Продукт не знайдено</h1>
          <p className="text-gray-600 mb-8">На жаль, продукту "{slug}" не існує в каталозі.</p>
          <Button asChild className="bg-[#00A651] hover:bg-[#00913D]">
            <Link href="/">На головну</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const pricePerUnit = product.basePrice || 50
  const totalPrice = pricePerUnit * quantity

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={menuCategories} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00A651]">
              Головна
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/category/${product.categorySlug}`} className="hover:text-[#00A651]">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info & Order */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.sku}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8 (відгуки)</span>
              </div>

              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* USP badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-200">
                <Package className="w-6 h-6 text-[#00A651] mb-2" />
                <span className="text-xs text-gray-600">Мін. 100 шт.</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-200">
                <Truck className="w-6 h-6 text-[#00A651] mb-2" />
                <span className="text-xs text-gray-600">5-7 днів</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-gray-200">
                <Shield className="w-6 h-6 text-[#00A651] mb-2" />
                <span className="text-xs text-gray-600">Гарантія якості</span>
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Розрахувати вартість</h3>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Тираж:</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[100, 250, 500, 1000, 2500, 5000].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuantity(q)}
                      className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                        quantity === q
                          ? "bg-[#00A651] text-white border-[#00A651]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#00A651]"
                      }`}
                    >
                      {q.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 100)}
                  placeholder="Інший тираж..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#00A651]"
                />
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-gray-600">Ціна за шт.:</span>
                  <span className="text-lg font-medium">{pricePerUnit.toFixed(2)} ₴</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-900 font-medium">Разом:</span>
                  <span className="text-2xl font-bold text-[#00A651]">{totalPrice.toLocaleString()} ₴</span>
                </div>
              </div>

              <Button className="w-full bg-[#00A651] hover:bg-[#00913D] text-white mb-3 gap-2">
                <ShoppingCart className="w-5 h-5" />
                Замовити
              </Button>

              <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
                <Link href="/contacts">
                  <MessageSquare className="w-5 h-5" />
                  Отримати консультацію
                </Link>
              </Button>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <Button variant="outline" size="sm" className="gap-1.5 bg-transparent" onClick={handleSave}>
                  {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  {saved ? "Збережено" : "Зберегти"}
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 bg-transparent" onClick={handleCopy}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Скопійовано" : "Копіювати"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        {product.content && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Опис продукту</h2>
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
