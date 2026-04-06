/**
 * SEO Metadata Utilities
 * Helper functions to generate Next.js Metadata objects
 */

import type { Metadata } from 'next'
import { type Locale } from '@/lib/i18n/config'
import { siteConfig, siteMetadata, getCanonicalUrl, getAlternateUrls } from './config'

interface GenerateMetadataOptions {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  noIndex?: boolean
  locale: Locale
  path: string
  type?: 'website' | 'article'
}

/**
 * Generate complete Metadata object for Next.js pages
 */
export function generatePageMetadata(options: GenerateMetadataOptions): Metadata {
  const {
    title,
    description,
    keywords,
    image,
    imageAlt,
    noIndex = false,
    locale,
    path,
    type = 'website',
  } = options

  const defaultMeta = siteMetadata[locale]
  const finalTitle = title || defaultMeta.title
  const finalDescription = description || defaultMeta.description
  const finalKeywords = keywords || defaultMeta.keywords
  const finalImage = image || `${siteConfig.url}${siteConfig.ogImage}`
  const alternateUrls = getAlternateUrls(path)

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,

    // Canonical and alternate languages (hreflang)
    alternates: {
      canonical: getCanonicalUrl(path, locale),
      languages: alternateUrls,
    },

    // Open Graph
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: getCanonicalUrl(path, locale),
      siteName: siteConfig.name,
      locale: locale === 'uk' ? 'uk_UA' : 'en_US',
      alternateLocale: locale === 'uk' ? ['en_US'] : ['uk_UA'],
      type,
      images: [
        {
          url: finalImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: imageAlt || finalTitle,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },

    // Robots
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },

    // Other meta tags
    other: {
      'format-detection': 'telephone=no',
    },
  }
}

interface ProductMetadataOptions {
  product: {
    title: string
    slug: string
    excerpt?: string
    sku?: string
    featuredImage?: {
      node: {
        sourceUrl: string
        altText?: string
      }
    }
    seo?: {
      title?: string
      metaDesc?: string
      opengraphTitle?: string
      opengraphDescription?: string
      opengraphImage?: {
        sourceUrl: string
      }
    }
  }
  locale: Locale
}

/**
 * Generate Metadata for product pages
 */
export function generateProductMetadata({ product, locale }: ProductMetadataOptions): Metadata {
  const seoTitle = product.seo?.opengraphTitle || product.seo?.title || product.title
  const seoDescription = product.seo?.opengraphDescription || product.seo?.metaDesc || product.excerpt || ''
  const seoImage = product.seo?.opengraphImage?.sourceUrl || product.featuredImage?.node.sourceUrl

  const path = `/products/${product.slug}`
  const alternateUrls = getAlternateUrls(path)

  return {
    title: `${seoTitle} | ${siteConfig.name}`,
    description: seoDescription.replace(/<[^>]*>/g, '').substring(0, 160),

    alternates: {
      canonical: getCanonicalUrl(path, locale),
      languages: alternateUrls,
    },

    openGraph: {
      title: seoTitle,
      description: seoDescription.replace(/<[^>]*>/g, ''),
      url: getCanonicalUrl(path, locale),
      siteName: siteConfig.name,
      locale: locale === 'uk' ? 'uk_UA' : 'en_US',
      alternateLocale: locale === 'uk' ? ['en_US'] : ['uk_UA'],
      type: 'website', // Next.js doesn't support 'product' type directly
      images: seoImage
        ? [
            {
              url: seoImage,
              width: 800,
              height: 800,
              alt: product.featuredImage?.node.altText || product.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription.replace(/<[^>]*>/g, '').substring(0, 200),
      images: seoImage ? [seoImage] : undefined,
    },
  }
}

interface CategoryMetadataOptions {
  category: {
    name: string
    slug: string
    description?: string
  }
  locale: Locale
}

/**
 * Generate Metadata for category pages
 */
export function generateCategoryMetadata({ category, locale }: CategoryMetadataOptions): Metadata {
  const titles: Record<Locale, string> = {
    uk: `${category.name} | Каталог | Sellerpack`,
    en: `${category.name} | Catalog | Sellerpack`,
  }

  const descriptions: Record<Locale, string> = {
    uk: category.description || `Продукція категорії "${category.name}". Професійна рекламна продукція від Sellerpack.`,
    en: category.description || `Products in "${category.name}" category. Professional promotional products from Sellerpack.`,
  }

  const path = `/category/${category.slug}`
  const alternateUrls = getAlternateUrls(path)

  return {
    title: titles[locale],
    description: descriptions[locale],

    alternates: {
      canonical: getCanonicalUrl(path, locale),
      languages: alternateUrls,
    },

    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: getCanonicalUrl(path, locale),
      siteName: siteConfig.name,
      locale: locale === 'uk' ? 'uk_UA' : 'en_US',
      type: 'website',
    },
  }
}
