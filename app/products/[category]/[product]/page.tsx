"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star, Download, Mail, Bookmark, Copy, Check, ShoppingCart } from "lucide-react"

// Mock data - в реальності з БД
const productData = {
  slug: "business-card-90x50",
  name_uk: "Візитки 90×50 мм",
  category: "polygraphy",
  description: "Друк візитівок на щільному папері з можливістю ламінації та заокруглення кутів",
  rating: 4.8,
  reviewsCount: 127,
  image: "/business-cards-premium-printing.jpg",
}

const quantities = [100, 250, 500, 1000, 2500, 5000]

const paperTypes = [
  { id: "coated_gloss_350", label: "Крейда глянцева 350 г/м²" },
  { id: "coated_gloss_300", label: "Крейда глянцева 300 г/м²" },
  { id: "coated_matte_350", label: "Крейда матова 350 г/м²" },
  { id: "designer", label: "Дизайнерський папір" },
]

const printSides = [
  { id: "4+4", label: "4+4 кольоровий двосторонній" },
  { id: "4+0", label: "4+0 односторонній" },
  { id: "4+1", label: "4+1 кольоровий + чорний" },
]

const laminations = [
  { id: "none", label: "Без ламінації" },
  { id: "gloss_one", label: "Глянцева (1 бік)" },
  { id: "gloss_both", label: "Глянцева (2 боки)" },
  { id: "matte_one", label: "Матова (1 бік)" },
  { id: "matte_both", label: "Матова (2 боки)" },
  { id: "soft_touch", label: "Soft Touch" },
]

const corners = [
  { id: "straight", label: "Прямі" },
  { id: "rounded", label: "Заокруглені" },
]

const calculatePrice = (quantity: number) => {
  const basePrice = quantity * 2.5
  return {
    total: Math.round(basePrice),
    perUnit: +(basePrice / quantity).toFixed(2),
    productionDays: 5,
  }
}

export default function ProductPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState<"calculator" | "specs" | "faq">("calculator")
  const [quantity, setQuantity] = useState(500)
  const [customQuantity, setCustomQuantity] = useState("")
  const [paperType, setPaperType] = useState("coated_gloss_350")
  const [printSide, setPrintSide] = useState("4+4")
  const [lamination, setLamination] = useState("matte_both")
  const [corner, setCorner] = useState("straight")
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const price = calculatePrice(quantity)

  const handleQuantitySelect = (q: number) => {
    setQuantity(q)
    setCustomQuantity("")
  }

  const handleCustomQuantity = (value: string) => {
    setCustomQuantity(value)
    const num = Number.parseInt(value)
    if (num > 0) {
      setQuantity(num)
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-[#00A651]">
              Головна
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href="/products" className="hover:text-[#00A651]">
              Продукція
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href="/products/polygraphy" className="hover:text-[#00A651]">
              Поліграфія
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{productData.name_uk}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Product Image */}
            <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
              <img
                src={productData.image || "/placeholder.svg"}
                alt={productData.name_uk}
                className="max-w-full max-h-80 object-contain"
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{productData.name_uk}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(productData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {productData.rating} ({productData.reviewsCount} відгуків)
                </span>
              </div>

              <p className="text-gray-600 mb-6">{productData.description}</p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-[#00A651]">{price.total.toLocaleString()} ₴</span>
                  <span className="text-sm text-gray-500">/ {quantity} шт.</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {price.perUnit} ₴ за одиницю • Термін виготовлення: {price.productionDays} днів
                </p>
                <Button className="w-full bg-[#00A651] hover:bg-[#00913D] text-white gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Додати до кошика
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            {[
              { id: "calculator", label: "Калькулятор" },
              { id: "specs", label: "Характеристики" },
              { id: "faq", label: "FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-[#00A651] text-[#00A651]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "calculator" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configurator */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Конфігуратор</h2>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Тираж:</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {quantities.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuantitySelect(q)}
                        className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                          quantity === q && !customQuantity
                            ? "bg-[#00A651] text-white border-[#00A651]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-[#00A651]"
                        }`}
                      >
                        {q.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={customQuantity}
                    onChange={(e) => handleCustomQuantity(e.target.value)}
                    placeholder="Інший тираж..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#00A651]"
                  />
                </div>

                {/* Paper Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Папір:</label>
                  <select
                    value={paperType}
                    onChange={(e) => setPaperType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#00A651] bg-white"
                  >
                    {paperTypes.map((pt) => (
                      <option key={pt.id} value={pt.id}>
                        {pt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Print Sides */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Друк:</label>
                  <div className="space-y-2">
                    {printSides.map((ps) => (
                      <label key={ps.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="printSide"
                          value={ps.id}
                          checked={printSide === ps.id}
                          onChange={(e) => setPrintSide(e.target.value)}
                          className="w-4 h-4 text-[#00A651] border-gray-300 focus:ring-[#00A651]"
                        />
                        <span className="text-sm text-gray-700">{ps.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Lamination */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ламінація:</label>
                  <select
                    value={lamination}
                    onChange={(e) => setLamination(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#00A651] bg-white"
                  >
                    {laminations.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Corners */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Кути:</label>
                  <div className="flex gap-4">
                    {corners.map((c) => (
                      <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="corner"
                          value={c.id}
                          checked={corner === c.id}
                          onChange={(e) => setCorner(e.target.value)}
                          className="w-4 h-4 text-[#00A651] border-gray-300 focus:ring-[#00A651]"
                        />
                        <span className="text-sm text-gray-700">{c.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ваше замовлення</h3>

                {/* Order Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Тираж:</span>
                    <span className="font-medium text-gray-900">{quantity.toLocaleString()} шт.</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Папір:</span>
                    <span className="font-medium text-gray-900">
                      {paperTypes.find((p) => p.id === paperType)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Друк:</span>
                    <span className="font-medium text-gray-900">
                      {printSides.find((p) => p.id === printSide)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ламінація:</span>
                    <span className="font-medium text-gray-900">
                      {laminations.find((l) => l.id === lamination)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Кути:</span>
                    <span className="font-medium text-gray-900">{corners.find((c) => c.id === corner)?.label}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm text-gray-600">Вартість:</span>
                    <span className="text-2xl font-bold text-[#00A651]">{price.total.toLocaleString()} ₴</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Ціна за одиницю:</span>
                    <span>{price.perUnit} ₴</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Термін виготовлення:</span>
                    <span>{price.productionDays} днів</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-[#00A651] hover:bg-[#00913D] text-white gap-2 mb-4">
                  <ShoppingCart className="w-5 h-5" />
                  Додати до кошика
                </Button>

                {/* B2B Tools */}
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="gap-1 text-xs bg-transparent">
                    <Download className="w-3 h-3" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-xs bg-transparent">
                    <Mail className="w-3 h-3" />
                    КП
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-1 text-xs ${saved ? "text-[#00A651] border-[#00A651]" : ""}`}
                    onClick={handleSave}
                  >
                    {saved ? <Check className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                    {saved ? "Збережено" : "Зберегти"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`gap-1 text-xs ${copied ? "text-[#00A651] border-[#00A651]" : ""}`}
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Скопійовано" : "Копіювати"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Характеристики</h2>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {[
                    { label: "Розмір", value: "90 × 50 мм" },
                    { label: "Матеріал", value: "Крейдований картон" },
                    { label: "Щільність", value: "300-350 г/м²" },
                    { label: "Друк", value: "Офсетний / Цифровий" },
                    { label: "Мінімальний тираж", value: "100 шт." },
                    { label: "Термін виготовлення", value: "3-7 робочих днів" },
                  ].map((spec, index) => (
                    <tr key={spec.label} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-3 px-4 text-sm text-gray-600">{spec.label}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Часті запитання</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Який мінімальний тираж візиток?",
                  a: "Мінімальний тираж становить 100 штук. Для більших тиражів діють знижки.",
                },
                {
                  q: "Скільки часу займає виготовлення?",
                  a: "Стандартний термін виготовлення — 5-7 робочих днів. Можливе термінове виготовлення за 2-3 дні за додаткову плату.",
                },
                {
                  q: "Чи можна замовити пробний друк?",
                  a: "Так, ми пропонуємо друк пробного екземпляра для узгодження кольорів та якості.",
                },
                {
                  q: "Які формати файлів приймаються?",
                  a: "Ми приймаємо файли у форматах PDF, AI, EPS, PSD з роздільністю не менше 300 dpi.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
