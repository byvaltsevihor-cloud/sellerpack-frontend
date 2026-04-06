"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header, MenuCategory } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecentlyViewed } from "@/components/recently-viewed"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  Users,
  Zap,
  Truck,
  Printer,
  Shirt,
  Gift,
  Package,
  BarChart3,
  MessageSquare,
  X,
  Send,
} from "lucide-react"
import { getPopularBundles, calculateBundlePrice, industries } from "@/lib/bundles-data"

// Types for WP data
interface WPProduct {
  id: string
  name: string
  slug: string
  description: string
  basePrice: number
  images: string[]
  category: string
  categorySlug: string
}

interface WPCategory {
  id: string
  name: string
  slug: string
  description: string
  count: number
  image: string
}

interface HomeContentProps {
  products: WPProduct[]
  categories: WPCategory[]
  menuCategories: MenuCategory[]
}

const featuredCategoriesFallback = [
  {
    slug: "labels",
    name: "Етикетки",
    description: "Самоклеючі етикетки різних типів",
    image: "/business-cards-premium-stack-white-background-prof.jpg",
    count: 8,
  },
  {
    slug: "special-labels",
    name: "Спеціальні етикетки",
    description: "Голографічні, термо, захисні етикетки",
    image: "/branded-t-shirts-polo-corporate.jpg",
    count: 5,
  },
  {
    slug: "tapes",
    name: "Стрічки",
    description: "Пакувальні стрічки з друком",
    image: "/promotional-gifts-mugs-pens.jpg",
    count: 5,
  },
  {
    slug: "пакування",
    name: "Пакування",
    description: "Коробки, пакети, упаковка",
    image: "/branded-packaging-bags-boxes.jpg",
    count: 3,
  },
]

const testimonials = [
  {
    name: "Олександр К.",
    company: "ТОВ «Промінвест»",
    text: "Замовляємо етикетки вже 3 роки. Якість друку на висоті, завжди вчасно.",
    rating: 5,
  },
  {
    name: "Марина Л.",
    company: "Ресторан «Смачно»",
    text: "Дякуємо за брендовані стікери та меню. Клієнти в захваті від дизайну!",
    rating: 5,
  },
  {
    name: "Ігор В.",
    company: "IT Agency «Digital»",
    text: "Стрічки для пакування отримали вчасно. Нанесення ідеальне.",
    rating: 5,
  },
]

function TrustIndicators() {
  return (
    <div className="flex flex-col gap-4 pt-6 border-t border-gray-200 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:pt-8">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 sm:w-8 sm:h-8"
            >
              {String.fromCharCode(64 + i)}
            </div>
          ))}
          <div className="w-7 h-7 rounded-full bg-[#00A651] border-2 border-white flex items-center justify-center text-xs font-medium text-white sm:w-8 sm:h-8">
            +
          </div>
        </div>
        <div>
          <p className="text-base font-semibold text-gray-900 sm:text-lg">500+</p>
          <p className="text-xs text-gray-500">клієнтів по Україні</p>
        </div>
      </div>

      <div className="hidden h-10 w-px bg-gray-200 sm:block" />

      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#00A651] group-hover:bg-[#00A651]/5 transition-all sm:w-10 sm:h-10">
          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#00A651]" />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-[#00A651] transition-colors">Дізнатись більше</span>
      </div>
    </div>
  )
}

function HeroContent() {
  return (
    <div className="flex flex-col justify-center py-8 sm:py-10 lg:py-20">
      <h1 className="text-3xl font-normal text-gray-900 leading-[1.1] mb-4 tracking-tight sm:text-4xl sm:mb-5 md:text-5xl lg:text-6xl lg:mb-6">
        Друкуємо
        <br />
        <span className="font-medium">ваш успіх</span>
      </h1>

      <p className="text-base text-gray-500 mb-6 max-w-md leading-relaxed sm:text-lg sm:mb-8 lg:mb-10">
        Від візиток до масштабних рекламних кампаній. Повний цикл виробництва брендованої продукції для вашого бізнесу.
      </p>

      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:flex-wrap sm:gap-4 sm:mb-8 lg:mb-10">
        <Button
          asChild
          className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-5 rounded-full text-sm group transition-all duration-300 sm:w-auto sm:px-8 sm:py-6 sm:text-base"
        >
          <Link href="/products">
            Переглянути каталог
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full px-6 py-5 rounded-full text-sm border-gray-300 hover:bg-gray-50 transition-all bg-transparent sm:w-auto sm:px-8 sm:py-6 sm:text-base"
        >
          <Link href="/contacts">Отримати КП</Link>
        </Button>
      </div>

      <TrustIndicators />
    </div>
  )
}

function HeroBentoGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [chatMode, setChatMode] = useState<"idle" | "product" | "visualization">("idle")
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([])
  const [inputValue, setInputValue] = useState("")

  const handleChatModeSelect = (mode: "product" | "visualization") => {
    setChatMode(mode)
    setChatMessages([
      {
        role: "assistant",
        text:
          mode === "product"
            ? "Привіт! Я допоможу підібрати потрібну продукцію. Що вас цікавить?"
            : "Опишіть, яку візуалізацію ви хочете створити, і я її згенерую.",
      },
    ])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    setChatMessages((prev) => [...prev, { role: "user", text: inputValue }])
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: chatMode === "product"
            ? 'Для етикеток рекомендую преміум папір. Зверніться до менеджера для детальної консультації.'
            : "Генерую візуалізацію... (інтеграція з AI буде додана)",
        },
      ])
    }, 1000)
    setInputValue("")
  }

  return (
    <div className="relative h-[400px] sm:h-[450px] lg:h-[550px]" onMouseLeave={() => setHoveredId(null)}>
      <div className="grid grid-cols-2 grid-rows-[auto_auto_auto] gap-2 h-full sm:gap-3 lg:grid-cols-3 lg:grid-rows-[1fr_1fr_1fr]">
        {/* Main large card */}
        <div
          className="col-span-2 row-span-1 rounded-2xl bg-gray-100 p-4 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all duration-500 ease-out sm:rounded-3xl sm:p-5 lg:col-span-2 lg:row-span-2 lg:p-6"
          style={{
            transform: hoveredId === 1 ? "scale(1.02)" : hoveredId ? "scale(0.98)" : "scale(1)",
            opacity: hoveredId && hoveredId !== 1 ? 0.7 : 1,
          }}
          onMouseEnter={() => setHoveredId(1)}
        >
          <div className="mt-auto">
            <span className="inline-block px-2 py-0.5 bg-[#00A651] text-white text-[10px] rounded-full mb-2 sm:px-3 sm:py-1 sm:text-xs sm:mb-3">
              Етикетки та стікери
            </span>
            <h3 className="text-base font-medium text-gray-900 mb-0.5 sm:text-lg sm:mb-1 lg:text-xl">
              Самоклеючі етикетки
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">Професійний друк для вашого бізнесу</p>
          </div>
          <div
            className="absolute bottom-4 right-4 transition-all duration-300 hidden sm:block sm:bottom-6 sm:right-6"
            style={{
              opacity: hoveredId === 1 ? 1 : 0,
              transform: hoveredId === 1 ? "translateY(0)" : "translateY(10px)",
            }}
          >
            <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800" asChild>
              <Link href="/products">
                Переглянути <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* AI Chat card */}
        <div
          className="col-span-2 row-span-1 rounded-2xl bg-white border-2 border-gray-200 p-3 flex flex-col relative overflow-hidden cursor-pointer transition-all duration-500 ease-out sm:rounded-3xl sm:p-4 lg:col-span-1 lg:row-span-1"
          style={{
            transform: hoveredId === 2 ? "scale(1.05)" : hoveredId ? "scale(0.95)" : "scale(1)",
            opacity: hoveredId && hoveredId !== 2 ? 0.7 : 1,
          }}
          onMouseEnter={() => setHoveredId(2)}
        >
          {chatMode === "idle" ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#00A651] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">AI Асистент</p>
                  <p className="text-[10px] text-gray-500">Завжди онлайн</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">Чим можу допомогти?</p>
              <div className="space-y-2">
                <button
                  onClick={() => handleChatModeSelect("product")}
                  className="w-full text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs"
                >
                  <span className="font-medium text-gray-900">🔍 Підібрати продукцію</span>
                  <p className="text-[10px] text-gray-500 mt-0.5">Допоможу знайти потрібні товари</p>
                </button>
                <button
                  onClick={() => handleChatModeSelect("visualization")}
                  className="w-full text-left px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs"
                >
                  <span className="font-medium text-gray-900">✨ Створити візуалізацію</span>
                  <p className="text-[10px] text-gray-500 mt-0.5">Згенерую макет вашого дизайну</p>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#00A651] flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-gray-900">
                    {chatMode === "product" ? "Підбір продукції" : "Візуалізація"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setChatMode("idle")
                    setChatMessages([])
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 mb-2 min-h-0">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`text-[10px] px-2 py-1.5 rounded-lg ${
                      msg.role === "user"
                        ? "bg-[#00A651] text-white ml-auto max-w-[80%]"
                        : "bg-gray-100 text-gray-900 mr-auto max-w-[80%]"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Напишіть повідомлення..."
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#00A651]"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-2 py-1.5 bg-[#00A651] text-white rounded-lg hover:bg-[#00913D] transition-colors"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Stats card */}
        <div
          className="rounded-2xl bg-gray-100 p-3 flex flex-col justify-center relative overflow-hidden cursor-pointer transition-all duration-500 ease-out sm:rounded-3xl sm:p-4"
          style={{
            transform: hoveredId === 3 ? "scale(1.05)" : hoveredId ? "scale(0.95)" : "scale(1)",
            opacity: hoveredId && hoveredId !== 3 ? 0.7 : 1,
          }}
          onMouseEnter={() => setHoveredId(3)}
        >
          <div className="flex items-baseline gap-1 mb-0.5 sm:gap-2 sm:mb-1">
            <span className="text-2xl font-semibold text-gray-900 sm:text-3xl">99%</span>
            <BarChart3 className="w-4 h-4 text-gray-400 sm:w-5 sm:h-5" />
          </div>
          <p className="text-[10px] text-gray-500 sm:text-xs">
            Клієнтів задоволені <span className="font-medium text-gray-900">якістю</span>
          </p>
        </div>

        {/* Sound waves card */}
        <div
          className="rounded-2xl bg-gray-100 p-3 flex items-center gap-2 cursor-pointer transition-all duration-500 ease-out sm:rounded-3xl sm:p-4 sm:gap-3"
          style={{
            transform: hoveredId === 4 ? "scale(1.05)" : hoveredId ? "scale(0.95)" : "scale(1)",
            opacity: hoveredId && hoveredId !== 4 ? 0.7 : 1,
          }}
          onMouseEnter={() => setHoveredId(4)}
        >
          <div className="flex items-end gap-0.5 h-6 sm:h-8">
            {[3, 5, 7, 5, 3].map((h, i) => (
              <div key={i} className="w-0.5 bg-gray-400 rounded-full sm:w-1" style={{ height: `${h * 3}px` }} />
            ))}
          </div>
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <div className="h-1.5 w-10 bg-gray-300 rounded sm:h-2 sm:w-16" />
            <div className="h-1.5 w-8 bg-gray-200 rounded sm:h-2 sm:w-12" />
          </div>
        </div>

        {/* Special labels card */}
        <Link
          href="/category/special-labels"
          className="rounded-2xl bg-[#00A651] p-3 flex flex-col justify-between text-white cursor-pointer transition-all duration-500 ease-out sm:rounded-3xl sm:p-4"
          style={{
            transform: hoveredId === 5 ? "scale(1.05)" : hoveredId ? "scale(0.95)" : "scale(1)",
            opacity: hoveredId && hoveredId !== 5 ? 0.85 : 1,
          }}
          onMouseEnter={() => setHoveredId(5)}
        >
          <Gift className="w-5 h-5 text-white/80 sm:w-6 sm:h-6" />
          <div>
            <p className="text-xs font-medium sm:text-sm">Спеціальні</p>
            <p className="text-[10px] text-white/70 sm:text-xs">етикетки</p>
          </div>
        </Link>

        {/* Packaging card */}
        <Link
          href="/category/пакування"
          className="rounded-2xl bg-gray-100 p-3 flex items-center justify-between cursor-pointer transition-all duration-500 ease-out sm:rounded-3xl sm:p-4"
          style={{
            transform: hoveredId === 6 ? "scale(1.05)" : hoveredId ? "scale(0.95)" : "scale(1)",
            opacity: hoveredId && hoveredId !== 6 ? 0.7 : 1,
          }}
          onMouseEnter={() => setHoveredId(6)}
        >
          <div>
            <Package className="w-5 h-5 text-gray-400 mb-0.5 sm:w-6 sm:h-6 sm:mb-1" />
            <p className="text-xs font-medium text-gray-900 sm:text-sm">Упаковка</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default function HomeContent({ products, categories, menuCategories }: HomeContentProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const popularBundles = getPopularBundles().slice(0, 3)
  const displayProducts = products.length > 0 ? products.slice(0, 8) : []
  const featuredCategories = categories.length > 0 ? categories : featuredCategoriesFallback

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(displayProducts.length / 4))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(displayProducts.length / 4)) % Math.ceil(displayProducts.length / 4))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header categories={menuCategories} />

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:py-16">
          <div className="flex flex-col gap-8 sm:gap-10 lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
            <HeroContent />
            <HeroBentoGrid />
          </div>
        </div>
      </section>

      {/* Bundles Section */}
      <section className="py-16 bg-gradient-to-br from-[#00A651]/5 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E53935]/10 rounded-full mb-4">
                <span className="text-sm font-medium text-[#E53935]">Знижки до 20%</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Готові комплекти</h2>
              <p className="text-gray-600 mt-2">Економте при замовленні готових наборів</p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex bg-transparent">
              <Link href="/bundles">
                Всі комплекти
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {popularBundles.map((bundle) => {
              const price = calculateBundlePrice(bundle)
              return (
                <Link
                  key={bundle.id}
                  href={`/bundles/${bundle.slug}`}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={bundle.image || "/placeholder.svg"}
                      alt={bundle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-[#E53935] text-white text-sm font-bold px-3 py-1 rounded-full">
                      -{bundle.discount}%
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00A651]">{bundle.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bundle.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 line-through">{price.original.toLocaleString()} ₴</p>
                        <p className="text-2xl font-bold text-[#00A651]">{price.discounted.toLocaleString()} ₴</p>
                      </div>
                      <div className="w-10 h-10 bg-[#00A651] rounded-full flex items-center justify-center group-hover:bg-[#00913D] transition-colors">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: `${categories.length || 5}+`, label: "категорій продукції" },
              { number: `${products.length || 15}+`, label: "видів товарів" },
              { number: "500+", label: "задоволених клієнтів" },
              { number: "10+", label: "років досвіду" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-[#00A651] mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Категорії продукції</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Оберіть потрібну категорію та знайдіть ідеальне рішення для вашого бізнесу
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.slice(0, 6).map((category, i) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`group relative rounded-2xl overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className={`relative ${i === 0 ? "h-[500px]" : "h-[240px]"} bg-gray-200`}>
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block bg-[#00A651] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {category.count || 0} товарів
                    </span>
                    <h3 className={`font-bold text-white mb-2 ${i === 0 ? "text-3xl" : "text-xl"}`}>{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      {displayProducts.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Наші товари</h2>
                <p className="text-gray-600">Продукція з WordPress каталогу</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-white hover:border-[#00A651] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 bg-[#00A651] rounded-full flex items-center justify-center hover:bg-[#00913D] transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {displayProducts.slice(currentSlide * 4, currentSlide * 4 + 4).map((product) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="group">
                  <div className="relative bg-white rounded-2xl p-6 mb-4 aspect-square flex items-center justify-center shadow-sm hover:shadow-lg transition-shadow">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-[#00A651] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">від {product.basePrice} ₴/шт.</p>
                  <h3 className="font-medium text-gray-900 group-hover:text-[#00A651] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{product.description}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 rounded-xl border-2 bg-transparent hover:bg-[#00A651] hover:text-white hover:border-[#00A651] transition-all"
              >
                <Link href="/products">
                  Переглянути всі товари
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Чому обирають
                <br />
                <span className="text-[#00A651]">SELLER PACK</span>
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Ми поєднуємо якість друку, швидкість виконання та індивідуальний підхід до кожного клієнта
              </p>

              <div className="space-y-6">
                {[
                  { icon: CheckCircle, title: "Гарантія якості", description: "Сучасне обладнання та контроль на кожному етапі" },
                  { icon: Zap, title: "Швидке виконання", description: "Термінові замовлення від 24 годин" },
                  { icon: Users, title: "Персональний менеджер", description: "Консультації та супровід замовлення" },
                  { icon: Truck, title: "Доставка по Україні", description: "Безкоштовна доставка від 5000 грн" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-[#00A651]/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-[#00A651]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-200 h-[500px] flex items-center justify-center">
                <p className="text-gray-500">Зображення виробництва</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Відгуки клієнтів</h2>
            <p className="text-xl text-gray-600">Що кажуть про нас наші партнери</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#00A651]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Готові почати співпрацю?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Отримайте безкоштовну консультацію та індивідуальну комерційну пропозицію
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-[#00A651] hover:bg-gray-100 text-lg px-8 py-6 rounded-xl">
              <Link href="/contacts">
                Зв'язатися з нами
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl bg-transparent"
            >
              <Link href="/products">Переглянути каталог</Link>
            </Button>
          </div>
        </div>
      </section>

      <RecentlyViewed />
      <Footer />
    </div>
  )
}
