import { useEffect, useMemo, useState } from "react"
import { collection, getDocs, query, limit } from "firebase/firestore"

import { db } from "../../firebase/config"
import ProductCard, { type ProductItem } from "./ProductCard"
import { Button } from "./ui/button"
import { NEW_ARRIVALS_FALLBACK } from "@/data/productCatalog"

type FirestoreProduct = {
  name?: string
  imageUrl?: string
  image?: string
  rating?: number
  price?: number
  originalPrice?: number
}

const NewArrivalsSection = () => {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNewArrivals = async () => {
      try {
        const arrivalsQuery = query(collection(db, "newArrivals"), limit(8))
        const snapshot = await getDocs(arrivalsQuery)

        const mapped: ProductItem[] = []

        snapshot.docs.forEach((doc) => {
          const data = doc.data() as FirestoreProduct
          const imageUrl = data.imageUrl ?? data.image
          if (!data.name || !imageUrl || typeof data.price !== "number") {
            return
          }

          mapped.push({
            id: doc.id,
            name: data.name,
            imageUrl,
            rating: typeof data.rating === "number" ? data.rating : 4,
            price: data.price,
            originalPrice:
              typeof data.originalPrice === "number" ? data.originalPrice : undefined,
          })
        })

        setProducts(mapped)
      } catch (error) {
        console.error("Failed to load new arrivals from Firestore", error)
      } finally {
        setLoading(false)
      }
    }

    void loadNewArrivals()
  }, [])

  const displayProducts = useMemo(() => {
    if (products.length > 0) return products.slice(0, 4)
    return NEW_ARRIVALS_FALLBACK
  }, [products])

  return (
    <section className="bg-[#f2f0f1]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
          New Arrivals
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              href={`/product/newArrivals/${encodeURIComponent(product.id)}`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="h-11 rounded-full border-border bg-transparent px-10 text-sm font-medium"
          >
            {loading ? "Loading..." : "View All"}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewArrivalsSection
