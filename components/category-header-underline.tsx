interface CategoryHeaderUnderlineProps {
  category: string
  subcategory?: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderUnderline({
  category,
  subcategory,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderUnderlineProps) {
  return (
    <div>
      {/* Category row with underline accent */}
      <div className="mb-6 inline-flex flex-col">
        <div className="flex items-center gap-2 pb-2">
          <span className="font-mono text-sm uppercase tracking-widest text-foreground">{category}</span>
          {subcategory && (
            <>
              <span className="text-muted-foreground">—</span>
              <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">{subcategory}</span>
            </>
          )}
        </div>
        <div className="h-0.5 w-full bg-foreground" />
      </div>

      {/* Title and badge */}
      <div className="mb-3 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">{title}</h1>
        {badge && (
          <span className="mt-2 shrink-0 border-b-2 border-foreground pb-1 font-mono text-xs uppercase tracking-wider text-foreground">
            {badge}
          </span>
        )}
      </div>

      {/* Description and count */}
      <div className="flex items-end justify-between gap-8">
        {description && <p className="max-w-lg text-balance text-muted-foreground">{description}</p>}
        {itemCount !== undefined && (
          <span className="shrink-0 font-mono text-4xl font-light tabular-nums text-muted-foreground/50">
            {String(itemCount).padStart(3, "0")}
          </span>
        )}
      </div>
    </div>
  )
}
