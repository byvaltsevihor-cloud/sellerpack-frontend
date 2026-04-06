interface CategoryHeaderTerminalProps {
  category: string
  subcategory?: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderTerminal({
  category,
  subcategory,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderTerminalProps) {
  return (
    <div className="font-mono">
      {/* Terminal-style path */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <span className="text-emerald-500">~</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground">{category.toLowerCase()}</span>
        {subcategory && (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{subcategory.toLowerCase()}</span>
          </>
        )}
        <span className="animate-pulse text-emerald-500">_</span>
      </div>

      {/* Title with prompt */}
      <div className="mb-3 flex items-start gap-3">
        <span className="text-emerald-500">$</span>
        <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">{title}</h1>
      </div>

      {/* Output style description */}
      {description && (
        <div className="mb-4 flex items-start gap-3">
          <span className="text-muted-foreground">&gt;</span>
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}

      {/* Status line */}
      <div className="flex items-center gap-4 border-t border-dashed border-border pt-4 text-xs">
        {itemCount !== undefined && (
          <span className="text-muted-foreground">
            <span className="text-foreground">{itemCount}</span> items
          </span>
        )}
        {badge && (
          <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-500">[{badge.toUpperCase()}]</span>
        )}
      </div>
    </div>
  )
}
