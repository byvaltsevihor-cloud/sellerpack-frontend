'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Folder, FolderOpen, Menu, X } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface CategoryChild {
  id: string
  databaseId: number
  name: string
  slug: string
  description?: string
  count?: number
  categoryImage?: string
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
  parent?: {
    node: {
      id: string
      databaseId: number
      name: string
      slug: string
    }
  }
  children?: {
    nodes: CategoryChild[]
  }
}

interface CategorySidebarProps {
  categories: Category[]
  currentCategorySlug: string
  lang: Locale
}

interface CategoryTreeItemProps {
  category: Category
  currentCategorySlug: string
  lang: Locale
  level: number
  expandedCategories: Set<string>
  onToggle: (slug: string) => void
}

function CategoryTreeItem({
  category,
  currentCategorySlug,
  lang,
  level,
  expandedCategories,
  onToggle,
}: CategoryTreeItemProps) {
  const hasChildren = category.children?.nodes && category.children.nodes.length > 0
  const isExpanded = expandedCategories.has(category.slug)
  const isActive = category.slug === currentCategorySlug
  const isChildActive = category.children?.nodes?.some(
    (child) => child.slug === currentCategorySlug
  )

  return (
    <div>
      <div
        className={`
          flex items-center gap-2 py-2 px-3 rounded-lg transition-all
          ${isActive
            ? 'bg-[#78be20] text-white font-semibold'
            : isChildActive
            ? 'bg-[#78be20]/10 text-[#78be20] font-medium'
            : 'hover:bg-gray-100 text-gray-700'
          }
        `}
        style={{ paddingLeft: `${12 + level * 16}px` }}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onToggle(category.slug)
            }}
            className={`p-0.5 rounded transition-colors ${
              isActive ? 'hover:bg-white/20' : 'hover:bg-gray-200'
            }`}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}

        {!hasChildren && (
          <span className="w-5" /> // Spacer for alignment
        )}

        {hasChildren ? (
          isExpanded ? (
            <FolderOpen className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#78be20]'}`} />
          ) : (
            <Folder className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
          )
        ) : null}

        <Link
          href={`/${lang}/category/${category.slug}`}
          className="flex-1 flex items-center justify-between"
        >
          <span className="text-sm">{category.name}</span>
          {category.count !== undefined && (
            <span
              className={`text-xs px-1.5 py-0.5 rounded ${
                isActive
                  ? 'bg-white/20'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {category.count}
            </span>
          )}
        </Link>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-2 border-l border-gray-200">
          {category.children!.nodes.map((child) => (
            <div
              key={child.id}
              className={`
                flex items-center gap-2 py-2 px-3 rounded-lg transition-all ml-2
                ${child.slug === currentCategorySlug
                  ? 'bg-[#78be20] text-white font-semibold'
                  : 'hover:bg-gray-100 text-gray-700'
                }
              `}
              style={{ paddingLeft: `${12 + (level + 1) * 16}px` }}
            >
              <Link
                href={`/${lang}/category/${child.slug}`}
                className="flex-1 flex items-center justify-between"
              >
                <span className="text-sm">{child.name}</span>
                {child.count !== undefined && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      child.slug === currentCategorySlug
                        ? 'bg-white/20'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {child.count}
                  </span>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function CategorySidebar({
  categories,
  currentCategorySlug,
  lang,
}: CategorySidebarProps) {
  // Build tree structure - only parent categories (no parentDatabaseId)
  const parentCategories = useMemo(() => {
    return categories.filter((cat) => !cat.parentDatabaseId || cat.parentDatabaseId === 0)
  }, [categories])

  // Find current category and its parent
  const currentCategory = categories.find((cat) => cat.slug === currentCategorySlug)
  const currentParentSlug = currentCategory?.parent?.node?.slug

  // Initialize expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    // Expand parent of current category
    if (currentParentSlug) {
      initial.add(currentParentSlug)
    }
    // If current is parent, expand it
    if (currentCategory && !currentCategory.parentDatabaseId) {
      initial.add(currentCategorySlug)
    }
    return initial
  })

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }

  const translations = {
    uk: {
      categories: 'Категорії',
      allProducts: 'Усі товари',
    },
    en: {
      categories: 'Categories',
      allProducts: 'All Products',
    },
  }

  const t = translations[lang]

  const sidebarContent = (
    <div className="space-y-1">
      {/* All Products Link */}
      <Link
        href={`/${lang}/products`}
        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-all"
      >
        <span className="text-sm font-medium">{t.allProducts}</span>
      </Link>

      <div className="border-t border-gray-200 my-2" />

      {/* Category Tree */}
      {parentCategories.map((category) => (
        <CategoryTreeItem
          key={category.id}
          category={category}
          currentCategorySlug={currentCategorySlug}
          lang={lang}
          level={0}
          expandedCategories={expandedCategories}
          onToggle={toggleCategory}
        />
      ))}
    </div>
  )

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
      >
        <span className="flex items-center gap-2 font-medium">
          <Menu className="w-4 h-4" />
          {t.categories}
        </span>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Folder className="w-5 h-5 text-[#78be20]" />
                {t.categories}
              </h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">{sidebarContent}</div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Folder className="w-5 h-5 text-[#78be20]" />
          {t.categories}
        </h3>
        {sidebarContent}
      </div>
    </>
  )
}
