# Sellerpack Design System

## Eталон: Print-Ready Technical Minimalism

**Референс:** `components/category-page.tsx` + `components/print-marks.tsx`

---

## Філософія дизайну

Дизайн Sellerpack базується на естетиці **друкованої продукції** (print production). Це підкреслює:
- Професіоналізм та увагу до деталей
- B2B орієнтацію (корпоративні клієнти)
- Зв'язок з основним бізнесом (брендоване пакування, поліграфія)

---

## Ключові візуальні елементи

### 1. Print Marks (Друкарські мітки)

```tsx
import {
  PrintSheet,        // Контейнер секції
  RegistrationMark,  // Хрестики реєстрації
  ColorBar,          // CMYK шкала
  PrintMetadata,     // Технічні мітки
  CropMarks,         // Мітки обрізу
  FoldMark           // Мітки згинів
} from "@/components/print-marks"
```

**Використання:**
- Кожна секція огортається в `<PrintSheet section="01">`
- Registration marks на кутах зображень
- ColorBar у sidebar
- PrintMetadata для технічних підписів

### 2. Вертикальний Sidebar

```tsx
<div className="hidden lg:flex flex-col items-center py-12 px-4 border-r border-border bg-muted/30">
  <ColorBar orientation="vertical" />

  <span
    className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
  >
    {category} / {subcategory}
  </span>

  <RegistrationMark size={20} />
</div>
```

### 3. Секційна нумерація

Кожна секція має номер (01, 02, 03):
```tsx
<PrintMetadata label="SEC" />
<span className="font-mono text-lg text-foreground/60">01</span>
```

---

## Типографіка

### Шрифти
- **Заголовки:** `font-light` для великих, `font-semibold` для акцентів
- **Технічні мітки:** `font-mono text-[9px] tracking-wider`
- **SKU/Коди:** `font-mono text-xs text-muted-foreground`

### Приклади
```tsx
// Hero title
<h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-muted-foreground/40 tracking-tight">
  {title}
</h1>

// Section title
<h2 className="text-2xl md:text-3xl font-light">
  Explore our <span className="font-semibold">novelties</span>
</h2>

// Technical label
<p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
  {subtitle}
</p>
```

---

## Кольорова палітра

### Основні кольори
| Назва | CSS Variable | Використання |
|-------|--------------|--------------|
| Primary | `--primary` / `#78be20` | Акценти, кнопки, статус "In Stock" |
| Foreground | `--foreground` | Основний текст |
| Muted | `--muted` | Фони, другорядний текст |
| Border | `--border` | Рамки, роздільники |

### CMYK для Print Marks
```tsx
const colorClasses = [
  "bg-[#00FFFF]", // Cyan
  "bg-[#FF00FF]", // Magenta
  "bg-[#FFFF00]", // Yellow
  "bg-foreground", // Black/Key
]
```

### Інвертовані секції
Для темних секцій (CTA блоки):
```tsx
<PrintSheet section="03" inverted className="bg-foreground">
  {/* Контент з inverted кольорами */}
</PrintSheet>
```

---

## Компоненти

### Product Card

```tsx
<div className="group cursor-pointer relative">
  {/* Registration mark on hover */}
  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
    <RegistrationMark size={10} />
  </div>

  {/* Image */}
  <div className="relative aspect-square bg-muted rounded-sm overflow-hidden mb-4">
    <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

    {/* New badge */}
    {isNew && (
      <span className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-sm">
        New!
      </span>
    )}

    {/* Item index */}
    <div className="absolute top-2 right-2 font-mono text-[8px] text-foreground/30">
      ITEM_01
    </div>
  </div>

  {/* Details */}
  <div className="space-y-1">
    <p className="font-mono text-xs text-muted-foreground">{sku}</p>
    <h3 className="font-medium text-sm">{name}</h3>
    <p className="text-xs text-muted-foreground">{colors} color(s)</p>
    <p className="font-semibold">{price} PLN</p>
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-primary" />
      <span className="text-xs text-primary">In Stock ({stock})</span>
    </div>
  </div>
</div>
```

### Section Layout

```tsx
<section className="relative mx-8 lg:mx-16 mb-16">
  <PrintSheet section="01" className="border border-border">
    <div className="flex">
      {/* Vertical Sidebar */}
      <div className="hidden lg:flex flex-col ...">
        <ColorBar orientation="vertical" />
        <span style={{ writingMode: "vertical-rl" }}>Category / Subcategory</span>
        <RegistrationMark />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-16">
        {/* Content */}
      </div>
    </div>
  </PrintSheet>
</section>
```

---

## Spacing та Layout

### Margins
- Секції: `mx-8 lg:mx-16`
- Внутрішній padding: `p-8 lg:p-16`
- Між секціями: `mb-16`

### Grid
- Products: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
- Hero images: `grid-cols-2 gap-3`
- Content split: `lg:grid-cols-2 gap-8 lg:gap-16`

---

## Анімації та Інтеракції

### Hover ефекти
```css
/* Image zoom */
.group-hover:scale-105 transition-transform duration-300

/* Registration mark appear */
.opacity-0 group-hover:opacity-100 transition-opacity

/* Button arrow */
.group-hover:translate-x-1 transition-transform

/* Text color change */
.group-hover:text-primary transition-colors
```

---

## Заборонено

- Яскраві градієнти (крім CMYK ColorBar)
- Тіні (shadow) на картках - тільки border
- Rounded corners більше ніж `rounded-sm`
- Emoji в UI (тільки в контенті якщо потрібно)
- Зображення як фон секцій (тільки в grid/cards)

---

## Приклади застосування

### Category Page
Файл: `components/category-page.tsx`

### Category Header (для підкатегорій)
Файли: `components/category-header-*.tsx`
Рекомендовано: `category-header-sidebar.tsx` або `category-header-box.tsx`

---

## Checklist для нових компонентів

- [ ] Використовує print marks де доречно
- [ ] Має технічні мітки (PrintMetadata)
- [ ] Дотримується font-mono для кодів/SKU
- [ ] Має hover ефекти з registration marks
- [ ] Використовує border замість shadow
- [ ] Має вертикальний sidebar для великих секцій
- [ ] Numbered sections (01, 02, 03...)

---

**Version:** 1.0.0
**Created:** 2025-11-26
**Reference:** v0.dev chat b_KOoZBI2vXUi
