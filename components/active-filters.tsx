'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

// Filter label mappings
const FILTER_LABELS: Record<Locale, Record<string, Record<string, string>>> = {
  uk: {
    material: {
      'coated-paper': 'Папір крейдований',
      'offset-paper': 'Папір офсетний',
      'kraft-paper': 'Крафт папір',
      'vinyl-film': 'Вініл/Плівка',
      raflatac: 'Рафлатак',
      pvc: 'ПВХ',
      fabric: 'Тканина/Текстиль',
      polyester: 'Поліестер',
      'thermal-paper': 'Термопапір',
      plastic: 'Пластик',
      'metal-foil': 'Метал/Фольга',
      wood: 'Дерево',
    },
    method: {
      'offset-printing': 'Офсетний друк',
      'digital-printing': 'Цифровий друк',
      'large-format': 'Широкоформатний друк',
      'uv-printing': 'УФ-друк',
      sublimation: 'Сублімація',
      'flexo-printing': 'Флексодрук',
      'screen-printing': 'Шовкографія',
      'heat-transfer': 'Термотрансфер',
      'dtf-printing': 'DTF друк',
      'plotter-cutting': 'Плоттерна порізка',
      'laser-cutting': 'Лазерна різка',
      'cnc-milling': 'Фрезерування',
      'die-cutting': 'Вирубка',
      sewing: 'Пошив',
      embroidery: 'Вишивка',
      engraving: 'Гравіювання',
      embossing: 'Тиснення',
    },
    industry: {
      beverages: 'Напої',
      business: 'Бізнес/Корпоративний',
      events: 'Виставки та івенти',
      foods: 'Харчова промисловість',
      hotels: 'Готелі',
      industrial: 'Промисловість',
      logistics: 'Логістика',
      packaging: 'Пакування',
      pharmaceuticals: 'Фармацевтика',
      restaurants: 'Ресторани',
    },
  },
  en: {
    material: {
      'coated-paper': 'Coated Paper',
      'offset-paper': 'Offset Paper',
      'kraft-paper': 'Kraft Paper',
      'vinyl-film': 'Vinyl/Film',
      raflatac: 'Raflatac',
      pvc: 'PVC',
      fabric: 'Fabric/Textile',
      polyester: 'Polyester',
      'thermal-paper': 'Thermal Paper',
      plastic: 'Plastic',
      'metal-foil': 'Metal/Foil',
      wood: 'Wood',
    },
    method: {
      'offset-printing': 'Offset Printing',
      'digital-printing': 'Digital Printing',
      'large-format': 'Large Format',
      'uv-printing': 'UV Printing',
      sublimation: 'Sublimation',
      'flexo-printing': 'Flexo Printing',
      'screen-printing': 'Screen Printing',
      'heat-transfer': 'Heat Transfer',
      'dtf-printing': 'DTF Printing',
      'plotter-cutting': 'Plotter Cutting',
      'laser-cutting': 'Laser Cutting',
      'cnc-milling': 'CNC Milling',
      'die-cutting': 'Die Cutting',
      sewing: 'Sewing',
      embroidery: 'Embroidery',
      engraving: 'Engraving',
      embossing: 'Embossing',
    },
    industry: {
      beverages: 'Beverages',
      business: 'Business',
      events: 'Events',
      foods: 'Foods',
      hotels: 'Hotels',
      industrial: 'Industrial',
      logistics: 'Logistics',
      packaging: 'Packaging',
      pharmaceuticals: 'Pharmaceuticals',
      restaurants: 'Restaurants',
    },
  },
}

const CATEGORY_NAMES: Record<Locale, Record<string, string>> = {
  uk: {
    material: 'Матеріал',
    method: 'Метод',
    industry: 'Галузь',
  },
  en: {
    material: 'Material',
    method: 'Method',
    industry: 'Industry',
  },
}

interface ActiveFiltersProps {
  filters: {
    materials: string[]
    methods: string[]
    industries: string[]
  }
  lang: Locale
  baseUrl: string
}

interface FilterChipProps {
  label: string
  category: string
  onRemove: () => void
}

function FilterChip({ label, category, onRemove }: FilterChipProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-[#78be20]/10 text-[#78be20] px-3 py-1.5 rounded-full text-sm border border-[#78be20]/20">
      <span className="text-gray-500 text-xs mr-1">{category}:</span>
      <span className="font-medium">{label}</span>
      <button
        onClick={onRemove}
        className="ml-1 hover:bg-[#78be20]/20 rounded-full p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

export function ActiveFilters({ filters, lang, baseUrl }: ActiveFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const removeFilter = (paramName: string, valueToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentValues = params.get(paramName)?.split(',').filter(Boolean) || []
    const newValues = currentValues.filter((v) => v !== valueToRemove)

    if (newValues.length > 0) {
      params.set(paramName, newValues.join(','))
    } else {
      params.delete(paramName)
    }

    const queryString = params.toString()
    router.push(queryString ? `${baseUrl}?${queryString}` : baseUrl, { scroll: false })
  }

  const clearAllFilters = () => {
    router.push(baseUrl, { scroll: false })
  }

  const labels = FILTER_LABELS[lang]
  const categoryNames = CATEGORY_NAMES[lang]

  const totalFilters =
    filters.materials.length + filters.methods.length + filters.industries.length

  if (totalFilters === 0) return null

  return (
    <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-600 mr-2">
          {lang === 'uk' ? 'Активні фільтри:' : 'Active filters:'}
        </span>

        {/* Material chips */}
        {filters.materials.map((slug) => (
          <FilterChip
            key={`material-${slug}`}
            label={labels.material[slug] || slug}
            category={categoryNames.material}
            onRemove={() => removeFilter('material', slug)}
          />
        ))}

        {/* Method chips */}
        {filters.methods.map((slug) => (
          <FilterChip
            key={`method-${slug}`}
            label={labels.method[slug] || slug}
            category={categoryNames.method}
            onRemove={() => removeFilter('method', slug)}
          />
        ))}

        {/* Industry chips */}
        {filters.industries.map((slug) => (
          <FilterChip
            key={`industry-${slug}`}
            label={labels.industry[slug] || slug}
            category={categoryNames.industry}
            onRemove={() => removeFilter('industry', slug)}
          />
        ))}

        {/* Clear all button */}
        {totalFilters > 1 && (
          <button
            onClick={clearAllFilters}
            className="ml-auto text-sm text-gray-500 hover:text-[#78be20] flex items-center gap-1 transition-colors"
          >
            <X className="w-4 h-4" />
            {lang === 'uk' ? 'Скинути все' : 'Clear all'}
          </button>
        )}
      </div>
    </div>
  )
}
