# ⚡ Quick Reference - Sellerpack

> Швидкий довідник для розробників

---

## 📄 Шаблони Сторінок

| Шаблон | Файл | URL | Статус |
|--------|------|-----|--------|
| Home | `app/page.tsx` | `/` | ✅ |
| Products Archive | `app/products/page.tsx` | `/products` | ✅ |
| Single Product | `app/products/[slug]/page.tsx` | `/products/{slug}` | ✅ |
| Category | - | - | ❌ |
| Search | - | - | ❌ |

---

## 🔗 Внутрішні Лінки - Як Працює

### 1. Static Links (хардкодовані)
```tsx
import Link from 'next/link'

<Link href="/products">Продукти</Link>
```

### 2. Dynamic Links (з даних)
```tsx
<a href={`/products/${product.slug}`}>
  {product.title}
</a>
```

**Де використовуються:**
- Header menu → `site-header.tsx:83-97`
- Footer → `footer.tsx`
- Product cards → `app/products/page.tsx:84`
- Breadcrumbs → `breadcrumbs.tsx`
- Logo → `site-header.tsx:30`

---

## 🔍 Пошук - Статус

**Поточний:** ❌ **НЕ ПРАЦЮЄ** (тільки UI)

**Файл:** `components/site-header.tsx:38-50`

**Треба додати:**
```tsx
'use client'
const [query, setQuery] = useState('')

<Input
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleSearch()
  }}
/>
```

---

## 🧭 Меню - Як Працює

### Поточна Реалізація
**Тип:** Статичне (хардкодоване)
**Файл:** `components/site-header.tsx:82-99`

**Структура:**
```tsx
<nav>
  <Link href="/products">Всі Продукти</Link>
  <Link href="#">Наклейки</Link>      {/* TODO */}
  <Link href="#">Упаковка</Link>      {/* TODO */}
  <Link href="#">Одяг</Link>          {/* TODO */}
  <Link href="#">Про нас</Link>       {/* TODO */}
</nav>
```

### Як Змінити Меню?
1. Відкрити `components/site-header.tsx`
2. Знайти рядок 82-99
3. Змінити `href` та текст
4. Зберегти → автоматичне оновлення (hot reload)

### Області Меню

| Область | Розташування | Кількість Items |
|---------|--------------|-----------------|
| Primary Navigation | Header | 5 links |
| Top Bar | Header (USPs) | 5 spans |
| Footer Column 1 | Footer - Про Sellerpack | 4 links |
| Footer Column 2 | Footer - Підтримка | 4 links |
| Footer Column 3 | Footer - Послуги | 4 links |
| Social | Footer | 4 icons |

### Рекомендація: Dynamic Menu

**Створити конфіг файл:**
```tsx
// config/navigation.ts
export const mainMenu = [
  { label: 'Всі Продукти', href: '/products' },
  { label: 'Наклейки', href: '/products/category/stickers' },
  // ...
]
```

**Використати:**
```tsx
import { mainMenu } from '@/config/navigation'

{mainMenu.map(item => (
  <Link key={item.href} href={item.href}>{item.label}</Link>
))}
```

---

## 📦 Компоненти - Де Що Знаходиться

### Layout Components (використовуються на всіх сторінках)
```
components/site-header.tsx  →  Header (logo, search, menu)
components/footer.tsx       →  Footer
components/breadcrumbs.tsx  →  Breadcrumb navigation
```

### Home Page Components
```
components/hero-section.tsx     →  Головний банер
components/promo-section.tsx    →  Промо блок
components/stats-section.tsx    →  Статистика
components/product-carousel.tsx →  Карусель товарів
```

### UI Components (shadcn/ui)
```
components/ui/button.tsx
components/ui/input.tsx
components/ui/card.tsx
components/ui/badge.tsx
components/ui/carousel.tsx
```

---

## 🎨 Брендинг - Кольори та Стилі

### Основні Кольори
```css
--green-primary: #78be20    /* Зелений (кнопки, акценти) */
--green-hover:   #6aa81c    /* Темніший зелений (hover) */
--gray-bg:       #f4f4f4    /* Фон секцій */
--text-dark:     #1f2937    /* Основний текст */
--text-gray:     #6b7280    /* Вторинний текст */
```

### Типографія
```tsx
Font: Roboto
Weights: 300, 400, 500, 700
Locale: cyrillic (українська підтримка)
```

### Компоненти Стилів
```tsx
// Зелена кнопка
className="bg-[#78be20] hover:bg-[#6aa81c]"

// Сірий фон
className="bg-[#f4f4f4]"

// Rounded button
className="rounded-full"
```

---

## 🗂️ Файлова Структура - Швидкий Доступ

```
nextjs-frontend/
├── app/
│   ├── layout.tsx          → Root layout (всі сторінки)
│   ├── page.tsx            → Home page
│   ├── globals.css         → Global styles
│   └── products/
│       ├── page.tsx        → Products listing
│       └── [slug]/
│           └── page.tsx    → Single product
│
├── components/
│   ├── site-header.tsx     → Header ⭐
│   ├── footer.tsx          → Footer ⭐
│   └── breadcrumbs.tsx     → Breadcrumbs ⭐
│
├── lib/
│   ├── graphql.ts          → GraphQL client
│   └── queries.ts          → GraphQL queries ⭐
│
└── types/
    └── product.ts          → TypeScript types
```

---

## 🚀 Команди - Розробка

```bash
# Dev server
npm run dev
# → http://localhost:3000

# Build (перевірити помилки)
npm run build

# Production
npm run start

# Type checking
npx tsc --noEmit
```

---

## 🎯 Швидкі Посилання

**Working URLs:**
- Home: http://localhost:3000/
- Products: http://localhost:3000/products
- Product: http://localhost:3000/products/multi-layer-labels

**WordPress:**
- GraphQL: http://localhost:8080/graphql
- Admin: http://localhost:8080/wp-admin

---

## 📝 Frequently Asked Questions

### Q: Як додати новий пункт в меню?
**A:** Відредагувати `components/site-header.tsx:82-99`

### Q: Як змінити текст у футері?
**A:** Відредагувати `components/footer.tsx`

### Q: Де налаштовується пошук?
**A:** Поки що тільки UI в `site-header.tsx:38-50`. Функціонал треба додати.

### Q: Як додати нову сторінку?
**A:** Створити файл `app/[page-name]/page.tsx`

### Q: Де GraphQL queries?
**A:** `lib/queries.ts`

### Q: Як отримати дані з WordPress?
**A:**
```tsx
import { fetchGraphQL } from '@/lib/graphql'
import { GET_PRODUCTS } from '@/lib/queries'

const data = await fetchGraphQL(GET_PRODUCTS, { first: 10 })
```

---

**Оновлено:** 2025-11-24
