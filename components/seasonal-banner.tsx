"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Calendar, AlertTriangle, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SeasonalBanner {
  id: string
  type: "reminder" | "deadline" | "promo"
  title: string
  description: string
  link: string
  linkText: string
  startDate: string // MM-DD
  endDate: string // MM-DD
  bgColor: string
  icon: "calendar" | "alert" | "gift"
}

const seasonalBanners: SeasonalBanner[] = [
  {
    id: "calendars-2026",
    type: "reminder",
    title: "Час замовляти календарі на 2026 рік",
    description: "Замовте квартальні та настільні календарі заздалегідь для гарантованої доставки до Нового року",
    link: "/product/kalendari-kvartalni",
    linkText: "Переглянути календарі",
    startDate: "09-01",
    endDate: "11-15",
    bgColor: "bg-blue-50 border-blue-200",
    icon: "calendar",
  },
  {
    id: "new-year-deadline",
    type: "deadline",
    title: "Приймаємо замовлення до 12 грудня",
    description: "Щоб встигнути до новорічних свят, оформіть замовлення до 12 грудня включно",
    link: "/bundles/new-year-pack",
    linkText: "Новорічний комплект",
    startDate: "12-01",
    endDate: "12-12",
    bgColor: "bg-red-50 border-red-200",
    icon: "alert",
  },
  {
    id: "corporate-gifts",
    type: "promo",
    title: "Корпоративні подарунки до свят",
    description: "Готові подарункові набори для клієнтів та партнерів зі знижкою до 20%",
    link: "/bundles/corporate-gift",
    linkText: "Переглянути подарунки",
    startDate: "11-01",
    endDate: "12-25",
    bgColor: "bg-[#00A651]/10 border-[#00A651]/30",
    icon: "gift",
  },
  {
    id: "exhibition-season",
    type: "reminder",
    title: "Підготуйтесь до виставкового сезону",
    description: "Ролл-апи, банери та промо-матеріали для весняних виставок",
    link: "/bundles/exhibition-pack",
    linkText: "Виставковий комплект",
    startDate: "02-01",
    endDate: "04-30",
    bgColor: "bg-purple-50 border-purple-200",
    icon: "calendar",
  },
]

export function SeasonalBanner() {
  const [activeBanner, setActiveBanner] = useState<SeasonalBanner | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Перевіряємо чи банер вже закрили
    const dismissedBanners = JSON.parse(localStorage.getItem("dismissedBanners") || "[]")

    const today = new Date()
    const currentMonth = String(today.getMonth() + 1).padStart(2, "0")
    const currentDay = String(today.getDate()).padStart(2, "0")
    const currentDate = `${currentMonth}-${currentDay}`

    // Знаходимо активний банер
    const active = seasonalBanners.find((banner) => {
      if (dismissedBanners.includes(banner.id)) return false

      const start = banner.startDate
      const end = banner.endDate

      // Проста перевірка дат (без врахування переходу через рік)
      if (start <= end) {
        return currentDate >= start && currentDate <= end
      } else {
        // Перехід через рік (наприклад, 11-01 до 01-15)
        return currentDate >= start || currentDate <= end
      }
    })

    setActiveBanner(active || null)
  }, [])

  const handleDismiss = () => {
    if (activeBanner) {
      const dismissedBanners = JSON.parse(localStorage.getItem("dismissedBanners") || "[]")
      dismissedBanners.push(activeBanner.id)
      localStorage.setItem("dismissedBanners", JSON.stringify(dismissedBanners))
    }
    setDismissed(true)
  }

  if (!activeBanner || dismissed) return null

  const IconComponent = {
    calendar: Calendar,
    alert: AlertTriangle,
    gift: Gift,
  }[activeBanner.icon]

  return (
    <div className={`border-b ${activeBanner.bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <IconComponent
              className={`w-5 h-5 flex-shrink-0 ${
                activeBanner.type === "deadline" ? "text-red-600" : "text-[#00A651]"
              }`}
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="font-semibold text-gray-900">{activeBanner.title}</span>
              <span className="text-sm text-gray-600 hidden md:inline">{activeBanner.description}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="bg-[#00A651] hover:bg-[#00913D] text-xs">
              <Link href={activeBanner.link}>{activeBanner.linkText}</Link>
            </Button>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Закрити"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
