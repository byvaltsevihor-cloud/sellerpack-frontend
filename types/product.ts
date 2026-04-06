export interface Product {
  id: string
  databaseId: number
  title: string
  slug: string
  excerpt?: string
  content?: string
  featuredImage?: {
    node: {
      sourceUrl: string
      altText?: string
      mediaDetails?: {
        width: number
        height: number
      }
    }
  }
  productCategories?: {
    nodes: Array<{
      name: string
      slug: string
    }>
  }
  productFields?: ProductFields
  seo?: ProductSEO
}

export interface ProductFields {
  productSku?: string
  productPrice?: string
  productRegularPrice?: string
  productSalePrice?: string
  productStockStatus?: 'instock' | 'outofstock'
  productStockQuantity?: number
  productWeight?: string
  productLength?: string
  productWidth?: string
  productHeight?: string
  material?: string
  printingMethod?: string
  availableColors?: string
  minimumOrderQuantity?: number
  leadTimeDays?: string
  customizationAvailable?: 'yes' | 'no'
  bulkPricingAvailable?: 'yes' | 'no'
}

export interface ProductSEO {
  title?: string
  metaDesc?: string
  focuskw?: string
  canonical?: string
  opengraphTitle?: string
  opengraphDescription?: string
  opengraphImage?: {
    sourceUrl: string
  }
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  count?: number
}

export interface ProductsResponse {
  products: {
    nodes: Product[]
  }
}

export interface ProductResponse {
  product: Product
}

export interface ProductCategoriesResponse {
  productCategories: {
    nodes: ProductCategory[]
  }
}
