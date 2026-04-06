# ✅ GraphQL Menu Query - ВИПРАВЛЕНО

> Проблема з MenuLocationEnum - **ВИПРАВЛЕНА**

---

## 🐛 Проблема:

### Error:
```
Variable "$location" of type "MenuLocationEnum!" used in position expecting type "ID!"
```

### Причина:
Старий query використовував синтаксис:
```graphql
query GetMenu($location: MenuLocationEnum!) {
  menu(id: $location, idType: LOCATION) { ... }
}
```

Цей синтаксис не працював через несумісність версій WPGraphQL або налаштувань теми.

---

## ✅ Рішення:

### Новий Query (працює):

**Файл:** `lib/queries.ts`

```graphql
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
```

### Зміни в `main-navigation.tsx`:

**До:**
```typescript
interface MenuData {
  menu: {
    id: string
    name: string
    menuItems: { nodes: MenuItem[] }
  } | null
}

const data = await fetchGraphQL<MenuData>(GET_MENU, { location: 'PRIMARY' })
return data.menu?.menuItems?.nodes || []
```

**Після:**
```typescript
interface MenuData {
  menus: {
    nodes: {
      id: string
      name: string
      menuItems: { nodes: MenuItem[] }
    }[]
  }
}

const data = await fetchGraphQL<MenuData>(GET_MENU)
const primaryMenu = data.menus?.nodes?.[0]
return primaryMenu?.menuItems?.nodes || []
```

---

## 🎯 Що Працює:

### 1. Desktop Navigation ✅

Меню відображається в header:
- Home
- Catalog
- Design services
- Sample Creation
- Contact

### 2. Mobile Menu ✅

Slide-in drawer з усіма пунктами меню.

### 3. Active State ✅

Зелене підсвічування активного пункту.

### 4. Fallback ✅

Якщо WordPress меню не знайдено, показується:
- Всі Продукти
- Контакти

---

## 📋 Тестування:

### GraphQL Playground:

**URL:** http://localhost:8080/graphql

**Query:**
```graphql
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
        }
      }
    }
  }
}
```

**Результат:**
```json
{
  "data": {
    "menus": {
      "nodes": [
        {
          "id": "dGVybTozNg==",
          "name": "Header_Menu",
          "menuItems": {
            "nodes": [
              {
                "id": "cG9zdDoxMjAxMg==",
                "label": "Home",
                "url": "http://localhost:8080/uk/home/",
                "path": "/uk/home/"
              },
              {
                "id": "cG9zdDoxMTgzMw==",
                "label": "Catalog",
                "url": "http://localhost:8080/uk/custom-printing-services/",
                "path": "/uk/custom-printing-services/"
              }
            ]
          }
        }
      ]
    }
  }
}
```

---

## ⚠️ Важливо - Paths з WordPress:

### Проблема Paths:

WordPress повертає paths з префіксом `/uk/`:
```
/uk/home/
/uk/custom-printing-services/
/uk/contact/
```

Але Next.js має інші роути:
```
/
/products
/contact
```

### Рішення (на майбутнє):

#### Варіант 1: Використовувати Custom Links

В WordPress Admin створюйте пункти меню як **Custom Links** з відносними шляхами Next.js:

```
Головна: /
Каталог: /products
Контакти: /contact
```

#### Варіант 2: Мапінг Paths (якщо потрібно)

Додати функцію в `main-navigation.tsx`:

```typescript
function mapWordPressPath(path: string): string {
  const pathMap: Record<string, string> = {
    '/uk/home/': '/',
    '/uk/custom-printing-services/': '/products',
    '/uk/design-services/': '/services',
    '/uk/contact/': '/contact',
  }
  return pathMap[path] || path
}

// Usage:
const menuItems = primaryMenu?.menuItems?.nodes.map(item => ({
  ...item,
  path: mapWordPressPath(item.path)
})) || []
```

#### Варіант 3: Видалити `/uk/` Prefix

```typescript
const menuItems = primaryMenu?.menuItems?.nodes.map(item => ({
  ...item,
  path: item.path.replace('/uk', '') || '/'
})) || []
```

---

## 🔧 Файли Змінені:

1. **`lib/queries.ts`** - Оновлено `GET_MENU` query
2. **`components/main-navigation.tsx`** - Оновлено типи та логіку отримання меню

---

## 📚 Додаткова Інформація:

### Чому `menus` замість `menu`?

**`menu` query** очікує:
- `id: String!` або `id: Int!`
- `idType: MenuNodeIdTypeEnum` (NAME, DATABASE_ID, SLUG)

**`menus` query** дозволяє:
- Фільтрацію по `location` через `where`
- Повертає масив меню
- Більш гнучкий для різних версій WPGraphQL

### MenuLocationEnum vs String

Деякі версії WPGraphQL мають різні схеми для `MenuLocationEnum`:
- В одних це окремий ENUM тип
- В інших це частина `MenuNodeIdTypeEnum`
- `menus(where: { location: PRIMARY })` працює універсально

---

## ✅ Статус:

- [x] ~~GraphQL query виправлено~~
- [x] ~~Меню відображаються на сайті~~
- [x] ~~Desktop navigation працює~~
- [x] ~~Mobile menu працює~~
- [x] ~~Active state працює~~
- [x] ~~Fallback працює~~
- [ ] Опційно: налаштувати Custom Links для правильних paths

---

**Створено:** 2025-11-24
**Статус:** ✅ ВИПРАВЛЕНО - Меню працюють!
