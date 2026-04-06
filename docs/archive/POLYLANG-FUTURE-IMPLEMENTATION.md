# 🌐 Polylang - Майбутня Реалізація Багатомовності

> Архітектурний план інтеграції Polylang з Next.js

---

## 📋 Поточний Стан

### WordPress (Backend):
- ✅ **Polylang** встановлено і активовано
- ✅ **wp-graphql-polylang** встановлено (інтеграція з GraphQL)
- ✅ Мови налаштовані (принаймні українська `/uk/`)
- ✅ Контент перекладається в WordPress Admin

### Next.js (Frontend):
- ⏳ Мультимовність **НЕ** реалізована
- ⏳ Поточне рішення: видалення `/uk/` префіксу
- ⏳ Усі сторінки тільки українською

---

## 🎯 Варіанти Реалізації

### Варіант 1: Next.js i18n Routing (Рекомендований)

**Переваги:**
- ✅ Нативна підтримка Next.js
- ✅ SEO-friendly URLs
- ✅ Автоматичне визначення мови
- ✅ Підтримка субдоменів та префіксів

**Недоліки:**
- ❌ Потребує налаштування на рівні конфігурації
- ❌ Треба налаштувати всі компоненти

#### Архітектура:

```
Next.js URLs:
├─ /uk/              (українська - default)
├─ /en/              (англійська)
├─ /ru/              (російська)
└─ /pl/              (польська)

WordPress URLs:
├─ /uk/              (відповідає Next.js /uk/)
├─ /en/              (відповідає Next.js /en/)
├─ /ru/              (відповідає Next.js /ru/)
└─ /pl/              (відповідає Next.js /pl/)
```

#### Налаштування:

**1. `next.config.mjs`:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['uk', 'en', 'ru', 'pl'],
    defaultLocale: 'uk',
    localeDetection: true, // Автоматичне визначення мови браузера
  },
}

export default nextConfig
```

**2. Структура файлів:**

```
app/
├─ [locale]/           # Динамічний сегмент для мови
│  ├─ layout.tsx       # Layout з мовою
│  ├─ page.tsx         # Homepage
│  ├─ products/
│  │  └─ page.tsx
│  ├─ contact/
│  │  └─ page.tsx
│  └─ [slug]/
│     └─ page.tsx
└─ middleware.ts       # Визначення мови
```

**3. Middleware для визначення мови:**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['uk', 'en', 'ru', 'pl']
const defaultLocale = 'uk'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Перевірка чи URL вже має мову
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Визначити мову з заголовків браузера
  const locale = request.headers.get('accept-language')?.split(',')[0].slice(0, 2)
  const detectedLocale = locales.includes(locale || '') ? locale : defaultLocale

  // Редірект на URL з мовою
  request.nextUrl.pathname = `/${detectedLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
```

**4. GraphQL Query з мовою:**

```typescript
// lib/queries.ts
export const GET_MENU = gql`
  query GetMenu($language: LanguageCodeEnum!) {
    menus(where: { location: PRIMARY, language: $language }) {
      nodes {
        id
        name
        language {
          code
          locale
        }
        menuItems {
          nodes {
            id
            label
            url
            path
            parentId
          }
        }
      }
    }
  }
`

// Використання:
const data = await fetchGraphQL<MenuData>(GET_MENU, {
  language: locale.toUpperCase() // 'UK', 'EN', 'RU', 'PL'
})
```

**5. Компонент з мовою:**

```typescript
// app/[locale]/layout.tsx
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params

  return (
    <html lang={locale}>
      <body>
        <LanguageProvider locale={locale}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
```

**6. Оновлений Main Navigation:**

```typescript
// components/main-navigation.tsx
async function getMenuItems(locale: string): Promise<MenuItem[]> {
  try {
    const data = await fetchGraphQL<MenuData>(GET_MENU, {
      language: locale.toUpperCase()
    })
    const primaryMenu = data.menus?.nodes?.[0]
    const menuItems = primaryMenu?.menuItems?.nodes || []

    // Тепер paths вже з правильною мовою від WordPress
    // /uk/home → залишити як є для UK locale
    // /en/home → залишити як є для EN locale
    return menuItems.map(item => ({
      ...item,
      path: item.path, // Не видаляємо префікс!
    }))
  } catch (error) {
    // Fallback з урахуванням мови
    return getDefaultMenuForLocale(locale)
  }
}

function getDefaultMenuForLocale(locale: string): MenuItem[] {
  const menus = {
    uk: [
      { label: 'Всі Продукти', path: '/uk/products' },
      { label: 'Контакти', path: '/uk/contact' },
    ],
    en: [
      { label: 'All Products', path: '/en/products' },
      { label: 'Contact', path: '/en/contact' },
    ],
  }
  return menus[locale as keyof typeof menus] || menus.uk
}
```

---

### Варіант 2: App Router з динамічним [locale]

**Переваги:**
- ✅ Більш гнучкий контроль
- ✅ Можна налаштувати кастомну логіку
- ✅ Легше інтегрується з існуючим кодом

**Недоліки:**
- ❌ Потребує більше ручної роботи
- ❌ SEO треба налаштовувати окремо

#### Структура:

```typescript
// app/[locale]/page.tsx
export default async function Page({ params }: { params: { locale: string } }) {
  const { locale } = await params
  const translations = await getTranslations(locale)

  return <HomePage translations={translations} locale={locale} />
}

// Generate static params для всіх мов
export async function generateStaticParams() {
  return [
    { locale: 'uk' },
    { locale: 'en' },
    { locale: 'ru' },
    { locale: 'pl' },
  ]
}
```

---

### Варіант 3: Subdomain Approach

**URL Структура:**
```
uk.sellerpack.com - Українська
en.sellerpack.com - English
ru.sellerpack.com - Русский
pl.sellerpack.com - Polski
```

**Переваги:**
- ✅ Чітке розділення мов
- ✅ Легко кешувати
- ✅ SEO переваги для локальних ринків

**Недоліки:**
- ❌ Потребує налаштування DNS
- ❌ Складніше деплоїти

---

## 🔧 Компоненти що Потрібно Оновити

### 1. Language Switcher

```typescript
// components/language-switcher.tsx
'use client'

import { usePathname, useRouter } from 'next/navigation'

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const languages = [
    { code: 'uk', label: 'Українська', flag: '🇺🇦' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  ]

  const switchLanguage = (newLocale: string) => {
    // Замінити поточну мову на нову в URL
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPathname)
  }

  return (
    <div className="flex items-center gap-2">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          className={`px-3 py-1 rounded ${
            currentLocale === lang.code ? 'bg-green-500 text-white' : 'bg-gray-100'
          }`}
        >
          {lang.flag} {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
```

### 2. Translation Helper

```typescript
// lib/translations.ts
type Locale = 'uk' | 'en' | 'ru' | 'pl'

type Translations = {
  [key: string]: {
    [K in Locale]: string
  }
}

const translations: Translations = {
  'home.title': {
    uk: 'Рекламна продукція для вашого бренду',
    en: 'Promotional Products for Your Brand',
    ru: 'Рекламная продукция для вашего бренда',
    pl: 'Produkty promocyjne dla Twojej marki',
  },
  'products.all': {
    uk: 'Всі Продукти',
    en: 'All Products',
    ru: 'Все Продукты',
    pl: 'Wszystkie produkty',
  },
  'contact.button': {
    uk: 'Зв\'яжіться з нами',
    en: 'Contact Us',
    ru: 'Свяжитесь с нами',
    pl: 'Skontaktuj się z nami',
  },
}

export function t(key: string, locale: Locale): string {
  return translations[key]?.[locale] || translations[key]?.uk || key
}

// Використання:
import { t } from '@/lib/translations'

function Component({ locale }: { locale: Locale }) {
  return <h1>{t('home.title', locale)}</h1>
}
```

### 3. SEO з мовами

```typescript
// app/[locale]/page.tsx
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params

  const titles = {
    uk: 'Sellerpack - Професійна рекламна продукція | B2B',
    en: 'Sellerpack - Professional Promotional Products | B2B',
    ru: 'Sellerpack - Профессиональная рекламная продукция | B2B',
    pl: 'Sellerpack - Profesjonalne produkty promocyjne | B2B',
  }

  return {
    title: titles[locale as keyof typeof titles],
    alternates: {
      canonical: `https://sellerpack.com/${locale}`,
      languages: {
        'uk': 'https://sellerpack.com/uk',
        'en': 'https://sellerpack.com/en',
        'ru': 'https://sellerpack.com/ru',
        'pl': 'https://sellerpack.com/pl',
      },
    },
  }
}
```

---

## 📊 GraphQL Schema з Polylang

### Доступні поля:

```graphql
# Отримати мови сайту
query GetLanguages {
  languages {
    code      # "UK", "EN", "RU", "PL"
    locale    # "uk_UA", "en_US", "ru_RU", "pl_PL"
    name      # "Українська", "English", etc.
    slug      # "uk", "en", "ru", "pl"
  }
}

# Отримати контент для конкретної мови
query GetPage($slug: String!, $language: LanguageCodeEnum!) {
  page(id: $slug, idType: URI) {
    id
    title(language: $language)
    content(language: $language)
    translations {
      language {
        code
        locale
      }
      uri
    }
  }
}

# Отримати меню для конкретної мови
query GetMenu($language: LanguageCodeEnum!) {
  menus(where: { location: PRIMARY, language: $language }) {
    nodes {
      menuItems {
        nodes {
          label
          path
        }
      }
    }
  }
}
```

---

## 🚀 План Міграції

### Фаза 1: Підготовка (1 тиждень)
- [ ] Налаштувати всі мови в WordPress Polylang
- [ ] Перевірити всі переклади контенту
- [ ] Перевести меню для всіх мов
- [ ] Створити translations.ts файл

### Фаза 2: Next.js Конфігурація (2-3 дні)
- [ ] Додати i18n в next.config.mjs
- [ ] Створити middleware для визначення мови
- [ ] Оновити структуру app/ з [locale]
- [ ] Додати Language Switcher

### Фаза 3: Оновлення Компонентів (1 тиждень)
- [ ] Оновити всі GraphQL queries з параметром language
- [ ] Додати locale prop до всіх page компонентів
- [ ] Оновити MainNavigation для підтримки мов
- [ ] Оновити metadata з alternates
- [ ] Додати hreflang теги для SEO

### Фаза 4: Тестування (2-3 дні)
- [ ] Перевірити перемикання мов
- [ ] Перевірити SEO (hreflang, canonical)
- [ ] Перевірити всі сторінки на всіх мовах
- [ ] Перевірити fallback для відсутніх перекладів
- [ ] Performance testing

### Фаза 5: Deploy (1 день)
- [ ] Deploy на production
- [ ] Налаштувати редіректи
- [ ] Перевірити всі URL
- [ ] Submit sitemap з усіма мовами

---

## 📝 Приклад Повної Реалізації

### 1. Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['uk', 'en', 'ru', 'pl']
const defaultLocale = 'uk'

function getLocale(request: NextRequest): string {
  // 1. Перевірити cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 2. Перевірити accept-language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const browserLocale = acceptLanguage.split(',')[0].slice(0, 2)
    if (locales.includes(browserLocale)) {
      return browserLocale
    }
  }

  // 3. Default
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Пропустити API, _next, статичні файли
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return
  }

  // Перевірка чи URL вже має мову
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return
  }

  // Визначити мову та редірект
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  const response = NextResponse.redirect(request.nextUrl)

  // Зберегти мову в cookie
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })

  return response
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
}
```

### 2. Root Layout

```typescript
// app/[locale]/layout.tsx
import { notFound } from 'next/navigation'
import { LanguageSwitcher } from '@/components/language-switcher'

const locales = ['uk', 'en', 'ru', 'pl']

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params

  // Перевірка валідності мови
  if (!locales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="alternate" hrefLang="uk" href="https://sellerpack.com/uk" />
        <link rel="alternate" hrefLang="en" href="https://sellerpack.com/en" />
        <link rel="alternate" hrefLang="ru" href="https://sellerpack.com/ru" />
        <link rel="alternate" hrefLang="pl" href="https://sellerpack.com/pl" />
        <link rel="alternate" hrefLang="x-default" href="https://sellerpack.com/uk" />
      </head>
      <body>
        <LanguageSwitcher currentLocale={locale} />
        {children}
      </body>
    </html>
  )
}
```

### 3. Updated Main Navigation

```typescript
// components/main-navigation.tsx
async function getMenuItems(locale: string): Promise<MenuItem[]> {
  try {
    const languageCode = locale.toUpperCase() as 'UK' | 'EN' | 'RU' | 'PL'

    const data = await fetchGraphQL<MenuData>(GET_MENU, {
      language: languageCode
    })

    const primaryMenu = data.menus?.nodes?.[0]
    return primaryMenu?.menuItems?.nodes || getDefaultMenu(locale)
  } catch (error) {
    console.error('Error fetching menu:', error)
    return getDefaultMenu(locale)
  }
}

function getDefaultMenu(locale: string): MenuItem[] {
  const menus: Record<string, MenuItem[]> = {
    uk: [
      { id: '1', label: 'Всі Продукти', path: '/uk/products', ... },
      { id: '2', label: 'Контакти', path: '/uk/contact', ... },
    ],
    en: [
      { id: '1', label: 'All Products', path: '/en/products', ... },
      { id: '2', label: 'Contact', path: '/en/contact', ... },
    ],
    ru: [
      { id: '1', label: 'Все Продукты', path: '/ru/products', ... },
      { id: '2', label: 'Контакты', path: '/ru/contact', ... },
    ],
    pl: [
      { id: '1', label: 'Wszystkie produkty', path: '/pl/products', ... },
      { id: '2', label: 'Kontakt', path: '/pl/contact', ... },
    ],
  }

  return menus[locale] || menus.uk
}

export async function MainNavigation({ locale }: { locale: string }) {
  const menuItems = await getMenuItems(locale)

  return (
    <>
      <DynamicNavigation items={menuItems} className="..." />
      <div className="md:hidden">
        <MobileMenuWrapper items={menuItems} />
      </div>
    </>
  )
}
```

---

## ⚠️ Важливі Моменти

### 1. URL Strategy

**Рекомендація:** Prefix approach (як WordPress)

```
✅ /uk/products
✅ /en/products
✅ /ru/products
✅ /pl/products
```

### 2. Default Language

**Два підходи:**

**A. З префіксом для всіх мов:**
```
/ → redirect to /uk/
```

**B. Без префіксу для default:**
```
/ → українська (default)
/en/ → англійська
```

### 3. Fallback Strategy

```typescript
// Якщо переклад не існує
function getContent(key: string, locale: string) {
  return translations[key]?.[locale] || translations[key]?.uk || key
}
```

### 4. SEO Checklist

- [ ] Hreflang теги для всіх мов
- [ ] Canonical URL
- [ ] x-default для default мови
- [ ] Sitemap з усіма мовами
- [ ] robots.txt налаштований
- [ ] Open Graph для кожної мови

---

## 📈 Переваги Повної Інтеграції

### SEO:
- ✅ Кращий рейтинг в локальних пошуках
- ✅ Hreflang підтримка
- ✅ Локалізовані URL

### UX:
- ✅ Автоматичне визначення мови
- ✅ Збереження вибору мови
- ✅ Легке перемикання між мовами

### Бізнес:
- ✅ Більший охоплення аудиторії
- ✅ Локалізація для різних ринків
- ✅ Покращена конверсія

---

## 🔗 Корисні Ресурси:

- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [WPGraphQL Polylang](https://github.com/valu-digital/wp-graphql-polylang)
- [Polylang Documentation](https://polylang.pro/doc/)
- [Google i18n Best Practices](https://developers.google.com/search/docs/specialty/international)

---

**Створено:** 2025-11-24
**Статус:** 📋 Планування
**Рекомендація:** Варіант 1 (Next.js i18n Routing)
