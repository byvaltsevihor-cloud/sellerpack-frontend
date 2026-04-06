import { gql } from 'graphql-request'

/**
 * Get all products with basic info
 */
export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 10) {
    sellerpackProducts(first: $first) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
        sku
        price
        stockStatus
      }
    }
  }
`

/**
 * Get product by slug
 */
export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    sellerpackProduct(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      content
      excerpt
      bullets
      specialFeatures
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      gallery {
        id
        type
        sourceUrl
        mediumUrl
        thumbnailUrl
        altText
        width
        height
      }
      productCategories {
        nodes {
          name
          slug
        }
      }
      applicationIndustries {
        nodes {
          name
          slug
        }
      }
      sku
      weight
      length
      width
      height
      seo {
        title
        metaDesc
        focuskw
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
      relatedProducts {
        id
        databaseId
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`

/**
 * Get product categories with hierarchy
 */
export const GET_PRODUCT_CATEGORIES = gql`
  query GetProductCategories {
    productCategories(first: 100, where: { hideEmpty: false }) {
      nodes {
        id
        databaseId
        name
        slug
        description
        count
        parentDatabaseId
        categoryImage
        parent {
          node {
            id
            databaseId
            name
            slug
          }
        }
        children {
          nodes {
            id
            databaseId
            name
            slug
            description
            count
            categoryImage
          }
        }
      }
    }
  }
`

/**
 * Get categories with featured products for Mega Menu
 * Note: Products are fetched and sorted client-side by popularityScore
 * since WPGraphQL doesn't support native metaQuery ordering for custom post types
 */
export const GET_MEGA_MENU_DATA = gql`
  query GetMegaMenuData {
    productCategories(first: 10, where: { hideEmpty: true }) {
      nodes {
        id
        databaseId
        name
        slug
        description
        count
        parentDatabaseId
        categoryImage
      }
    }
    sellerpackProducts(first: 20) {
      nodes {
        id
        databaseId
        title
        slug
        popularityScore
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        productCategories {
          nodes {
            slug
          }
        }
      }
    }
  }
`

/**
 * Get products by category
 * Note: WPGraphQL for custom post types may not support taxQuery,
 * so we fetch all and filter client-side
 */
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($first: Int = 100) {
    sellerpackProducts(first: $first) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
        productMaterials {
          nodes {
            name
            slug
          }
        }
        productionMethods {
          nodes {
            name
            slug
          }
        }
        applicationIndustries {
          nodes {
            name
            slug
          }
        }
        sku
        price
        stockStatus
      }
    }
  }
`

/**
 * Get filter taxonomies (Materials, Production Methods, Industries)
 */
export const GET_FILTER_TAXONOMIES = gql`
  query GetFilterTaxonomies {
    productMaterials {
      nodes {
        id
        name
        slug
        count
      }
    }
    productionMethods {
      nodes {
        id
        name
        slug
        count
      }
    }
    applicationIndustries {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`

/**
 * Get products with multiple taxonomy filters
 * Note: WPGraphQL taxQuery supports multiple taxonomies with AND/OR relation
 */
export const GET_FILTERED_PRODUCTS = gql`
  query GetFilteredProducts(
    $categorySlug: [String]
    $materialSlug: [String]
    $methodSlug: [String]
    $industrySlug: [String]
    $first: Int = 50
  ) {
    sellerpackProducts(
      first: $first
      where: {
        taxQuery: {
          relation: AND
          taxArray: [
            {
              taxonomy: PRODUCTCATEGORY
              terms: $categorySlug
              field: SLUG
              operator: IN
            }
            {
              taxonomy: PRODUCTMATERIAL
              terms: $materialSlug
              field: SLUG
              operator: IN
            }
            {
              taxonomy: PRODUCTIONMETHOD
              terms: $methodSlug
              field: SLUG
              operator: IN
            }
            {
              taxonomy: APPLICATIONINDUSTRY
              terms: $industrySlug
              field: SLUG
              operator: IN
            }
          ]
        }
      }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
        productMaterials {
          nodes {
            name
            slug
          }
        }
        productionMethods {
          nodes {
            name
            slug
          }
        }
        applicationIndustries {
          nodes {
            name
            slug
          }
        }
        sku
        price
        stockStatus
      }
    }
  }
`

/**
 * Get all pages (for sitemap, menu, etc)
 */
export const GET_PAGES = gql`
  query GetPages($first: Int = 100) {
    pages(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        databaseId
        title
        slug
        uri
      }
    }
  }
`

/**
 * Get page by slug
 */
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      databaseId
      title
      slug
      content
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`

/**
 * Search products
 */
export const SEARCH_PRODUCTS = gql`
  query SearchProducts($search: String!, $first: Int = 20) {
    sellerpackProducts(first: $first, where: { search: $search }) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        sku
        price
        stockStatus
      }
    }
  }
`

/**
 * Get menu by location
 * Note: Using menus query to filter by location since menu(idType: LOCATION) may not work in all WPGraphQL versions
 */
export const GET_MENU = gql`
  query GetMenu {
    menus(where: { location: PRIMARY }) {
      nodes {
        id
        name
        menuItems {
          nodes {
            id
            label
            url
            path
            parentId
            cssClasses
            target
          }
        }
      }
    }
  }
`

/**
 * Get footer menu
 */
export const GET_FOOTER_MENU = gql`
  query GetFooterMenu {
    menus(where: { location: FOOTER }) {
      nodes {
        id
        name
        menuItems {
          nodes {
            id
            label
            url
            path
            parentId
            cssClasses
            target
          }
        }
      }
    }
  }
`

// ============================================
// POLYLANG MULTILANGUAGE QUERIES
// ============================================

/**
 * Get all available languages
 */
export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      code
      name
      locale
      slug
    }
  }
`

/**
 * Get products with language filter and translations
 */
export const GET_PRODUCTS_BY_LANGUAGE = gql`
  query GetProductsByLanguage($language: LanguageCodeFilterEnum!, $first: Int = 10) {
    sellerpackProducts(first: $first, where: { language: $language }) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        content
        language {
          code
          name
          locale
        }
        translations {
          id
          databaseId
          title
          slug
          language {
            code
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
        sku
        price
        stockStatus
      }
    }
  }
`

/**
 * Get product by slug with translations
 */
export const GET_PRODUCT_BY_SLUG_WITH_TRANSLATIONS = gql`
  query GetProductBySlugWithTranslations($slug: ID!) {
    sellerpackProduct(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      content
      excerpt
      language {
        code
        name
        locale
      }
      translations {
        id
        databaseId
        title
        slug
        language {
          code
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      productCategories {
        nodes {
          name
          slug
          translations {
            name
            slug
            language {
              code
            }
          }
        }
      }
      sku
      price
      regularPrice
      salePrice
      stockStatus
      stockQuantity
      weight
      length
      width
      height
    }
  }
`

/**
 * Get pages by language
 */
export const GET_PAGES_BY_LANGUAGE = gql`
  query GetPagesByLanguage($language: LanguageCodeFilterEnum!, $first: Int = 100) {
    pages(first: $first, where: { status: PUBLISH, language: $language }) {
      nodes {
        id
        databaseId
        title
        slug
        uri
        language {
          code
          name
        }
        translations {
          id
          title
          slug
          uri
          language {
            code
          }
        }
      }
    }
  }
`

/**
 * Get page by slug with translations
 */
export const GET_PAGE_BY_SLUG_WITH_TRANSLATIONS = gql`
  query GetPageBySlugWithTranslations($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      databaseId
      title
      slug
      content
      language {
        code
        name
        locale
      }
      translations {
        id
        title
        slug
        uri
        language {
          code
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`

/**
 * Search products with language filter
 */
export const SEARCH_PRODUCTS_BY_LANGUAGE = gql`
  query SearchProductsByLanguage($search: String!, $language: LanguageCodeFilterEnum!, $first: Int = 20) {
    sellerpackProducts(first: $first, where: { search: $search, language: $language }) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        language {
          code
        }
        translations {
          title
          slug
          language {
            code
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        sku
        price
        stockStatus
      }
    }
  }
`

/**
 * Get menu by location with language
 */
export const GET_MENU_BY_LANGUAGE = gql`
  query GetMenuByLanguage($language: LanguageCodeFilterEnum!) {
    menus(where: { location: PRIMARY, language: $language }) {
      nodes {
        id
        name
        language {
          code
        }
        menuItems {
          nodes {
            id
            label
            url
            path
            parentId
            cssClasses
            target
          }
        }
      }
    }
  }
`

/**
 * Get product categories by language
 */
export const GET_PRODUCT_CATEGORIES_BY_LANGUAGE = gql`
  query GetProductCategoriesByLanguage($language: LanguageCodeFilterEnum!) {
    productCategories(where: { language: $language }) {
      nodes {
        id
        name
        slug
        description
        count
        language {
          code
        }
        translations {
          id
          name
          slug
          language {
            code
          }
        }
      }
    }
  }
`

// ============================================
// BLOG POSTS QUERIES
// ============================================

/**
 * Get all posts (blog articles)
 */
export const GET_POSTS = gql`
  query GetPosts($first: Int = 20) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`

/**
 * Get posts by language
 */
export const GET_POSTS_BY_LANGUAGE = gql`
  query GetPostsByLanguage($language: LanguageCodeFilterEnum!, $first: Int = 20) {
    posts(first: $first, where: { status: PUBLISH, language: $language }) {
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt
        content
        language {
          code
          name
        }
        translations {
          id
          title
          slug
          language {
            code
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`

/**
 * Get single post by slug
 */
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      date
      modified
      content
      excerpt
      language {
        code
        name
        locale
      }
      translations {
        id
        title
        slug
        language {
          code
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      author {
        node {
          name
          description
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`

/**
 * Get related posts by category
 */
export const GET_RELATED_POSTS = gql`
  query GetRelatedPosts($categorySlug: String!, $excludeId: Int!, $first: Int = 3) {
    posts(
      first: $first
      where: {
        status: PUBLISH
        categoryName: $categorySlug
        notIn: [$excludeId]
      }
    ) {
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`
