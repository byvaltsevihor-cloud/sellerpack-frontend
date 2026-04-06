import { fetchGraphQL } from './graphql'
import { GET_PRODUCT_CATEGORIES } from './queries'

export interface Category {
  id: string
  databaseId: number
  name: string
  slug: string
  description: string | null
  count: number | null
  parentDatabaseId: number | null
  categoryImage: string | null
  children: {
    nodes: {
      id: string
      databaseId: number
      name: string
      slug: string
      description: string | null
      count: number | null
      categoryImage: string | null
    }[]
  }
}

interface CategoriesResponse {
  productCategories: {
    nodes: Category[]
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchGraphQL<CategoriesResponse>(GET_PRODUCT_CATEGORIES)
    return data.productCategories?.nodes || []
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

// Build hierarchical menu structure from flat categories
export function buildMenuCategories(categories: Category[]) {
  // Get only root categories (no parent)
  const rootCategories = categories.filter(cat => !cat.parentDatabaseId)

  return rootCategories.map(category => ({
    title: category.name,
    href: `/category/${category.slug}`,
    items: category.children?.nodes?.map(child => ({
      name: child.name,
      slug: child.slug,
    })) || [],
    featured: {
      image: category.categoryImage || '/placeholder.svg',
      title: 'Популярне',
      description: category.description || category.name,
    },
  }))
}
