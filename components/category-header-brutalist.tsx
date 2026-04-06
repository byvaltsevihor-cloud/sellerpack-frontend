import { Badge } from "@/components/ui/badge"

interface CategoryHeaderBrutalistProps {
  category: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderBrutalist({
  category,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderBrutalistProps) {
  return (
    <header className="w-full border-2 border-foreground">
      <div className="flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground px-4 py-2 text-background">
          <span className="font-mono text-xs uppercase tracking-[0.2em]">{category}</span>
          <div className="flex items-center gap-3">
            {badge && (
              <Badge variant="outline" className="border-background text-background font-mono text-[10px] uppercase">
                {badge}
              </Badge>
            )}
            {typeof itemCount === "number" && (
              <span className="font-mono text-xs tabular-nums">[{itemCount.toString().padStart(3, "0")}]</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </header>
  )
}
