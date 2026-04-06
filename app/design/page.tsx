import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Palette, FileImage, MessageSquare, CheckCircle, ArrowRight, Upload } from "lucide-react"

export default function DesignPage() {
  const services = [
    {
      icon: FileImage,
      title: "Розробка макетів",
      description: "Створення професійних макетів для друку з урахуванням всіх технічних вимог",
      price: "від 500 ₴",
    },
    {
      icon: Palette,
      title: "Брендинг",
      description: "Розробка фірмового стилю, логотипів та брендбуків для вашого бізнесу",
      price: "від 3000 ₴",
    },
    {
      icon: MessageSquare,
      title: "Консультація",
      description: "Безкоштовна консультація щодо вибору матеріалів та технологій друку",
      price: "Безкоштовно",
    },
  ]

  const process = [
    { step: "01", title: "Заявка", description: "Залиште заявку або надішліть технічне завдання" },
    { step: "02", title: "Обговорення", description: "Уточнюємо деталі та пропонуємо рішення" },
    { step: "03", title: "Розробка", description: "Створюємо макет та надсилаємо на погодження" },
    { step: "04", title: "Результат", description: "Після затвердження передаємо готові файли" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Професійний <span className="text-[#00A651]">дизайн</span> для вашого бізнесу
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Створюємо ефективні дизайн-рішення для друкованої продукції, упаковки та рекламних матеріалів. Від ідеї до
              готового макету за 24-48 годин.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#00A651] hover:bg-[#00913D] text-white px-6 py-3 gap-2">
                Замовити дизайн
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="border-gray-300 px-6 py-3 gap-2 bg-transparent">
                <Upload className="w-4 h-4" />
                Завантажити ТЗ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Наші послуги</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#00A651]/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-[#00A651]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <p className="text-[#00A651] font-semibold">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Як ми працюємо</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-bold text-[#00A651]/20 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                {index < process.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-3 w-6 h-6 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#00A651] rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Вимоги до файлів</h2>
                <p className="text-white/80 mb-6">
                  Для якісного друку важливо правильно підготувати макет. Ми допоможемо з адаптацією.
                </p>
                <ul className="space-y-3">
                  {[
                    "Формат: PDF, AI, EPS, CDR, PSD",
                    "Роздільна здатність: 300 dpi",
                    "Колірний простір: CMYK",
                    "Вильоти: 3 мм з кожного боку",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-white/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Завантажте файл для перевірки</h3>
                <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                  <Upload className="w-10 h-10 mx-auto mb-3 text-white/60" />
                  <p className="text-sm text-white/80">Перетягніть файл сюди або натисніть для вибору</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
