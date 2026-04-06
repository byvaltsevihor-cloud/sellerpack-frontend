import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">Рекламна продукція для вашого бренду</h1>
            <p className="text-xl md:text-2xl text-slate-600 font-light">
              Наклейки, упаковка, корпоративний одяг та сувеніри для B2B
            </p>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-6 text-lg">
              Переглянути каталог
            </Button>
          </div>
          <div className="relative h-[300px] md:h-[400px] w-full">
            {/* Placeholder for the hero image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/promotional-products-tote-bag-and-bottle.jpg"
                alt="Best sellers"
                width={600}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-200 to-transparent -z-0 opacity-50" />
    </section>
  )
}
