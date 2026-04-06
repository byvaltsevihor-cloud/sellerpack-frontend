import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  currentPage: string
  variant?: 'dark' | 'light'
}

export function Breadcrumbs({ items, currentPage, variant = 'dark' }: BreadcrumbsProps) {
  const textColor = variant === 'light' ? 'text-white/80' : 'text-gray-600'
  const hoverColor = variant === 'light' ? 'hover:text-white' : 'hover:text-[#78be20]'
  const activeColor = variant === 'light' ? 'text-white' : 'text-gray-900'
  const iconColor = variant === 'light' ? 'text-white/60' : 'text-gray-400'

  return (
    <nav className={`flex items-center text-sm ${textColor} mb-6`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className={`w-4 h-4 mx-2 ${iconColor}`} />}
            <Link
              href={item.href}
              className={`${hoverColor} transition-colors`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="flex items-center">
          <ChevronRight className={`w-4 h-4 mx-2 ${iconColor}`} />
          <span className={`${activeColor} font-medium`}>{currentPage}</span>
        </li>
      </ol>
    </nav>
  )
}
