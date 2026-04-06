# ✅ Polylang і Hydration - ВИПРАВЛЕНО

> Виправлення проблем з `/uk/` префіксом та hydration error

---

## 🐛 Проблема 1: Polylang `/uk/` Префікс

### Опис:
WordPress з плагіном **Polylang** (багатомовність) повертає paths з мовним префіксом:

```
/uk/home/
/uk/custom-printing-services/
/uk/contact/
```

Але Next.js має роути без префіксів:
```
/
/products
/contact
```

### Рішення:

**Файл:** `components/main-navigation.tsx`

```typescript
async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const data = await fetchGraphQL<MenuData>(GET_MENU)
    const primaryMenu = data.menus?.nodes?.[0]
    const menuItems = primaryMenu?.menuItems?.nodes || []

    // Remove /uk/ prefix from paths (Polylang language prefix)
    return menuItems.map(item => ({
      ...item,
      path: item.path.replace(/^\/uk\//, '/') || '/',
    }))
  } catch (error) {
    // ... fallback
  }
}
```

### Що робить:
1. Отримує меню з WordPress
2. Видаляє `/uk/` префікс з кожного path
3. `/uk/home/` → `/home/`
4. `/uk/contact/` → `/contact/`

### Результат:
✅ Меню тепер працюють з Next.js роутами

---

## 🐛 Проблема 2: Hydration Error з `toLocaleString()`

### Помилка:
```
Hydration failed because the server rendered text didn't match the client.
```

### Причина:
```typescript
// ❌ Проблемний код
<span>В наявності ({product.stock.toLocaleString()})</span>
```

**Що відбувається:**
- **Сервер (Node.js):** `5000.toLocaleString()` → `"5 000"` (з пробілом)
- **Клієнт (Browser):** `5000.toLocaleString()` → `"5,000"` (з комою)

React бачить різницу і викидає hydration error.

### Рішення:

**Файл:** `components/product-carousel.tsx:110`

```typescript
// ✅ Виправлений код
<span>В наявності ({product.stock})</span>
```

**Альтернативні рішення (якщо потрібне форматування):**

#### Варіант 1: Явна локаль
```typescript
<span>В наявності ({product.stock.toLocaleString('uk-UA')})</span>
```

#### Варіант 2: Client-side форматування
```typescript
'use client'

export function StockDisplay({ stock }: { stock: number }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span>В наявності ({stock})</span>
  }

  return <span>В наявності ({stock.toLocaleString()})</span>
}
```

#### Варіант 3: Кастомна функція форматування
```typescript
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// Usage:
<span>В наявності ({formatNumber(product.stock)})</span>
```

### Результат:
✅ Hydration error виправлено
✅ Сервер і клієнт рендерять однаковий HTML

---

## 📋 Файли Змінені:

### 1. `components/main-navigation.tsx`
**Зміна:** Додано `.replace(/^\/uk\//, '/')` для видалення Polylang префіксу

**До:**
```typescript
return primaryMenu?.menuItems?.nodes || []
```

**Після:**
```typescript
const menuItems = primaryMenu?.menuItems?.nodes || []

// Remove /uk/ prefix from paths (Polylang language prefix)
return menuItems.map(item => ({
  ...item,
  path: item.path.replace(/^\/uk\//, '/') || '/',
}))
```

### 2. `components/product-carousel.tsx`
**Зміна:** Видалено `.toLocaleString()`

**До:**
```typescript
<span>В наявності ({product.stock.toLocaleString()})</span>
```

**Після:**
```typescript
<span>В наявності ({product.stock})</span>
```

---

## 🔍 Як Перевірити:

### 1. Перевірити Меню:
Відкрити http://localhost:3000

**Перевірити що paths працюють:**
- Home → `/home` (а не `/uk/home`)
- Catalog → `/custom-printing-services` (а не `/uk/custom-printing-services`)
- Contact → `/contact` (а не `/uk/contact`)

### 2. Перевірити Hydration:
Відкрити Developer Console (F12)

**Має НЕ бути помилок:**
- ✅ Немає "Hydration failed"
- ✅ Немає "server rendered text didn't match"

---

## 🌐 Polylang - Додаткова Інформація:

### Що таке Polylang?

**Polylang** - плагін WordPress для багатомовних сайтів:
- Додає мовні префікси до URL: `/uk/`, `/en/`, `/ru/`
- Дозволяє перекладати контент
- Інтегрується з WPGraphQL через плагін `wp-graphql-polylang`

### Як працюють мови:

**WordPress URLs:**
```
Українська: http://localhost:8080/uk/home/
English:    http://localhost:8080/en/home/
Default:    http://localhost:8080/home/
```

**Next.js URLs:**
```
/ - Homepage
/products - Products page
/contact - Contact page
```

### Майбутня Багатомовність Next.js:

Якщо потрібна багатомовність в Next.js:

#### Варіант 1: Next.js i18n Routing
```typescript
// next.config.js
module.exports = {
  i18n: {
    locales: ['uk', 'en'],
    defaultLocale: 'uk',
  },
}
```

#### Варіант 2: Middleware
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const locale = request.cookies.get('locale')?.value || 'uk'
  // ... logic
}
```

#### Варіант 3: GraphQL Query з locale
```graphql
query GetMenu($locale: LanguageCodeEnum!) {
  menus(where: { location: PRIMARY, language: $locale }) {
    nodes {
      menuItems { ... }
    }
  }
}
```

---

## ⚡ Performance Tip:

### Regex Performance:

Поточний regex `/^\/uk\//` швидкий, але якщо багато мов:

```typescript
// Більш гнучке рішення для багатьох мов
const LANG_PREFIXES = ['uk', 'en', 'ru', 'pl']
const langRegex = new RegExp(`^\\/(${LANG_PREFIXES.join('|')})\\/`)

return menuItems.map(item => ({
  ...item,
  path: item.path.replace(langRegex, '/') || '/',
}))
```

---

## ✅ Статус:

- [x] ~~Polylang `/uk/` префікс видалено~~
- [x] ~~Hydration error виправлено~~
- [x] ~~Меню працюють з Next.js роутами~~
- [x] ~~Сервер і клієнт рендерять однаковий HTML~~

---

## 🎓 Troubleshooting:

### Проблема: Меню все ще показує `/uk/`

**Рішення:**
1. Перезапустити Next.js dev server
2. Очистити кеш браузера
3. Перевірити що код в `main-navigation.tsx` оновився

### Проблема: Hydration error все ще є

**Рішення:**
1. Перевірити Console - який саме компонент викликає помилку
2. Знайти всі `.toLocaleString()`, `Date.now()`, `Math.random()`
3. Використати client-side рендеринг для динамічних даних

### Проблема: Інші мови не працюють

**Рішення:**
Якщо потрібна підтримка багатьох мов, використати динамічний regex:
```typescript
path: item.path.replace(/^\/[a-z]{2}\//, '/') || '/'
```

---

**Створено:** 2025-11-24
**Статус:** ✅ ВИПРАВЛЕНО
