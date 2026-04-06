'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { fetchGraphQL } from '@/lib/graphql'
import { SEARCH_PRODUCTS_BY_LANGUAGE, SEARCH_PRODUCTS } from '@/lib/queries'
import Link from 'next/link'
import { type Locale, type Dictionary, localeToGraphQL } from '@/lib/i18n'

interface SearchResult {
  id: string
  title: string
  slug: string
  excerpt: string
  sku?: string
  price?: string
  featuredImage?: {
    node: {
      sourceUrl: string
    }
  }
}

interface SearchBarProps {
  lang?: Locale
  dict?: Dictionary
}

export function SearchBar({ lang = 'uk', dict }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  const t = {
    placeholder: dict?.header?.searchPlaceholder || (lang === 'uk' ? 'Пошук товарів...' : 'Search products...'),
    searching: lang === 'uk' ? 'Шукаємо...' : 'Searching...',
    noResults: lang === 'uk' ? 'Нічого не знайдено за запитом' : 'Nothing found for',
    tryAnother: lang === 'uk' ? 'Спробуйте інший запит' : 'Try another search',
    showAll: lang === 'uk' ? 'Показати всі результати' : 'Show all results',
    currency: lang === 'uk' ? 'грн' : 'UAH',
  }

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        handleSearch(query)
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      // Try language-specific search first
      const graphqlLang = localeToGraphQL[lang]
      let data = await fetchGraphQL<{ sellerpackProducts: { nodes: SearchResult[] } }>(
        SEARCH_PRODUCTS_BY_LANGUAGE,
        { search: searchQuery, language: graphqlLang, first: 5 }
      )

      // Fallback to non-language search if no results
      if (!data.sellerpackProducts?.nodes?.length) {
        data = await fetchGraphQL<{ sellerpackProducts: { nodes: SearchResult[] } }>(
          SEARCH_PRODUCTS,
          { search: searchQuery, first: 5 }
        )
      }

      setResults(data.sellerpackProducts?.nodes || [])
      setIsOpen(true)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${lang}/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="flex-1 w-full relative">
      <form onSubmit={handleSubmit}>
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          className="w-full pl-4 pr-10 py-6 rounded-full border-gray-300 bg-gray-50"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <Button
          type="submit"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-[#78be20] hover:bg-[#6aa81c] h-10 w-10"
        >
          <Search className="h-5 w-5 text-white" />
        </Button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#78be20] mx-auto"></div>
              <p className="mt-2 text-sm">{t.searching}</p>
            </div>
          ) : results.length > 0 ? (
            <>
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/${lang}/products/${result.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                >
                  <img
                    src={result.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
                    alt={result.title}
                    className="w-16 h-16 object-cover rounded-sm border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
                    {result.sku && (
                      <p className="text-xs text-gray-500">SKU: {result.sku}</p>
                    )}
                    {result.price && (
                      <p className="text-sm text-[#78be20] font-semibold mt-1">
                        {result.price} {t.currency}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
              <Link
                href={`/${lang}/search?q=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="block p-4 text-center text-[#78be20] hover:bg-gray-50 font-medium"
              >
                {t.showAll} →
              </Link>
            </>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p>{t.noResults} "{query}"</p>
              <p className="text-sm mt-1">{t.tryAnother}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
