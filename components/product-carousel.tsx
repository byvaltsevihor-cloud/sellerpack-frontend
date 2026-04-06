"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const products = [
  {
    id: "STK-001",
    name: "Наклейки на замовлення",
    price: "від 150 грн",
    stock: 5000,
    colors: ["#FFFFFF", "#000000", "#78be20"],
    image: "/custom-stickers.jpg",
    isNew: true,
  },
  {
    id: "BOX-002",
    name: "Картонна упаковка з логотипом",
    price: "від 25 грн",
    stock: 3200,
    colors: ["#DEB887", "#FFFFFF", "#000000"],
    image: "/branded-boxes.jpg",
    isNew: true,
  },
  {
    id: "TSH-003",
    name: "Футболка з принтом",
    price: "від 180 грн",
    stock: 1500,
    colors: ["#000000", "#FFFFFF", "#78be20", "#FF0000"],
    image: "/branded-tshirt.jpg",
    isNew: true,
  },
  {
    id: "MUG-004",
    name: "Чашки з логотипом",
    price: "від 120 грн",
    stock: 2800,
    colors: ["#FFFFFF", "#000000", "#78be20"],
    image: "/branded-mugs.jpg",
    isNew: true,
  },
  {
    id: "BAG-005",
    name: "Еко-сумки з принтом",
    price: "від 95 грн",
    stock: 4100,
    colors: ["#F5F5DC", "#000000", "#78be20"],
    image: "/eco-bags.jpg",
    isNew: true,
  },
]

export function ProductCarousel() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-light text-slate-900">
            Перегляньте наші <span className="font-bold">новинки</span>
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card className="border-none shadow-none group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4">
                        {product.isNew && (
                          <Badge className="absolute top-3 left-3 bg-[#78be20] hover:bg-[#6aa81c] text-white border-none rounded-md px-2 py-1">
                            Новинка!
                          </Badge>
                        )}
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500 font-medium">{product.id}</div>
                        <h3 className="font-medium text-slate-900 line-clamp-1 group-hover:text-[#78be20] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex gap-1">
                          {product.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="font-bold text-slate-900">{product.price}</div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#78be20]">
                          <div className="w-2 h-2 rounded-full bg-[#78be20]" />
                          <span>В наявності ({product.stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')})</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
