import HomeContent from './home-content'
import { getProducts, transformProduct } from '@/lib/get-products'
import { getCategories, buildMenuCategories } from '@/lib/get-categories'

export default async function HomePage() {
  // Fetch data from WordPress
  const [wpProducts, wpCategories] = await Promise.all([
    getProducts(20),
    getCategories(),
  ])

  // Transform products for UI
  const products = wpProducts.map(transformProduct)

  // Build menu categories for header
  const menuCategories = buildMenuCategories(wpCategories)

  // Transform categories for display
  const categories = wpCategories
    .filter(cat => !cat.parentDatabaseId) // Only root categories
    .map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || cat.name,
      count: cat.count || 0,
      image: cat.categoryImage || '/placeholder.svg',
    }))

  return (
    <HomeContent
      products={products}
      categories={categories}
      menuCategories={menuCategories}
    />
  )
}
