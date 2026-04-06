# ⚠️ Обмеження Проєкту - Важливо Знати!

> Критичні обмеження та особливості архітектури, які треба враховувати при роботі над проєктом

---

## 🌐 1. Багатомовність (Polylang)

### ❌ Поточне Обмеження:

**WordPress:**
- ✅ Polylang активний
- ✅ Контент доступний багатьма мовами (UK, EN, RU, PL)
- ✅ URLs мають префікси: `/uk/`, `/en/`, `/ru/`, `/pl/`

**Next.js:**
- ❌ Багатомовність **НЕ реалізована**
- ❌ Працює **тільки українська** мова
- ❌ Префікси `/uk/`, `/en/` та інші **видаляються** в коді

### 🔧 Поточне Рішення (Тимчасове):

```typescript
// components/main-navigation.tsx
// ВАЖЛИВО: Це тимчасове рішення!
return menuItems.map(item => ({
  ...item,
  path: item.path.replace(/^\/uk\//, '/') || '/',
}))
```

**Що це робить:**
- WordPress повертає: `/uk/home`
- Next.js отримує: `/home`
- Працює тільки для української мови!

### ⚠️ Що Треба Враховувати:

#### При додаванні нового контенту:
```
❌ НЕ СТВОРЮВАТИ контент англійською/російською/польською
   (він не відобразиться на сайті)

✅ СТВОРЮВАТИ тільки українською
   (поки не реалізована багатомовність)
```

#### При роботі з меню:
```
❌ НЕ СТВОРЮВАТИ окремі меню для EN/RU/PL
   (вони не будуть працювати)

✅ СТВОРЮВАТИ тільки українське меню
   (призначене до PRIMARY location)
```

#### При роботі з GraphQL:
```typescript
// ❌ НЕ використовувати параметр language
query GetMenu($language: LanguageCodeEnum!) { ... }

// ✅ Використовувати без language
query GetMenu {
  menus(where: { location: PRIMARY }) { ... }
}
```

### 📋 План Міграції на Повну Багатомовність:

**Коли реалізовувати:** Після завершення основного функціоналу

**Що потрібно змінити:**
1. ✅ Видалити `.replace(/^\/uk\//, '/')` з main-navigation.tsx
2. ✅ Додати `[locale]` до структури app/
3. ✅ Додати middleware для визначення мови
4. ✅ Оновити всі GraphQL queries з параметром `language`
5. ✅ Додати Language Switcher
6. ✅ Оновити SEO metadata

**Детальний план:** [POLYLANG-FUTURE-IMPLEMENTATION.md](./POLYLANG-FUTURE-IMPLEMENTATION.md)

---

## 🎨 2. Дизайн-Система

### ⚠️ Обмеження:

**Кольори:**
```css
/* ФІКСОВАНІ кольори (не змінювати без узгодження) */
--primary-green: #78be20   /* Основний зелений */
--hover-green: #6aa81c     /* Зелений при hover */
--background: #f4f4f4      /* Фон */
--text: #212121            /* Текст */
```

**НЕ використовувати:**
- ❌ Інші відтінки зеленого
- ❌ Кольори які не в дизайн-системі
- ❌ Tailwind colors (green-500, etc.) для primary кольорів

**Використовувати:**
- ✅ `bg-[#78be20]` для primary
- ✅ `hover:bg-[#6aa81c]` для hover
- ✅ `text-[#78be20]` для акцентів

### 📏 Border Radius:

```css
/* ФІКСОВАНІ значення */
--radius: 0.125rem  /* 2px - для кнопок, карток */

❌ НЕ використовувати: rounded-lg, rounded-xl
✅ Використовувати: rounded-lg тільки для фото/зображень
```

---

## 📦 3. GraphQL API

### ⚠️ Обмеження WPGraphQL:

**MenuLocationEnum:**
```graphql
# ❌ НЕ ПРАЦЮЄ (через версію WPGraphQL або налаштування)
query GetMenu($location: MenuLocationEnum!) {
  menu(id: $location, idType: LOCATION) { ... }
}

# ✅ ПРАЦЮЄ
query GetMenu {
  menus(where: { location: PRIMARY }) { ... }
}
```

**Причина:** Різні версії WPGraphQL мають різні схеми для MenuLocationEnum

### 🔒 Introspection:

```
❌ Introspection ВИМКНЕНО в production
   (__schema, __type не працюють публічно)

✅ Використовувати GraphQL Playground:
   http://localhost:8080/graphql
```

---

## 🎯 4. Next.js Routing

### ⚠️ Поточна Структура:

```
app/
├─ page.tsx              # Homepage (українська)
├─ products/
│  ├─ page.tsx           # Products list
│  └─ [slug]/
│     └─ page.tsx        # Single product
├─ contact/
│  └─ page.tsx           # Contact page
└─ [slug]/
   └─ page.tsx           # Generic WordPress page
```

**Обмеження:**
```
❌ НЕ СТВОРЮВАТИ папки:
   - app/uk/, app/en/, app/ru/
   (поки не реалізована багатомовність)

❌ НЕ використовувати middleware
   (заброньовано для майбутньої багатомовності)

✅ СТВОРЮВАТИ нові роути в app/
   (тільки англійськими назвами)
```

---

## 🗄️ 5. WordPress Backend

### ⚠️ Custom Post Types:

**Використовувати:**
```
✅ sellerpack_product (НЕ wc_product!)
✅ productCategory (НЕ product_cat!)
✅ useCase (taxonomy)
```

**НЕ використовувати:**
```
❌ WooCommerce post types
   (проєкт НЕ використовує WooCommerce)

❌ Стандартні Posts
   (тільки для блогу, якщо буде)
```

### 🔌 Обов'язкові Плагіни:

```
✅ WPGraphQL (core API)
✅ WP GraphQL for Custom Post Type UI
✅ Polylang (багатомовність)
✅ wp-graphql-polylang (GraphQL + Polylang)

❌ НЕ встановлювати:
   - WooCommerce (не потрібен)
   - Additional menu plugins (WPGraphQL вже має меню)
```

---

## 🔐 6. Доступ до WordPress

### ⚠️ URLs:

```
WordPress Admin:  http://localhost:8080/wp-admin
GraphQL Endpoint: http://localhost:8080/graphql
Next.js Frontend: http://localhost:3000

❌ НЕ використовувати WordPress frontend
   (headless setup, frontend тільки Next.js)
```

### 🔑 Теми:

```
Активна тема: sellerpack-headless
Location: /wp-content/themes/sellerpack-headless/

⚠️ ВАЖЛИВО:
   - НЕ деактивувати цю тему
   - Menu locations зареєстровані в functions.php
   - Custom Post Types зареєстровані тут
```

---

## 🐛 7. Hydration Errors

### ⚠️ Заборонені Функції:

```typescript
// ❌ НЕ використовувати в Server Components:
.toLocaleString()   // Різний формат на сервері та клієнті
Date.now()          // Завжди різне значення
Math.random()       // Завжди різне значення

// ❌ НЕ використовувати умови:
if (typeof window !== 'undefined') { ... }

// ✅ Використовувати:
'use client' + useEffect для динамічного контенту
Явна локаль: number.toLocaleString('uk-UA')
```

---

## 📊 8. Performance

### ⚠️ Обмеження:

**Зображення:**
```
✅ Завжди використовувати next/image
✅ Вказувати width та height
✅ Використовувати sizes для responsive

❌ НЕ використовувати <img> тег
❌ НЕ завантажувати зображення >2MB
```

**GraphQL:**
```
✅ Використовувати first: N для лімітів
✅ Кешувати результати (Next.js робить автоматично)

❌ НЕ робити queries без ліміту
❌ НЕ робити nested queries глибше 3 рівнів
```

---

## 🎨 9. Компоненти shadcn/ui

### ⚠️ Кастомізація:

```typescript
// ✅ Дозволено:
<Button className="bg-[#78be20]">Click</Button>
<Card className="border-none">Content</Card>

// ❌ НЕ змінювати файли в components/ui/
//    (вони auto-generated)

// ✅ Створювати wrapper компоненти:
// components/custom-button.tsx
export function CustomButton({ children }) {
  return <Button className="bg-[#78be20]">{children}</Button>
}
```

---

## 🚀 10. Build & Deploy

### ⚠️ Перед Build:

```bash
# ✅ Перевірити:
1. Немає console.log (крім error handling)
2. Всі images мають alt text
3. Немає hydration warnings
4. GraphQL queries працюють
5. Всі paths починаються з /

# ❌ НЕ забувати:
- npm run build (перед deploy)
- Перевірити .env змінні
- Очистити кеш браузера для тестування
```

---

## 📝 11. Код-Стиль

### ⚠️ TypeScript:

```typescript
// ✅ Завжди типізувати:
interface MenuItem {
  id: string
  label: string
  path: string
}

async function getMenuItems(): Promise<MenuItem[]> { ... }

// ❌ НЕ використовувати:
any (без крайньої потреби)
@ts-ignore (тільки з коментарем чому)
```

### 📂 Структура Файлів:

```
✅ Компоненти: components/kebab-case.tsx
✅ Утиліти: lib/kebab-case.ts
✅ Types: interface PascalCase
✅ Функції: camelCase

❌ НЕ створювати:
- Папки з великої літери (крім app/)
- Файли без розширення .tsx/.ts
- Компоненти в lib/ або utils в components/
```

---

## 🔄 12. Git Workflow

### ⚠️ Обмеження:

```bash
# ✅ Commit messages:
git commit -m "feat: add language switcher"
git commit -m "fix: hydration error in product carousel"

# ❌ НЕ комітити:
- node_modules/
- .next/
- .env.local
- .DS_Store
- Файли з паролями/ключами
```

---

## 📚 13. Документація

### ⚠️ При додаванні нового функціоналу:

```
✅ ОБОВ'ЯЗКОВО:
1. Оновити README.md (якщо public API)
2. Додати коментарі до складних функцій
3. Створити .md файл для великих features
4. Оновити цей файл з новими обмеженнями

❌ НЕ залишати:
- TODO коментарі без issue
- Закоментований код (видалити!)
- Консольні логи для дебагу
```

---

## ⚡ Швидка Довідка

### Що МОЖНА:
- ✅ Додавати нові WordPress Pages (українською)
- ✅ Додавати нові Products через CPT
- ✅ Змінювати меню в WordPress Admin
- ✅ Використовувати shadcn/ui компоненти
- ✅ Робити GraphQL queries до WordPress

### Що НЕ МОЖНА (поки):
- ❌ Додавати контент англійською/іншими мовами
- ❌ Використовувати WooCommerce
- ❌ Змінювати primary green color (#78be20)
- ❌ Використовувати MenuLocationEnum в queries
- ❌ Створювати роути з мовними префіксами

---

## 🆘 Troubleshooting

### Якщо меню не працює:
1. Перевірити що меню створено в WP Admin
2. Перевірити що меню призначено до PRIMARY location
3. Перевірити GraphQL query (без language параметру!)
4. Перезапустити Next.js dev server

### Якщо hydration error:
1. Знайти компонент з помилки
2. Перевірити на .toLocaleString(), Date.now(), Math.random()
3. Додати 'use client' якщо потрібна інтерактивність
4. Використати useEffect для динамічних даних

### Якщо Polylang конфліктує:
1. Запам'ятати: Next.js тільки українською!
2. Не створювати контент іншими мовами
3. Переглянути POLYLANG-FUTURE-IMPLEMENTATION.md

---

## 📌 Критично Важливо!

### ❗ НЕ ВИДАЛЯТИ:

```typescript
// components/main-navigation.tsx
path: item.path.replace(/^\/uk\//, '/') || '/'
// ☝️ Це КРИТИЧНО для роботи меню!
```

### ❗ НЕ ЗМІНЮВАТИ:

```php
// functions.php
add_action('after_setup_theme', 'sellerpack_register_menus');
// ☝️ Хук має бути after_setup_theme (НЕ init)!
```

### ❗ НЕ ДЕАКТИВУВАТИ:

```
WordPress Plugins:
- WPGraphQL
- WP GraphQL for Custom Post Type UI
- Polylang
- wp-graphql-polylang
```

---

**Створено:** 2025-11-24
**Останнє оновлення:** 2025-11-24
**Версія:** 1.0

**⚠️ ВАЖЛИВО:** Цей документ має бути прочитаний усіма, хто працює над проєктом!
