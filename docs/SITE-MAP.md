# 🗺️ Site Map - Sellerpack

## Візуальна Структура Сайту

```
┌─────────────────────────────────────────────────────────────────┐
│                        🏠 Home Page (/)                          │
│                      app/page.tsx                                │
├─────────────────────────────────────────────────────────────────┤
│  Components:                                                     │
│  - SiteHeader (logo, search, menu)                              │
│  - HeroSection                                                   │
│  - PromoSection                                                  │
│  - StatsSection                                                  │
│  - ProductCarousel                                               │
│  - Footer                                                        │
└─────────────────────────────────────────────────────────────────┘
                               │
                 ┌─────────────┼─────────────┐
                 ▼             ▼             ▼
┌─────────────────────┐  ┌──────────────┐  ┌──────────────┐
│  📦 Products        │  │ ❌ About     │  │ ❌ Contact   │
│  /products          │  │ /about       │  │ /contact     │
│  ✅ WORKING         │  │ ⏳ TODO      │  │ ⏳ TODO      │
└─────────────────────┘  └──────────────┘  └──────────────┘
          │
          │ Click "Деталі" button
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│            📄 Single Product (/products/[slug])                  │
│              app/products/[slug]/page.tsx                        │
├─────────────────────────────────────────────────────────────────┤
│  URL Examples:                                                   │
│  - /products/multi-layer-labels                                 │
│  - /products/custom-thermal-label-printing                      │
│  - /products/security-labels                                    │
├─────────────────────────────────────────────────────────────────┤
│  Components:                                                     │
│  - SiteHeader                                                    │
│  - Breadcrumbs (Home > Products > Product Name)                 │
│  - ProductImage                                                  │
│  - ProductInfo (title, price, SKU, stock, specs)                │
│  - CTAButtons (Запит Ціни, Зв'язатися)                         │
│  - ProductDescription (full content)                             │
│  - Footer                                                        │
├─────────────────────────────────────────────────────────────────┤
│  SEO:                                                            │
│  - Meta tags (title, description)                               │
│  - Open Graph (og:title, og:image, og:description)              │
│  - Twitter Card                                                  │
│  - JSON-LD (Product schema, Breadcrumb schema)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧭 Navigation Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                      HEADER NAVIGATION                            │
│                   (всі сторінки мають)                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  🏢 [Logo] Sellerpack  →  /                                     │
│                                                                   │
│  🔍 [Search Bar]  →  ❌ НЕ ПРАЦЮЄ (TODO)                        │
│                                                                   │
│  📱 Navigation Links:                                            │
│     ├─ Всі Продукти  →  /products          ✅                   │
│     ├─ Наклейки      →  #                  ❌ TODO              │
│     ├─ Упаковка      →  #                  ❌ TODO              │
│     ├─ Одяг          →  #                  ❌ TODO              │
│     └─ Про нас       →  #                  ❌ TODO              │
│                                                                   │
│  🛒 Actions:                                                     │
│     ├─ Login         →  ❌ Не працює                            │
│     ├─ Compare (vs)  →  ❌ Не працює                            │
│     ├─ Tracking      →  ❌ Не працює                            │
│     └─ Cart          →  ❌ Не працює                            │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                      FOOTER NAVIGATION                            │
│                   (всі сторінки мають)                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📋 Про Sellerpack:           🛠️ Підтримка:                    │
│     ├─ Про компанію  →  #       ├─ Контакти  →  #               │
│     ├─ Наша команда  →  #       ├─ FAQ  →  #                    │
│     ├─ Портфоліо  →  #          ├─ Завантаження  →  #           │
│     └─ Новини  →  #             └─ Умови та положення  →  #     │
│                                                                   │
│  🎨 Послуги:                  🌐 Соцмережі:                     │
│     ├─ Друк наклейок  →  #      ├─ Facebook                     │
│     ├─ Виробництво упаковки →#  ├─ LinkedIn                     │
│     ├─ Корпоративний одяг  →#   ├─ YouTube                      │
│     └─ Доставка  →  #           └─ Instagram                    │
│                                                                   │
│  ⚖️ Legal:                                                       │
│     ├─ Політика конфіденційності  →  #                          │
│     ├─ Політика cookie  →  #                                    │
│     └─ Юридична інформація  →  #                                │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔄 User Journey Examples

### Journey 1: Знайти Товар через Каталог
```
1. 🏠 Home Page (/)
   ↓ Click "Всі Продукти" в Header
2. 📦 Products Page (/products)
   ↓ Click "Деталі" на картці товару
3. 📄 Single Product (/products/multi-layer-labels)
   ↓ Click "Запит Ціни"
4. ❌ Contact Form (TODO - not implemented)
```

### Journey 2: Знайти Товар через Пошук (Запланований)
```
1. 🏠 Any Page
   ↓ Type in Search Bar
2. 🔍 Search Results Dropdown (TODO)
   ↓ Click на результат
3. 📄 Single Product (/products/[slug])
```

### Journey 3: Категорії (Запланований)
```
1. 🏠 Home Page
   ↓ Click "Наклейки" в Header
2. 📂 Category Page (/products/category/stickers) - TODO
   ↓ Browse filtered products
3. 📄 Single Product
```

---

## 📊 Content Types & Templates

| Content Type | Template File | Current Status | Count |
|--------------|---------------|----------------|-------|
| **Home Page** | `app/page.tsx` | ✅ Working | 1 |
| **Product** | `app/products/[slug]/page.tsx` | ✅ Working | 15 products |
| **Product Archive** | `app/products/page.tsx` | ✅ Working | 1 |
| **Product Category** | `app/products/category/[slug]/page.tsx` | ❌ TODO | 0 |
| **Blog Post** | `app/blog/[slug]/page.tsx` | ❌ TODO | 0 |
| **Blog Archive** | `app/blog/page.tsx` | ❌ TODO | 0 |
| **Page (Generic)** | `app/[slug]/page.tsx` | ❌ TODO | 0 |

---

## 🎯 URL Structure

### Current URLs (Working)
```
✅ /                              → Home
✅ /products                      → Products Archive
✅ /products/multi-layer-labels   → Single Product
✅ /products/[any-slug]           → Dynamic Single Product
```

### Planned URLs (TODO)
```
⏳ /products?search=label         → Search Results
⏳ /products?category=stickers    → Filtered by Category
⏳ /products/category/stickers    → Category Archive
⏳ /about                         → About Page
⏳ /contact                       → Contact Page
⏳ /blog                          → Blog Archive
⏳ /blog/[slug]                   → Single Blog Post
```

---

## 🔗 Internal Linking Strategy

### **Bidirectional Links:**

```
Home Page ←→ Products Archive
    ↑ (Logo, Footer)   ↓ (Header Menu, Hero CTA)

Products Archive ←→ Single Product
    ↑ (Breadcrumb)     ↓ (Product Cards)

Single Product → Home
    ↑ (Breadcrumb, Logo)
```

### **Linking Locations:**

| Location | Links To | Component/File |
|----------|----------|----------------|
| **Logo** | Home (/) | `site-header.tsx:30` |
| **Header Menu** | Products, Categories | `site-header.tsx:83-97` |
| **Breadcrumbs** | Home, Products | `breadcrumbs.tsx` |
| **Product Cards** | Single Product | `app/products/page.tsx:84` |
| **Footer Columns** | About, Contact, etc | `footer.tsx` |
| **Hero CTA** | Products | `hero-section.tsx` |

---

## 📱 Responsive Behavior

### Desktop (≥768px)
```
Header:
├─ Logo (left)
├─ Search Bar (center, expanded)
├─ Actions: Login, Compare, Tracking, Cart (right)
└─ Navigation Menu (full width, horizontal)

Products Grid: 4 columns (xl) / 3 columns (lg)
```

### Tablet (640-768px)
```
Header:
├─ Logo (top)
├─ Search Bar (full width)
└─ Actions (compact)

Navigation: Hidden → Hamburger Menu

Products Grid: 2 columns
```

### Mobile (<640px)
```
Header:
├─ Logo (top, centered)
├─ Search Bar (full width)
└─ Hamburger Menu Button

Products Grid: 1 column (stacked)
```

---

## 🚀 Next Steps for Navigation

### Priority 1: Search Functionality ⭐
1. Make search bar functional
2. Add autocomplete dropdown
3. Create search results page
4. Implement debounce (300ms)

### Priority 2: Mobile Menu ⭐
1. Create mobile menu component
2. Add open/close state
3. Show navigation items
4. Accessibility (keyboard, focus)

### Priority 3: Category Pages
1. Create category template
2. Link from header menu
3. Filter products by category
4. Update menu with real categories

### Priority 4: Dynamic Menus
1. Fetch menus from WordPress GraphQL
2. Replace hardcoded navigation
3. Support nested menus
4. Active menu state

---

**Оновлено:** 2025-11-24
**Документ:** Site Map v1.0
