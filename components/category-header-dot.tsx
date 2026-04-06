import { Badge } from "@/components/ui/badge"

interface CategoryHeaderDotProps {
  category: string
  subcategory: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderDot({
  category,
  subcategory,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderDotProps) {
  return (
    <header className="w-full">
      <div className="flex flex-col gap-5">
        {/* Category path with dot separator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em]">
            <span className="text-muted-foreground">{category}</span>
            <span className="h-1 w-1 rounded-full bg-foreground" />
            <span className="text-foreground">{subcategory}</span>
            {badge && (
              <>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <Badge className="bg-muted text-muted-foreground font-mono text-[10px] uppercase tracking-wider">
                  {badge}
                </Badge>
              </>
            )}
          </div>
          {typeof itemCount === "number" && (
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              [{itemCount.toString().padStart(3, "0")}]
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
          {title}
        </h1>

        {/* Description with leading line */}
        {description && (
          <div className="flex items-start gap-4">
            <div className="mt-2 h-px w-8 bg-muted-foreground/50" />
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{description}</p>
          </div>
        )}
      </div>
    </header>
  )
}
