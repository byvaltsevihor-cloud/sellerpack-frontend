/**
 * JSON-LD Structured Data Generators
 * For SEO and rich snippets in search results
 */

import { siteConfig } from './config'
import { type Locale } from '@/lib/i18n/config'

/**
 * Organization Schema
 * Used on all pages to establish site identity
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo.png`,
      width: 200,
      height: 60,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'sales',
      availableLanguage: ['Ukrainian', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
  }
}

/**
 * LocalBusiness Schema
 * For local SEO and Google Maps
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    description: 'Виробництво рекламної продукції для бізнесу',
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.streetAddress,
      addressLocality: siteConfig.contact.address.addressLocality,
      addressRegion: siteConfig.contact.address.addressRegion,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.addressCountry,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
  }
}

/**
 * WebSite Schema
 * For sitelinks search box in Google
 */
export function generateWebSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: locale === 'uk' ? 'uk-UA' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

interface ProductSchemaOptions {
  product: {
    title: string
    slug: string
    excerpt?: string
    content?: string
    sku?: string
    price?: string
    featuredImage?: {
      node: {
        sourceUrl: string
        altText?: string
      }
    }
    productCategories?: {
      nodes: Array<{
        name: string
        slug: string
      }>
    }
  }
  locale: Locale
}

/**
 * Product Schema
 * For product rich snippets
 */
export function generateProductSchema({ product, locale }: ProductSchemaOptions) {
  const description = product.excerpt
    ? product.excerpt.replace(/<[^>]*>/g, '').substring(0, 500)
    : product.title

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteConfig.url}/${locale}/products/${product.slug}#product`,
    name: product.title,
    description,
    url: `${siteConfig.url}/${locale}/products/${product.slug}`,
    image: product.featuredImage?.node.sourceUrl,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    category: product.productCategories?.nodes?.[0]?.name,
    // For B2B products without fixed prices
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/${locale}/products/${product.slug}`,
      priceCurrency: 'UAH',
      price: product.price || '0',
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  }
}

interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * BreadcrumbList Schema
 * For breadcrumb rich snippets
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[], locale: Locale) {
  const baseUrl = siteConfig.url

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  }
}

interface FAQItem {
  question: string
  answer: string
}

/**
 * FAQPage Schema
 * For FAQ rich snippets
 */
export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/**
 * ItemList Schema
 * For product catalog/list pages
 */
export function generateProductListSchema(
  products: Array<{
    title: string
    slug: string
    featuredImage?: { node: { sourceUrl: string } }
    price?: string
  }>,
  locale: Locale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        url: `${siteConfig.url}/${locale}/products/${product.slug}`,
        image: product.featuredImage?.node.sourceUrl,
      },
    })),
  }
}
