"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SeasonalBanner } from "@/components/seasonal-banner"
import {
  Clock,
  Sparkles,
  CheckCircle,
  Package,
  Zap,
  ShoppingCart,
  QrCode,
  Truck,
  ChevronDown,
  Search,
  Menu,
  X,
  ArrowRight,
} from "lucide-react"

export interface MenuCategory {
  title: string
  href: string
  items: { name: string; slug: string }[]
  featured: {
    image: string
    title: string
    description: string
  }
}

export interface HeaderProps {
  categories?: MenuCategory[]
}

// Fallback categories (used when WP data not available)
const defaultMenuCategories: MenuCategory[] = [
  {
    title: "Друкована продукція",
    href: "/category/drukovana-produktsiia",
    items: [
      { name: "Візитки", slug: "vizytky" },
      { name: "Флаєри та листівки", slug: "flayery" },
      { name: "Буклети", slug: "buklety" },
      { name: "Каталоги", slug: "katalogy" },
      { name: "Плакати та постери", slug: "plakaty" },
      { name: "Блокноти", slug: "bloknoty" },
      { name: "Календарі квартальні", slug: "kalendari-kvartalni" },
      { name: "Календарі настільні", slug: "kalendari-nastilni" },
    ],
    featured: {
      image: "/business-cards-premium-stack-white-background-prof.jpg",
      title: "Популярне",
      description: "Візитки преміум якості",
    },
  },
  {
    title: "Стикери та етикетки",
    href: "/category/stykery-ta-etyketky",
    items: [
      { name: "Наліпки (стікери)", slug: "nalipky" },
      { name: "Етикетки в рулонах", slug: "etyketky-v-rulonakh" },
      { name: "Голографічні наліпки", slug: "holohrafichni-nalipky" },
    ],
    featured: {
      image: "/product-stickers-labels.jpg",
      title: "Новинка",
      description: "Голографічні наліпки",
    },
  },
  {
    title: "Широкоформатний друк",
    href: "/category/shyrokoformatnyi-druk",
    items: [
      { name: "Банери", slug: "banery" },
      { name: "Ролл-апи", slug: "roll-apy" },
      { name: "Плівка Oracal", slug: "orakal" },
    ],
    featured: {
      image: "/large-format-banner-printing.jpg",
      title: "Банери",
      description: "Широкоформатний друк",
    },
  },
  {
    title: "Пакування",
    href: "/category/pakuvannia",
    items: [
      { name: "Пакети з друком", slug: "pakety-z-drukom" },
      { name: "Картонні коробки", slug: "korobky" },
      { name: "Папки для документів", slug: "papky" },
    ],
    featured: {
      image: "/branded-packaging-bags-boxes.jpg",
      title: "Брендинг",
      description: "Пакети з логотипом",
    },
  },
  {
    title: "Текстильна продукція",
    href: "/category/tekstylna-produktsiia",
    items: [
      { name: "Футболки", slug: "futbolky" },
      { name: "Поло", slug: "polo" },
      { name: "Худі та світшоти", slug: "khudi" },
      { name: "Кепки", slug: "kepky" },
      { name: "Сумки та шопери", slug: "sumky" },
    ],
    featured: {
      image: "/branded-t-shirts-polo-corporate.jpg",
      title: "Текстиль",
      description: "Футболки з логотипом",
    },
  },
  {
    title: "Сувенірна продукція",
    href: "/category/suvenirna-produktsiia",
    items: [
      { name: "Чашки та кухлі", slug: "chashky" },
      { name: "Ручки", slug: "ruchky" },
      { name: "Powerbank", slug: "powerbank" },
      { name: "USB флешки", slug: "usb-fleshky" },
      { name: "Парасолі", slug: "parasoli" },
    ],
    featured: {
      image: "/promotional-gifts-mugs-pens.jpg",
      title: "Подарунки",
      description: "Сувеніри з логотипом",
    },
  },
  {
    title: "Рекламні конструкції",
    href: "/category/reklamni-konstruktsii",
    items: [
      { name: "Ролл-апи", slug: "roll-apy" },
      { name: "Х-банери", slug: "x-banery" },
      { name: "Прес-воли", slug: "pres-voly" },
      { name: "Штендери", slug: "shtendery" },
      { name: "Лайтбокси", slug: "laitboksy" },
      { name: "Прапори", slug: "prapory" },
    ],
    featured: {
      image: "/roll-up-banner-exhibition-stand.jpg",
      title: "Виставки",
      description: "Рекламні конструкції",
    },
  },
]

export function Header({ categories }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Use WP categories if available, otherwise fallback to defaults
  const menuCategories = categories && categories.length > 0 ? categories : defaultMenuCategories

  return (
    <>
      <SeasonalBanner />

      {/* Top Bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-xs text-gray-600">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Швидкий друк 24/7</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Унікальна продукція</span>
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Гарантія якості</span>
              </div>
              <div className="hidden lg:flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                <span>Широкий асортимент</span>
              </div>
              <div className="hidden lg:flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Оперативна доставка</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+380441234567" className="hover:text-[#00A651] transition-colors">
                +38 (044) 123-45-67
              </a>
              <span className="text-gray-300">|</span>
              <span>UA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white py-4 border-b border-gray-100 relative z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-gray-900">SELLER PACK</span>
              <span className="text-[10px] text-gray-500 -mt-0.5">каталог продукції</span>
            </Link>

            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Пошук продукції..."
                  className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651]"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button className="bg-[#00A651] hover:bg-[#00913D] text-white font-semibold rounded-md px-5 gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Увійти
              </Button>
              <button className="p-2 hover:bg-gray-100 rounded-md hidden sm:block">
                <QrCode className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md hidden sm:block">
                <Truck className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-md relative">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#00A651] text-white text-[10px] rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-1">
              {menuCategories.map((category) => (
                <div
                  key={category.title}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(category.title)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={category.href}
                    className="flex items-center gap-1 px-3 py-4 text-sm font-medium text-gray-700 hover:text-[#00A651] transition-colors"
                  >
                    {category.title}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${activeMenu === category.title ? "rotate-180" : ""}`}
                    />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {activeMenu === category.title && (
                    <div className="absolute left-0 top-full w-[600px] bg-white shadow-xl border border-gray-200 rounded-b-lg p-6">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-4">{category.title}</h3>
                          <ul className="space-y-2">
                            {category.items.map((item) => (
                              <li key={item.slug}>
                                <Link
                                  href={`/product/${item.slug}`}
                                  className="text-sm text-gray-600 hover:text-[#00A651] transition-colors"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={category.href}
                            className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#00A651] hover:underline"
                          >
                            Переглянути все
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <img
                            src={category.featured.image || "/placeholder.svg"}
                            alt={category.featured.title}
                            className="w-full h-32 object-contain mb-4"
                          />
                          <span className="inline-block bg-[#00A651] text-white text-xs font-semibold px-2 py-1 rounded mb-2">
                            {category.featured.title}
                          </span>
                          <p className="text-sm text-gray-700">{category.featured.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <Link
                href="/bundles"
                className="px-3 py-4 text-sm font-medium text-[#00A651] hover:text-[#00913D] transition-colors flex items-center gap-1"
              >
                <Package className="w-4 h-4" />
                Комплекти
              </Link>
              <Link
                href="/design"
                className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-[#00A651] transition-colors"
              >
                Дизайн
              </Link>
              <Link
                href="/samples"
                className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-[#00A651] transition-colors"
              >
                Зразки
              </Link>
              <Link
                href="/contacts"
                className="px-3 py-4 text-sm font-medium text-gray-700 hover:text-[#00A651] transition-colors"
              >
                Контакти
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[120px] bg-white z-50 overflow-y-auto">
          <div className="px-4 py-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Пошук продукції..."
                className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#00A651]"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-1">
              <Link
                href="/bundles"
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium text-[#00A651] bg-[#00A651]/10 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package className="w-4 h-4" />
                Комплекти зі знижкою
              </Link>
              {menuCategories.map((category) => (
                <details key={category.title} className="group">
                  <summary className="flex items-center justify-between py-3 px-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 rounded-md">
                    {category.title}
                    <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pl-4 pb-2">
                    {category.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/product/${item.slug}`}
                        className="block py-2 text-sm text-gray-600 hover:text-[#00A651]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Link
                  href="/design"
                  className="block py-3 px-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Дизайн
                </Link>
                <Link
                  href="/samples"
                  className="block py-3 px-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Зразки
                </Link>
                <Link
                  href="/contacts"
                  className="block py-3 px-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Контакти
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
