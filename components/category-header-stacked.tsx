import { Badge } from "@/components/ui/badge"

interface CategoryHeaderStackedProps {
  category: string
  subcategory: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderStacked({
  category,
  subcategory,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderStackedProps) {
  return (
    <header className="w-full">
      <div className="flex flex-col gap-6">
        {/* Stacked categories */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">{category}</p>
            <div className="flex items-center gap-3">
              <p className="font-mono text-sm uppercase tracking-widest text-foreground">{subcategory}</p>
              {badge && (
                <Badge className="bg-foreground text-background font-mono text-[10px] uppercase tracking-wider hover:bg-foreground/90">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
          {typeof itemCount === "number" && (
            <div className="text-right">
              <p className="font-mono text-2xl font-light tabular-nums text-muted-foreground/40">
                {itemCount.toString().padStart(3, "0")}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">items</p>
            </div>
          )}
        </div>

        {/* Title with left border accent */}
        <div className="border-l-2 border-foreground pl-6">
          <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl lg:text-4xl">{title}</h1>
          {description && <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>}
        </div>
      </div>
    </header>
  )
}
