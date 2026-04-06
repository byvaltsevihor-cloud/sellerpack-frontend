import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface CategoryHeaderSplitProps {
  category: string
  subcategory: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderSplit({
  category,
  subcategory,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderSplitProps) {
  return (
    <header className="w-full">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left: Category hierarchy */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
            <span className="text-muted-foreground">{category}</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
            <span className="text-foreground">{subcategory}</span>
          </div>

          {typeof itemCount === "number" && (
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-mono text-4xl font-light tabular-nums text-muted-foreground/30">{itemCount}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">total</span>
            </div>
          )}
        </div>

        {/* Right: Title and description */}
        <div className="lg:col-span-8">
          <div className="flex items-start gap-3">
            <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">{title}</h1>
            {badge && (
              <Badge variant="outline" className="mt-1 font-mono text-[10px] uppercase tracking-wider">
                {badge}
              </Badge>
            )}
          </div>
          {description && (
            <p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="mt-8 h-px w-full bg-border" />
    </header>
  )
}
