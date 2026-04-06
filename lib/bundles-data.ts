export interface Bundle {
  id: string
  slug: string
  name: string
  industry?: string // Галузь (якщо галузевий комплект)
  description: string
  discount: number // Знижка у відсотках
  items: {
    productSlug: string
    name: string
    quantity: number
    basePrice: number
  }[]
  image: string
  popular?: boolean
  seasonal?: boolean
}

export interface Industry {
  id: string
  slug: string
  name: string
  icon: string
  description: string
  popularProducts: string[] // slugs продуктів
}

// Галузі клієнтів
export const industries: Industry[] = [
  {
    id: "horeca",
    slug: "horeca",
    name: "Ресторани / Кафе / HoReCa",
    icon: "🍽️",
    description: "Меню, підставки, серветки, візитки",
    popularProducts: ["vizytky", "flayery", "nalipky", "pakety-z-drukom"],
  },
  {
    id: "it",
    slug: "it-tech",
    name: "IT / Технології",
    icon: "💻",
    description: "Стікери, футболки, блокноти, візитки",
    popularProducts: ["vizytky", "nalipky", "futbolky", "bloknoty", "powerbank"],
  },
  {
    id: "medical",
    slug: "medycyna",
    name: "Медицина / Клініки",
    icon: "🏥",
    description: "Бланки, папки, візитки, таблички",
    popularProducts: ["vizytky", "flayery", "papky", "bloknoty"],
  },
  {
    id: "construction",
    slug: "budivnytstvo",
    name: "Будівництво",
    icon: "🏗️",
    description: "Банери, жилети, каски, візитки",
    popularProducts: ["vizytky", "banery", "futbolky", "roll-apy"],
  },
  {
    id: "beauty",
    slug: "krasa-salony",
    name: "Краса / Салони",
    icon: "💅",
    description: "Візитки, сертифікати, прайси, флаєри",
    popularProducts: ["vizytky", "flayery", "buklety", "nalipky"],
  },
  {
    id: "education",
    slug: "osvita",
    name: "Освіта",
    icon: "📚",
    description: "Блокноти, ручки, папки, сертифікати",
    popularProducts: ["bloknoty", "ruchky", "papky", "flayery"],
  },
  {
    id: "events",
    slug: "iventy",
    name: "Івенти / Організатори",
    icon: "🎪",
    description: "Бейджі, банери, ролл-апи, футболки",
    popularProducts: ["roll-apy", "banery", "futbolky", "nalipky"],
  },
  {
    id: "retail",
    slug: "rozdribna-torgivlia",
    name: "Роздрібна торгівля",
    icon: "🛒",
    description: "Цінники, пакети, стікери, вивіски",
    popularProducts: ["nalipky", "pakety-z-drukom", "banery", "flayery"],
  },
]

// Готові комплекти
export const bundles: Bundle[] = [
  // Галузеві комплекти
  {
    id: "horeca-start",
    slug: "horeca-start",
    name: "HoReCa Старт",
    industry: "horeca",
    description: "Базовий набір для ресторану чи кафе",
    discount: 15,
    items: [
      { productSlug: "vizytky", name: "Візитки", quantity: 500, basePrice: 450 },
      { productSlug: "flayery", name: "Меню А4", quantity: 10, basePrice: 800 },
      { productSlug: "nalipky", name: "Наліпки на упаковку", quantity: 500, basePrice: 600 },
      { productSlug: "pakety-z-drukom", name: "Пакети паперові", quantity: 200, basePrice: 1200 },
    ],
    image: "/restaurant-menu-table-tent-coasters.jpg",
    popular: true,
  },
  {
    id: "horeca-pro",
    slug: "horeca-pro",
    name: "HoReCa Про",
    industry: "horeca",
    description: "Розширений набір для закладу з повним брендингом",
    discount: 18,
    items: [
      { productSlug: "vizytky", name: "Візитки", quantity: 1000, basePrice: 750 },
      { productSlug: "flayery", name: "Меню А4", quantity: 20, basePrice: 1500 },
      { productSlug: "nalipky", name: "Наліпки на упаковку", quantity: 1000, basePrice: 1000 },
      { productSlug: "pakety-z-drukom", name: "Пакети паперові", quantity: 500, basePrice: 2500 },
      { productSlug: "futbolky", name: "Футболки персоналу", quantity: 10, basePrice: 1500 },
      { productSlug: "chashky", name: "Чашки з логотипом", quantity: 50, basePrice: 1250 },
    ],
    image: "/restaurant-menu-table-tent-coasters.jpg",
    popular: true,
  },
  {
    id: "tech-pack",
    slug: "tech-pack",
    name: "Tech Pack",
    industry: "it",
    description: "Набір для IT-компанії чи стартапу",
    discount: 12,
    items: [
      { productSlug: "vizytky", name: "Візитки", quantity: 500, basePrice: 450 },
      { productSlug: "nalipky", name: "Стікери", quantity: 300, basePrice: 400 },
      { productSlug: "futbolky", name: "Футболки", quantity: 20, basePrice: 3000 },
      { productSlug: "bloknoty", name: "Блокноти", quantity: 50, basePrice: 1250 },
      { productSlug: "powerbank", name: "Powerbank", quantity: 10, basePrice: 2000 },
    ],
    image: "/promotional-t-shirts-mugs-pens-souvenirs.jpg",
    popular: true,
  },
  {
    id: "clinic-pack",
    slug: "clinic-pack",
    name: "Клініка",
    industry: "medical",
    description: "Набір для медичного закладу",
    discount: 10,
    items: [
      { productSlug: "vizytky", name: "Візитки лікарів", quantity: 1000, basePrice: 750 },
      { productSlug: "flayery", name: "Інформаційні листівки", quantity: 500, basePrice: 600 },
      { productSlug: "papky", name: "Папки для документів", quantity: 100, basePrice: 1500 },
      { productSlug: "bloknoty", name: "Блокноти з логотипом", quantity: 100, basePrice: 1800 },
    ],
    image: "/business-cards-premium-stack-white-background-prof.jpg",
  },
  {
    id: "beauty-pack",
    slug: "beauty-pack",
    name: "Салон Краси",
    industry: "beauty",
    description: "Набір для салону краси чи барбершопу",
    discount: 12,
    items: [
      { productSlug: "vizytky", name: "Візитки", quantity: 500, basePrice: 450 },
      { productSlug: "flayery", name: "Флаєри акційні", quantity: 500, basePrice: 500 },
      { productSlug: "buklety", name: "Прайс-буклети", quantity: 50, basePrice: 600 },
      { productSlug: "nalipky", name: "Наліпки на продукцію", quantity: 300, basePrice: 400 },
    ],
    image: "/flyers-colorful-stack-promotional-materials.jpg",
  },
  {
    id: "builder-pack",
    slug: "builder-pack",
    name: "Будівельник",
    industry: "construction",
    description: "Набір для будівельної компанії",
    discount: 15,
    items: [
      { productSlug: "vizytky", name: "Візитки", quantity: 1000, basePrice: 750 },
      { productSlug: "banery", name: "Банер 3x2м", quantity: 2, basePrice: 2400 },
      { productSlug: "futbolky", name: "Футболки робочі", quantity: 20, basePrice: 3000 },
      { productSlug: "roll-apy", name: "Ролл-ап", quantity: 1, basePrice: 1200 },
    ],
    image: "/large-format-banner-printing.jpg",
  },
  {
    id: "event-pack",
    slug: "event-pack",
    name: "Івент Організатор",
    industry: "events",
    description: "Набір для організації заходів",
    discount: 20,
    items: [
      { productSlug: "roll-apy", name: "Ролл-апи", quantity: 3, basePrice: 3600 },
      { productSlug: "banery", name: "Прес-вол 3x2м", quantity: 1, basePrice: 1800 },
      { productSlug: "futbolky", name: "Футболки волонтерів", quantity: 30, basePrice: 4500 },
      { productSlug: "nalipky", name: "Бейджі-наліпки", quantity: 200, basePrice: 300 },
    ],
    image: "/roll-up-banner-exhibition-stand.jpg",
    popular: true,
  },
  {
    id: "retail-pack",
    slug: "retail-pack",
    name: "Магазин",
    industry: "retail",
    description: "Набір для роздрібної точки",
    discount: 15,
    items: [
      { productSlug: "nalipky", name: "Цінники-наліпки", quantity: 500, basePrice: 500 },
      { productSlug: "pakety-z-drukom", name: "Пакети з логотипом", quantity: 500, basePrice: 2500 },
      { productSlug: "banery", name: "Вивіска", quantity: 1, basePrice: 1200 },
      { productSlug: "flayery", name: "Флаєри акційні", quantity: 1000, basePrice: 800 },
    ],
    image: "/branded-packaging-bags-boxes.jpg",
  },

  // Універсальні комплекти
  {
    id: "starter-pack",
    slug: "starter-pack",
    name: "Стартовий пакет",
    description: "Базовий набір для нової компанії",
    discount: 10,
    items: [
      { productSlug: "vizytky", name: "Візитки", quantity: 500, basePrice: 450 },
      { productSlug: "flayery", name: "Фірмові бланки А4", quantity: 500, basePrice: 600 },
      { productSlug: "papky", name: "Папки для документів", quantity: 50, basePrice: 750 },
      { productSlug: "bloknoty", name: "Блокноти А5", quantity: 50, basePrice: 750 },
    ],
    image: "/business-cards-premium-stack-white-background-prof.jpg",
    popular: true,
  },
  {
    id: "exhibition-pack",
    slug: "exhibition-pack",
    name: "Виставковий",
    description: "Набір для участі у виставці",
    discount: 15,
    items: [
      { productSlug: "roll-apy", name: "Ролл-апи", quantity: 2, basePrice: 2400 },
      { productSlug: "vizytky", name: "Візитки", quantity: 1000, basePrice: 750 },
      { productSlug: "flayery", name: "Флаєри А5", quantity: 500, basePrice: 500 },
      { productSlug: "ruchky", name: "Ручки з логотипом", quantity: 100, basePrice: 800 },
      { productSlug: "sumky", name: "Сумки-шопери", quantity: 50, basePrice: 1500 },
    ],
    image: "/roll-up-banner-exhibition-stand.jpg",
    popular: true,
  },
  {
    id: "corporate-gift",
    slug: "corporate-gift",
    name: "Корпоративний подарунок",
    description: "Набір подарунків для клієнтів та партнерів",
    discount: 18,
    items: [
      { productSlug: "bloknoty", name: "Щоденники", quantity: 20, basePrice: 1600 },
      { productSlug: "ruchky", name: "Ручки преміум", quantity: 20, basePrice: 600 },
      { productSlug: "chashky", name: "Чашки", quantity: 20, basePrice: 500 },
      { productSlug: "pakety-z-drukom", name: "Подарункові пакети", quantity: 20, basePrice: 400 },
    ],
    image: "/promotional-gifts-mugs-pens.jpg",
  },
  {
    id: "new-year-pack",
    slug: "new-year-pack",
    name: "Новорічний",
    description: "Сезонний набір до новорічних свят",
    discount: 20,
    items: [
      { productSlug: "kalendari-kvartalni", name: "Календарі квартальні", quantity: 50, basePrice: 3500 },
      { productSlug: "kalendari-nastilni", name: "Календарі настільні", quantity: 50, basePrice: 1500 },
      { productSlug: "bloknoty", name: "Щоденники 2026", quantity: 30, basePrice: 2400 },
      { productSlug: "flayery", name: "Новорічні листівки", quantity: 200, basePrice: 400 },
    ],
    image: "/desk-wall-calendar-quarterly-promotional.jpg",
    seasonal: true,
    popular: true,
  },
  {
    id: "office-minimum",
    slug: "office-minimum",
    name: "Офісний мінімум",
    description: "Базова канцелярія з логотипом",
    discount: 12,
    items: [
      { productSlug: "bloknoty", name: "Блокноти А5", quantity: 100, basePrice: 1500 },
      { productSlug: "ruchky", name: "Ручки", quantity: 100, basePrice: 500 },
      { productSlug: "papky", name: "Папки", quantity: 50, basePrice: 750 },
      { productSlug: "nalipky", name: "Стікери", quantity: 500, basePrice: 500 },
    ],
    image: "/notebook-notepad-business-card-holder-stationery.jpg",
  },
]

// Функції для роботи з комплектами
export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug)
}

export function getBundlesByIndustry(industrySlug: string): Bundle[] {
  const industry = industries.find((i) => i.slug === industrySlug)
  if (!industry) return []
  return bundles.filter((b) => b.industry === industry.id)
}

export function getPopularBundles(): Bundle[] {
  return bundles.filter((b) => b.popular)
}

export function getSeasonalBundles(): Bundle[] {
  return bundles.filter((b) => b.seasonal)
}

export function calculateBundlePrice(bundle: Bundle): { original: number; discounted: number; savings: number } {
  const original = bundle.items.reduce((sum, item) => sum + item.basePrice, 0)
  const discounted = Math.round(original * (1 - bundle.discount / 100))
  const savings = original - discounted
  return { original, discounted, savings }
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}

// Мінімальна знижка для кастомного комплекту
export const CUSTOM_BUNDLE_MIN_ITEMS = 3
export const CUSTOM_BUNDLE_DISCOUNT = 8 // %
