# 🧭 Dynamic Menu System - Інструкція

> Як налаштувати та використовувати динамічні меню з WordPress

---

## ✅ Що Вже Готово:

Система динамічних меню **реалізована і працює** з fallback механізмом.

**Файли:**
- `lib/queries.ts` - GraphQL query `GET_MENU`
- `components/dynamic-navigation.tsx` - Client component для відображення меню
- `components/main-navigation.tsx` - Server component для fetch меню
- `components/site-header.tsx` - Оновлений Header з динамічним меню

---

## 🎯 Features:

✅ **Fetch з WordPress GraphQL** - Отримує меню з WordPress
✅ **Fallback механізм** - Якщо меню в WordPress не налаштовано, використовується default
✅ **Active state** - Підсвічується активний пункт меню
✅ **Client-side navigation** - Швидка навігація без перезавантаження
✅ **Responsive** - Адаптивне меню (Desktop only, Mobile menu - окремо)

---

## 📝 Як Налаштувати Меню в WordPress:

### Крок 1: Встановити WPGraphQL Menus (якщо ще не встановлено)

```bash
# Через WordPress Admin
Plugins → Add New → Search "WPGraphQL for Menus"
→ Install → Activate
```

### Крок 2: Зареєструвати Menu Location

Додайте в `wp-content/themes/your-theme/functions.php`:

```php
// Register menu locations
function register_menu_locations() {
    register_nav_menus(array(
        'primary' => __('Primary Navigation'),
        'footer'  => __('Footer Navigation'),
    ));
}
add_action('init', 'register_menu_locations');
```

### Крок 3: Створити Меню в WordPress Admin

1. **WordPress Admin → Appearance → Menus**
2. **Створити нове меню** → Назва: "Primary Menu"
3. **Додати пункти меню:**
   - Всі Продукти → `/products`
   - Контакти → `/contact`
   - Про нас → Custom Link `/about`
   - тощо
4. **Assign to Location:**
   - ☑ Primary Navigation
5. **Save Menu**

---

## 🔧 Як Працює:

### 1. GraphQL Query (`lib/queries.ts`)

```graphql
query GetMenu($location: MenuLocationEnum!) {
  menu(id: $location, idType: LOCATION) {
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
```

### 2. Server Component Fetch (`main-navigation.tsx`)

```typescript
// Отримує меню з WordPress
const data = await fetchGraphQL(GET_MENU, { location: 'PRIMARY' })
const menuItems = data.menu?.menuItems?.nodes || []

// Якщо меню не знайдено → fallback
if (!data.menu) {
  menuItems = [
    { label: 'Всі Продукти', path: '/products', ... },
    { label: 'Контакти', path: '/contact', ... },
  ]
}
```

### 3. Client Component Render (`dynamic-navigation.tsx`)

```typescript
// Відображає меню з active state
menuItems.map((item) => (
  <Link
    href={item.path}
    className={isActive(item.path) ? 'active' : ''}
  >
    {item.label}
  </Link>
))
```

---

## 🎨 Приклад Меню в WordPress:

```
Primary Navigation:
├─ Головна (/)
├─ Каталог (/products)
├─ Про нас (/about)
├─ Контакти (/contact)
```

**Результат в GraphQL:**

```json
{
  "menu": {
    "name": "Primary Menu",
    "menuItems": {
      "nodes": [
        {
          "id": "1",
          "label": "Головна",
          "path": "/",
          "url": "https://yoursite.com/"
        },
        {
          "id": "2",
          "label": "Каталог",
          "path": "/products",
          "url": "https://yoursite.com/products"
        },
        ...
      ]
    }
  }
}
```

---

## 🛠️ Fallback Механізм:

Якщо меню в WordPress **не налаштовано** або є **помилка**, використовується fallback:

```typescript
// Default menu (main-navigation.tsx:38-52)
menuItems = [
  {
    id: '1',
    label: 'Всі Продукти',
    path: '/products',
  },
  {
    id: '2',
    label: 'Контакти',
    path: '/contact',
  },
]
```

**Чому це добре:**
- ✅ Сайт завжди працює, навіть якщо WordPress недоступний
- ✅ Немає "пустого" меню
- ✅ Можна розробляти frontend без налаштованого backend

---

## 🔍 Active State - Як Працює:

```typescript
const pathname = usePathname() // '/products'

const isActive = (itemPath: string) => {
  if (itemPath === '/') {
    return pathname === '/' // exact match for home
  }
  return pathname.startsWith(itemPath) // starts with for other pages
}

// Приклад:
// Поточна сторінка: /products/stickers
// Меню "Каталог" (/products) → active ✅
// Меню "Контакти" (/contact) → not active ❌
```

**Стилі:**
```typescript
className={
  active
    ? 'border-[#78be20] text-[#78be20]' // зелений underline
    : 'border-transparent hover:border-[#78be20]' // hover effect
}
```

---

## 🌲 Вкладені Меню (Nested Menus):

**Поточний стан:** ❌ Не реалізовано (тільки top-level items)

**Як додати:**

```typescript
// dynamic-navigation.tsx
const topLevelItems = items.filter(item => !item.parentId)
const getChildren = (parentId: string) => {
  return items.filter(item => item.parentId === parentId)
}

// Render
{topLevelItems.map((item) => (
  <div>
    <Link href={item.path}>{item.label}</Link>
    {getChildren(item.id).map(child => (
      <Link href={child.path}>{child.label}</Link>
    ))}
  </div>
))}
```

---

## 🚀 Додаткові Menu Locations:

### Створити Footer Menu:

**1. Додати query:**
```typescript
// lib/queries.ts
export const GET_FOOTER_MENU = gql`
  query GetFooterMenu {
    menu(id: FOOTER, idType: LOCATION) { ... }
  }
`
```

**2. Створити компонент:**
```typescript
// components/footer-navigation.tsx
export async function FooterNavigation() {
  const data = await fetchGraphQL(GET_MENU, { location: 'FOOTER' })
  return <DynamicNavigation items={data.menu?.menuItems?.nodes} />
}
```

**3. Використати в Footer:**
```typescript
// components/footer.tsx
<FooterNavigation />
```

---

## ⚡ Performance:

✅ **Server-side fetch** - Меню fetch на сервері (швидше)
✅ **Кешування** - Next.js кешує результати GraphQL
✅ **Static export fallback** - Можна використовувати в static build

---

## 🐛 Troubleshooting:

### Проблема: "Menu не відображається"

**Перевірте:**
1. WordPress Admin → Appearance → Menus → Menu існує?
2. Menu assigned to "Primary Navigation" location?
3. WPGraphQL for Menus plugin активний?
4. GraphQL endpoint доступний: `http://localhost:8080/graphql`

**Тест в GraphQL Playground:**
```graphql
query {
  menu(id: PRIMARY, idType: LOCATION) {
    name
    menuItems {
      nodes {
        label
        path
      }
    }
  }
}
```

### Проблема: "Active state не працює"

**Перевірте:**
1. `usePathname()` повертає правильний path?
2. Menu item `path` співпадає з URL?
3. Для home page використовується exact match?

---

## 📚 Додаткові Ресурси:

- [WPGraphQL Menus Documentation](https://www.wpgraphql.com/docs/menus)
- [Next.js usePathname Hook](https://nextjs.org/docs/app/api-reference/functions/use-pathname)
- [WordPress Menus Guide](https://wordpress.org/documentation/article/appearance-menus-screen/)

---

**Оновлено:** 2025-11-24
**Статус:** ✅ Working with Fallback
**Next Steps:** Налаштувати меню в WordPress Admin
