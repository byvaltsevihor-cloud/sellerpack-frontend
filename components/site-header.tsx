import Link from "next/link"
import { Search, ShoppingCart, Truck, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNavigation } from "@/components/main-navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { type Locale } from "@/lib/i18n"

interface SiteHeaderProps {
  lang?: Locale
}

export async function SiteHeader({ lang = 'uk' }: SiteHeaderProps) {
  const t = {
    topBar: lang === 'uk' ? [
      'Швидкі терміни виробництва',
      'Створіть унікальний дизайн',
      'Гарантія якості',
      'Персоналізація під ваш бренд',
      'Великі тиражі за вигідними цінами'
    ] : [
      'Fast production times',
      'Create unique design',
      'Quality guarantee',
      'Personalization for your brand',
      'Large runs at great prices'
    ],
    search: lang === 'uk' ? 'Пошук товарів...' : 'Search for a product...',
    login: lang === 'uk' ? 'Увійти' : 'Login',
  }

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#f4f4f4] text-gray-700 text-[10px] md:text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4 md:gap-6 overflow-x-auto whitespace-nowrap no-scrollbar">
            {t.topBar.map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
          <div className="hidden md:flex items-center pl-4">
            <LanguageSwitcher currentLang={lang} />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b py-4 md:py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-4 md:gap-8">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight whitespace-nowrap">Sellerpack</span>
              <span className="text-[10px] text-gray-500 tracking-[0.15em] uppercase whitespace-nowrap">Customised Printing Solutions</span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 w-full relative">
            <Input
              type="search"
              placeholder={t.search}
              className="w-full pl-4 pr-10 py-6 rounded-full border-gray-300 bg-gray-50"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-[#78be20] hover:bg-[#6aa81c] h-10 w-10"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            <Button className="bg-[#78be20] hover:bg-[#6aa81c] text-white rounded-full px-6 font-semibold hidden md:flex">
              {t.login}
            </Button>
            <div className="flex items-center gap-4 text-gray-600">
              <button className="flex flex-col items-center gap-1 hover:text-[#78be20]">
                <div className="relative">
                  <div className="border-2 border-current rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs font-bold">
                    vs
                  </div>
                </div>
              </button>
              <button className="flex flex-col items-center gap-1 hover:text-[#78be20]">
                <Truck className="h-6 w-6" />
              </button>
              <button className="flex flex-col items-center gap-1 hover:text-[#78be20]">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button className="md:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation with Mega Menu */}
      <div className="border-b hidden md:block">
        <div className="container mx-auto px-4">
          <MainNavigation lang={lang} />
        </div>
      </div>
    </header>
  )
}
