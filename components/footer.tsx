import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-900 py-16 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex flex-col mb-6">
              <span className="text-2xl font-bold tracking-tight text-gray-900">SELLER PACK</span>
              <span className="text-[10px] text-gray-500 -mt-0.5">каталог продукції</span>
            </Link>
            <p className="text-sm text-gray-600">Ваш партнер у сфері поліграфії та рекламної продукції для B2B.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Продукція</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Поліграфія</li>
              <li className="hover:text-gray-900 cursor-pointer">Упаковка</li>
              <li className="hover:text-gray-900 cursor-pointer">Календарі</li>
              <li className="hover:text-gray-900 cursor-pointer">Канцелярія</li>
              <li className="hover:text-gray-900 cursor-pointer">Сувенірна продукція</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Послуги</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Друк 24/7</li>
              <li className="hover:text-gray-900 cursor-pointer">Персоналізація</li>
              <li className="hover:text-gray-900 cursor-pointer">Доставка</li>
              <li className="hover:text-gray-900 cursor-pointer">Контакти</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Інформація</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Про нас</li>
              <li className="hover:text-gray-900 cursor-pointer">Політика конфіденційності</li>
              <li className="hover:text-gray-900 cursor-pointer">Умови співпраці</li>
              <li className="hover:text-gray-900 cursor-pointer">FAQ</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8 text-center text-gray-500 text-sm">
          © 2025 SELLER PACK. Усі права захищені.
        </div>
      </div>
    </footer>
  )
}
