'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { type Locale, type Dictionary } from "@/lib/i18n"

interface ContactFormProps {
  lang?: Locale
  dict?: Dictionary
}

export function ContactForm({ lang = 'uk', dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // TODO: Implement actual email sending
    // For now, just simulate submission
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })

      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Contact Info */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Зв'язатися з Нами</h2>
          <p className="text-gray-600">
            Ми завжди раді відповісти на ваші запитання. Заповніть форму, і наш менеджер
            зв'яжеться з вами найближчим часом.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="bg-[#78be20] p-3 rounded-lg">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Телефон</h3>
              <p className="text-gray-600">+380 (XX) XXX-XX-XX</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#78be20] p-3 rounded-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600">info@sellerpack.com.ua</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#78be20] p-3 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Адреса</h3>
              <p className="text-gray-600">Україна</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Години Роботи</h3>
          <p className="text-gray-600 text-sm">Понеділок - П'ятниця: 9:00 - 18:00</p>
          <p className="text-gray-600 text-sm">Субота - Неділя: Вихідний</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Ім'я <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше ім'я"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Телефон
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+380 (XX) XXX-XX-XX"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Тема Звернення <span className="text-red-500">*</span>
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Запит ціни / Замовлення / Інше"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Повідомлення <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Ваше повідомлення..."
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#78be20] focus:border-transparent"
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-[#78be20] hover:bg-[#6aa81c] text-white font-semibold py-6 text-lg"
          >
            {status === 'sending' ? (
              'Відправляємо...'
            ) : status === 'success' ? (
              '✓ Відправлено!'
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Відправити Повідомлення
              </>
            )}
          </Button>

          {status === 'success' && (
            <p className="text-green-600 text-sm text-center">
              Дякуємо! Ваше повідомлення успішно відправлено.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-sm text-center">
              Помилка відправки. Спробуйте ще раз.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
