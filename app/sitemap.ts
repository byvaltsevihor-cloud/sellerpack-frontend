/**
 * Multi-language Sitemap Generator
 * Generates sitemap.xml with hreflang alternates for all pages and products
 */

import { MetadataRoute } from 'next'
import { fetchGraphQL } from '@/lib/graphql'
import { GET_PRODUCTS, GET_PRODUCT_CATEGORIES } from '@/lib/queries'
import { siteConfig } from '@/lib/seo'

const baseUrl = siteConfig.url
const locales = ['uk', 'en'] as const

interface Product {
  slug: string
  date?: string
}

interface Category {
  slug: string
}

interface ProductsData {
  sellerpackProducts: {
    nodes: Product[]
  }
}

interface CategoriesData {
  productCategories: {
    nodes: Category[]
  }
}

// Generate alternates for hreflang
function generateAlternates(path: string) {
  const alternates: Record<string, string> = {}
  for (const locale of locales) {
    alternates[locale] = `${baseUrl}/${locale}${path}`
  }
  return alternates
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = ['', '/products', '/about', '/contact', '/portfolio']

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'weekly' as const,
      priority: page === '' ? 1 : page === '/products' ? 0.9 : 0.8,
      alternates: {
        languages: generateAlternates(page),
      },
    }))
  )

  // Fetch products for dynamic pages
  let productEntries: MetadataRoute.Sitemap = []
  try {
    const productsData = await fetchGraphQL<ProductsData>(GET_PRODUCTS, { first: 100 })
    const products = productsData.sellerpackProducts?.nodes || []

    productEntries = products.flatMap((product) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: {
          languages: generateAlternates(`/products/${product.slug}`),
        },
      }))
    )
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }

  // Fetch categories for dynamic pages
  let categoryEntries: MetadataRoute.Sitemap = []
  try {
    const categoriesData = await fetchGraphQL<CategoriesData>(GET_PRODUCT_CATEGORIES)
    const categories = categoriesData.productCategories?.nodes || []

    categoryEntries = categories.flatMap((category) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: {
          languages: generateAlternates(`/category/${category.slug}`),
        },
      }))
    )
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
  }

  return [...staticEntries, ...productEntries, ...categoryEntries]
}
