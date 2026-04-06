import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PrintSheet, RegistrationMark, ColorBar, PrintMetadata, FoldMark } from "@/components/print-marks"

interface Product {
  id: string
  sku: string
  name: string
  image: string
  colors: number
  price: number
  currency: string
  stock: number
  isNew?: boolean
}

interface CategoryPageProps {
  category: string
  subcategory: string
  title: string
  subtitle: string
  description: string[]
  heroImages: string[]
  products: Product[]
  catalogueTitle: string
  catalogueDescription: string[]
  catalogueImage: string
}

export function CategoryPage({
  category,
  subcategory,
  title,
  subtitle,
  description,
  heroImages,
  products,
  catalogueTitle,
  catalogueDescription,
  catalogueImage,
}: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-background py-12">
      {/* Hero Section with Sidebar Style */}
      <section className="relative mx-8 lg:mx-16 mb-16">
        <PrintSheet section="01" className="border border-border">
          <div className="flex">
            {/* Vertical Sidebar with print elements */}
            <div className="hidden lg:flex flex-col items-center py-12 px-4 border-r border-border bg-muted/30 min-h-[600px]">
              <ColorBar orientation="vertical" />

              <div className="flex-1 flex items-center">
                <span
                  className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                  {category} / {subcategory}
                </span>
              </div>

              <RegistrationMark size={20} />

              <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/40 to-transparent mt-4" />

              <div className="mt-4 flex flex-col items-center">
                <PrintMetadata label="SEC" />
                <span className="font-mono text-lg text-foreground/60">01</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 grid lg:grid-cols-2 gap-8 lg:gap-16 p-8 lg:p-16">
              {/* Left: Text Content */}
              <div className="flex flex-col justify-center space-y-6">
                <PrintMetadata label="HERO_CONTENT_BLOCK" className="mb-2" />

                <div className="space-y-4">
                  <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">{subtitle}</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-muted-foreground/40 tracking-tight text-balance">
                    {title}
                  </h1>
                </div>

                <div className="space-y-4 max-w-md">
                  {description.map((text, i) => (
                    <p
                      key={i}
                      className={
                        i === 0 ? "font-medium text-foreground" : "text-muted-foreground text-sm leading-relaxed"
                      }
                    >
                      {text}
                    </p>
                  ))}
                </div>

                <Button className="w-fit group">
                  View full collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Right: Image Grid */}
              <div className="relative">
                <div className="absolute -top-3 -left-3">
                  <RegistrationMark size={12} />
                </div>
                <div className="absolute -top-3 -right-3">
                  <RegistrationMark size={12} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 aspect-[2/1] bg-muted rounded-sm overflow-hidden">
                    <img
                      src={heroImages[0] || "/placeholder.svg"}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-muted rounded-sm overflow-hidden">
                    <img
                      src={heroImages[1] || "/placeholder.svg"}
                      alt="Product 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-muted rounded-sm overflow-hidden">
                    <img
                      src={heroImages[2] || "/placeholder.svg"}
                      alt="Product 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-3 -left-3">
                  <RegistrationMark size={12} />
                </div>
                <div className="absolute -bottom-3 -right-3">
                  <RegistrationMark size={12} />
                </div>
              </div>
            </div>
          </div>
        </PrintSheet>
      </section>

      {/* Products Section */}
      <section className="relative mx-8 lg:mx-16 mb-16">
        <PrintSheet section="02" className="border border-border">
          <div className="flex">
            {/* Vertical Sidebar */}
            <div className="hidden lg:flex flex-col items-center py-12 px-4 border-r border-border bg-muted/30">
              <ColorBar orientation="vertical" />

              <div className="flex-1 flex items-center">
                <span
                  className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                  Novelties
                </span>
              </div>

              <RegistrationMark size={20} />
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-foreground/40 to-transparent mt-4" />

              <div className="mt-4 flex flex-col items-center">
                <PrintMetadata label="SEC" />
                <span className="font-mono text-lg text-foreground/60">02</span>
              </div>
            </div>

            {/* Products Content */}
            <div className="flex-1 p-8 lg:p-16">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <PrintMetadata label="PRODUCT_GRID_CAROUSEL" className="mb-2" />
                  <h2 className="text-2xl md:text-3xl font-light">
                    Explore our <span className="font-semibold">novelties</span>
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <FoldMark />
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-10 w-10 bg-transparent">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 border-primary text-primary bg-transparent"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </div>
        </PrintSheet>
      </section>

      {/* Catalogue Section */}
      <section className="relative mx-8 lg:mx-16">
        <PrintSheet section="03" inverted className="bg-foreground">
          <div className="flex">
            {/* Vertical Sidebar */}
            <div className="hidden lg:flex flex-col items-center py-12 px-4 border-r border-muted/20 min-h-[400px]">
              <ColorBar orientation="vertical" inverted />

              <div className="flex-1 flex items-center">
                <span
                  className="font-mono text-xs tracking-widest text-muted/60 uppercase"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                  Download
                </span>
              </div>

              <RegistrationMark size={20} inverted />
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted/40 to-transparent mt-4" />

              <div className="mt-4 flex flex-col items-center">
                <PrintMetadata label="SEC" inverted />
                <span className="font-mono text-lg text-muted/60">03</span>
              </div>
            </div>

            {/* Catalogue Content */}
            <div className="flex-1">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 p-8 lg:p-16">
                {/* Left: Text */}
                <div className="flex flex-col justify-center space-y-6">
                  <PrintMetadata label="CTA_DOWNLOAD_BLOCK" inverted className="mb-2" />

                  <h2 className="text-3xl md:text-4xl font-light text-background">
                    <span className="font-semibold">{catalogueTitle.split(" ")[0]}</span>{" "}
                    {catalogueTitle.split(" ").slice(1).join(" ")}
                  </h2>

                  <div className="space-y-4">
                    {catalogueDescription.map((text, i) => (
                      <p key={i} className="text-muted text-sm leading-relaxed">
                        {text}
                      </p>
                    ))}
                  </div>

                  <Button variant="secondary" className="w-fit group">
                    Go to catalogue
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {/* Right: Image with print marks */}
                <div className="relative">
                  <div className="absolute -top-3 -left-3">
                    <RegistrationMark size={12} inverted />
                  </div>
                  <div className="absolute -top-3 -right-3">
                    <RegistrationMark size={12} inverted />
                  </div>

                  <div className="aspect-[4/3] bg-muted/10 rounded-sm overflow-hidden">
                    <img
                      src={catalogueImage || "/placeholder.svg"}
                      alt="Catalogue"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute -bottom-3 -left-3">
                    <RegistrationMark size={12} inverted />
                  </div>
                  <div className="absolute -bottom-3 -right-3">
                    <RegistrationMark size={12} inverted />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PrintSheet>
      </section>
    </div>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <div className="group cursor-pointer relative">
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <RegistrationMark size={10} />
      </div>

      {/* Image */}
      <div className="relative aspect-square bg-muted rounded-sm overflow-hidden mb-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-sm">
            New!
          </span>
        )}
        <div className="absolute top-2 right-2 font-mono text-[8px] text-foreground/30">
          ITEM_{String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1">
        <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>
        <h3 className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground">{product.colors} color(s) available</p>
        <p className="font-semibold text-foreground">
          {product.price.toFixed(2)} {product.currency}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs text-primary">In Stock ({product.stock.toLocaleString()})</span>
        </div>
      </div>
    </div>
  )
}
