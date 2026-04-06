'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { type Locale } from "@/lib/i18n"

interface NewsletterFormProps {
  lang?: Locale
}

export function NewsletterForm({ lang = 'uk' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // TODO: Replace with actual newsletter API endpoint
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simulate success
      setStatus('success')
      setMessage('Дякуємо! Ви успішно підписались на розсилку.')
      setEmail('')

      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setMessage('Помилка підписки. Спробуйте ще раз.')

      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    }
  }

  return (
    <div className="w-full">
      <p className="text-sm mb-2 font-semibold text-gray-900">Підпишіться на новини</p>

      {status === 'success' && (
        <div className="mb-2 p-2 bg-[#78be20] bg-opacity-10 border border-[#78be20] rounded text-xs text-[#78be20]">
          {message}
        </div>
      )}

      {status === 'error' && (
        <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-600">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#78be20] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            required
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-[#78be20] text-white px-4 py-2 rounded hover:bg-[#6aa81c] transition-colors text-sm font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <span className="animate-spin">⏳</span>
              <span className="hidden sm:inline">Підписка...</span>
            </>
          ) : (
            <>
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Підписатись</span>
              <span className="sm:hidden">OK</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
