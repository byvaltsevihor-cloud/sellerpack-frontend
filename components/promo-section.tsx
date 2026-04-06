import { Button } from "@/components/ui/button"
import Image from "next/image"

export function PromoSection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
            <div className="relative z-10 max-w-md space-y-4">
              <div className="text-sm font-medium uppercase tracking-wider opacity-90">
                Персоналізація під ваш бренд
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Наклейки та етикетки</h2>
              <p className="text-lg opacity-90">
                Високоякісні наклейки будь-якої форми та розміру. Від дизайну до друку.
              </p>
              <Button variant="secondary" className="rounded-full px-6 mt-4 bg-white text-slate-900 hover:bg-gray-100">
                Детальніше
              </Button>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 md:opacity-100 md:w-[40%]">
              <Image
                src="/badge-reel-product.jpg"
                alt="Badge reel"
                width={300}
                height={400}
                className="object-cover h-full w-full mix-blend-overlay md:mix-blend-normal"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#78be20] to-[#5a9016] text-white p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
            <div className="relative z-10 max-w-md space-y-4">
              <div className="text-sm font-medium uppercase tracking-wider opacity-90">Підвищте впізнаваність бренду</div>
              <h2 className="text-3xl md:text-4xl font-bold">Корпоративний одяг</h2>
              <p className="text-lg opacity-90">
                Футболки, поло, худі з вашим логотипом. Якісна продукція для команди та клієнтів.
              </p>
              <Button variant="secondary" className="rounded-full px-6 mt-4 bg-white text-[#78be20] hover:bg-gray-100">
                Дивитись колекцію
              </Button>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 md:opacity-100 md:w-[40%]">
              <Image
                src="/stylish-apparel-hoodies.jpg"
                alt="Apparel"
                width={300}
                height={400}
                className="object-cover h-full w-full mix-blend-overlay md:mix-blend-normal"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
