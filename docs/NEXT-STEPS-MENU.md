# ✅ Меню Готові до Налаштування

> Швидка інструкція: що робити далі

---

## 🎉 Що Зроблено:

1. ✅ Menu locations зареєстровано в темі WordPress
2. ✅ WordPress перезапущено (зміни активні)
3. ✅ Next.js frontend готовий до отримання меню
4. ✅ Fallback меню працює (якщо меню не налаштовано)

---

## 📋 Що Робити Зараз:

### Крок 1: Зайти в WordPress Admin

**URL:** `http://localhost:8080/wp-admin`

**Логін:** (ваш admin логін)
**Пароль:** (ваш admin пароль)

---

### Крок 2: Відкрити Меню

**Шлях:** `Appearance → Menus`

Або прямий URL: `http://localhost:8080/wp-admin/nav-menus.php`

---

### Крок 3: Створити Нове Меню

1. Натисніть **"create a new menu"** або вгорі **"Create new menu"**
2. **Назва меню:** `Primary Menu` (можна будь-яку)
3. Натисніть **"Create Menu"**

---

### Крок 4: Додати Пункти Меню

#### Рекомендовані пункти:

**1. Головна** (Home)
- Тип: **Custom Links**
- URL: `/`
- Link Text: `Головна`
- Натисніть **"Add to Menu"**

**2. Всі Продукти** (All Products)
- Тип: **Custom Links**
- URL: `/products`
- Link Text: `Всі Продукти`
- Натисніть **"Add to Menu"**

**3. Категорії** (За бажанням)
- Тип: **Product Categories** (якщо з'явилися в лівій панелі)
- Оберіть категорії (наприклад: Наклейки, Упаковка, Етикетки)
- Натисніть **"Add to Menu"**

**4. Контакти** (Contact)
- Тип: **Custom Links**
- URL: `/contact`
- Link Text: `Контакти`
- Натисніть **"Add to Menu"**

**5. Сторінки WordPress** (якщо є)
- Тип: **Pages**
- Оберіть сторінки (Про нас, Послуги, тощо)
- Натисніть **"Add to Menu"**

---

### Крок 5: Перетягнути Пункти в Правильний Порядок

**Рекомендований порядок:**

```
Primary Menu:
├─ Головна (/)
├─ Всі Продукти (/products)
│  ├─ Наклейки (/products?category=stickers)  [підменю - optional]
│  ├─ Упаковка (/products?category=packaging) [підменю - optional]
│  └─ Етикетки (/products?category=labels)    [підменю - optional]
├─ Про нас (/about) [якщо є сторінка]
└─ Контакти (/contact)
```

**Підказка:** Щоб зробити підменю, перетягніть пункт трохи вправо під батьківським пунктом.

---

### Крок 6: Призначити Меню до Локації

**Внизу сторінки** в секції **"Menu Settings"** або **"Display location"**:

```
☑ Primary Navigation
```

**Або** перейти на вкладку **"Manage Locations"** вгорі:

```
Primary Navigation: [Виберіть "Primary Menu" з dropdown]
```

Натисніть **"Save Menu"**

---

### Крок 7: Перевірити в GraphQL Playground

**URL:** `http://localhost:8080/graphql`

**Query для тесту:**

```graphql
query {
  menu(id: "PRIMARY", idType: LOCATION) {
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
```

**Очікуваний результат:**

```json
{
  "data": {
    "menu": {
      "id": "...",
      "name": "Primary Menu",
      "menuItems": {
        "nodes": [
          {
            "id": "...",
            "label": "Головна",
            "url": "http://localhost:8080/",
            "path": "/"
          },
          {
            "id": "...",
            "label": "Всі Продукти",
            "url": "http://localhost:8080/products",
            "path": "/products"
          },
          {
            "id": "...",
            "label": "Контакти",
            "url": "http://localhost:8080/contact",
            "path": "/contact"
          }
        ]
      }
    }
  }
}
```

---

### Крок 8: Перевірити на Сайті

1. Відкрити **Next.js сайт:** `http://localhost:3000`
2. Переглянути **Header** - меню має з'явитися!
3. Перевірити **Mobile Menu** (зменшити вікно або відкрити на телефоні)
4. Перевірити **Active state** - активний пункт має бути зеленим

---

## 🎨 Приклад Меню в WordPress Admin

```
┌─────────────────────────────────────────────────┐
│ WordPress Admin → Appearance → Menus            │
├─────────────────────────────────────────────────┤
│                                                 │
│ [Ліва Панель]           [Права Панель]          │
│                                                 │
│ ┌─────────────────┐    ┌─────────────────────┐ │
│ │ Pages           │    │ Menu Structure      │ │
│ │ ☑ Про нас       │    │                     │ │
│ │ ☑ Послуги       │    │ ├─ Головна (/)     │ │
│ │                 │    │ ├─ Всі Продукти    │ │
│ │ Custom Links    │    │ ├─ Про нас         │ │
│ │ URL: /products  │    │ └─ Контакти        │ │
│ │ Text: Каталог   │    │                     │ │
│ │ [Add to Menu]   │    │ [Save Menu]         │ │
│ │                 │    │                     │ │
│ │ Categories      │    │ Menu Settings:      │ │
│ │ ☑ Наклейки      │    │ ☑ Primary Nav      │ │
│ │ ☑ Упаковка      │    │                     │ │
│ └─────────────────┘    └─────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 💡 Корисні Поради:

### Використання Custom Links (Рекомендовано!)

Для внутрішніх сторінок Next.js **краще використовувати Custom Links** з відносними шляхами:

- ✅ **Правильно:** `/products` (відносний шлях)
- ❌ **Неправильно:** `http://localhost:8080/products` (повний URL)

**Чому?** Відносні шляхи працюють на всіх доменах (localhost, production, staging).

---

### Вкладені Меню (Submenu)

Щоб створити підменю:

1. Додайте пункти в меню
2. **Перетягніть** дочірній пункт **трохи вправо** під батьківським
3. Побачите **відступ** - це означає підменю

**Приклад:**

```
Всі Продукти (батьківський)
  ├─ Наклейки (підменю)
  ├─ Упаковка (підменю)
  └─ Етикетки (підменю)
```

**Примітка:** Поточна версія frontend показує тільки top-level меню. Вкладені меню можна додати пізніше.

---

## ⚠️ Troubleshooting:

### Проблема: "Appearance → Menus" не відображається

**Рішення:**
- WordPress перезапущено? `docker restart wp_headless`
- Зайшли як admin?
- Спробуйте прямий URL: `http://localhost:8080/wp-admin/nav-menus.php`

---

### Проблема: "Menu Locations" не відображаються

**Рішення:**
- Перевірте `wp-content/themes/sellerpack-headless/functions.php`
- Має бути код `register_nav_menus()`
- Перезапустіть WordPress: `docker restart wp_headless`

---

### Проблема: Меню не з'являється на сайті

**Рішення:**
1. Перевірте в GraphQL Playground - чи повертається меню?
2. Меню призначено до **"Primary Navigation"**?
3. Меню **збережено**?
4. Next.js перезапущено? `npm run dev` (в папці nextjs-frontend)

---

### Проблема: Path порожній або некоректний

**Рішення для Custom Links:**
- Використовуйте відносні шляхи: `/products` (без домену)
- НЕ використовуйте: `http://localhost:8080/products`

---

## 📚 Додаткова Документація:

- [WORDPRESS-MENU-SETUP.md](./WORDPRESS-MENU-SETUP.md) - Повна інструкція
- [DYNAMIC-MENUS-GUIDE.md](./DYNAMIC-MENUS-GUIDE.md) - Технічна документація
- [SITE-STRUCTURE.md](./SITE-STRUCTURE.md) - Структура сайту

---

## 🚀 Після Налаштування:

Після налаштування меню ви зможете:

- ✅ Керувати навігацією без зміни коду
- ✅ Додавати/видаляти пункти меню в 1 клік
- ✅ Змінювати порядок пунктів drag & drop
- ✅ Створювати вкладені меню
- ✅ Меню автоматично синхронізується з Next.js frontend

---

**Створено:** 2025-11-24
**Статус:** ✅ Ready to Configure
**Час налаштування:** ~5-10 хвилин
