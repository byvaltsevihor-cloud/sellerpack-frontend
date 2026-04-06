import { fetchGraphQL } from './graphql'
import { GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_BY_SLUG } from './queries'

export interface WPProduct {
  id: string
  databaseId: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  sku: string | null
  price: string | null
  stockStatus: string | null
  featuredImage: {
    node: {
      sourceUrl: string
      altText: string | null
    }
  } | null
  productCategories: {
    nodes: {
      name: string
      slug: string
    }[]
  }
}

interface ProductsResponse {
  sellerpackProducts: {
    nodes: WPProduct[]
  }
}

interface SingleProductResponse {
  sellerpackProduct: WPProduct | null
}

export async function getProducts(first: number = 20): Promise<WPProduct[]> {
  try {
    const data = await fetchGraphQL<ProductsResponse>(GET_PRODUCTS, { first })
    return data.sellerpackProducts?.nodes || []
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export async function getProductsByCategory(first: number = 100): Promise<WPProduct[]> {
  try {
    const data = await fetchGraphQL<ProductsResponse>(GET_PRODUCTS_BY_CATEGORY, { first })
    return data.sellerpackProducts?.nodes || []
  } catch (error) {
    console.error('Failed to fetch products by category:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<WPProduct | null> {
  try {
    const data = await fetchGraphQL<SingleProductResponse>(GET_PRODUCT_BY_SLUG, { slug })
    return data.sellerpackProduct || null
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return null
  }
}

// Transform WP product to UI-friendly format
export function transformProduct(product: WPProduct) {
  return {
    id: product.databaseId.toString(),
    name: product.title,
    slug: product.slug,
    description: product.excerpt?.replace(/<[^>]*>/g, '') || '',
    basePrice: product.price ? parseFloat(product.price) : 100,
    images: product.featuredImage?.node?.sourceUrl
      ? [product.featuredImage.node.sourceUrl]
      : ['/placeholder.svg'],
    category: product.productCategories?.nodes?.[0]?.name || 'Без категорії',
    categorySlug: product.productCategories?.nodes?.[0]?.slug || 'uncategorized',
    sku: product.sku || `SKU-${product.databaseId}`,
  }
}
