"use client"

import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { type Locale, type Dictionary } from "@/lib/i18n"

interface CtaSectionProps {
  lang?: Locale
  dict?: Dictionary
}

export function CtaSection({ lang = 'uk', dict }: CtaSectionProps) {
  return (
    <section className="relative mb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-foreground rounded-2xl p-8 lg:p-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4">
                {lang === 'uk' ? 'Готові ' : 'Ready to '}
                <span className="text-primary">{lang === 'uk' ? 'розпочати?' : 'start?'}</span>
              </h2>

              <p className="text-muted text-lg leading-relaxed max-w-xl mx-auto">
                {lang === 'uk'
                  ? 'Отримайте безкоштовну консультацію та індивідуальний розрахунок вартості замовлення'
                  : 'Get a free consultation and individual cost calculation for your order'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href={`/${lang}/contact`}>
                <Button variant="secondary" size="lg" className="group w-full sm:w-auto">
                  {lang === 'uk' ? 'Замовити консультацію' : 'Request Consultation'}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href={`/${lang}/products`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="group w-full sm:w-auto border-muted/40 text-background hover:bg-muted/10 hover:text-background"
                >
                  {lang === 'uk' ? 'Переглянути продукти' : 'View Products'}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-muted/20 mb-8" />

            {/* Contact Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Phone */}
              <a
                href="tel:+380000000000"
                className="group flex items-center gap-4 p-4 border border-muted/20 rounded-lg hover:border-muted/40 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-muted/40 rounded-lg">
                  <Phone className="h-5 w-5 text-muted" />
                </div>
                <div>
                  <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">
                    {lang === 'uk' ? 'Телефон' : 'Phone'}
                  </p>
                  <span className="text-background font-medium">+380 (00) 000-00-00</span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@sellerpack.com.ua"
                className="group flex items-center gap-4 p-4 border border-muted/20 rounded-lg hover:border-muted/40 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-muted/40 rounded-lg">
                  <Mail className="h-5 w-5 text-muted" />
                </div>
                <div>
                  <p className="text-xs text-muted/60 uppercase tracking-wider mb-1">
                    {lang === 'uk' ? 'Email' : 'Email'}
                  </p>
                  <span className="text-background font-medium">info@sellerpack.com.ua</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
