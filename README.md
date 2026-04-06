# Sellerpack Frontend (Next.js 16 + shadcn/ui)

Headless WordPress + Next.js проєкт для B2B каталогу рекламної продукції.

## 📚 Документація

### ⚠️ ВАЖЛИВО - Прочитати Першим!
- **[🔴 Constraints (Quick)](CONSTRAINTS.md)** - Топ-5 критичних обмежень (швидкий огляд)
- **[📋 Constraints Log](CONSTRAINTS-LOG.md)** - **ЖУРНАЛ ОБМЕЖЕНЬ** - хронологічний запис усіх рішень
- **[📚 Project Constraints](docs/PROJECT-CONSTRAINTS.md)** - Детальна документація обмежень

### 🎉 Меню - Повністю Працюють!
- **[✅ Polylang & Hydration Fix](docs/POLYLANG-HYDRATION-FIX.md)** - Виправлення `/uk/` префіксу та hydration error
- **[✅ GraphQL Query Fix](docs/MENU-QUERY-FIX.md)** - Виправлення MenuLocationEnum помилки
- **[✅ Menu Registration Fix](docs/MENU-FIXED.md)** - Виправлення "тема не підтримує меню"
- **[Next Steps: Menu](docs/NEXT-STEPS-MENU.md)** - Що робити для налаштування меню
- **[WordPress Menu Setup](docs/WORDPRESS-MENU-SETUP.md)** - Покрокова інструкція
- **[Dynamic Menus Guide](docs/DYNAMIC-MENUS-GUIDE.md)** - Технічна документація

### 🌐 Багатомовність (Майбутнє)
- **[Polylang Future Implementation](docs/POLYLANG-FUTURE-IMPLEMENTATION.md)** - План реалізації багатомовності

### 📖 Загальна Документація
- **[Site Structure](docs/SITE-STRUCTURE.md)** - Детальна структура сайту, шаблони, меню, пошук
- **[Site Map](docs/SITE-MAP.md)** - Візуальна карта сайту та навігація
- **[Quick Reference](docs/QUICK-REFERENCE.md)** - Швидкий довідник для розробників
- **[Project Summary](docs/PROJECT-SUMMARY.md)** - Загальний огляд проєкту
- **[Changelog](CHANGELOG.md)** - Історія змін
- **[Progress](../PROGRESS.md)** - Прогрес розробки (оновлюється щотижня)

### 📊 Керування Задачами
- **[Progress Sync Guide](docs/PROGRESS-SYNC-GUIDE.md)** - 🔥 Гід по синхронізації TaskMaster + PROGRESS.md
- **TaskMaster** - Щоденне відстеження задач (`npx task-master list`)
- **Weekly Sync** - Кожна п'ятниця о 17:00 (оновлення PROGRESS.md)

## 🚀 Швидкий Старт

### 1. Встановити залежності

```bash
cd /Volumes/Files/Programming/WP_LOCAL_DOCKER/nextjs-frontend
npm install
```

### 2. Запустити dev сервер

```bash
npm run dev
```

Відкрийте http://localhost:3000

## 📦 Додавання shadcn/ui Компонентів

### Базові компоненти

```bash
# Button
npx shadcn@latest add button

# Input
npx shadcn@latest add input

# Card
npx shadcn@latest add card

# Dialog (Modal)
npx shadcn@latest add dialog

# Select
npx shadcn@latest add select

# Checkbox
npx shadcn@latest add checkbox

# Badge
npx shadcn@latest add badge

# Tabs
npx shadcn@latest add tabs

# Alert
npx shadcn@latest add alert
```

### Додати компоненти з v0.dev

```bash
npx shadcn@latest add "https://v0.app/chat/b/b_TtqN8JTtm8u?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..4QTWq4pL25P_Teps.Co6FqDBZzHzNdNK-f-ltrDi5ajodfx5ehgGmAvf7Pwza_t6vokOAL9Mabmo.QpX0XFIc5sUZ1jw5gKIJIA"
```

## 📂 Структура Проєкту

```
nextjs-frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
│
├── components/            # React components
│   └── ui/               # shadcn/ui components (auto-generated)
│
├── lib/                  # Utility functions
│   └── utils.ts          # cn() helper for Tailwind
│
├── public/               # Static files
│
├── components.json       # shadcn/ui config
├── tailwind.config.ts    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

## 🎨 Дизайн Система

### Кольори (Midocean-inspired)

```css
--primary: 207 90% 48%        /* #1976d2 - Blue CTAs */
--secondary: 210 14% 89%      /* #e5e5e5 - Grey */
--background: 0 0% 100%       /* #ffffff - White */
--foreground: 0 0% 13%        /* #212121 - Dark text */
--muted: 210 14% 96%          /* #f5f5f5 - Light grey bg */
--destructive: 0 65% 51%      /* #d32f2f - Red */
```

### Шрифт

- **Roboto** (300, 400, 500, 700)
- Latin + Cyrillic support

### Border Radius

- Мінімальний: `2px` (--radius: 0.125rem)

## 🛠️ Доступні Скрипти

```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📋 Наступні Кроки

1. ✅ Базова структура Next.js створена
2. ⏳ Додати shadcn/ui компоненти
3. ⏳ Створити Header component
4. ⏳ Створити Product Card component
5. ⏳ Налаштувати GraphQL client (Apollo)
6. ⏳ Підключити до WordPress backend

## 📚 Документація

- [Next.js 15 Docs](https://nextjs.org/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [v0.dev](https://v0.dev) - AI component generator

## 🔗 Зв'язані Документи

- [PROJECT-CONSTRAINTS-LOG.md](../docs/PROJECT-CONSTRAINTS-LOG.md)
- [DESIGN-SYSTEM-SPECIFICATION.md](../docs/DESIGN-SYSTEM-SPECIFICATION.md)
- [WIREFRAMES-COMPLETE-SITEMAP.md](../docs/WIREFRAMES-COMPLETE-SITEMAP.md)
