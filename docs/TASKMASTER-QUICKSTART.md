# ⚡ TaskMaster QuickStart

> Швидкий старт для роботи з TaskMaster

---

## 🚀 Базові Команди

### Перегляд Задач
```bash
# Переглянути всі задачі
npx task-master list

# Подивитись наступну задачу
npx task-master next

# Деталі конкретної задачі
npx task-master show 1
```

### Робота з Задачами
```bash
# Почати роботу над задачею
npx task-master set-status --id=1 --status=in-progress

# Завершити задачу
npx task-master set-status --id=1 --status=done

# Заблокувати задачу
npx task-master set-status --id=1 --status=blocked

# Скасувати задачу
npx task-master set-status --id=1 --status=cancelled
```

### Підзадачі
```bash
# Розгорнути задачу на підзадачі
npx task-master expand --id=1

# Подивитись підзадачі
npx task-master show 1
```

---

## 📊 Поточний Стан (25 Nov 2025)

```
✅ Завершено: 6/20 (30%)
- #5: Homepage
- #8: Request Quote Form
- #9: Product Search
- #11: Header Design
- #12: GraphQL Caching
- #14: About/Contact Pages

▶️ В процесі: 1
- #1: Polylang багатомовність

⏳ Очікують: 13
- #2: Next.js i18n routing
- #3: Custom Taxonomies
- #4: Product Meta Fields
- #6: Category Page
- #7: Single Product Page
- ... та інші
```

---

## 🎯 Наступні Кроки

### 1. Завершити Task #1 (Polylang)
```bash
npx task-master show 1
# Подивитись підзадачі та виконати їх
```

### 2. Почати Task #3 (Taxonomies)
```bash
npx task-master set-status --id=3 --status=in-progress
npx task-master expand --id=3
```

### 3. Додати Task #6 (Category Page)
```bash
# Після завершення #3 та #5 (вже done)
npx task-master set-status --id=6 --status=in-progress
```

---

## 📅 Weekly Sync (П'ятниця)

### Процес Синхронізації

1. **Отримати статистику:**
   ```bash
   cd /Volumes/Files/Programming/WP_LOCAL_DOCKER/nextjs-frontend
   npx task-master list
   ```

2. **Оновити PROGRESS.md:**
   - Відкрити `../PROGRESS.md`
   - Оновити "Загальний прогрес: X%"
   - Додати досягнення за тиждень
   - Оновити "В Процесі" секцію

3. **Commit:**
   ```bash
   cd ..
   git add PROGRESS.md
   git commit -m "docs: weekly progress update (week of Nov 25)"
   ```

---

## 🔗 Документація

- **[Progress Sync Guide](PROGRESS-SYNC-GUIDE.md)** - Детальний гід
- **[PROGRESS.md](../../PROGRESS.md)** - Головний прогрес файл
- **[TaskMaster Docs](../.taskmaster/README.md)** - Повна документація

---

**Останнє оновлення:** 2025-11-25
