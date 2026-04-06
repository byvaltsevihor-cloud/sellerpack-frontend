'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ChevronRight } from 'lucide-react'

interface MenuItem {
  id: string
  label: string
  url: string
  path: string
  parentId: string | null
  cssClasses: string[]
  target?: string
}

import { type Locale } from '@/lib/i18n/config'

interface MobileMenuProps {
  items: MenuItem[]
  isOpen: boolean
  onClose: () => void
  lang?: Locale
}

export function MobileMenu({ items, isOpen, onClose, lang = 'uk' }: MobileMenuProps) {
  const pathname = usePathname()

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const isActive = (itemPath: string) => {
    if (itemPath === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(itemPath)
  }

  const handleLinkClick = () => {
    onClose()
  }

  // Filter top-level items
  const topLevelItems = items.filter(item => !item.parentId)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white z-50
          shadow-2xl transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">{lang === 'uk' ? 'Меню' : 'Menu'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-73px)]">
          <ul className="space-y-2">
            {topLevelItems.map((item) => {
              const active = isActive(item.path)

              return (
                <li key={item.id}>
                  <Link
                    href={item.path || item.url}
                    target={item.target}
                    onClick={handleLinkClick}
                    className={`
                      flex items-center justify-between p-3 rounded-lg
                      transition-colors
                      ${active
                        ? 'bg-[#78be20] text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-400'}`} />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Additional Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                href={`/${lang}/contact`}
                onClick={handleLinkClick}
                className="block w-full bg-[#78be20] text-white text-center py-3 px-4 rounded-lg font-semibold hover:bg-[#6aa81c] transition-colors"
              >
                {lang === 'uk' ? "Зв'язатися з Нами" : 'Contact Us'}
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
            <p className="mb-2">
              <strong>Email:</strong><br />
              info@sellerpack.com.ua
            </p>
            <p>
              <strong>{lang === 'uk' ? 'Телефон' : 'Phone'}:</strong><br />
              +380 (XX) XXX-XX-XX
            </p>
          </div>
        </nav>
      </div>
    </>
  )
}
