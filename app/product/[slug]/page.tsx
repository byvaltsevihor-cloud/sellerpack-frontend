import ProductContent from './product-content'
import { getProductBySlug } from '@/lib/get-products'
import { getCategories, buildMenuCategories } from '@/lib/get-categories'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch data from WordPress
  const [wpProduct, wpCategories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ])

  // Build menu categories for header
  const menuCategories = buildMenuCategories(wpCategories)

  // Transform product for UI
  const product = wpProduct ? {
    id: wpProduct.databaseId.toString(),
    name: wpProduct.title,
    slug: wpProduct.slug,
    description: wpProduct.excerpt?.replace(/<[^>]*>/g, '') || '',
    content: wpProduct.content || '',
    basePrice: wpProduct.price ? parseFloat(wpProduct.price) : 50,
    images: wpProduct.featuredImage?.node?.sourceUrl
      ? [wpProduct.featuredImage.node.sourceUrl]
      : ['/placeholder.svg'],
    category: wpProduct.productCategories?.nodes?.[0]?.name || 'Без категорії',
    categorySlug: wpProduct.productCategories?.nodes?.[0]?.slug || 'uncategorized',
    sku: wpProduct.sku || `SKU-${wpProduct.databaseId}`,
  } : null

  return (
    <ProductContent
      product={product}
      menuCategories={menuCategories}
      slug={slug}
    />
  )
}

// Generate static params for known products
export async function generateStaticParams() {
  try {
    const { getProducts } = await import('@/lib/get-products')
    const products = await getProducts(100)
    return products.map((product) => ({
      slug: product.slug,
    }))
  } catch {
    return []
  }
}
