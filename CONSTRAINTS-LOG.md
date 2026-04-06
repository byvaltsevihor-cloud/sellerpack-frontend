# 📋 Журнал Обмежень Проєкту

> Хронологічний запис усіх архітектурних обмежень та рішень

---

## Формат Запису

```
## [Дата] - Назва Обмеження

**Категорія:** Technology/Design/Architecture/Performance
**Важливість:** 🔴 Критична / 🟡 Важлива / 🟢 Інформаційна
**Статус:** Active / Resolved / Deprecated

### Проблема:
Опис проблеми або причини обмеження

### Рішення:
Що було зроблено

### Вплив:
На що це впливає

### Файли:
Список файлів що змінені або залежні

### Коли можна змінити:
Умови за яких це обмеження можна буде видалити
```

---

## [2025-11-24] - Polylang - Тільки Українська Мова

**Категорія:** Architecture
**Важливість:** 🔴 Критична
**Статус:** Active (Тимчасове)

### Проблема:
WordPress має Polylang з підтримкою UK/EN/RU/PL, але Next.js не має реалізованої багатомовності. WordPress повертає URLs з префіксами `/uk/`, `/en/`, тощо, які не існують в Next.js роутінгу.

### Рішення:
```typescript
// components/main-navigation.tsx:37
path: item.path.replace(/^\/uk\//, '/') || '/'
```
Видаляємо `/uk/` префікс з усіх paths з WordPress.

### Вплив:
- ❌ НЕ можна створювати контент англійською/російською/польською
- ❌ НЕ можна використовувати WordPress URLs напряму
- ❌ Меню працюють ТІЛЬКИ для української мови
- ✅ Next.js працює без префіксів (`/`, `/products`, `/contact`)

### Файли:
- `components/main-navigation.tsx` - Видалення префіксу
- `lib/queries.ts` - GET_MENU без language параметру
- `docs/POLYLANG-HYDRATION-FIX.md` - Документація рішення
- `docs/POLYLANG-FUTURE-IMPLEMENTATION.md` - План міграції

### Коли можна змінити:
Коли буде реалізована повна підтримка багатомовності в Next.js:
1. Додано `[locale]` routing
2. Створено middleware для визначення мови
3. Оновлено всі GraphQL queries з параметром `language`
4. Додано Language Switcher
5. Оновлено SEO metadata

**Очікуваний час:** 4-5 тижнів після завершення основного функціоналу

---

## [2025-11-24] - GraphQL MenuLocationEnum Не Працює

**Категорія:** Technology
**Важливість:** 🔴 Критична
**Статус:** Active (Постійне)

### Проблема:
Стандартний GraphQL query для меню не працює:
```graphql
query GetMenu($location: MenuLocationEnum!) {
  menu(id: $location, idType: LOCATION) { ... }
}
```
Помилка: `Variable "$location" of type "MenuLocationEnum!" used in position expecting type "ID!"`

### Рішення:
Використовуємо альтернативний query:
```graphql
query GetMenu {
  menus(where: { location: PRIMARY }) { ... }
}
```

### Вплив:
- ❌ НЕ можна використовувати `MenuLocationEnum` як змінну
- ❌ НЕ можна використовувати `idType: LOCATION`
- ✅ Працює `menus(where: { location: PRIMARY })`
- ⚠️ Query не параметризований (завжди PRIMARY)

### Файли:
- `lib/queries.ts:235-255` - GET_MENU query
- `components/main-navigation.tsx:30` - Використання query
- `docs/MENU-QUERY-FIX.md` - Документація виправлення

### Коли можна змінити:
- Якщо оновиться версія WPGraphQL з виправленням
- Якщо знайдемо правильний синтаксис для поточної версії
- Поки що: **НЕ змінювати** (працююче рішення)

---

## [2025-11-24] - Hydration Error з toLocaleString()

**Категорія:** Performance
**Важливість:** 🔴 Критична
**Статус:** Resolved

### Проблема:
```typescript
// components/product-carousel.tsx:110
<span>В наявності ({product.stock.toLocaleString()})</span>
```
Викликав hydration error через різне форматування на сервері та клієнті:
- Сервер (Node.js): `5 000` (пробіл)
- Клієнт (Browser): `5,000` (кома)

### Рішення:
Видалено `.toLocaleString()`:
```typescript
<span>В наявності ({product.stock})</span>
```

### Вплив:
- ✅ Немає hydration errors
- ✅ Сервер і клієнт рендерять однаковий HTML
- ⚠️ Числа без форматування (5000 замість 5 000)

### Файли:
- `components/product-carousel.tsx:110` - Виправлення
- `docs/POLYLANG-HYDRATION-FIX.md` - Документація

### Коли можна змінити:
Якщо потрібне форматування:
1. Використовувати явну локаль: `.toLocaleString('uk-UA')`
2. Або client-side рендеринг з `useEffect`
3. Або кастомну функцію форматування

**Поточне рішення:** Залишити без форматування (простіше і швидше)

---

## [2025-11-24] - WordPress Menu Registration

**Категорія:** Architecture
**Важливість:** 🔴 Критична
**Статус:** Resolved

### Проблема:
WordPress Admin показував: "Поточна тема не підтримує меню або віджети"
Menu locations не були зареєстровані в темі.

### Рішення:
Додано в `functions.php`:
```php
function sellerpack_register_menus() {
    register_nav_menus([
        'primary' => __('Primary Navigation', 'sellerpack'),
        'footer'  => __('Footer Navigation', 'sellerpack'),
        'mobile'  => __('Mobile Menu', 'sellerpack'),
    ]);
}
add_action('after_setup_theme', 'sellerpack_register_menus');
```

⚠️ **ВАЖЛИВО:** Хук має бути `after_setup_theme`, НЕ `init`!

### Вплив:
- ✅ WordPress Admin тепер показує Appearance → Menus
- ✅ Можна створювати і призначати меню
- ✅ 3 доступні локації: primary, footer, mobile

### Файли:
- `wp-content/themes/sellerpack-headless/functions.php:200-210`
- `docs/MENU-FIXED.md` - Документація виправлення

### Коли можна змінити:
**НЕ змінювати!** Це постійна частина архітектури.

---

## [2025-11-24] - Дизайн-Система: Primary Green Color

**Категорія:** Design
**Важливість:** 🟡 Важлива
**Статус:** Active (Постійне)

### Проблема:
Потрібна консистентність primary кольору по всьому проєкту.

### Рішення:
Фіксований primary green color:
```css
--primary-green: #78be20
--hover-green: #6aa81c
```

### Вплив:
- ❌ НЕ використовувати інші відтінки зеленого
- ❌ НЕ використовувати Tailwind green-* classes для primary
- ✅ Використовувати `bg-[#78be20]` для primary
- ✅ Використовувати `hover:bg-[#6aa81c]` для hover

### Файли:
- `app/globals.css` - CSS змінні
- `tailwind.config.ts` - Tailwind конфігурація
- Всі компоненти з primary кольором

### Коли можна змінити:
Тільки якщо зміниться брендинг компанії (узгодження з клієнтом).

---

## [2025-11-24] - Next.js Routing - Без Мовних Префіксів

**Категорія:** Architecture
**Важливість:** 🟡 Важлива
**Статус:** Active (Тимчасове)

### Проблема:
Next.js роути створені без урахування багатомовності.

### Рішення:
Поточна структура:
```
app/
├─ page.tsx              # / (українська)
├─ products/page.tsx     # /products
├─ contact/page.tsx      # /contact
└─ [slug]/page.tsx       # /[slug]
```

### Вплив:
- ❌ НЕ створювати папки app/uk/, app/en/, тощо
- ❌ НЕ використовувати middleware для мов
- ✅ Всі роути на першому рівні app/

### Файли:
- `app/` - Вся структура роутінгу

### Коли можна змінити:
Під час міграції на повну багатомовність:
```
app/[locale]/
├─ page.tsx
├─ products/page.tsx
└─ contact/page.tsx
```

---

## [2025-11-24] - Custom Post Type: sellerpack_product

**Категорія:** Architecture
**Важливість:** 🔴 Критична
**Статус:** Active (Постійне)

### Проблема:
Проєкт НЕ використовує WooCommerce, потрібен власний CPT для продуктів.

### Рішення:
```php
register_post_type('sellerpack_product', [
    'show_in_graphql' => true,
    'graphql_single_name' => 'sellerpackProduct',
    'graphql_plural_name' => 'sellerpackProducts',
]);
```

### Вплив:
- ❌ НЕ використовувати WooCommerce post types
- ❌ НЕ використовувати `product` або `wc_product`
- ✅ Використовувати `sellerpack_product`
- ✅ GraphQL: `sellerpackProduct` / `sellerpackProducts`

### Файли:
- `wp-content/themes/sellerpack-headless/functions.php:19-50`
- `lib/queries.ts` - Всі product queries

### Коли можна змінити:
**НЕ змінювати!** Це core архітектура проєкту.

---

## Шаблон для Нових Обмежень

```markdown
## [YYYY-MM-DD] - Назва Обмеження

**Категорія:** Technology/Design/Architecture/Performance
**Важливість:** 🔴 Критична / 🟡 Важлива / 🟢 Інформаційна
**Статус:** Active / Resolved / Deprecated

### Проблема:
Опис проблеми

### Рішення:
Що зроблено

### Вплив:
Що це означає для розробників

### Файли:
- Список файлів

### Коли можна змінити:
Умови для зміни
```

---

## Статистика

**Всього обмежень:** 7
**Активних:** 5
**Вирішених:** 2
**Критичних:** 5
**Важливих:** 2

**Останнє оновлення:** 2025-11-24

---

## Як Додавати Нові Обмеження

1. Скопіюйте шаблон вище
2. Заповніть всі поля
3. Додайте на початок файлу (новіші зверху)
4. Оновіть статистику
5. Додайте посилання в `docs/PROJECT-CONSTRAINTS.md`

---

**Примітка:** Цей файл має оновлюватися кожного разу коли:
- Додається нове архітектурне обмеження
- Змінюється існуюче обмеження
- Вирішується проблема що призвела до обмеження
- Deprecated обмеження (коли вже не актуальне)
