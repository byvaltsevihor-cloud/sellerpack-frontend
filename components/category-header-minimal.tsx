interface CategoryHeaderMinimalProps {
  category: string
  title: string
  description?: string
  itemCount?: number
}

export function CategoryHeaderMinimal({ category, title, description, itemCount }: CategoryHeaderMinimalProps) {
  return (
    <header className="w-full">
      <div className="flex flex-col gap-6">
        {/* Title with inline category */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h1>
          <span className="font-mono text-sm text-muted-foreground">/ {category}</span>
        </div>

        {/* Description and count row */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          {description && <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>}
          {typeof itemCount === "number" && (
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">{itemCount} results</span>
          )}
        </div>

        {/* Simple line */}
        <div className="h-px w-full bg-border" />
      </div>
    </header>
  )
}
