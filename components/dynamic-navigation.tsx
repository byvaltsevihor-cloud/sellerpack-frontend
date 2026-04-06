'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

interface DynamicNavigationProps {
  items: MenuItem[]
  className?: string
  lang?: Locale
}

export function DynamicNavigation({ items, className = '', lang = 'uk' }: DynamicNavigationProps) {
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
