import type React from "react"
// Registration marks, crop marks, color bars for print-style design
export function CropMarks({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      {/* Top-left crop mark */}
      <div className="absolute -top-4 -left-4">
        <div className="w-4 h-px bg-foreground/40" />
        <div className="w-px h-4 bg-foreground/40" />
      </div>
      {/* Top-right crop mark */}
      <div className="absolute -top-4 -right-4">
        <div className="w-4 h-px bg-foreground/40 ml-auto" />
        <div className="w-px h-4 bg-foreground/40 ml-auto" />
      </div>
      {/* Bottom-left crop mark */}
      <div className="absolute -bottom-4 -left-4">
        <div className="w-px h-4 bg-foreground/40" />
        <div className="w-4 h-px bg-foreground/40" />
      </div>
      {/* Bottom-right crop mark */}
      <div className="absolute -bottom-4 -right-4">
        <div className="w-px h-4 bg-foreground/40 ml-auto" />
        <div className="w-4 h-px bg-foreground/40 ml-auto" />
      </div>
    </div>
  )
}

export function RegistrationMark({
  className = "",
  size = 16,
  inverted = false,
}: { className?: string; size?: number; inverted?: boolean }) {
  const color = inverted ? "stroke-muted/40" : "stroke-foreground/40"
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      {/* Crosshair */}
      <line x1="8" y1="0" x2="8" y2="16" className={color} strokeWidth="0.5" />
      <line x1="0" y1="8" x2="16" y2="8" className={color} strokeWidth="0.5" />
      {/* Circle */}
      <circle cx="8" cy="8" r="4" className={color} strokeWidth="0.5" fill="none" />
      {/* Center dot */}
      <circle cx="8" cy="8" r="1" className={inverted ? "fill-muted/40" : "fill-foreground/40"} />
    </svg>
  )
}

export function ColorBar({
  orientation = "horizontal",
  inverted = false,
}: { orientation?: "horizontal" | "vertical"; inverted?: boolean }) {
  // Fallback for magenta
  const colorClasses = [
    "bg-[#00FFFF]", // Cyan
    "bg-[#FF00FF]", // Magenta
    "bg-[#FFFF00]", // Yellow
    inverted ? "bg-muted" : "bg-foreground", // Black/Key
  ]

  if (orientation === "vertical") {
    return (
      <div className="flex flex-col gap-0.5">
        {colorClasses.map((color, i) => (
          <div key={i} className={`w-2 h-3 ${color}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-0.5">
      {colorClasses.map((color, i) => (
        <div key={i} className={`w-3 h-2 ${color}`} />
      ))}
    </div>
  )
}

export function PrintMetadata({
  label,
  inverted = false,
  className = "",
}: {
  label: string
  inverted?: boolean
  className?: string
}) {
  return (
    <div
      className={`font-mono text-[9px] tracking-wider ${inverted ? "text-muted/50" : "text-foreground/30"} ${className}`}
    >
      {label}
    </div>
  )
}

export function FoldMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className={`w-px h-2 ${inverted ? "bg-muted/40" : "bg-foreground/40"}`} />
      <div className={`w-2 h-px ${inverted ? "bg-muted/40" : "bg-foreground/40"}`} />
      <div className={`w-px h-2 ${inverted ? "bg-muted/40" : "bg-foreground/40"}`} />
    </div>
  )
}

export function PrintSheet({
  children,
  section,
  inverted = false,
  className = "",
}: {
  children: React.ReactNode
  section: string
  inverted?: boolean
  className?: string
}) {
  return (
    <div className={`relative overflow-visible ${className}`}>
      {/* Top print info bar */}
      <div
        className={`absolute -top-8 left-0 right-0 flex items-center justify-between px-4 ${inverted ? "text-muted/40" : "text-foreground/30"}`}
      >
        <div className="flex items-center gap-4">
          <RegistrationMark size={12} inverted={inverted} />
          <PrintMetadata label={`SECTION_${section}`} inverted={inverted} />
        </div>
        <div className="flex items-center gap-4">
          <ColorBar inverted={inverted} />
          <PrintMetadata label="CMYK 100%" inverted={inverted} />
          <RegistrationMark size={12} inverted={inverted} />
        </div>
      </div>

      {/* Crop marks */}
      <CropMarks className={inverted ? "[&_div]:bg-muted/40" : ""} />

      {/* Side registration marks */}
      <div className="absolute top-1/2 -left-6 -translate-y-1/2">
        <RegistrationMark size={14} inverted={inverted} />
      </div>
      <div className="absolute top-1/2 -right-6 -translate-y-1/2">
        <RegistrationMark size={14} inverted={inverted} />
      </div>

      {/* Content */}
      {children}

      {/* Bottom print info */}
      <div
        className={`absolute -bottom-8 left-0 right-0 flex items-center justify-between px-4 ${inverted ? "text-muted/40" : "text-foreground/30"}`}
      >
        <PrintMetadata label={`PAGE_${section}_v1.0`} inverted={inverted} />
        <FoldMark inverted={inverted} />
        <PrintMetadata label="BLEED: 3mm" inverted={inverted} />
      </div>
    </div>
  )
}
