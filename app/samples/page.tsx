import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Package, Clock, Truck, CheckCircle, ArrowRight, FileText } from "lucide-react"

export default function SamplesPage() {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Оцінка якості",
      description: "Переконайтеся в якості друку та матеріалів перед замовленням тиражу",
    },
    {
      icon: Package,
      title: "Точна відповідність",
      description: "Зразок повністю відповідає майбутньому тиражу",
    },
    {
      icon: Clock,
      title: "Швидке виготовлення",
      description: "Зразки готові протягом 1-3 робочих днів",
    },
    {
      icon: Truck,
      title: "Доставка по Україні",
      description: "Відправляємо зразки Новою Поштою або кур'єром",
    },
  ]

  const pricing = [
    { type: "Візитки", price: "150 ₴", time: "1-2 дні" },
    { type: "Флаєри / Листівки", price: "200 ₴", time: "1-2 дні" },
    { type: "Буклети", price: "350 ₴", time: "2-3 дні" },
    { type: "Каталоги / Брошури", price: "500 ₴", time: "3-5 днів" },
    { type: "Пакування", price: "від 300 ₴", time: "3-5 днів" },
    { type: "Текстиль", price: "від 250 ₴", time: "2-3 дні" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Виготовлення <span className="text-[#00A651]">зразків</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Замовте пробний примірник перед друком тиражу. Оцініть якість друку, кольори та матеріали на реальному
              зразку вашої продукції.
            </p>
            <Button className="bg-[#00A651] hover:bg-[#00913D] text-white px-6 py-3 gap-2">
              Замовити зразок
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Переваги замовлення зразків</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="w-14 h-14 bg-[#00A651]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-[#00A651]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Вартість виготовлення зразків</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Тип продукції</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Вартість</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Термін</th>
                  <th className="py-4 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pricing.map((item) => (
                  <tr key={item.type} className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{item.type}</td>
                    <td className="py-4 px-6 text-[#00A651] font-semibold">{item.price}</td>
                    <td className="py-4 px-6 text-gray-600">{item.time}</td>
                    <td className="py-4 px-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#00A651] text-[#00A651] hover:bg-[#00A651] hover:text-white bg-transparent"
                      >
                        Замовити
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Вартість зразка зараховується у вартість тиражу при замовленні від 1000 шт.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-[#00A651]" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Потрібна консультація?</h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Наші менеджери допоможуть підібрати оптимальний варіант зразка та розрахувати вартість тиражу
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-[#00A651] hover:bg-[#00913D] text-white px-6 py-3">Зателефонувати</Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-6 py-3 bg-transparent"
              >
                Написати в чат
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
