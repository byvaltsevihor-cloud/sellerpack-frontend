export function StatsSection() {
  return (
    <section className="bg-gray-100 py-12 border-y border-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
        <div className="flex-shrink-0">
          <div className="text-4xl md:text-5xl font-bold text-slate-900">500+</div>
          <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mt-1">Задоволених клієнтів</div>
        </div>
        <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
        <div className="max-w-2xl">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Досвід роботи з B2B компаніями по всій Україні</h3>
          <p className="text-slate-600 leading-relaxed">
            Ми створюємо не просто рекламну продукцію — ми посилюємо ваш бренд. Швидке виробництво, високі тиражі та гарантована якість для вашого бізнесу.
          </p>
        </div>
      </div>
    </section>
  )
}
