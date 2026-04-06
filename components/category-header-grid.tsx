import { Badge } from "@/components/ui/badge"

interface CategoryHeaderGridProps {
  category: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderGrid({ category, title, description, itemCount, badge }: CategoryHeaderGridProps) {
  return (
    <header className="w-full border-b border-border pb-8">
      <div className="grid grid-cols-12 gap-4">
        {/* Left column - metadata */}
        <div className="col-span-12 flex flex-col gap-1 md:col-span-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{category}</span>
          {typeof itemCount === "number" && (
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground/60">
              ({itemCount.toString().padStart(2, "0")})
            </span>
          )}
        </div>

        {/* Right column - content */}
        <div className="col-span-12 md:col-span-9">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-normal tracking-tight text-foreground sm:text-3xl lg:text-4xl">{title}</h1>
            {badge && (
              <Badge variant="outline" className="shrink-0 font-mono text-[10px] uppercase tracking-wider">
                {badge}
              </Badge>
            )}
          </div>
          {description && <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>}
        </div>
      </div>
    </header>
  )
}
