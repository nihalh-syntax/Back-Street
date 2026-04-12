import { useMemo } from "react"
import { Link } from "react-router-dom"

import ProductGrid from "./ProductGrid"
import { Button } from "./ui/button"
import { useFirestoreProducts } from "@/hooks/useFirestoreProducts"
import { TOP_SELLING_FALLBACK } from "@/data/productCatalog"

const TopSellingSection = () => {
  const { products } = useFirestoreProducts({
    collectionName: "topSelling",
    maxProducts: 8,
    fallback: TOP_SELLING_FALLBACK,
  })

  const displayProducts = useMemo(() => products.slice(0, 4), [products])

  return (
    <section
      id="top-selling"
      className="scroll-mt-24 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
          Top Selling
        </h2>

        <div className="mt-10">
          <ProductGrid
            products={displayProducts}
            source="topSelling"
            gridClassName="lg:grid-cols-4"
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-border bg-transparent px-10 text-sm font-medium"
          >
            <Link to="/top-selling">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TopSellingSection
