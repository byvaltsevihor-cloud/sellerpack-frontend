import { Header, MenuCategory } from './header'
import { getCategories, buildMenuCategories } from '@/lib/get-categories'

export async function HeaderWrapper() {
  let menuCategories: MenuCategory[] = []

  try {
    const wpCategories = await getCategories()
    if (wpCategories.length > 0) {
      menuCategories = buildMenuCategories(wpCategories)
    }
  } catch (error) {
    console.error('Failed to load categories for header:', error)
    // Header will use default fallback categories
  }

  return <Header categories={menuCategories} />
}
