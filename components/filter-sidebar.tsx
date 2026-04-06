'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Filter, ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

// Filter data types
interface FilterOption {
  slug: string
  name: string
  count?: number
}

// Tier 1: Technical Filters - Materials
const MATERIALS: Record<Locale, FilterOption[]> = {
  uk: [
    { slug: 'coated-paper', name: 'Папір крейдований' },
    { slug: 'offset-paper', name: 'Папір офсетний' },
    { slug: 'kraft-paper', name: 'Крафт папір' },
    { slug: 'vinyl-film', name: 'Вініл/Плівка' },
    { slug: 'raflatac', name: 'Рафлатак' },
    { slug: 'pvc', name: 'ПВХ' },
    { slug: 'fabric', name: 'Тканина/Текстиль' },
    { slug: 'polyester', name: 'Поліестер' },
    { slug: 'thermal-paper', name: 'Термопапір' },
    { slug: 'plastic', name: 'Пластик' },
    { slug: 'metal-foil', name: 'Метал/Фольга' },
    { slug: 'wood', name: 'Дерево' },
  ],
  en: [
    { slug: 'coated-paper', name: 'Coated Paper' },
    { slug: 'offset-paper', name: 'Offset Paper' },
    { slug: 'kraft-paper', name: 'Kraft Paper' },
    { slug: 'vinyl-film', name: 'Vinyl/Film' },
    { slug: 'raflatac', name: 'Raflatac' },
    { slug: 'pvc', name: 'PVC' },
    { slug: 'fabric', name: 'Fabric/Textile' },
    { slug: 'polyester', name: 'Polyester' },
    { slug: 'thermal-paper', name: 'Thermal Paper' },
    { slug: 'plastic', name: 'Plastic' },
    { slug: 'metal-foil', name: 'Metal/Foil' },
    { slug: 'wood', name: 'Wood' },
  ],
}

// Tier 1: Technical Filters - Production Methods
const PRODUCTION_METHODS: Record<Locale, FilterOption[]> = {
  uk: [
    { slug: 'offset-printing', name: 'Офсетний друк' },
    { slug: 'digital-printing', name: 'Цифровий друк' },
    { slug: 'large-format', name: 'Широкоформатний друк' },
    { slug: 'uv-printing', name: 'УФ-друк' },
    { slug: 'sublimation', name: 'Сублімація' },
    { slug: 'flexo-printing', name: 'Флексодрук' },
    { slug: 'screen-printing', name: 'Шовкографія' },
    { slug: 'heat-transfer', name: 'Термотрансфер' },
    { slug: 'dtf-printing', name: 'DTF друк' },
    { slug: 'plotter-cutting', name: 'Плоттерна порізка' },
    { slug: 'laser-cutting', name: 'Лазерна різка' },
    { slug: 'cnc-milling', name: 'Фрезерування' },
    { slug: 'die-cutting', name: 'Вирубка' },
    { slug: 'sewing', name: 'Пошив' },
    { slug: 'embroidery', name: 'Вишивка' },
    { slug: 'engraving', name: 'Гравіювання' },
    { slug: 'embossing', name: 'Тиснення' },
  ],
  en: [
    { slug: 'offset-printing', name: 'Offset Printing' },
    { slug: 'digital-printing', name: 'Digital Printing' },
    { slug: 'large-format', name: 'Large Format' },
    { slug: 'uv-printing', name: 'UV Printing' },
    { slug: 'sublimation', name: 'Sublimation' },
    { slug: 'flexo-printing', name: 'Flexo Printing' },
    { slug: 'screen-printing', name: 'Screen Printing' },
    { slug: 'heat-transfer', name: 'Heat Transfer' },
    { slug: 'dtf-printing', name: 'DTF Printing' },
    { slug: 'plotter-cutting', name: 'Plotter Cutting' },
    { slug: 'laser-cutting', name: 'Laser Cutting' },
    { slug: 'cnc-milling', name: 'CNC Milling' },
    { slug: 'die-cutting', name: 'Die Cutting' },
    { slug: 'sewing', name: 'Sewing' },
    { slug: 'embroidery', name: 'Embroidery' },
    { slug: 'engraving', name: 'Engraving' },
    { slug: 'embossing', name: 'Embossing' },
  ],
}

// Tier 2: Use Case Filters - Industries
const INDUSTRIES: Record<Locale, FilterOption[]> = {
  uk: [
    { slug: 'beverages', name: 'Напої' },
    { slug: 'business', name: 'Бізнес/Корпоративний' },
    { slug: 'events', name: 'Виставки та івенти' },
    { slug: 'foods', name: 'Харчова промисловість' },
    { slug: 'hotels', name: 'Готелі' },
    { slug: 'industrial', name: 'Промисловість' },
    { slug: 'logistics', name: 'Логістика' },
    { slug: 'packaging', name: 'Пакування' },
    { slug: 'pharmaceuticals', name: 'Фармацевтика' },
    { slug: 'restaurants', name: 'Ресторани' },
  ],
  en: [
    { slug: 'beverages', name: 'Beverages' },
    { slug: 'business', name: 'Business' },
    { slug: 'events', name: 'Events' },
    { slug: 'foods', name: 'Foods' },
    { slug: 'hotels', name: 'Hotels' },
    { slug: 'industrial', name: 'Industrial' },
    { slug: 'logistics', name: 'Logistics' },
    { slug: 'packaging', name: 'Packaging' },
    { slug: 'pharmaceuticals', name: 'Pharmaceuticals' },
    { slug: 'restaurants', name: 'Restaurants' },
  ],
}

interface FilterSidebarProps {
  lang: Locale
  activeFilters: {
    materials: string[]
    methods: string[]
    industries: string[]
  }
  baseUrl: string
}

interface FilterSectionProps {
  title: string
  options: FilterOption[]
  selectedValues: string[]
  paramName: string
  isOpen: boolean
  onToggle: () => void
  onFilterChange: (paramName: string, values: string[]) => void
}

function FilterSection({
  title,
  options,
  selectedValues,
  paramName,
  isOpen,
  onToggle,
  onFilterChange,
}: FilterSectionProps) {
  const handleCheckboxChange = (slug: string, checked: boolean) => {
    const newValues = checked
      ? [...selectedValues, slug]
      : selectedValues.filter((v) => v !== slug)
    onFilterChange(paramName, newValues)
  }

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left font-semibold text-gray-900 hover:text-[#78be20] transition-colors"
      >
        <span className="flex items-center gap-2">
          {title}
          {selectedValues.length > 0 && (
            <span className="bg-[#78be20] text-white text-xs px-2 py-0.5 rounded-full">
              {selectedValues.length}
            </span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="pb-4 space-y-2 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option.slug}
              className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.slug)}
                onChange={(e) => handleCheckboxChange(option.slug, e.target.checked)}
                className="w-4 h-4 text-[#78be20] border-gray-300 rounded focus:ring-[#78be20] focus:ring-offset-0"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                {option.name}
              </span>
              {option.count !== undefined && (
                <span className="text-xs text-gray-400">{option.count}</span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export function FilterSidebar({ lang, activeFilters, baseUrl }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Section open states
  const [openSections, setOpenSections] = useState({
    materials: true,
    methods: false,
    industries: false,
  })

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleFilterChange = useCallback(
    (paramName: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString())

      if (values.length > 0) {
        params.set(paramName, values.join(','))
      } else {
        params.delete(paramName)
      }

      const queryString = params.toString()
      router.push(queryString ? `${baseUrl}?${queryString}` : baseUrl, { scroll: false })
    },
    [router, searchParams, baseUrl]
  )

  const clearAllFilters = () => {
    router.push(baseUrl, { scroll: false })
  }

  const hasActiveFilters =
    activeFilters.materials.length > 0 ||
    activeFilters.methods.length > 0 ||
    activeFilters.industries.length > 0

  const totalActiveFilters =
    activeFilters.materials.length +
    activeFilters.methods.length +
    activeFilters.industries.length

  const translations = {
    uk: {
      filters: 'Фільтри',
      clearAll: 'Скинути все',
      materials: 'Матеріал',
      methods: 'Метод виробництва',
      industries: 'Галузь',
      tier1: 'Технічні характеристики',
      tier2: 'Застосування',
    },
    en: {
      filters: 'Filters',
      clearAll: 'Clear all',
      materials: 'Material',
      methods: 'Production Method',
      industries: 'Industry',
      tier1: 'Technical Specs',
      tier2: 'Application',
    },
  }

  const t = translations[lang]

  const filterContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#78be20]" />
          {t.filters}
          {totalActiveFilters > 0 && (
            <span className="bg-[#78be20] text-white text-xs px-2 py-0.5 rounded-full">
              {totalActiveFilters}
            </span>
          )}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-[#78be20] flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            {t.clearAll}
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <FilterSection
        title={t.materials}
        options={MATERIALS[lang]}
        selectedValues={activeFilters.materials}
        paramName="material"
        isOpen={openSections.materials}
        onToggle={() => toggleSection('materials')}
        onFilterChange={handleFilterChange}
      />

      <FilterSection
        title={t.methods}
        options={PRODUCTION_METHODS[lang]}
        selectedValues={activeFilters.methods}
        paramName="method"
        isOpen={openSections.methods}
        onToggle={() => toggleSection('methods')}
        onFilterChange={handleFilterChange}
      />

      <FilterSection
        title={t.industries}
        options={INDUSTRIES[lang]}
        selectedValues={activeFilters.industries}
        paramName="industry"
        isOpen={openSections.industries}
        onToggle={() => toggleSection('industries')}
        onFilterChange={handleFilterChange}
      />
    </>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 mb-4"
      >
        <span className="flex items-center gap-2 font-medium">
          <SlidersHorizontal className="w-4 h-4" />
          {t.filters}
        </span>
        {totalActiveFilters > 0 && (
          <span className="bg-[#78be20] text-white text-xs px-2 py-0.5 rounded-full">
            {totalActiveFilters}
          </span>
        )}
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
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#78be20]" />
                {t.filters}
              </h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">{filterContent}</div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white rounded-lg p-6 border border-gray-200 sticky top-4">
        {filterContent}
      </div>
    </>
  )
}
