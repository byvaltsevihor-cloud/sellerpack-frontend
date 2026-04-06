interface CategoryHeaderSidebarProps {
  category: string
  subcategory?: string
  title: string
  description?: string
  itemCount?: number
  badge?: string
}

export function CategoryHeaderSidebar({
  category,
  subcategory,
  title,
  description,
  itemCount,
  badge,
}: CategoryHeaderSidebarProps) {
  return (
    <div className="flex gap-8">
      {/* Left sidebar with vertical text */}
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-border to-border" />
        <span
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {category}
          {subcategory && ` / ${subcategory}`}
        </span>
        <div className="h-16 w-px bg-gradient-to-b from-border via-border to-transparent" />
      </div>

      {/* Main content */}
      <div className="flex-1 py-4">
        {badge && (
          <span className="mb-4 inline-block rounded border border-border px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {badge}
          </span>
        )}

        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>

        {description && <p className="mb-4 max-w-xl text-balance text-muted-foreground">{description}</p>}

        {itemCount !== undefined && (
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <div className="h-px w-8 bg-border" />
            <span>{itemCount} items</span>
          </div>
        )}
      </div>
    </div>
  )
}
