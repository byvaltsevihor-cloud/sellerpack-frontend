'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { MobileMenu } from './mobile-menu'
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

interface MobileMenuWrapperProps {
  items: MenuItem[]
  lang?: Locale
}

export function MobileMenuWrapper({ items, lang = 'uk' }: MobileMenuWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      <MobileMenu
        items={items}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lang={lang}
      />
    </>
  )
}
