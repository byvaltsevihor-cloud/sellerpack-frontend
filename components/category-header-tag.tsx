interface CategoryHeaderTagProps {
  category: string
  subcategory?: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderTag({
  category,
  subcategory,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderTagProps) {
  return (
    <div>
      {/* Tag-style categories */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-foreground bg-foreground px-3 py-1 font-mono text-xs uppercase tracking-wider text-background">
          {category}
        </span>
        {subcategory && (
          <span className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {subcategory}
          </span>
        )}
        {badge && (
          <span className="rounded-full border border-dashed border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {badge}
          </span>
        )}
      </div>

      {/* Clean title */}
      <h1 className="mb-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>

      {/* Description with count */}
      <div className="flex items-baseline gap-4">
        {description && <p className="text-balance text-muted-foreground">{description}</p>}
        {itemCount !== undefined && (
          <span className="shrink-0 font-mono text-sm text-muted-foreground">({itemCount})</span>
        )}
      </div>
    </div>
  )
}
