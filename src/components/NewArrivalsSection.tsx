import { useEffect, useMemo, useState } from "react"
import { collection, getDocs, query, limit } from "firebase/firestore"

import { db } from "../../firebase/config"
import ProductCard, { type ProductItem } from "./ProductCard"
import { Button } from "./ui/button"

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: "fallback-1",
    name: "T-shirt with Tape Details",
    imageUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80",
    rating: 4.5,
    price: 20,
  },
  {
    id: "fallback-2",
    name: "Skinny Fit Jeans",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80",
    rating: 3.5,
    price: 40,
    originalPrice: 60,
  },
  {
    id: "fallback-3",
    name: "Checkered Shirt",
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80",
    rating: 4.5,
    price: 80,
  },
  {
    id: "fallback-4",
    name: "Sleeve Striped T-shirt",
    imageUrl:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=700&q=80",
    rating: 4.5,
    price: 15,
    originalPrice: 18,
  },
]

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
    return FALLBACK_PRODUCTS
  }, [products])

  return (
    <section className="bg-[#f2f0f1]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
          New Arrivals
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
