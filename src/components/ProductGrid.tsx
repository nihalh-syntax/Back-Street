import { cn } from "@/lib/utils"
import { productDetailPath } from "@/lib/productRoutes"
import type { ProductSource } from "@/data/productCatalog"

import ProductCard, { type ProductItem } from "./ProductCard"

type ProductGridProps = {
  products: ProductItem[]
  source: ProductSource
  className?: string
  /** Grid column classes; default responsive 2–4 columns. */
  gridClassName?: string
}

/**
 * Reusable responsive grid of product cards linking to product detail routes.
 */
const ProductGrid = ({
  products,
  source,
  className,
  gridClassName,
}: ProductGridProps) => {
  return (
    <div className={cn(className)}>
      <div
        className={cn(
          "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          gridClassName,
        )}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            href={productDetailPath(source, product.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
