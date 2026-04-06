'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Check } from 'lucide-react'
import { type Locale } from '@/lib/i18n'

interface ProductOrderFormProps {
  productTitle: string
  productSlug: string
  lang?: Locale
}

export function ProductOrderForm({ productTitle, productSlug, lang = 'uk' }: ProductOrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '1',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const t = {
    title: lang === 'uk' ? 'Замовити продукт' : 'Order Product',
    name: lang === 'uk' ? "Ім'я" : 'Name',
    namePlaceholder: lang === 'uk' ? "Ваше ім'я" : 'Your name',
    email: 'Email',
    phone: lang === 'uk' ? 'Телефон' : 'Phone',
    quantity: lang === 'uk' ? 'Кількість' : 'Quantity',
    comment: lang === 'uk' ? "Коментар (необов'язково)" : 'Comment (optional)',
    commentPlaceholder: lang === 'uk' ? 'Додаткова інформація про замовлення...' : 'Additional order information...',
    submit: lang === 'uk' ? 'Замовити' : 'Order',
    submitting: lang === 'uk' ? 'Відправка...' : 'Sending...',
    successTitle: lang === 'uk' ? 'Дякуємо за замовлення!' : 'Thank you for your order!',
    successMessage: lang === 'uk' ? 'Ми отримали ваше замовлення на' : 'We received your order for',
    successNote: lang === 'uk' ? "Наш менеджер зв'яжеться з вами найближчим часом для уточнення деталей." : 'Our manager will contact you shortly to clarify the details.',
    errorMessage: lang === 'uk' ? 'Помилка відправки замовлення. Спробуйте ще раз.' : 'Error sending order. Please try again.',
    privacy: lang === 'uk' ? 'політикою конфіденційності' : 'privacy policy',
    privacyConsent: lang === 'uk' ? 'Натискаючи кнопку "Замовити", ви погоджуєтесь з' : 'By clicking "Order", you agree to the',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // TODO: Replace with actual API endpoint
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate success
      setStatus('success')

      // Reset form after 3 seconds
      setTimeout(() => {
        setStatus('idle')
        setFormData({
          name: '',
          email: '',
          phone: '',
          quantity: '1',
          message: '',
        })
      }, 3000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(t.errorMessage)

      setTimeout(() => {
        setStatus('idle')
        setErrorMessage('')
      }, 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (status === 'success') {
    return (
      <div className="bg-[#78be20] bg-opacity-10 border-2 border-[#78be20] rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#78be20] text-white rounded-full mb-4">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
        <p className="text-gray-600 mb-4">
          {t.successMessage} <span className="font-semibold">{productTitle}</span>.
        </p>
        <p className="text-gray-600 text-sm">
          {t.successNote}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <ShoppingCart className="h-6 w-6 text-[#78be20]" />
        {t.title}
      </h3>

      {status === 'error' && errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t.name} <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.namePlaceholder}
            required
            disabled={status === 'loading'}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t.email} <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
            disabled={status === 'loading'}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            {t.phone} <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+380 (00) 000-00-00"
            required
            disabled={status === 'loading'}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            {t.quantity} <span className="text-red-500">*</span>
          </label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {t.comment}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.commentPlaceholder}
            rows={4}
            disabled={status === 'loading'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#78be20] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#78be20] hover:bg-[#6aa81c] text-white font-semibold py-3 text-lg"
        >
          {status === 'loading' ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              {t.submitting}
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-2" />
              {t.submit}
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          {t.privacyConsent}{' '}
          <a href={`/${lang}/privacy`} className="text-[#78be20] hover:underline">
            {t.privacy}
          </a>
        </p>
      </form>
    </div>
  )
}
