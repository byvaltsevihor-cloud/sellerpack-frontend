import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CategoryHeaderBreadcrumbProps {
  category: string
  subcategory: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderBreadcrumb({
  category,
  subcategory,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderBreadcrumbProps) {
  return (
    <header className="w-full">
      <div className="flex flex-col gap-4">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2">
          <a
            href="#"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            {category}
          </a>
          <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
          <span className="font-mono text-xs uppercase tracking-widest text-foreground">{subcategory}</span>
          {badge && (
            <>
              <span className="mx-1 text-muted-foreground/30">·</span>
              <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
                {badge}
              </Badge>
            </>
          )}
        </nav>

        {/* Title section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {title}
          </h1>
          {description && <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>}
        </div>

        {/* Separator with count */}
        <div className="flex items-center gap-4 pt-2">
          <div className="h-px w-12 bg-foreground" />
          <Separator className="flex-1" />
          {typeof itemCount === "number" && (
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {itemCount.toString().padStart(3, "0")}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
