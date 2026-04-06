import { fetchGraphQL } from '@/lib/graphql'
import { GET_MENU, GET_MEGA_MENU_DATA } from '@/lib/queries'
import { DynamicNavigationWithMegaMenu } from './dynamic-navigation-mega'
import { MobileMenuWrapper } from './mobile-menu-wrapper'
import { type Locale, type Dictionary } from '@/lib/i18n'

interface MenuItem {
  id: string
  label: string
  url: string
  path: string
  parentId: string | null
  cssClasses: string[]
  target?: string
}

interface MenuData {
  menus: {
    nodes: {
      id: string
      name: string
      menuItems: {
        nodes: MenuItem[]
      }
    }[]
  }
}

interface Category {
  id: string
  databaseId: number
  name: string
  slug: string
  description?: string
  count?: number
  parentDatabaseId?: number
  categoryImage?: string
}

interface FeaturedProduct {
  id: string
  databaseId: number
  title: string
  slug: string
  popularityScore?: number
  featuredImage?: {
    node: {
      sourceUrl: string
      altText?: string
    }
  }
  productCategories?: {
    nodes: { slug: string }[]
  }
}

interface MegaMenuData {
  productCategories: {
    nodes: Category[]
  }
  sellerpackProducts: {
    nodes: FeaturedProduct[]
  }
}

interface MainNavigationProps {
  lang?: Locale
  dict?: Dictionary
}

async function getMenuItems(lang: Locale = 'uk'): Promise<MenuItem[]> {
  try {
    // Fetch menu without language filter (Polylang not supported for menus in WPGraphQL)
    const data = await fetchGraphQL<MenuData>(GET_MENU)
    const primaryMenu = data.menus?.nodes?.[0]
    const menuItems = primaryMenu?.menuItems?.nodes || []

    // Process paths: remove language prefix and add current lang
    return menuItems.map((item) => {
      let cleanPath = item.path
        .replace(/^\/uk\//, '/')
        .replace(/^\/en\//, '/')

      // If path is just /, make it the home page with lang
      if (cleanPath === '/') {
        cleanPath = `/${lang}`
      } else {
        cleanPath = `/${lang}${cleanPath}`
      }

      return {
        ...item,
        path: cleanPath,
      }
    })
  } catch (error) {
    console.error('Error fetching menu:', error)
    // Fallback to hardcoded menu
    const fallbackItems =
      lang === 'uk'
        ? [
            { id: '1', label: 'Всі Продукти', path: `/${lang}/products` },
            { id: '2', label: 'Про нас', path: `/${lang}/about` },
            { id: '3', label: 'Контакти', path: `/${lang}/contact` },
          ]
        : [
            { id: '1', label: 'All Products', path: `/${lang}/products` },
            { id: '2', label: 'About', path: `/${lang}/about` },
            { id: '3', label: 'Contact', path: `/${lang}/contact` },
          ]

    return fallbackItems.map((item) => ({
      ...item,
      url: item.path,
      parentId: null,
      cssClasses: [],
    }))
  }
}

async function getMegaMenuData(): Promise<{ categories: Category[]; featuredProducts: FeaturedProduct[] }> {
  try {
    const data = await fetchGraphQL<MegaMenuData>(GET_MEGA_MENU_DATA)
    // Sort products by popularity score (highest first) and take top 8
    const sortedProducts = [...(data.sellerpackProducts?.nodes || [])]
      .sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
      .slice(0, 8)
    return {
      categories: data.productCategories?.nodes || [],
      featuredProducts: sortedProducts,
    }
  } catch (error) {
    console.error('Error fetching mega menu data:', error)
    return { categories: [], featuredProducts: [] }
  }
}

export async function MainNavigation({ lang = 'uk', dict }: MainNavigationProps) {
  const [menuItems, megaMenuData] = await Promise.all([
    getMenuItems(lang),
    getMegaMenuData(),
  ])

  return (
    <>
      {/* Desktop Navigation with Mega Menu */}
      <DynamicNavigationWithMegaMenu
        items={menuItems}
        categories={megaMenuData.categories}
        featuredProducts={megaMenuData.featuredProducts}
        className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700"
        lang={lang}
      />

      {/* Mobile Menu Button & Drawer */}
      <div className="md:hidden">
        <MobileMenuWrapper items={menuItems} lang={lang} />
      </div>
    </>
  )
}
