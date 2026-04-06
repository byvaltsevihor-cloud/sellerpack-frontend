import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react"

export default function ContactsPage() {
  const contacts = [
    {
      icon: Phone,
      title: "Телефон",
      value: "+380 (44) 123-45-67",
      description: "Пн-Пт: 9:00 - 18:00",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@sellerpack.ua",
      description: "Відповідаємо протягом 2 годин",
    },
    {
      icon: MapPin,
      title: "Адреса",
      value: "м. Київ, вул. Хрещатик, 1",
      description: "Офіс 301, 3 поверх",
    },
    {
      icon: Clock,
      title: "Графік роботи",
      value: "Пн-Пт: 9:00 - 18:00",
      description: "Сб-Нд: вихідний",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Зв'яжіться з <span className="text-[#00A651]">нами</span>
            </h1>
            <p className="text-lg text-gray-600">
              Маєте питання або готові зробити замовлення? Наша команда завжди готова допомогти.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Контактна інформація</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {contacts.map((contact) => (
                  <div key={contact.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-[#00A651]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <contact.icon className="w-6 h-6 text-[#00A651]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{contact.title}</p>
                      <p className="font-semibold text-gray-900">{contact.value}</p>
                      <p className="text-sm text-gray-600">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-10">
                <h3 className="font-semibold text-gray-900 mb-4">Ми в соцмережах</h3>
                <div className="flex gap-3">
                  {["Facebook", "Instagram", "Telegram", "LinkedIn"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#00A651] hover:text-white transition-colors"
                    >
                      <span className="text-xs font-medium">{social[0]}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-10 bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-10 h-10 mx-auto mb-2" />
                  <p>Карта</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Напишіть нам</h2>
                <p className="text-gray-600 mb-8">Заповніть форму і ми зв'яжемося з вами найближчим часом</p>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ім'я *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651]"
                        placeholder="Ваше ім'я"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651]"
                        placeholder="+380"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651]"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тема звернення</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] bg-white">
                      <option>Оберіть тему</option>
                      <option>Замовлення продукції</option>
                      <option>Розрахунок вартості</option>
                      <option>Дизайн та макети</option>
                      <option>Доставка</option>
                      <option>Інше</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Повідомлення *</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651] resize-none"
                      placeholder="Опишіть ваш запит..."
                    />
                  </div>

                  <Button className="w-full bg-[#00A651] hover:bg-[#00913D] text-white py-3 gap-2">
                    <Send className="w-4 h-4" />
                    Надіслати повідомлення
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 flex items-center gap-4">
              <div className="w-14 h-14 bg-[#00A651] rounded-xl flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Онлайн-чат</h3>
                <p className="text-sm text-gray-600">Отримайте відповідь за 5 хвилин</p>
              </div>
              <Button variant="outline" className="ml-auto border-[#00A651] text-[#00A651] bg-transparent">
                Відкрити чат
              </Button>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Зворотній дзвінок</h3>
                <p className="text-sm text-gray-600">Передзвонимо за 15 хвилин</p>
              </div>
              <Button variant="outline" className="ml-auto bg-transparent">
                Замовити дзвінок
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
