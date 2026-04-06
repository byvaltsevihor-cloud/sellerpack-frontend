export type CalculatorType =
  | "offset"
  | "digital"
  | "wide-paper"
  | "wide-film"
  | "wide-pvh"
  | "cup-calc"
  | "package-calc"
  | "tshirt-calc"
  | "digit-notebook"
  | "digit-calendar-kvart"
  | "digit-calendar-desk"
  | "special"

// Категорії продуктів - оновлені категорії згідно з новим меню
export const categories = {
  "drukovana-produktsiia": {
    name: "Друкована продукція",
    slug: "drukovana-produktsiia",
    description: "Візитки, флаєри, буклети, каталоги та інша поліграфія",
  },
  "stykery-ta-etyketky": {
    name: "Стикери та етикетки",
    slug: "stykery-ta-etyketky",
    description: "Наліпки, етикетки в рулонах, бирки та голографічні стікери",
  },
  "shyrokoformatnyi-druk": {
    name: "Широкоформатний друк",
    slug: "shyrokoformatnyi-druk",
    description: "Банери, постери, вивіски та плівка на вікна",
  },
  pakuvannia: {
    name: "Пакування",
    slug: "pakuvannia",
    description: "Пакети з друком, картонна упаковка, папки та коробки",
  },
  "tekstylna-produktsiia": {
    name: "Текстильна продукція",
    slug: "tekstylna-produktsiia",
    description: "Футболки, поло, худі, кепки та сумки з нанесенням",
  },
  "suvenirna-produktsiia": {
    name: "Сувенірна продукція",
    slug: "suvenirna-produktsiia",
    description: "Чашки, ручки, флешки, парасолі та інші подарунки",
  },
  "reklamni-konstruktsii": {
    name: "Рекламні конструкції",
    slug: "reklamni-konstruktsii",
    description: "Ролл-апи, х-банери, прес-воли, штендери та лайтбокси",
  },
}

// База продуктів - повний мокап контент з 5+ зображеннями
export interface Product {
  id: number
  slug: string
  name: string
  category: keyof typeof categories
  calculatorType: CalculatorType
  description: string
  fullDescription: string
  images: string[]
  minQuantity: number
  productionDays: number
  basePrice: number
  specs: { label: string; value: string }[]
  features: string[]
  faq: { q: string; a: string }[]
  relatedProducts: string[]
  upsellProducts: string[]
  frequentlyBoughtTogether: string[]
}

export const products: Product[] = [
  // ==================== ДРУКОВАНА ПРОДУКЦІЯ ====================
  {
    id: 1,
    slug: "vizytky",
    name: "Візитки",
    category: "drukovana-produktsiia",
    calculatorType: "offset",
    description: "Друк візитівок на щільному папері з можливістю ламінації та заокруглення кутів",
    fullDescription:
      "Професійні візитки преміум якості для вашого бізнесу. Виготовляємо на щільному крейдованому картоні з можливістю двостороннього друку, ламінації (глянцева, матова, soft-touch) та заокруглення кутів. Ідеальний інструмент для налагодження ділових контактів.",
    images: [
      "/business-cards-premium-stack-white-background-prof.jpg",
      "/business-cards-mockup-hand-holding-elegant.jpg",
      "/business-cards-spread-out-various-designs-colorful.jpg",
      "/business-cards-with-rounded-corners-close-up.jpg",
      "/business-cards-laminated-glossy-matte-finish.jpg",
    ],
    minQuantity: 100,
    productionDays: 5,
    basePrice: 2.5,
    specs: [
      { label: "Розмір", value: "90 × 50 мм (стандарт)" },
      { label: "Матеріал", value: "Крейдований картон" },
      { label: "Щільність", value: "300-350 г/м²" },
      { label: "Друк", value: "Офсетний CMYK / Цифровий" },
      { label: "Оздоблення", value: "Ламінація, тиснення, УФ-лак" },
    ],
    features: [
      "Двосторонній повнокольоровий друк",
      "Ламінація на вибір: глянцева, матова, soft-touch",
      "Заокруглення кутів",
      "Тиснення фольгою (золото, срібло)",
      "УФ-лакування вибіркове",
    ],
    faq: [
      {
        q: "Який мінімальний тираж?",
        a: "Мінімальний тираж становить 100 штук для цифрового друку та 500 для офсетного.",
      },
      {
        q: "Скільки часу займає виготовлення?",
        a: "Стандартний термін — 5-7 робочих днів. Терміновий друк — 2-3 дні.",
      },
      { q: "Чи можна замовити нестандартний розмір?", a: "Так, ми виготовляємо візитки будь-якого розміру та форми." },
    ],
    relatedProducts: ["flayery", "buklety", "firmovi-blanky"],
    upsellProducts: ["vizytnytsya", "papka-dlya-dokumentiv"],
    frequentlyBoughtTogether: ["bloknoty", "ruchky", "papky-z-drukom", "futbolky"],
  },
  {
    id: 2,
    slug: "flayery",
    name: "Флаєри та листівки",
    category: "drukovana-produktsiia",
    calculatorType: "offset",
    description: "Рекламні листівки різних форматів для промо-акцій та заходів",
    fullDescription:
      "Яскраві флаєри для ефективної реклами вашого бізнесу. Ідеальні для роздачі на вулиці, вкладання в замовлення, розміщення в точках продажу. Друкуємо на якісному крейдованому папері з можливістю ламінації.",
    images: [
      "/flyers-colorful-stack-promotional-materials.jpg",
      "/flyers-a5-format-various-designs-spread.jpg",
      "/promotional-leaflets-hand-distribution-street.jpg",
      "/flyers-dl-format-rack-display.jpg",
      "/flyers-glossy-paper-close-up-printing.jpg",
    ],
    minQuantity: 100,
    productionDays: 5,
    basePrice: 1.2,
    specs: [
      { label: "Формати", value: "А4, А5, А6, DL, євро" },
      { label: "Матеріал", value: "Крейдований папір" },
      { label: "Щільність", value: "90-170 г/м²" },
      { label: "Друк", value: "Офсетний / Цифровий CMYK" },
    ],
    features: [
      "Односторонній та двосторонній друк",
      "Різні формати під ваші потреби",
      "Глянцевий та матовий папір",
      "Можливість ламінації",
    ],
    faq: [
      { q: "Який формат найпопулярніший?", a: "Найпопулярніші формати — А5 та DL (євроформат)." },
      { q: "Яка мінімальна кількість?", a: "Від 100 штук для цифрового та від 500 для офсетного друку." },
    ],
    relatedProducts: ["vizytky", "buklety", "plakaty"],
    upsellProducts: ["stend-dlya-flyeriv"],
    frequentlyBoughtTogether: ["roll-apy", "banery", "nalipky", "pakety-paperovi"],
  },
  {
    id: 3,
    slug: "buklety",
    name: "Буклети",
    category: "drukovana-produktsiia",
    calculatorType: "offset",
    description: "Буклети зі згином для презентації послуг та продуктів",
    fullDescription:
      "Інформативні буклети для детальної презентації вашої компанії, послуг чи продуктів. Різні типи згинів: євро (2 згини), книжка, гармошка. Ідеальні для виставок, презентацій та точок продажу.",
    images: [
      "/brochures-tri-fold-various-designs-professional.jpg",
      "/booklet-open-pages-spread-corporate.jpg",
      "/brochures-accordion-fold-colorful.jpg",
      "/marketing-brochure-hand-holding-reading.jpg",
      "/brochures-stack-different-folds-printing.jpg",
    ],
    minQuantity: 100,
    productionDays: 7,
    basePrice: 3.5,
    specs: [
      { label: "Формати", value: "А4, А5 зі згином" },
      { label: "Типи згину", value: "Євро, книжка, гармошка, віконце" },
      { label: "Матеріал", value: "Крейдований папір 130-170 г/м²" },
      { label: "Друк", value: "4+4 повнокольоровий" },
    ],
    features: [
      "Різні типи фальцювання",
      "Глянцевий та матовий папір",
      "Можливість ламінації обкладинки",
      "Біговка для чіткого згину",
    ],
    faq: [
      {
        q: "Який тип згину обрати?",
        a: "Євро-згин найпопулярніший для стандартних буклетів. Гармошка — для більшої кількості інформації.",
      },
    ],
    relatedProducts: ["flayery", "katalogy", "prezentatsiyni-papky"],
    upsellProducts: ["katalogy"],
    frequentlyBoughtTogether: ["vizytky", "papky-z-drukom", "bloknoty", "ruchky"],
  },
  {
    id: 4,
    slug: "katalogy",
    name: "Каталоги",
    category: "drukovana-produktsiia",
    calculatorType: "offset",
    description: "Багатосторінкові каталоги продукції з якісною поліграфією",
    fullDescription:
      "Професійні каталоги для презентації асортименту вашої продукції. Різні формати, типи палітурки та оздоблення. Ідеальні для B2B продажів, виставок та презентацій.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 50,
    productionDays: 10,
    basePrice: 25,
    specs: [
      { label: "Формати", value: "А4, А5, нестандартні" },
      { label: "Сторінки", value: "8-200+ сторінок" },
      { label: "Палітурка", value: "Скоба, КБС, пружина, тверда" },
      { label: "Папір блоку", value: "Крейда 90-170 г/м²" },
    ],
    features: [
      "Тверда та м'яка обкладинка",
      "Ламінація обкладинки",
      "Різні типи палітурки",
      "УФ-лак, тиснення фольгою",
    ],
    faq: [{ q: "Яка мінімальна кількість сторінок?", a: "Для скоби — мінімум 8 сторінок, для КБС — від 48 сторінок." }],
    relatedProducts: ["buklety", "prezentatsiyni-papky", "bloknoty"],
    upsellProducts: ["firmovi-blanky"],
    frequentlyBoughtTogether: ["vizytky", "papky-z-drukom", "roll-apy", "sumky-z-drukom"],
  },
  {
    id: 5,
    slug: "plakaty",
    name: "Плакати та постери",
    category: "drukovana-produktsiia",
    calculatorType: "wide-paper",
    description: "Великоформатний друк плакатів та постерів",
    fullDescription:
      "Яскраві плакати та постери для реклами, оформлення приміщень, афіш заходів. Друк на якісному крейдованому папері або фотопапері з високою роздільною здатністю.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1,
    productionDays: 3,
    basePrice: 45,
    specs: [
      { label: "Формати", value: "А3, А2, А1, А0, нестандартні" },
      { label: "Матеріал", value: "Крейда, фотопапір, полотно" },
      { label: "Друк", value: "Широкоформатний, латексний, УФ" },
      { label: "Роздільність", value: "До 1440 dpi" },
    ],
    features: [
      "Друк від 1 штуки",
      "Фотоякість зображення",
      "Стійкість до вологи (опційно)",
      "Ламінація для довговічності",
    ],
    faq: [],
    relatedProducts: ["banery", "roll-apy", "stikery"],
    upsellProducts: ["rama-dlya-plakata"],
    frequentlyBoughtTogether: ["roll-apy", "banery", "x-banery", "nalipky"],
  },
  {
    id: 6,
    slug: "bloknoty",
    name: "Блокноти",
    category: "drukovana-produktsiia",
    calculatorType: "digit-notebook",
    description: "Брендовані блокноти з логотипом компанії",
    fullDescription:
      "Фірмові блокноти для нотаток — практичний подарунок для клієнтів та партнерів. Різні формати, типи обкладинок та кріплення. Можливість повного брендування.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 50,
    productionDays: 10,
    basePrice: 35,
    specs: [
      { label: "Формат", value: "А4, А5, А6" },
      { label: "Обкладинка", value: "М'яка, тверда, шкірзам" },
      { label: "Кріплення", value: "Клей, пружина, прошивка" },
      { label: "Блок", value: "40-200 аркушів" },
    ],
    features: [
      "Друк обкладинки та блоку",
      "Тиснення логотипу",
      "Різні типи розлініювання",
      "Кишенька, закладка, резинка",
    ],
    faq: [],
    relatedProducts: ["ruchky", "papky", "vizytky"],
    upsellProducts: ["ruchky", "nabir-kantstovariv"],
    frequentlyBoughtTogether: ["ruchky", "vizytky", "kalendari-nastilni", "chashky"],
  },
  {
    id: 7,
    slug: "kalendari-kvartalni",
    name: "Календарі квартальні",
    category: "drukovana-produktsiia",
    calculatorType: "digit-calendar-kvart",
    description: "Настінні квартальні календарі з логотипом",
    fullDescription:
      "Класичні квартальні календарі — обов'язковий атрибут кожного офісу. Ефективний рекламоносій, який працює весь рік. Різна кількість блоків, можливість індивідуального дизайну.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 50,
    productionDays: 10,
    basePrice: 85,
    specs: [
      { label: "Блоки", value: "1, 2, 3 блоки" },
      { label: "Пружина", value: "Біла, чорна, срібна" },
      { label: "Шапка", value: "Картон 300 г/м² + ламінація" },
      { label: "Курсор", value: "Пластиковий, різні кольори" },
    ],
    features: [
      "Індивідуальний дизайн шапки",
      "Вибір кольору курсора",
      "Підкладка з мікрогофрокартону",
      "Можливість тиснення",
    ],
    faq: [],
    relatedProducts: ["kalendari-nastilni", "plakaty"],
    upsellProducts: ["kalendari-nastilni"],
    frequentlyBoughtTogether: ["vizytky", "bloknoty", "ruchky", "chashky"],
  },
  {
    id: 8,
    slug: "kalendari-nastilni",
    name: "Календарі настільні",
    category: "drukovana-produktsiia",
    calculatorType: "digit-calendar-desk",
    description: "Настільні перекидні календарі",
    fullDescription:
      "Компактні настільні календарі для робочого столу. Практичний та стильний аксесуар з вашим брендом, який буде перед очима клієнта кожного дня.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 50,
    productionDays: 10,
    basePrice: 45,
    specs: [
      { label: "Формат", value: "А5, А6 горизонтальні" },
      { label: "Підставка", value: "Картон, пластик" },
      { label: "Кріплення", value: "Пружина" },
      { label: "Сторінки", value: "12-13 місяців" },
    ],
    features: ["Індивідуальний дизайн кожної сторінки", "Місце для нотаток", "Стійка підставка"],
    faq: [],
    relatedProducts: ["kalendari-kvartalni", "bloknoty"],
    upsellProducts: ["nabir-kantstovariv"],
    frequentlyBoughtTogether: ["bloknoty", "ruchky", "vizytky", "papky-z-drukom"],
  },

  // ==================== СТИКЕРИ ТА ЕТИКЕТКИ ====================
  {
    id: 10,
    slug: "nalipky",
    name: "Наліпки (стікери)",
    category: "stykery-ta-etyketky",
    calculatorType: "wide-film",
    description: "Самоклеючі наліпки будь-якої форми та розміру",
    fullDescription:
      "Якісні самоклеючі наліпки для брендування продукції, упаковки, POS-матеріалів. Друк на плівці або папері з контурною різкою будь-якої форми.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 100,
    productionDays: 5,
    basePrice: 1.5,
    specs: [
      { label: "Матеріал", value: "Плівка, папір самоклеючий" },
      { label: "Різка", value: "Контурна, прямокутна, кругла" },
      { label: "Друк", value: "Повнокольоровий CMYK" },
      { label: "Покриття", value: "Глянцеве, матове, прозоре" },
    ],
    features: ["Будь-яка форма різки", "Водостійкі варіанти", "Друк білим кольором", "Голографічні ефекти"],
    faq: [],
    relatedProducts: ["etyketky-v-rulonakh", "holohrafichni-nalipky"],
    upsellProducts: ["obiemni-nalipky"],
    frequentlyBoughtTogether: ["pakety-paperovi", "korobky-z-drukom", "vizytky", "flayery"],
  },
  {
    id: 11,
    slug: "etyketky-v-rulonakh",
    name: "Етикетки в рулонах",
    category: "stykery-ta-etyketky",
    calculatorType: "wide-film",
    description: "Самоклеючі етикетки для маркування продукції",
    fullDescription:
      "Професійні етикетки в рулонах для автоматичного нанесення на продукцію. Ідеальні для харчової, косметичної, фармацевтичної галузі.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 500,
    productionDays: 7,
    basePrice: 0.8,
    specs: [
      { label: "Матеріал", value: "Плівка, папір, термопапір" },
      { label: "Втулка", value: "40, 76 мм" },
      { label: "Намотка", value: "Внутрішня, зовнішня" },
    ],
    features: [
      "Для автоматичного нанесення",
      "Термотрансферний друк",
      "Водо- та жиростійкі",
      "Сертифікація для харчової продукції",
    ],
    faq: [],
    relatedProducts: ["nalipky", "termoetyketky"],
    upsellProducts: ["termoetyketky"],
    frequentlyBoughtTogether: ["korobky-z-drukom", "pakety-paperovi", "strichky-pakuvalni"],
  },
  {
    id: 12,
    slug: "holohrafichni-nalipky",
    name: "Голографічні наліпки",
    category: "stykery-ta-etyketky",
    calculatorType: "special",
    description: "Захисні голографічні наліпки від підробок",
    fullDescription:
      "Голографічні наліпки для захисту продукції від підробок. Унікальний візуальний ефект та можливість персоналізації. Використовуються для акцизів, сертифікатів автентичності.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1000,
    productionDays: 14,
    basePrice: 2.5,
    specs: [
      { label: "Тип", value: "2D, 3D голограма" },
      { label: "Матеріал", value: "Голографічна плівка" },
      { label: "Захист", value: "Руйнується при знятті" },
    ],
    features: ["Захист від підробок", "Унікальний дизайн", "Серійна нумерація", "QR-код інтеграція"],
    faq: [],
    relatedProducts: ["nalipky", "etyketky-v-rulonakh"],
    upsellProducts: [],
    frequentlyBoughtTogether: ["korobky-z-drukom", "sertyfikaty", "vizytky"],
  },

  // ==================== ШИРОКОФОРМАТНИЙ ДРУК ====================
  {
    id: 20,
    slug: "banery",
    name: "Банери",
    category: "shyrokoformatnyi-druk",
    calculatorType: "wide-pvh",
    description: "PVC банери для зовнішньої та внутрішньої реклами",
    fullDescription:
      "Міцні PVC банери для будь-яких умов експлуатації. Ідеальні для зовнішньої реклами, оформлення заходів, виставок. Люверси та підгин краю включені.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1,
    productionDays: 3,
    basePrice: 180,
    specs: [
      { label: "Матеріал", value: "PVC 440-550 г/м²" },
      { label: "Друк", value: "Сольвентний, латексний, УФ" },
      { label: "Обробка", value: "Люверси, підгин, кишені" },
      { label: "Розмір", value: "До 3.2 м ширина, довжина необмежена" },
    ],
    features: [
      "Стійкість до погодних умов",
      "Яскраві кольори на роки",
      "Люверси кожні 30-50 см",
      "Двосторонній друк (опційно)",
    ],
    faq: [],
    relatedProducts: ["roll-apy", "shtendery", "vyvisky"],
    upsellProducts: ["konstruktsiya-dlya-banera"],
    frequentlyBoughtTogether: ["roll-apy", "x-banery", "flayery", "vizytky"],
  },
  {
    id: 21,
    slug: "roll-apy",
    name: "Ролл-апи",
    category: "shyrokoformatnyi-druk",
    calculatorType: "wide-film",
    description: "Мобільні рекламні стенди з механізмом змотування",
    fullDescription:
      "Портативні виставкові стенди для презентацій, виставок, конференцій. Легко збираються та транспортуються. В комплекті сумка для перенесення.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1,
    productionDays: 3,
    basePrice: 850,
    specs: [
      { label: "Розміри", value: "85×200, 100×200, 120×200 см" },
      { label: "Конструкція", value: "Алюміній" },
      { label: "Полотно", value: "PVC 440 г/м², поліестер" },
    ],
    features: ["Збірка за 30 секунд", "Сумка для транспортування", "Заміна полотна", "Гарантія 2 роки на механізм"],
    faq: [],
    relatedProducts: ["x-banery", "pres-voly", "banery"],
    upsellProducts: ["osvitlennya-dlya-stendu"],
    frequentlyBoughtTogether: ["banery", "vizytky", "buklety", "flayery"],
  },
  {
    id: 22,
    slug: "orakal",
    name: "Плівка Oracal",
    category: "shyrokoformatnyi-druk",
    calculatorType: "wide-film",
    description: "Самоклеюча плівка для вивісок, вітрин, транспорту",
    fullDescription:
      "Якісна самоклеюча плівка Oracal для брендування вітрин, транспорту, оформлення інтер'єрів. Широкий вибір кольорів та текстур.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1,
    productionDays: 3,
    basePrice: 150,
    specs: [
      { label: "Серії", value: "Oracal 641, 651, 751, 8500" },
      { label: "Тип", value: "Глянцева, матова, перфорована" },
      { label: "Термін служби", value: "3-8 років залежно від серії" },
    ],
    features: ["Зовнішнє та внутрішнє застосування", "Різка плоттером", "Монтаж під ключ", "Великий вибір кольорів"],
    faq: [],
    relatedProducts: ["vyvisky", "banery"],
    upsellProducts: ["montazh-plivky"],
    frequentlyBoughtTogether: ["banery", "vyvisky", "shtendery", "nalipky"],
  },

  // ==================== ПАКУВАННЯ ====================
  {
    id: 30,
    slug: "pakety-z-drukom",
    name: "Пакети з друком",
    category: "pakuvannia",
    calculatorType: "package-calc",
    description: "Брендовані паперові та поліетиленові пакети",
    fullDescription:
      "Фірмові пакети з вашим логотипом для магазинів, ресторанів, подарунків. Паперові та поліетиленові варіанти різних розмірів.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 100,
    productionDays: 14,
    basePrice: 15,
    specs: [
      { label: "Матеріал", value: "Крафт, крейда, поліетилен" },
      { label: "Ручки", value: "Плоскі, кручені, вирубні, стрічкові" },
      { label: "Друк", value: "Флексодрук, шовкодрук, офсет" },
    ],
    features: ["Індивідуальні розміри", "Ламінація", "Тиснення фольгою", "Екологічні матеріали"],
    faq: [],
    relatedProducts: ["korobky", "papky"],
    upsellProducts: ["strichka-z-logotypom"],
    frequentlyBoughtTogether: ["korobky-z-drukom", "nalipky", "vizytky", "bloknoty"],
  },
  {
    id: 31,
    slug: "korobky",
    name: "Картонні коробки",
    category: "pakuvannia",
    calculatorType: "package-calc",
    description: "Індивідуальна картонна упаковка для продукції",
    fullDescription:
      "Якісна картонна упаковка для вашої продукції. Від простих коробок до складних конструкцій з вікнами, вкладками та преміум оздобленням.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 100,
    productionDays: 14,
    basePrice: 25,
    specs: [
      { label: "Матеріал", value: "Картон, мікрогофра, гофрокартон" },
      { label: "Друк", value: "Офсет, флексо" },
      { label: "Оздоблення", value: "Ламінація, лакування, тиснення" },
    ],
    features: ["Індивідуальна конструкція", "Вікна та вкладки", "Магнітні застібки", "Стрічки та банти"],
    faq: [],
    relatedProducts: ["pakety-z-drukom", "strichka-z-logotypom"],
    upsellProducts: ["napovnyuvach-dlya-korobok"],
    frequentlyBoughtTogether: ["pakety-paperovi", "nalipky", "strichky-pakuvalni", "vizytky"],
  },
  {
    id: 32,
    slug: "papky",
    name: "Папки для документів",
    category: "pakuvannia",
    calculatorType: "offset",
    description: "Презентаційні папки з логотипом компанії",
    fullDescription:
      "Фірмові папки для документів, комерційних пропозицій, презентацій. Різні конструкції з кишенями, кріпленням для візиток та блокнотів.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 100,
    productionDays: 10,
    basePrice: 18,
    specs: [
      { label: "Формат", value: "А4, А5" },
      { label: "Матеріал", value: "Картон 300-400 г/м²" },
      { label: "Кишені", value: "1-2 кишені, слот для візитки" },
    ],
    features: ["Вклеєна кишеня", "Тиснення логотипу", "Ламінація", "Вирубка під візитку"],
    faq: [],
    relatedProducts: ["bloknoty", "vizytky"],
    upsellProducts: ["bloknoty"],
    frequentlyBoughtTogether: ["bloknoty", "vizytky", "buklety", "ruchky"],
  },

  // ==================== ТЕКСТИЛЬНА ПРОДУКЦІЯ ====================
  {
    id: 40,
    slug: "futbolky",
    name: "Футболки",
    category: "tekstylna-produktsiia",
    calculatorType: "tshirt-calc",
    description: "Брендовані футболки з нанесенням логотипу",
    fullDescription:
      "Якісні футболки для корпоративного одягу, промо-акцій, мерчу. Різні методи нанесення: шовкодрук, DTF, вишивка. Широкий вибір кольорів та розмірів.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 10,
    productionDays: 7,
    basePrice: 180,
    specs: [
      { label: "Матеріал", value: "100% бавовна, бавовна/поліестер" },
      { label: "Щільність", value: "145-190 г/м²" },
      { label: "Розміри", value: "XS - 5XL" },
      { label: "Нанесення", value: "Шовкодрук, DTF, DTG, вишивка" },
    ],
    features: [
      "Чоловічі, жіночі, дитячі моделі",
      "Понад 30 кольорів",
      "Великі тиражі зі знижкою",
      "Індивідуальний крій",
    ],
    faq: [],
    relatedProducts: ["polo", "khudi", "kepky"],
    upsellProducts: ["kepky", "sumky"],
    frequentlyBoughtTogether: ["kepky", "sumky", "khudi", "polo"],
  },
  {
    id: 41,
    slug: "polo",
    name: "Поло",
    category: "tekstylna-produktsiia",
    calculatorType: "tshirt-calc",
    description: "Сорочки поло з вишивкою або друком",
    fullDescription:
      "Елегантні сорочки поло для корпоративного дрес-коду, персоналу, подарунків. Вишивка або друк логотипу на грудях та спині.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 10,
    productionDays: 10,
    basePrice: 350,
    specs: [
      { label: "Матеріал", value: "Піке бавовна, бавовна/поліестер" },
      { label: "Щільність", value: "180-220 г/м²" },
      { label: "Розміри", value: "XS - 4XL" },
    ],
    features: ["Вишивка до 15000 стібків", "Друк DTF", "Комір та манжети", "Преміум якість"],
    faq: [],
    relatedProducts: ["futbolky", "khudi", "kepky"],
    upsellProducts: ["kepky"],
    frequentlyBoughtTogether: ["futbolky", "kepky", "khudi", "sumky"],
  },
  {
    id: 42,
    slug: "khudi",
    name: "Худі та світшоти",
    category: "tekstylna-produktsiia",
    calculatorType: "tshirt-calc",
    description: "Теплий брендований одяг з капюшоном",
    fullDescription:
      "Комфортні худі та світшоти для мерчу, корпоративного одягу, подарунків. Якісний друк або вишивка, що витримує багато прань.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 10,
    productionDays: 10,
    basePrice: 550,
    specs: [
      { label: "Матеріал", value: "Футер 3-нитка, флис" },
      { label: "Щільність", value: "280-360 г/м²" },
      { label: "Розміри", value: "XS - 4XL" },
    ],
    features: ["Худі з капюшоном та кишенею", "Світшоти без капюшона", "Утеплені варіанти", "Друк на всю площу"],
    faq: [],
    relatedProducts: ["futbolky", "polo", "kepky"],
    upsellProducts: ["sumky"],
    frequentlyBoughtTogether: ["futbolky", "kepky", "polo", "sumky"],
  },
  {
    id: 43,
    slug: "kepky",
    name: "Кепки та головні убори",
    category: "tekstylna-produktsiia",
    calculatorType: "special",
    description: "Брендовані кепки, бейсболки, панами",
    fullDescription:
      "Стильні головні убори з вашим логотипом. Кепки, бейсболки, панами, в'язані шапки. Вишивка або друк високої якості.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 25,
    productionDays: 10,
    basePrice: 150,
    specs: [
      { label: "Типи", value: "Бейсболка, тракер, панама, біні" },
      { label: "Матеріал", value: "Бавовна, поліестер, акрил" },
      { label: "Застібка", value: "Регульована, snapback, flexfit" },
    ],
    features: ["3D вишивка", "Друк на козирку", "Індивідуальний крій", "Підкладка з вашим принтом"],
    faq: [],
    relatedProducts: ["futbolky", "polo"],
    upsellProducts: ["futbolky"],
    frequentlyBoughtTogether: ["futbolky", "polo", "khudi", "sumky"],
  },
  {
    id: 44,
    slug: "sumky",
    name: "Сумки та шопери",
    category: "tekstylna-produktsiia",
    calculatorType: "tshirt-calc",
    description: "Промо сумки та еко-шопери з логотипом",
    fullDescription:
      "Екологічні сумки-шопери та промо-сумки для магазинів, заходів, подарунків. Бавовна, джут, поліестер. Різні методи нанесення.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 50,
    productionDays: 10,
    basePrice: 85,
    specs: [
      { label: "Матеріал", value: "Бавовна, джут, поліестер, спанбонд" },
      { label: "Щільність", value: "140-280 г/м²" },
      { label: "Ручки", value: "Короткі, довгі, через плече" },
    ],
    features: ["Екологічні матеріали", "Шовкодрук до 4 кольорів", "DTF друк", "Великі тиражі"],
    faq: [],
    relatedProducts: ["futbolky", "kepky"],
    upsellProducts: ["futbolky"],
    frequentlyBoughtTogether: ["futbolky", "kepky", "khudi", "polo"],
  },

  // ==================== СУВЕНІРНА ПРОДУКЦІЯ ====================
  {
    id: 50,
    slug: "chashky",
    name: "Чашки та кухлі",
    category: "suvenirna-produktsiia",
    calculatorType: "special",
    description: "Керамічні чашки з нанесенням логотипу",
    fullDescription:
      "Класичний корпоративний подарунок — чашка з вашим логотипом. Сублімація, деколь або гравіювання. Широкий вибір форм та кольорів.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 36,
    productionDays: 10,
    basePrice: 95,
    specs: [
      { label: "Об'єм", value: "300, 350, 400 мл" },
      { label: "Матеріал", value: "Кераміка, порцеляна, скло, термо" },
      { label: "Нанесення", value: "Сублімація, деколь, гравіювання" },
    ],
    features: ["Друк на всю площу", "Кольорова ручка", "Подарункова упаковка", "Термочашки"],
    faq: [],
    relatedProducts: ["ruchky", "bloknoty"],
    upsellProducts: ["termochashka"],
    frequentlyBoughtTogether: ["ruchky", "bloknoty", "vizytky", "kalendari-nastilni"],
  },
  {
    id: 51,
    slug: "ruchky",
    name: "Ручки",
    category: "suvenirna-produktsiia",
    calculatorType: "special",
    description: "Брендовані кулькові та гелеві ручки",
    fullDescription:
      "Найпопулярніший промо-сувенір — ручки з вашим логотипом. Величезний вибір моделей від бюджетних до преміум. Тамподрук або гравіювання.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 100,
    productionDays: 7,
    basePrice: 12,
    specs: [
      { label: "Тип", value: "Кулькові, гелеві, стилуси" },
      { label: "Матеріал", value: "Пластик, метал, еко" },
      { label: "Нанесення", value: "Тамподрук, УФ-друк, гравіювання" },
    ],
    features: ["Понад 200 моделей", "Від бюджетних до преміум", "Друк до 4 кольорів", "Гравіювання для металевих"],
    faq: [],
    relatedProducts: ["bloknoty", "chashky"],
    upsellProducts: ["nabir-ruchka-bloknot"],
    frequentlyBoughtTogether: ["bloknoty", "vizytky", "chashky", "kalendari-nastilni"],
  },
  {
    id: 52,
    slug: "powerbank",
    name: "Powerbank",
    category: "suvenirna-produktsiia",
    calculatorType: "special",
    description: "Портативні зарядні пристрої з логотипом",
    fullDescription:
      "Практичний та сучасний корпоративний подарунок. Powerbank різної ємності з нанесенням логотипу. УФ-друк або гравіювання.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 25,
    productionDays: 10,
    basePrice: 350,
    specs: [
      { label: "Ємність", value: "5000, 10000, 20000 mAh" },
      { label: "Виходи", value: "USB-A, USB-C, бездротова" },
      { label: "Нанесення", value: "УФ-друк, гравіювання" },
    ],
    features: ["Швидка зарядка", "LED індикатор", "Компактний розмір", "Подарункова коробка"],
    faq: [],
    relatedProducts: ["usb-fleshky", "navushnyky"],
    upsellProducts: ["nabir-gadzheti"],
    frequentlyBoughtTogether: ["usb-fleshky", "navushnyky", "ruchky", "bloknoty"],
  },
  {
    id: 53,
    slug: "usb-fleshky",
    name: "USB флешки",
    category: "suvenirna-produktsiia",
    calculatorType: "special",
    description: "Брендовані USB накопичувачі",
    fullDescription:
      "USB флешки з вашим логотипом — практичний подарунок для партнерів та клієнтів. Різні форми, об'єми та матеріали.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 25,
    productionDays: 10,
    basePrice: 180,
    specs: [
      { label: "Об'єм", value: "8, 16, 32, 64, 128 GB" },
      { label: "Інтерфейс", value: "USB 2.0, USB 3.0, Type-C" },
      { label: "Матеріал", value: "Пластик, метал, дерево, шкіра" },
    ],
    features: ["Попередній запис даних", "Індивідуальний дизайн корпусу", "Подарункова упаковка"],
    faq: [],
    relatedProducts: ["powerbank", "ruchky"],
    upsellProducts: ["nabir-gadzheti"],
    frequentlyBoughtTogether: ["powerbank", "ruchky", "navushnyky", "bloknoty"],
  },
  {
    id: 54,
    slug: "parasoli",
    name: "Парасолі",
    category: "suvenirna-produktsiia",
    calculatorType: "special",
    description: "Брендовані парасолі різних типів",
    fullDescription:
      "Практичний подарунок на всі сезони. Складні парасолі, парасолі-тростини, пляжні та садові. Друк на клинах або повна заливка.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 25,
    productionDays: 14,
    basePrice: 250,
    specs: [
      { label: "Типи", value: "Складна, тростина, гольф" },
      { label: "Діаметр", value: "90-130 см" },
      { label: "Нанесення", value: "Шовкодрук, сублімація" },
    ],
    features: ["Автоматичне відкривання", "Друк на 1-8 клинах", "Повна заливка дизайну", "Чохол в комплекті"],
    faq: [],
    relatedProducts: ["sumky", "kepky"],
    upsellProducts: [],
    frequentlyBoughtTogether: ["sumky", "kepky", "futbolky", "chashky"],
  },

  // ==================== РЕКЛАМНІ КОНСТРУКЦІЇ ====================
  {
    id: 60,
    slug: "x-banery",
    name: "Х-банери",
    category: "reklamni-konstruktsii",
    calculatorType: "wide-film",
    description: "Економічні виставкові стенди X-типу",
    fullDescription:
      "Бюджетний варіант мобільного стенду для виставок та презентацій. Легка конструкція, швидке збирання. Ідеальні для короткострокових заходів.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1,
    productionDays: 3,
    basePrice: 450,
    specs: [
      { label: "Розміри", value: "60×160, 80×180 см" },
      { label: "Конструкція", value: "Пластик/алюміній" },
      { label: "Полотно", value: "Банерна тканина 280 г/м²" },
    ],
    features: ["Найнижча ціна", "Вага до 1 кг", "Заміна полотна", "Сумка для транспортування"],
    faq: [],
    relatedProducts: ["roll-apy", "pres-voly"],
    upsellProducts: ["roll-apy"],
    frequentlyBoughtTogether: ["roll-apy", "banery", "pres-voly", "shtendery"],
  },
  {
    id: 61,
    slug: "pres-voly",
    name: "Прес-воли",
    category: "reklamni-konstruktsii",
    calculatorType: "wide-pvh",
    description: "Великі фотозони та брендволи для заходів",
    fullDescription:
      "Вражаючі прес-воли для конференцій, презентацій, фотозон. Модульна конструкція будь-якого розміру. Швидкий монтаж та демонтаж.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1,
    productionDays: 5,
    basePrice: 2500,
    specs: [
      { label: "Розміри", value: "Від 2×2 м до необмеженого" },
      { label: "Конструкція", value: "Алюмінієвий каркас" },
      { label: "Полотно", value: "Банерна тканина, PVC" },
    ],
    features: ["Модульна система", "Швидкий монтаж", "Двосторонній друк", "Підсвітка (опційно)"],
    faq: [],
    relatedProducts: ["roll-apy", "x-banery"],
    upsellProducts: ["osvitlennya"],
    frequentlyBoughtTogether: ["roll-apy", "banery", "x-banery", "shtendery"],
  },
  {
    id: 62,
    slug: "shtendery",
    name: "Штендери",
    category: "reklamni-konstruktsii",
    calculatorType: "wide-pvh",
    description: "Вуличні рекламні щити та штендери",
    fullDescription:
      "Ефективна вулична реклама біля вашого закладу. Штендери різних типів: рамкові, мимохід, крейдові. Стійкі до погодних умов.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1,
    productionDays: 5,
    basePrice: 1200,
    specs: [
      { label: "Типи", value: "Рамковий, мимохід, крейдовий" },
      { label: "Матеріал", value: "Алюміній, сталь, пластик" },
      { label: "Постер", value: "PVC, папір ламінований" },
    ],
    features: ["Двосторонній", "Заміна постера", "Противітровий стабілізатор", "Захист від дощу"],
    faq: [],
    relatedProducts: ["banery", "vyvisky"],
    upsellProducts: [],
    frequentlyBoughtTogether: ["banery", "roll-apy", "x-banery", "pres-voly"],
  },
  {
    id: 63,
    slug: "laitboksy",
    name: "Лайтбокси",
    category: "reklamni-konstruktsii",
    calculatorType: "special",
    description: "Світлові короби та вивіски з підсвіткою",
    fullDescription:
      "Ефектні світлові вивіски для фасадів, інтер'єрів, виставок. LED підсвітка, економічне енергоспоживання. Індивідуальні розміри та форми.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1,
    productionDays: 10,
    basePrice: 3500,
    specs: [
      { label: "Тип", value: "Односторонній, двосторонній" },
      { label: "Підсвітка", value: "LED модулі, стрічка" },
      { label: "Товщина", value: "Ультратонкий 2 см, стандарт 10 см" },
    ],
    features: ["Рівномірна підсвітка", "Економія енергії до 80%", "Заміна зображення", "Інтер'єр та екстер'єр"],
    faq: [],
    relatedProducts: ["vyvisky", "banery"],
    upsellProducts: [],
    frequentlyBoughtTogether: ["vyvisky", "banery", "shtendery", "roll-apy"],
  },
  {
    id: 64,
    slug: "prapory",
    name: "Прапори та флагштоки",
    category: "reklamni-konstruktsii",
    calculatorType: "wide-film",
    description: "Рекламні прапори та мобільні флагштоки",
    fullDescription:
      "Яскраві рекламні прапори для заходів, точок продажу, оформлення території. Віндери (прапори-крапля), прямокутні, вімпели. Мобільні та стаціонарні флагштоки.",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    minQuantity: 1,
    productionDays: 5,
    basePrice: 950,
    specs: [
      { label: "Типи", value: "Крапля, перо, прямокутний" },
      { label: "Висота", value: "2.5, 3.5, 4.5, 5.5 м" },
      { label: "Матеріал", value: "Прапорна тканина 115 г/м²" },
    ],
    features: ["Обертається на 360°", "Друк наскрізний", "Мобільна та ґрунтова база", "Стійкість до вітру"],
    faq: [],
    relatedProducts: ["roll-apy", "banery"],
    upsellProducts: [],
    frequentlyBoughtTogether: ["roll-apy", "banery", "x-banery", "shtendery"],
  },
]

// Опції для калькуляторів
export const calculatorOptions = {
  // Загальні тиражі
  quantities: {
    offset: [100, 250, 500, 1000, 2500, 5000, 10000],
    digital: [10, 25, 50, 100, 250, 500],
    "wide-paper": [1, 5, 10, 25, 50, 100],
    "wide-film": [1, 5, 10, 25, 50, 100],
    "cup-calc": [1000, 2000, 5000, 10000, 20000],
    "package-calc": [100, 250, 500, 1000, 2500],
    "tshirt-calc": [10, 25, 50, 100, 250, 500],
    "digit-notebook": [50, 100, 250, 500, 1000],
    "digit-calendar-kvart": [50, 100, 250, 500, 1000],
    "digit-calendar-desk": [50, 100, 250, 500, 1000],
    special: [50, 100, 250, 500, 1000],
  },

  // Типи паперу для поліграфії
  paperTypes: [
    { id: "coated_gloss_350", label: "Крейда глянцева 350 г/м²" },
    { id: "coated_gloss_300", label: "Крейда глянцева 300 г/м²" },
    { id: "coated_matte_350", label: "Крейда матова 350 г/м²" },
    { id: "coated_matte_300", label: "Крейда матова 300 г/м²" },
    { id: "coated_130", label: "Крейда 130 г/м²" },
    { id: "coated_170", label: "Крейда 170 г/м²" },
    { id: "offset_80", label: "Офсетний 80 г/м²" },
    { id: "offset_120", label: "Офсетний 120 г/м²" },
    { id: "kraft", label: "Крафт" },
    { id: "designer", label: "Дизайнерський папір" },
  ],

  // Друк
  printSides: [
    { id: "4+4", label: "4+4 кольоровий двосторонній" },
    { id: "4+0", label: "4+0 односторонній" },
    { id: "4+1", label: "4+1 кольоровий + чорний" },
    { id: "1+1", label: "1+1 чорно-білий" },
    { id: "1+0", label: "1+0 чорно-білий односторонній" },
  ],

  // Ламінація
  laminations: [
    { id: "none", label: "Без ламінації" },
    { id: "gloss_one", label: "Глянцева (1 бік)" },
    { id: "gloss_both", label: "Глянцева (2 боки)" },
    { id: "matte_one", label: "Матова (1 бік)" },
    { id: "matte_both", label: "Матова (2 боки)" },
    { id: "soft_touch", label: "Soft Touch" },
  ],

  // Кути
  corners: [
    { id: "straight", label: "Прямі" },
    { id: "rounded", label: "Заокруглені" },
  ],

  // Формати для поліграфії
  formats: [
    { id: "a6", label: "А6 (105×148 мм)" },
    { id: "a5", label: "А5 (148×210 мм)" },
    { id: "a4", label: "А4 (210×297 мм)" },
    { id: "a3", label: "А3 (297×420 мм)" },
    { id: "a2", label: "А2 (420×594 мм)" },
    { id: "a1", label: "А1 (594×841 мм)" },
    { id: "a0", label: "А0 (841×1189 мм)" },
    { id: "dl", label: "DL (99×210 мм)" },
    { id: "90x50", label: "90×50 мм (візитка)" },
    { id: "custom", label: "Власний розмір" },
  ],

  // Об'єми стаканчиків
  cupVolumes: [
    { id: "110", label: "110 мл" },
    { id: "175", label: "175 мл" },
    { id: "250", label: "250 мл" },
    { id: "340", label: "340 мл" },
    { id: "400", label: "400 мл" },
  ],

  // Розміри футболок
  tshirtSizes: [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
    { id: "3xl", label: "3XL" },
  ],

  // Кольори футболок
  tshirtColors: [
    { id: "white", label: "Білий", hex: "#FFFFFF" },
    { id: "black", label: "Чорний", hex: "#1A1A1A" },
    { id: "navy", label: "Темно-синій", hex: "#1E3A5F" },
    { id: "red", label: "Червоний", hex: "#E53935" },
    { id: "green", label: "Зелений", hex: "#00A651" },
    { id: "gray", label: "Сірий", hex: "#6B7280" },
  ],

  // Типи нанесення для сувенірів
  printingMethods: [
    { id: "screen", label: "Шовкодрук" },
    { id: "dtf", label: "DTF друк" },
    { id: "embroidery", label: "Вишивка" },
    { id: "sublimation", label: "Сублімація" },
    { id: "tampography", label: "Тамподрук" },
    { id: "engraving", label: "Гравіювання" },
  ],

  // Блоки для квартальних календарів
  calendarBlocks: [
    { id: "1", label: "1 блок" },
    { id: "2", label: "2 блоки" },
    { id: "3", label: "3 блоки" },
  ],

  // Кріплення блокнотів
  notebookBindings: [
    { id: "glue", label: "Клейове" },
    { id: "spring", label: "На пружині" },
    { id: "sewn", label: "Прошите" },
  ],

  // Обкладинки блокнотів
  notebookCovers: [
    { id: "soft", label: "М'яка" },
    { id: "hard", label: "Тверда" },
  ],
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug)
}

export function getRelatedProducts(productSlug: string): Product[] {
  const product = getProductBySlug(productSlug)
  if (!product) return []
  return product.relatedProducts.map((slug) => getProductBySlug(slug)).filter((p): p is Product => p !== undefined)
}

export function getUpsellProducts(productSlug: string): Product[] {
  const product = getProductBySlug(productSlug)
  if (!product) return []
  return product.upsellProducts.map((slug) => getProductBySlug(slug)).filter((p): p is Product => p !== undefined)
}

export function getFrequentlyBoughtTogether(productSlug: string): Product[] {
  const product = products.find((p) => p.slug === productSlug)
  if (!product || !product.frequentlyBoughtTogether) return []

  return product.frequentlyBoughtTogether
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined)
    .slice(0, 4)
}
