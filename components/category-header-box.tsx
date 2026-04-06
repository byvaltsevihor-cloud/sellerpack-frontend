interface CategoryHeaderBoxProps {
  category: string
  subcategory?: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderBox({
  category,
  subcategory,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderBoxProps) {
  return (
    <div className="border border-border">
      {/* Top bar with categories */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
          <span className="text-foreground">{category}</span>
          {subcategory && (
            <>
              <span className="text-muted-foreground">::</span>
              <span className="text-muted-foreground">{subcategory}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          {itemCount !== undefined && <span>n={itemCount}</span>}
          {badge && <span className="rounded-sm bg-foreground px-1.5 py-0.5 text-background">{badge}</span>}
        </div>
      </div>

      {/* Content area */}
      <div className="p-6">
        <h1 className="mb-2 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {description && <p className="text-balance text-muted-foreground">{description}</p>}
      </div>

      {/* Bottom decorative bar */}
      <div className="flex h-1">
        <div className="w-1/4 bg-foreground" />
        <div className="w-3/4 bg-muted" />
      </div>
    </div>
  )
}
