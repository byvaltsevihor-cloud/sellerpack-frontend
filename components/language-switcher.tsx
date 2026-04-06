'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n/config'
import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface LanguageSwitcherProps {
  currentLang: Locale
  variant?: 'default' | 'dark'
}

export function LanguageSwitcher({ currentLang, variant = 'default' }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get the path without the current locale
  const getLocalizedPath = (locale: Locale) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split('/')
    segments[1] = locale // Replace the locale segment
    return segments.join('/')
  }

  const isDark = variant === 'dark'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isDark
            ? 'text-white hover:bg-white/10'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{localeFlags[currentLang]}</span>
        <span className="text-sm font-medium hidden sm:inline">
          {currentLang.toUpperCase()}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg py-1 z-50 ${
            isDark ? 'bg-[#2a2a2a] border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          {locales.map((locale) => (
            <Link
              key={locale}
              href={getLocalizedPath(locale)}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                locale === currentLang
                  ? isDark
                    ? 'bg-[#78be20]/20 text-[#78be20]'
                    : 'bg-[#78be20]/10 text-[#78be20]'
                  : isDark
                  ? 'text-gray-300 hover:bg-white/10'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{localeFlags[locale]}</span>
              <span>{localeNames[locale]}</span>
              {locale === currentLang && (
                <span className="ml-auto text-[#78be20]">✓</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
