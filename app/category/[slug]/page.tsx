import CategoryContent from './category-content'
import { getProductsByCategory, transformProduct } from '@/lib/get-products'
import { getCategories, buildMenuCategories } from '@/lib/get-categories'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch data from WordPress
  const [wpProducts, wpCategories] = await Promise.all([
    getProductsByCategory(100),
    getCategories(),
  ])

  // Find the current category
  const currentCategory = wpCategories.find(cat => cat.slug === slug)

  // Filter products by category slug
  const categoryProducts = wpProducts
    .filter(product =>
      product.productCategories?.nodes?.some(cat => cat.slug === slug)
    )
    .map(transformProduct)

  // Build menu categories for header
  const menuCategories = buildMenuCategories(wpCategories)

  // Category data for display
  const categoryData = currentCategory ? {
    name: currentCategory.name,
    slug: currentCategory.slug,
    description: currentCategory.description || `Продукція категорії ${currentCategory.name}`,
    count: categoryProducts.length,
  } : null

  return (
    <CategoryContent
      category={categoryData}
      products={categoryProducts}
      menuCategories={menuCategories}
      slug={slug}
    />
  )
}

// Generate static params for known categories
export async function generateStaticParams() {
  try {
    const categories = await getCategories()
    return categories.map((category) => ({
      slug: category.slug,
    }))
  } catch {
    return []
  }
}
