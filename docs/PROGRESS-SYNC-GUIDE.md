# 📊 Гід по Синхронізації Прогресу Проєкту

> Як працює гібридна система відстеження прогресу (TaskMaster + PROGRESS.md)

---

## 🎯 Дві Системи - Одна Мета

### 1️⃣ TaskMaster (Щоденна Робота)
**Призначення:** Детальне відстеження задач та підзадач
**Формат:** JSON + CLI
**Оновлення:** Щодня (кожна задача)

```bash
# Робота з TaskMaster
npx task-master list              # Переглянути всі задачі
npx task-master next              # Наступна задача
npx task-master show <id>         # Деталі задачі
npx task-master set-status --id=<id> --status=done
```

**Що відстежується:**
- ✅ Статуси задач (pending/in-progress/done/blocked)
- ✅ Підзадачі та їх прогрес
- ✅ Залежності між задачами
- ✅ Пріоритети та складність
- ✅ Метрики виконання (0-100%)

### 2️⃣ PROGRESS.md (Тижневі Звіти)
**Призначення:** Загальна картина та milestone tracking
**Формат:** Markdown (для людей)
**Оновлення:** Щотижня (кожна п'ятниця)

**Що відстежується:**
- 📊 Фази проєкту (0%, 50%, 100%)
- 📈 Загальний прогрес (наприклад: 80%)
- 🔥 Досягнення за тиждень
- 🚧 Blockers та ризики
- 📞 Stakeholder communication

---

## 🔄 Процес Синхронізації

### Щоденна Робота (TaskMaster)

1. **Ранок:** Перевірити наступну задачу
   ```bash
   npx task-master next
   ```

2. **Початок роботи:** Змінити статус на `in-progress`
   ```bash
   npx task-master set-status --id=5 --status=in-progress
   ```

3. **Завершення:** Відразу помітити як `done`
   ```bash
   npx task-master set-status --id=5 --status=done
   ```

4. **Blocker:** Помітити як `blocked` та створити issue
   ```bash
   npx task-master set-status --id=5 --status=blocked
   ```

### Щотижнева Синхронізація (П'ятниця)

**Час:** Кожна п'ятниця о 17:00

**Процес:**

1. **Отримати статистику з TaskMaster:**
   ```bash
   npx task-master list > weekly-stats.txt
   ```

2. **Відкрити PROGRESS.md та оновити:**

   a) **Загальний прогрес:**
   ```markdown
   **Загальний прогрес:** [X]%  # З TaskMaster dashboard
   ```

   b) **Фази:**
   ```markdown
   ✅ Phase 1: Backend Setup       100%
   🟡 Phase 2: Frontend            [X]%  # Розрахувати з TaskMaster
   ⏳ Phase 3: Testing              0%
   ```

   c) **Досягнення за тиждень:**
   ```markdown
   ### Nov 25-29, 2025
   - ✅ Task #5: Homepage completed
   - ✅ Task #8: Quote Form completed
   - 🟡 Task #1: Polylang in progress (50%)
   ```

   d) **Blockers:**
   ```markdown
   ### Current Blockers
   - ⚠️ Task #7: Blocked by incomplete i18n (#2)
   ```

3. **Commit зміни:**
   ```bash
   git add PROGRESS.md
   git commit -m "docs: weekly progress update (week of Nov 25)"
   ```

---

## 📋 Шаблон Щотижневого Оновлення

```markdown
## 🔥 Досягнення за Тиждень (Nov 25-29)

### Завершені Задачі
- ✅ #5: Homepage з Hero та Category Grid
- ✅ #8: Request Quote Form
- ✅ #9: Product Search з багатомовністю
- ✅ #11: Dark Header дизайн
- ✅ #12: GraphQL Caching
- ✅ #14: About та Contact Pages

### В Процесі
- 🟡 #1: Polylang налаштування (in-progress, 60%)

### Blockers
- 🚫 #7: Single Product Page (blocked by #2 - i18n routing)

### Метрики
- **Tasks completed:** 6/20 (30%)
- **Subtasks completed:** 0/99 (0%)
- **Weekly velocity:** 6 tasks
- **Estimated completion:** 3 weeks
```

---

## 🔀 Відповідність Між Системами

### TaskMaster → PROGRESS.md

| TaskMaster | PROGRESS.md |
|------------|-------------|
| `done` (100%) | ✅ Завершено |
| `in-progress` (50%+) | 🟡 В Процесі |
| `pending` (0%) | ⏳ Заплановано |
| `blocked` | 🚫 Заблоковано |
| `cancelled` | ❌ Скасовано |

### Фази → Задачі

**Phase 0: Environment Setup (100%)**
- ✅ Docker, WordPress, MySQL
- ✅ Next.js project setup
- ✅ GraphQL integration

**Phase 1: Backend (85%)**
- ✅ #12: GraphQL Caching ✓
- 🟡 #1: Polylang (in-progress)
- ⏳ #3: Custom Taxonomies (pending)

**Phase 2: Frontend Foundation (60%)**
- ✅ #5: Homepage ✓
- ✅ #11: Header Design ✓
- ✅ #14: About/Contact ✓
- ⏳ #6: Category Page (pending)
- ⏳ #7: Single Product (pending)

**Phase 3: UI Development (30%)**
- ✅ #8: Quote Form ✓
- ✅ #9: Search ✓
- ⏳ #10: SEO (pending)
- ⏳ #13: ISR (pending)

**Phase 4: Testing & Deploy (0%)**
- ⏳ #15: Accessibility (pending)
- ⏳ #18: Testing (pending)
- ⏳ #19: QA (pending)
- ⏳ #20: Deployment (pending)

---

## ⚠️ Важливі Правила

### ✅ DO:
- Оновлюй TaskMaster **одразу** після завершення задачі
- Синхронізуй PROGRESS.md **щотижня** (п'ятниця)
- Використовуй TaskMaster для щоденної роботи
- Використовуй PROGRESS.md для звітів та milestone tracking
- Commit PROGRESS.md після кожного weekly update

### ❌ DON'T:
- **НЕ** оновлюй PROGRESS.md щодня (занадто часто)
- **НЕ** ігноруй TaskMaster статуси (синхронізація зламається)
- **НЕ** дозволяй розбіжності понад 1 тиждень
- **НЕ** оновлюй тільки одну систему (обидві важливі)

---

## 📊 Розрахунок Прогресу

### Загальний Прогрес
```
Загальний % = (Завершені задачі / Всього задач) × 100
Наприклад: (6 / 20) × 100 = 30%
```

### Прогрес Фази
```
Фаза % = (Завершені задачі фази / Всього задач фази) × 100

Phase 2 (Frontend):
Задачі: #5 ✓, #11 ✓, #14 ✓, #6 ⏳, #7 ⏳
Прогрес: (3 / 5) × 100 = 60%
```

### Weekly Velocity
```
Velocity = Задачі завершені за тиждень
Week 1: 6 tasks (5, 8, 9, 11, 12, 14)
Week 2: ? tasks
```

---

## 🛠️ Автоматизація (Майбутнє)

### Ідея: Скрипт Синхронізації

```bash
#!/bin/bash
# sync-progress.sh

# 1. Отримати статистику з TaskMaster
STATS=$(npx task-master list --json)

# 2. Розрахувати прогрес
TOTAL=$(echo $STATS | jq '.total')
DONE=$(echo $STATS | jq '.done')
PERCENT=$((DONE * 100 / TOTAL))

# 3. Оновити PROGRESS.md
sed -i "s/\*\*Загальний прогрес:\*\* [0-9]*%/**Загальний прогрес:** $PERCENT%/" PROGRESS.md

# 4. Git commit
git add PROGRESS.md
git commit -m "docs: auto-sync progress to $PERCENT%"
```

**Запуск:**
```bash
chmod +x sync-progress.sh
./sync-progress.sh
```

---

## 📅 Календар Синхронізації

| День | Дія | Система |
|------|-----|---------|
| Пн-Чт | Щоденна робота | TaskMaster |
| П'ятниця 17:00 | Weekly sync | PROGRESS.md |
| Кінець місяця | Milestone review | Обидві |

---

## 🔗 Пов'язані Документи

- [PROGRESS.md](../PROGRESS.md) - Головний прогрес файл
- [TaskMaster Tasks](../.taskmaster/tasks/tasks.json) - JSON задачі
- [Quick Reference](QUICK-REFERENCE.md) - Швидкий довідник

---

## 📞 Питання?

**Q: Що робити якщо TaskMaster та PROGRESS.md не збігаються?**
A: TaskMaster - джерело правди. Оновіть PROGRESS.md відповідно до TaskMaster.

**Q: Як часто оновлювати підзадачі?**
A: Щодня в TaskMaster. PROGRESS.md відображає тільки головні задачі.

**Q: Що якщо я пропустив weekly sync?**
A: Зробіть його ASAP. Не допускайте розбіжності понад 1 тиждень.

**Q: Чи можна змінювати відсоток вручну в PROGRESS.md?**
A: Так, але краще розраховувати з TaskMaster для точності.

---

**Останнє оновлення:** 2025-11-25
**Версія:** 1.0.0
**Статус:** ✅ Active
