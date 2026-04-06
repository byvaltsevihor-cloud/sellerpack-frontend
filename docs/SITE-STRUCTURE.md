# 📐 Структура Сайту Sellerpack

> **Версія:** 0.2.5
> **Оновлено:** 2025-11-24
> **Next.js App Router Architecture**

---

## 📁 1. Файлова Структура Next.js (App Router)

Next.js 16 використовує **App Router** з file-system based routing.

```
nextjs-frontend/
├── app/                          # Routing directory (Next.js App Router)
│   ├── layout.tsx               # Root layout (обгортає всі сторінки)
│   ├── page.tsx                 # Home page (/)
│   ├── products/
│   │   ├── page.tsx            # Products listing (/products)
│   │   └── [slug]/
│   │       └── page.tsx        # Single product (/products/[slug])
│   └── globals.css             # Global styles
│
├── components/                  # Reusable components
│   ├── site-header.tsx         # Header (використовується на всіх сторінках)
│   ├── footer.tsx              # Footer (використовується на всіх сторінках)
│   ├── breadcrumbs.tsx         # Breadcrumb navigation
│   ├── hero-section.tsx        # Home page hero
│   ├── promo-section.tsx       # Home page promo
│   ├── stats-section.tsx       # Home page stats
│   ├── product-carousel.tsx    # Home page products carousel
│   └── ui/                     # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── carousel.tsx
│
├── lib/                        # Utility functions
│   ├── graphql.ts             # GraphQL client
│   └── queries.ts             # GraphQL queries
│
└── types/                      # TypeScript types
    └── product.ts             # Product interfaces
```

---

## 🎨 2. Шаблони Сторінок (Page Templates)

### **Поточні Шаблони:**

| Шаблон | Файл | URL | Призначення |
|--------|------|-----|-------------|
| **Home Page** | `app/page.tsx` | `/` | Головна сторінка |
| **Products Archive** | `app/products/page.tsx` | `/products` | Каталог товарів |
| **Single Product** | `app/products/[slug]/page.tsx` | `/products/{slug}` | Окремий товар |

### **Відсутні Шаблони (TODO):**

| Шаблон | Запланований Файл | URL | Статус |
|--------|-------------------|-----|--------|
| **Product Category** | `app/products/category/[slug]/page.tsx` | `/products/category/{slug}` | ⏳ Не створено |
| **Single Post (Blog)** | `app/blog/[slug]/page.tsx` | `/blog/{slug}` | ⏳ Не створено |
| **Blog Archive** | `app/blog/page.tsx` | `/blog` | ⏳ Не створено |
| **Category Archive** | `app/blog/category/[slug]/page.tsx` | `/blog/category/{slug}` | ⏳ Не створено |
| **About Page** | `app/about/page.tsx` | `/about` | ⏳ Не створено |
| **Contact Page** | `app/contact/page.tsx` | `/contact` | ⏳ Не створено |

---

## 📄 3. Детальний Опис Шаблонів

### 🏠 **1. Home Page** (`app/page.tsx`)

**URL:** `http://localhost:3000/`

**Компоненти:**
```tsx
<SiteHeader />        // Header (logo, search, menu)
<HeroSection />       // Головний банер з CTA
<PromoSection />      // Промо-блок
<StatsSection />      // Статистика (цифри)
<ProductCarousel />   // Карусель товарів
<Footer />            // Footer
```

**Використання:**
- Лендінг сторінка
- Перше враження відвідувача
- CTA для переходу до каталогу

---

### 🛍️ **2. Products Archive** (`app/products/page.tsx`)

**URL:** `http://localhost:3000/products`

**Структура:**
```tsx
<SiteHeader />
<main>
  <h1>Наші Продукти</h1>
  <ProductGrid>           // Grid 1-2-3-4 колонки (responsive)
    <ProductCard />       // Картка товару
    <ProductCard />
    ...
  </ProductGrid>
</main>
<Footer />
```

**Функціонал:**
- Відображення всіх товарів (GraphQL query `GET_PRODUCTS`)
- Grid layout (responsive: 1 → 2 → 3 → 4 колонки)
- Кнопка "Деталі" → Single Product Page

**Дані з WordPress:**
- Отримує товари через GraphQL
- Поля: title, slug, excerpt, featuredImage, sku, price, stockStatus

---

### 📦 **3. Single Product** (`app/products/[slug]/page.tsx`)

**URL:** `http://localhost:3000/products/{slug}`
**Приклад:** `http://localhost:3000/products/multi-layer-labels`

**Структура:**
```tsx
<SiteHeader />
<main>
  <Breadcrumbs />              // Головна > Продукти > Назва товару

  <ProductLayout>              // 2-колонки (desktop), стек (mobile)
    <ProductImage />           // Зображення товару
    <ProductInfo>
      <Title />                // H1
      <Categories />           // Badges
      <SKU />                  // SKU номер
      <StockStatus />          // Наявність
      <Price />                // Ціна
      <Excerpt />              // Короткий опис
      <CTAButtons>
        - Запит Ціни
        - Зв'язатися з Нами
      </CTAButtons>
      <Specifications />       // Вага, розміри
    </ProductInfo>
  </ProductLayout>

  <ProductDescription />       // Повний опис (content)
</main>
<Footer />
```

**SEO Features:**
- Dynamic meta tags (title, description)
- Open Graph (Facebook, LinkedIn)
- Twitter Card
- JSON-LD structured data:
  - Product schema
  - Breadcrumb schema

**Дані з WordPress:**
- GraphQL query: `GET_PRODUCT_BY_SLUG`
- Поля: title, slug, content, excerpt, featuredImage, categories, sku, price, stockStatus, dimensions, weight, SEO

---

## 🔗 4. Внутрішні Лінки (Internal Linking)

### **4.1 Використання Next.js Link**

Всі внутрішні лінки використовують компонент `<Link>` з Next.js:

```tsx
import Link from 'next/link'

<Link href="/products">Продукти</Link>
<Link href="/products/multi-layer-labels">Multi-Layer Labels</Link>
```

**Переваги:**
- ✅ Client-side navigation (без перезавантаження)
- ✅ Prefetching (швидша навігація)
- ✅ SEO-friendly

### **4.2 Карта Лінків**

```
Header Navigation (site-header.tsx):
├── Logo → / (Home)
├── Всі Продукти → /products
├── Наклейки → # (TODO)
├── Упаковка → # (TODO)
├── Одяг → # (TODO)
└── Про нас → # (TODO)

Products Page:
├── Product Card → /products/{slug}

Single Product:
├── Breadcrumb: Головна → /
├── Breadcrumb: Продукти → /products
└── Breadcrumb: {Product Name} → current page

Footer (footer.tsx):
├── Про компанію → # (TODO)
├── Наша команда → # (TODO)
├── Портфоліо → # (TODO)
├── Контакти → # (TODO)
└── Соцмережі → # (external links)
```

### **4.3 Dynamic Links**

```tsx
// Products page - динамічні лінки на товари
products.map((product) => (
  <a href={`/products/${product.slug}`}>
    {product.title}
  </a>
))
```

---

## 🔍 5. Пошук по Сайту

### **5.1 Поточний Стан**

**Статус:** ❌ **НЕ ФУНКЦІОНАЛЬНИЙ** (лише UI)

**Розташування:**
- Файл: `components/site-header.tsx` (рядки 38-50)
- Візуально присутній на всіх сторінках
- Input type="search" БЕЗ обробки подій

**Код:**
```tsx
<Input
  type="search"
  placeholder="Search for a product"
  className="w-full pl-4 pr-10 py-6 rounded-full border-gray-300 bg-gray-50"
/>
<Button>
  <Search className="h-5 w-5 text-white" />
</Button>
```

### **5.2 План Реалізації (TODO)**

**Варіант 1: Client-Side Search**
```tsx
'use client'
import { useState } from 'react'

const [query, setQuery] = useState('')
const [results, setResults] = useState([])

const handleSearch = async (q: string) => {
  const data = await fetchGraphQL(SEARCH_PRODUCTS, { search: q })
  setResults(data.products.nodes)
}

<Input
  value={query}
  onChange={(e) => {
    setQuery(e.target.value)
    debounce(() => handleSearch(e.target.value), 300)
  }}
/>
```

**Варіант 2: Server-Side Search Page**
```
app/search/page.tsx
URL: /search?q={query}
```

**GraphQL Query:**
```graphql
query SearchProducts($search: String!) {
  sellerpackProducts(where: { search: $search }) {
    nodes {
      id
      title
      slug
      excerpt
      featuredImage { ... }
    }
  }
}
```

**Features для реалізації:**
- ✅ Debounce (300ms)
- ✅ Autocomplete dropdown
- ✅ Search results page
- ✅ Highlight matched text
- ✅ Search by: title, excerpt, content, SKU

---

## 🧭 6. Меню Навігації

### **6.1 Кількість Меню**

На даний момент: **1 меню** (хардкодоване в `site-header.tsx`)

**Області меню:**
1. **Primary Navigation** (Header)
   - Розташування: `components/site-header.tsx` (рядки 82-99)
   - Desktop тільки (ховається на mobile)

### **6.2 Структура Primary Navigation**

**Файл:** `components/site-header.tsx`

```tsx
<nav className="flex items-center gap-8 text-sm font-medium text-gray-700">
  <Link href="/products" className="py-4 border-b-2 border-transparent hover:border-[#78be20] hover:text-[#78be20]">
    Всі Продукти
  </Link>
  <Link href="#" className="py-4 border-b-2 border-transparent hover:border-[#78be20] hover:text-[#78be20]">
    Наклейки
  </Link>
  <Link href="#" className="py-4 border-b-2 border-transparent hover:border-[#78be20] hover:text-[#78be20]">
    Упаковка
  </Link>
  <Link href="#" className="py-4 border-b-2 border-transparent hover:border-[#78be20] hover:text-[#78be20]">
    Одяг
  </Link>
  <Link href="#" className="py-4 border-b-2 border-transparent hover:border-[#78be20] hover:text-[#78be20]">
    Про нас
  </Link>
</nav>
```

### **6.3 Як Керувати Меню?**

**Поточний підхід:** ❌ **Статичне** (хардкодоване)

**Проблеми:**
- Треба редагувати код для зміни меню
- Немає можливості керувати з WordPress
- Немає активного стану для поточної сторінки

---

### **6.4 Рекомендована Реалізація (TODO)**

#### **Варіант A: Dynamic Menu з WordPress (GraphQL)**

**1. Створити GraphQL query для меню:**
```graphql
query GetMenu($location: MenuLocationEnum!) {
  menu(id: $location, idType: LOCATION) {
    menuItems {
      nodes {
        id
        label
        url
        path
        parentId
        cssClasses
      }
    }
  }
}
```

**2. Компонент DynamicMenu:**
```tsx
// components/dynamic-menu.tsx
export async function DynamicMenu({ location }: { location: string }) {
  const data = await fetchGraphQL(GET_MENU, { location })
  const items = data.menu.menuItems.nodes

  return (
    <nav>
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className={pathname === item.path ? 'active' : ''}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
```

**3. Використання:**
```tsx
<DynamicMenu location="PRIMARY" />
<DynamicMenu location="FOOTER" />
```

**Переваги:**
- ✅ Керування через WordPress Admin
- ✅ Можна створити багато меню
- ✅ Підтримка вкладених меню
- ✅ Custom CSS classes

---

#### **Варіант B: Static Config File**

**1. Створити конфіг:**
```tsx
// config/navigation.ts
export const primaryNav = [
  { label: 'Всі Продукти', href: '/products' },
  { label: 'Наклейки', href: '/products/category/stickers' },
  { label: 'Упаковка', href: '/products/category/packaging' },
  { label: 'Одяг', href: '/products/category/apparel' },
  { label: 'Про нас', href: '/about' },
]

export const footerNav = [
  {
    title: 'Про Sellerpack',
    links: [
      { label: 'Про компанію', href: '/about' },
      { label: 'Наша команда', href: '/team' },
    ]
  },
  // ...
]
```

**2. Використання:**
```tsx
import { primaryNav } from '@/config/navigation'

{primaryNav.map((item) => (
  <Link key={item.href} href={item.href}>
    {item.label}
  </Link>
))}
```

**Переваги:**
- ✅ Легше налаштувати
- ✅ Type-safe (TypeScript)
- ❌ Треба деплоїти при змінах

---

### **6.5 Mobile Menu**

**Поточний стан:** ❌ **Не реалізовано**

**Кнопка є (site-header.tsx:71-73):**
```tsx
<button className="md:hidden">
  <Menu className="h-6 w-6" />
</button>
```

**TODO: Реалізувати mobile menu:**
1. Створити `components/mobile-menu.tsx`
2. Використати shadcn/ui Sheet або Dialog
3. Показувати ті ж пункти меню
4. Додати close button
5. Accessibility (focus trap, ESC key)

---

## 📊 7. Області Меню (Menu Locations)

### **Поточні Області:**

| Область | Розташування | Файл | Статус |
|---------|--------------|------|--------|
| **Primary** | Header Navigation | `site-header.tsx:82-99` | ✅ Статичне |
| **Top Bar** | Header Top (USPs) | `site-header.tsx:10-23` | ✅ Статичне |
| **Footer Column 1** | Footer | `footer.tsx` | ✅ Статичне |
| **Footer Column 2** | Footer | `footer.tsx` | ✅ Статичне |
| **Footer Column 3** | Footer | `footer.tsx` | ✅ Статичне |
| **Social** | Footer | `footer.tsx` | ✅ Статичне |
| **Mobile** | Mobile Menu | - | ❌ Відсутнє |

### **Рекомендовані Області (якщо використовувати WordPress Menus):**

```php
// WordPress functions.php
register_nav_menus([
  'primary'        => 'Primary Navigation',
  'footer-about'   => 'Footer - About Sellerpack',
  'footer-support' => 'Footer - Support',
  'footer-services'=> 'Footer - Services',
  'mobile'         => 'Mobile Menu',
]);
```

---

## 🎯 8. Рекомендації та Next Steps

### **8.1 Пріоритет HIGH:**

1. **✅ DONE: Single Product Page**
2. ⏳ **Реалізувати Search функціонал**
   - Client-side search з debounce
   - Search results page
   - Autocomplete dropdown

3. ⏳ **Category Filtering на Products Page**
   - Sidebar з категоріями
   - URL: `/products?category=stickers`
   - Фільтрація через GraphQL

4. ⏳ **Mobile Menu**
   - Hamburger menu працює
   - Responsive navigation

### **8.2 Пріоритет MEDIUM:**

5. ⏳ **Dynamic Menus з WordPress**
   - GraphQL для меню
   - Керування через WP Admin

6. ⏳ **Product Category Template**
   - `/products/category/[slug]/page.tsx`
   - Фільтровані товари за категорією

7. ⏳ **About / Contact Pages**
   - Static pages
   - Contact form

### **8.3 Пріоритет LOW:**

8. ⏳ **Blog функціонал**
   - Blog archive
   - Single post
   - Categories

9. ⏳ **Active Menu State**
   - Підсвічувати активний пункт меню
   - Використовувати `usePathname()` hook

---

## 📚 Додаткові Ресурси

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [WPGraphQL Menus](https://www.wpgraphql.com/docs/menus)
- [Breadcrumbs Best Practices](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

---

**Оновлено:** 2025-11-24
**Автор:** Claude Code
**Версія документу:** 1.0
