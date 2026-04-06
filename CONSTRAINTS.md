# ⚠️ КРИТИЧНІ ОБМЕЖЕННЯ ПРОЄКТУ

> **ОБОВ'ЯЗКОВО ПРОЧИТАТИ ПЕРЕД РОБОТОЮ!**

---

## 🚨 Топ-5 Найважливіших Обмежень

### 1. ❌ Багатомовність НЕ Реалізована

```
WordPress: ✅ Polylang активний (UK/EN/RU/PL)
Next.js:   ❌ Тільки українська!

⚠️ НЕ створювати контент іншими мовами
⚠️ WordPress URLs: /uk/home → Next.js: /home
```

### 2. ❌ Не Змінювати Цей Код!

```typescript
// components/main-navigation.tsx
path: item.path.replace(/^\/uk\//, '/') || '/'
// ☝️ КРИТИЧНО для роботи меню!
```

### 3. ❌ GraphQL MenuLocationEnum НЕ Працює

```graphql
# ❌ НЕ ВИКОРИСТОВУВАТИ
query GetMenu($location: MenuLocationEnum!) { ... }

# ✅ ВИКОРИСТОВУВАТИ
query GetMenu {
  menus(where: { location: PRIMARY }) { ... }
}
```

### 4. ❌ Hydration Errors

```typescript
❌ .toLocaleString()
❌ Date.now()
❌ Math.random()
❌ typeof window !== 'undefined'

✅ 'use client' + useEffect
✅ Явна локаль: .toLocaleString('uk-UA')
```

### 5. ❌ Дизайн-Система Фіксована

```css
✅ #78be20 - Primary green (НЕ ЗМІНЮВАТИ!)
✅ #6aa81c - Hover green
✅ #f4f4f4 - Background

❌ НЕ використовувати інші зелені кольори
```

---

## 📖 Повна Документація

**Детальний список усіх обмежень:**
👉 [docs/PROJECT-CONSTRAINTS.md](docs/PROJECT-CONSTRAINTS.md)

---

## 🆘 Швидка Допомога

**Меню не працює?** → [docs/MENU-FIXED.md](docs/MENU-FIXED.md)
**Hydration error?** → [docs/POLYLANG-HYDRATION-FIX.md](docs/POLYLANG-HYDRATION-FIX.md)
**Про багатомовність?** → [docs/POLYLANG-FUTURE-IMPLEMENTATION.md](docs/POLYLANG-FUTURE-IMPLEMENTATION.md)

---

⚠️ **Ігнорування цих обмежень призведе до поломки проєкту!**
