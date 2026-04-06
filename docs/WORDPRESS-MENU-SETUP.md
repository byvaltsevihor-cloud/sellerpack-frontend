# 📋 Налаштування Меню в WordPress - Покрокова Інструкція

> Як створити та налаштувати меню для Next.js frontend

---

## 🎯 Що Потрібно Зробити:

1. ✅ Встановити плагін для меню (якщо ще немає)
2. ✅ Зареєструвати Menu Location в темі
3. ✅ Створити меню в WordPress Admin
4. ✅ Додати пункти меню
5. ✅ Призначити меню до локації

---

## 📍 Крок 1: Перевірити Плагіни

### Необхідні плагіни:

1. **WPGraphQL** ✅ (вже встановлений)
2. **WP GraphQL for Custom Post Type UI** ✅ (для товарів - вже встановлений)

> **Важливо:** Стандартний WPGraphQL вже підтримує меню! Додатковий плагін НЕ потрібен.

---

## 📍 Крок 2: Menu Locations Вже Зареєстровані ✅

**Добра новина:** Menu locations вже додано до теми!

**Файл:** `wp-content/themes/sellerpack-headless/functions.php`

**Код вже є в темі:**

```php
<?php
/**
 * Register Navigation Menus
 */
function sellerpack_register_menus() {
    register_nav_menus([
        'primary' => __('Primary Navigation', 'sellerpack'),
        'footer'  => __('Footer Navigation', 'sellerpack'),
        'mobile'  => __('Mobile Menu', 'sellerpack'),
    ]);
}
add_action('init', 'sellerpack_register_menus');
```

### Як перевірити що локації активні:

**WordPress Admin:**
1. Зайдіть в **Appearance → Menus**
2. Внизу сторінки буде секція **"Theme locations"** або **"Display location"**
3. Ви побачите 3 доступні локації:
   - **Primary Navigation** (для header меню)
   - **Footer Navigation** (для footer меню)
   - **Mobile Menu** (для мобільного меню)

---

## 📍 Крок 3: Створити Меню в WordPress Admin

### 1. Зайти в WordPress Admin

**URL:** `http://localhost:8080/wp-admin`

**Логін/Пароль:** (ваші дані для admin)

### 2. Перейти до Menus

**Шлях:** `Appearance → Menus`

![Menu Location](https://i.imgur.com/example.png)

### 3. Створити нове меню

1. Натиснути **"create a new menu"** або вгорі **"Create new menu"**
2. **Menu Name:** `Primary Menu` (або будь-яка назва)
3. Натиснути **"Create Menu"**

---

## 📍 Крок 4: Додати Пункти Меню

### Доступні типи меню:

#### 1. **Pages** (Сторінки)
```
☑ Головна
☑ Про нас
☑ Контакти
```

#### 2. **Custom Links** (Власні посилання)
```
URL: /products
Link Text: Каталог Продукції
```

#### 3. **Categories** (Категорії)
```
☑ Наклейки
☑ Упаковка
☑ Етикетки
```

### Як додати:

1. **Ліворуч** оберіть тип (Pages, Custom Links, тощо)
2. **Виберіть пункт** (чекбокс)
3. Натисніть **"Add to Menu"**
4. **Перетягніть** пункти для зміни порядку
5. **Натисніть "Save Menu"**

---

## 📍 Крок 5: Призначити Меню до Локації

### В розділі "Menu Settings" (внизу):

```
☑ Primary Navigation
```

**Або** в розділі "Manage Locations":

```
Primary Navigation: [Виберіть "Primary Menu"]
```

Натисніть **"Save"**

---

## 🎨 Приклад Структури Меню:

```
Primary Menu:
├─ Головна (/)
├─ Каталог (/products)
│  ├─ Наклейки (/products?category=stickers)
│  ├─ Упаковка (/products?category=packaging)
│  └─ Етикетки (/products?category=labels)
├─ Про нас (/about)
└─ Контакти (/contact)
```

---

## 🔍 Як Перевірити Що Меню Працює:

### 1. GraphQL Playground

**URL:** `http://localhost:8080/graphql`

**Query:**
```graphql
query {
  menus {
    nodes {
      id
      name
      locations
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

**Очікуваний результат:**
```json
{
  "data": {
    "menus": {
      "nodes": [
        {
          "id": "dGVybTox",
          "name": "Primary Menu",
          "locations": ["PRIMARY"],
          "menuItems": {
            "nodes": [
              {
                "id": "cG9zdDox",
                "label": "Головна",
                "url": "http://localhost:8080/",
                "path": "/"
              },
              {
                "id": "cG9zdDoy",
                "label": "Каталог",
                "url": "http://localhost:8080/products",
                "path": "/products"
              }
            ]
          }
        }
      ]
    }
  }
}
```

### 2. Next.js Frontend

Після налаштування меню в WordPress:

1. Перезапустити Next.js dev server:
```bash
cd nextjs-frontend
npm run dev
```

2. Відкрити `http://localhost:3000`
3. Перевірити Header - меню має з'явитися!

---

## ⚠️ Troubleshooting

### Проблема 1: "Меню не відображається в GraphQL"

**Рішення:**
1. Перевірити що меню **збережено**
2. Перевірити що меню **призначено до локації** (Primary)
3. Спробувати **іншу query**:

```graphql
query {
  menu(id: "primary", idType: LOCATION) {
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

### Проблема 2: "Menu Location не відображається"

**Рішення:**
- Додати код в `functions.php` (див. Крок 2)
- Або використати активну тему що підтримує меню

### Проблема 3: "Path порожній або некоректний"

**Рішення:**
Для Custom Links використовувати **відносні шляхи**:
- ✅ `/products` (правильно)
- ❌ `http://localhost:8080/products` (буде повний URL)

---

## 📸 Скріншоти WordPress Admin

### 1. Appearance → Menus
```
[Ліва панель]         [Права панель]
┌─────────────┐      ┌──────────────────┐
│ Pages       │      │ Menu Structure   │
│ ☑ Home      │      │ ├─ Головна      │
│ ☑ About     │      │ ├─ Каталог      │
│ ☐ Contact   │      │ └─ Контакти     │
│             │      │                  │
│ Custom Links│      │ [Save Menu]      │
│ URL: /      │      │                  │
│ Text: Home  │      │ Menu Settings:   │
│ [Add]       │      │ ☑ Primary Nav   │
└─────────────┘      └──────────────────┘
```

### 2. Menu Settings (внизу)
```
☑ Primary Navigation
☐ Footer Navigation
☐ Mobile Menu
```

---

## 🚀 Після Налаштування:

### Меню автоматично з'являться:
- ✅ Desktop Navigation (Header)
- ✅ Mobile Menu (Hamburger)
- ✅ Active state (зелене підсвічування)

### Fallback все ще працює:
Якщо меню не налаштовано, показується:
- Всі Продукти
- Контакти

---

## 📋 Швидкий Чеклист:

- [x] ~~WPGraphQL плагін встановлено~~ ✅
- [x] ~~Menu locations зареєстровано в темі~~ ✅
- [ ] Зайти в WP Admin (`http://localhost:8080/wp-admin`)
- [ ] Appearance → Menus
- [ ] Create new menu → "Primary Menu"
- [ ] Додати пункти (Pages, Custom Links, Categories)
- [ ] Призначити до "Primary Navigation"
- [ ] Save Menu
- [ ] Перевірити в GraphQL Playground (`http://localhost:8080/graphql`)
- [ ] Перезапустити Next.js (`npm run dev`)
- [ ] Перевірити на сайті (`http://localhost:3000`)

---

## 🎓 Додаткова Інформація:

### WordPress Menu Locations:

**Що таке Menu Location?**
- Це "слот" в темі де можна показати меню
- Наприклад: Primary (header), Footer (footer), Mobile (mobile menu)

**Чому потрібна реєстрація?**
- WordPress має знати які локації доступні
- Це робиться через `register_nav_menus()` в functions.php

### GraphQL Menu Enum:

WordPress GraphQL використовує ENUM для локацій:
- `PRIMARY` = зареєстрована локація "primary"
- `FOOTER` = зареєстрована локація "footer"
- Назва в коді: `register_nav_menus(['primary' => ...])`
- Назва в GraphQL: `PRIMARY` (uppercase)

---

**Створено:** 2025-11-24
**Оновлено:** 2025-11-24
**Версія:** 1.0
