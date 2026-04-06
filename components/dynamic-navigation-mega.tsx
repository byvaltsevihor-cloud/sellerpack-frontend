'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MegaMenu } from './mega-menu'
import { type Locale } from '@/lib/i18n/config'

interface MenuItem {
  id: string
  label: string
  url: string
  path: string
  parentId: string | null
  cssClasses: string[]
  target?: string
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

interface DynamicNavigationWithMegaMenuProps {
  items: MenuItem[]
  categories: Category[]
  featuredProducts: FeaturedProduct[]
  className?: string
  lang?: Locale
}

// Keywords that identify products menu item
const PRODUCTS_KEYWORDS = ['products', 'продукт', 'товар', 'каталог', 'catalog', 'all products', 'всі продукти', 'всі товари']

function isProductsMenuItem(item: MenuItem): boolean {
  const label = item.label.toLowerCase()
  const path = item.path.toLowerCase()

  return PRODUCTS_KEYWORDS.some(keyword =>
    label.includes(keyword) || path.includes('products')
  )
}

export function DynamicNavigationWithMegaMenu({
  items,
  categories,
  featuredProducts,
  className = '',
  lang = 'uk'
}: DynamicNavigationWithMegaMenuProps) {
  const pathname = usePathname()

  // Filter top-level items (no parent)
  const topLevelItems = items.filter(item => !item.parentId)

  const isActive = (itemPath: string) => {
    if (itemPath === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(itemPath)
  }

  return (
    <nav className={className}>
      {topLevelItems.map((item) => {
        const active = isActive(item.path)
        const showMegaMenu = isProductsMenuItem(item) && categories.length > 0

        if (showMegaMenu) {
          return (
            <MegaMenu
              key={item.id}
              categories={categories}
              featuredProducts={featuredProducts}
              lang={lang}
              trigger={<span>{item.label}</span>}
            />
          )
        }

        return (
          <Link
            key={item.id}
            href={item.path || item.url}
            target={item.target}
            className={`
              py-4 border-b-2 transition-colors
              ${active
                ? 'border-[#78be20] text-[#78be20]'
                : 'border-transparent hover:border-[#78be20] hover:text-[#78be20]'
              }
            `}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
