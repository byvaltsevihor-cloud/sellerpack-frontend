import { Badge } from "@/components/ui/badge"

interface CategoryHeaderNumberedProps {
  category: string
  title: string
  description?: string
  sectionNumber?: number
  badge?: string
}

export function CategoryHeaderNumbered({
  category,
  title,
  description,
  sectionNumber = 1,
  badge,
}: CategoryHeaderNumberedProps) {
  return (
    <header className="w-full">
      <div className="flex gap-6 sm:gap-10">
        {/* Large section number */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-5xl font-light tabular-nums text-muted-foreground/30 sm:text-6xl lg:text-7xl">
            {sectionNumber.toString().padStart(2, "0")}
          </span>
          <div className="mt-2 h-16 w-px bg-border" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{category}</span>
            {badge && (
              <Badge className="bg-foreground text-background font-mono text-[10px] uppercase tracking-wider hover:bg-foreground/90">
                {badge}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl">{title}</h1>
          {description && <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">{description}</p>}
        </div>
      </div>
    </header>
  )
}
