import { useMemo } from "react"
import { Link } from "react-router-dom"

import ProductGrid from "./ProductGrid"
import { Button } from "./ui/button"
import { useFirestoreProducts } from "@/hooks/useFirestoreProducts"
import { NEW_ARRIVALS_FALLBACK } from "@/data/productCatalog"

const NewArrivalsSection = () => {
  const { products } = useFirestoreProducts({
    collectionName: "newArrivals",
    maxProducts: 8,
    fallback: NEW_ARRIVALS_FALLBACK,
  })

  const displayProducts = useMemo(() => products.slice(0, 4), [products])

  return (
    <section
      id="new-arrivals"
      className="scroll-mt-24 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
          New Arrivals
        </h2>

        <div className="mt-10">
          <ProductGrid
            products={displayProducts}
            source="newArrivals"
            gridClassName="lg:grid-cols-4"
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-border bg-transparent px-10 text-sm font-medium"
          >
            <Link to="/arrivals">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewArrivalsSection
