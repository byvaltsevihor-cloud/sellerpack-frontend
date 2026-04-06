"use client"

import { useEffect, useState } from "react"

function RegistrationMark({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="0.5" />
      <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  )
}

function ColorBar({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  const colors = ["bg-[#00FFFF]", "bg-[#FF00FF]", "bg-[#FFFF00]", "bg-white"]
  if (orientation === "vertical") {
    return (
      <div className="flex flex-col gap-0.5">
        {colors.map((c, i) => <div key={i} className={`w-2 h-4 ${c}`} />)}
      </div>
    )
  }
  return (
    <div className="flex gap-0.5">
      {colors.map((c, i) => <div key={i} className={`w-4 h-2 ${c}`} />)}
    </div>
  )
}

function CropCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const isRight = position.includes("r")
  const isBottom = position.includes("b")
  return (
    <div className={`absolute ${isBottom ? "-bottom-5" : "-top-5"} ${isRight ? "-right-5" : "-left-5"}`}>
      <div className={`w-4 h-px bg-white/30 ${isRight ? "ml-auto" : ""}`} />
      <div className={`w-px h-4 bg-white/30 ${isRight ? "ml-auto" : ""}`} />
    </div>
  )
}

const LAUNCH_DATE = new Date("2025-09-01T00:00:00")

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const diff = LAUNCH_DATE.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

export default function ComingSoonPage() {
  const { days, hours, minutes, seconds } = useCountdown()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">

      {/* Top print bar */}
      <div className="border-b border-white/10 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 text-white/30">
          <RegistrationMark size={12} className="text-white/30" />
          <span className="font-mono text-[9px] tracking-widest">SELLERPACK_v1.0 / STATUS_PREPRESS</span>
        </div>
        <div className="flex items-center gap-4 text-white/30">
          <ColorBar orientation="horizontal" />
          <span className="font-mono text-[9px] tracking-widest">CMYK 100%</span>
          <RegistrationMark size={12} className="text-white/30" />
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1">

        {/* Left sidebar */}
        <div className="hidden lg:flex flex-col items-center justify-between py-12 px-4 border-r border-white/10 bg-white/[0.02] w-16 shrink-0">
          <div className="flex flex-col items-center gap-3">
            <RegistrationMark size={14} className="text-white/20" />
            <ColorBar orientation="vertical" />
          </div>
          <div
            className="font-mono text-[9px] tracking-[0.4em] text-white/20 select-none"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            B2B PRINTING PLATFORM / UA
          </div>
          <div className="flex flex-col items-center gap-3">
            <ColorBar orientation="vertical" />
            <RegistrationMark size={14} className="text-white/20" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative">

          {/* Crop marks */}
          <div className="relative w-full max-w-2xl">
            <CropCorner position="tl" />
            <CropCorner position="tr" />
            <CropCorner position="bl" />
            <CropCorner position="br" />

            {/* Print sheet content */}
            <div className="px-8 py-12 lg:px-16 lg:py-16">

              {/* Label row */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-2 bg-[#00A651]" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                  Coming Soon / Незабаром
                </span>
              </div>

              {/* Logo / Brand */}
              <div className="mb-2">
                <span className="font-mono text-[10px] tracking-[0.5em] text-white/30">SELLERPACK™</span>
              </div>
              <h1 className="font-light text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-none mb-6">
                Платформа для<br />
                <span className="text-[#00A651]">B2B друку</span>
              </h1>
              <p className="text-white/50 font-light text-base lg:text-lg max-w-md leading-relaxed mb-12">
                Каталог друкованої та промо-продукції для бізнесу.
                Візитки, банери, стикери, текстиль — запит на ціну без зайвих дзвінків.
              </p>

              {/* Countdown */}
              <div className="border border-white/10 p-6 mb-10">
                <div className="font-mono text-[9px] tracking-[0.3em] text-white/30 mb-4">
                  LAUNCH_DATE / 2025-09-01
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { value: days, label: "ДНІВ" },
                    { value: hours, label: "ГОДИН" },
                    { value: minutes, label: "ХВИЛИН" },
                    { value: seconds, label: "СЕКУНД" },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center border-r border-white/5 last:border-0 pr-4 last:pr-0">
                      <div className="font-mono text-3xl lg:text-4xl font-light tabular-nums">
                        {String(value).padStart(2, "0")}
                      </div>
                      <div className="font-mono text-[8px] tracking-widest text-white/30 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-10">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent border border-white/20 px-4 py-3 font-mono text-sm placeholder-white/20 focus:outline-none focus:border-[#00A651] transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#00A651] text-white font-mono text-xs tracking-widest uppercase hover:bg-[#00913D] transition-colors whitespace-nowrap"
                  >
                    Повідомити мене
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-3 mb-10 border border-[#00A651]/30 px-5 py-4 bg-[#00A651]/5">
                  <div className="w-1.5 h-1.5 bg-[#00A651]" />
                  <span className="font-mono text-xs text-[#00A651] tracking-wider">
                    REGISTERED / Ми повідомимо вас про запуск
                  </span>
                </div>
              )}

              {/* Links / contacts */}
              <div className="flex items-center gap-6 text-white/30">
                <span className="font-mono text-[10px] tracking-wider">sellerpack.ua</span>
                <span className="font-mono text-[10px] text-white/15">·</span>
                <span className="font-mono text-[10px] tracking-wider">info@sellerpack.ua</span>
                <span className="font-mono text-[10px] text-white/15">·</span>
                <span className="font-mono text-[10px] tracking-wider">Telegram</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden xl:flex flex-col items-center justify-between py-12 px-4 border-l border-white/10 bg-white/[0.02] w-16 shrink-0">
          <div className="flex flex-col items-center gap-3">
            <RegistrationMark size={14} className="text-white/20" />
          </div>
          <div
            className="font-mono text-[9px] tracking-[0.4em] text-white/20 select-none"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
          >
            ДРУКОВАНА ПРОДУКЦІЯ / ПРОМО / ТЕКСТИЛЬ
          </div>
          <RegistrationMark size={14} className="text-white/20" />
        </div>
      </div>

      {/* Bottom print bar */}
      <div className="border-t border-white/10 px-6 py-2 flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-widest text-white/20">PAGE_01_v1.0</span>
        <div className="flex items-center gap-2 text-white/15">
          <div className="w-px h-3 bg-white/15" />
          <div className="w-3 h-px bg-white/15" />
          <div className="w-px h-3 bg-white/15" />
        </div>
        <span className="font-mono text-[9px] tracking-widest text-white/20">BLEED: 3mm / © 2025 SELLERPACK</span>
      </div>
    </div>
  )
}
