/**
 * SEO Configuration for Sellerpack
 * Centralized SEO settings for the entire site
 */

import { type Locale } from '@/lib/i18n/config'

export const siteConfig = {
  name: 'Sellerpack',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sellerpack.com.ua',

  // Default images for Open Graph
  ogImage: '/images/og-default.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  // Social profiles
  social: {
    facebook: 'https://facebook.com/sellerpack',
    instagram: 'https://instagram.com/sellerpack',
    linkedin: 'https://linkedin.com/company/sellerpack',
  },

  // Contact info for structured data
  contact: {
    phone: '+380000000000',
    email: 'info@sellerpack.com.ua',
    address: {
      streetAddress: 'вул. Прикладна 1',
      addressLocality: 'Київ',
      addressRegion: 'Київська область',
      postalCode: '01001',
      addressCountry: 'UA',
    },
  },

  // Business hours for LocalBusiness schema
  openingHours: 'Mo-Fr 09:00-18:00',

  // Supported languages
  locales: ['uk', 'en'] as const,
  defaultLocale: 'uk' as const,
}

// Localized site metadata
export const siteMetadata: Record<Locale, {
  title: string
  description: string
  keywords: string[]
}> = {
  uk: {
    title: 'Sellerpack - Професійна рекламна продукція | B2B',
    description: 'Професійна рекламна продукція для B2B. Наклейки, упаковка, корпоративний одяг та багато іншого. Індивідуальне виробництво під ваш бренд.',
    keywords: [
      'рекламна продукція',
      'наклейки',
      'упаковка',
      'корпоративний одяг',
      'брендування',
      'B2B',
      'виробництво',
      'Україна',
    ],
  },
  en: {
    title: 'Sellerpack - Professional Promotional Products | B2B',
    description: 'Professional promotional products for B2B. Stickers, packaging, corporate apparel and more. Custom manufacturing for your brand.',
    keywords: [
      'promotional products',
      'stickers',
      'packaging',
      'corporate apparel',
      'branding',
      'B2B',
      'manufacturing',
      'Ukraine',
    ],
  },
}

// Page-specific metadata
export const pageMetadata: Record<string, Record<Locale, { title: string; description: string }>> = {
  products: {
    uk: {
      title: 'Каталог продукції | Sellerpack',
      description: 'Повний каталог рекламної продукції Sellerpack. Наклейки, етикетки, упаковка, текстиль та промо-матеріали для вашого бізнесу.',
    },
    en: {
      title: 'Product Catalog | Sellerpack',
      description: 'Complete catalog of Sellerpack promotional products. Stickers, labels, packaging, textiles and promotional materials for your business.',
    },
  },
  about: {
    uk: {
      title: 'Про компанію | Sellerpack',
      description: 'Sellerpack - український виробник рекламної продукції. Понад 10 років досвіду, власне виробництво, індивідуальний підхід до кожного клієнта.',
    },
    en: {
      title: 'About Us | Sellerpack',
      description: 'Sellerpack - Ukrainian manufacturer of promotional products. Over 10 years of experience, in-house production, individual approach to each client.',
    },
  },
  contact: {
    uk: {
      title: 'Контакти | Sellerpack',
      description: 'Зв\'яжіться з Sellerpack для замовлення рекламної продукції. Телефон, email, адреса офісу. Безкоштовна консультація.',
    },
    en: {
      title: 'Contact Us | Sellerpack',
      description: 'Contact Sellerpack to order promotional products. Phone, email, office address. Free consultation.',
    },
  },
  portfolio: {
    uk: {
      title: 'Портфоліо | Sellerpack',
      description: 'Портфоліо виконаних проектів Sellerpack. Приклади рекламної продукції для різних галузей та брендів.',
    },
    en: {
      title: 'Portfolio | Sellerpack',
      description: 'Portfolio of completed Sellerpack projects. Examples of promotional products for various industries and brands.',
    },
  },
}

// Generate canonical URL
export function getCanonicalUrl(path: string, locale?: Locale): string {
  const basePath = locale ? `/${locale}` : ''
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.url}${basePath}${cleanPath}`
}

// Generate alternate language URLs for hreflang
export function getAlternateUrls(path: string): Record<string, string> {
  const cleanPath = path.replace(/^\/(uk|en)/, '') || '/'
  return {
    uk: `${siteConfig.url}/uk${cleanPath === '/' ? '' : cleanPath}`,
    en: `${siteConfig.url}/en${cleanPath === '/' ? '' : cleanPath}`,
    'x-default': `${siteConfig.url}/uk${cleanPath === '/' ? '' : cleanPath}`,
  }
}
