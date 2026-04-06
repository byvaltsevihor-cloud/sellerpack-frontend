import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CategoryHeaderProps {
  category: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeader({ category, title, description, itemCount, badge }: CategoryHeaderProps) {
  return (
    <header className="w-full">
      <div className="flex flex-col gap-4">
        {/* Top meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{category}</span>
            {badge && (
              <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
                {badge}
              </Badge>
            )}
          </div>
          {typeof itemCount === "number" && (
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {itemCount.toString().padStart(3, "0")} items
            </span>
          )}
        </div>

        {/* Title section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {title}
          </h1>
          {description && <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>}
        </div>

        {/* Separator with accent */}
        <div className="flex items-center gap-4 pt-2">
          <div className="h-px w-12 bg-foreground" />
          <Separator className="flex-1" />
        </div>
      </div>
    </header>
  )
}
