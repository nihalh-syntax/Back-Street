import { useEffect, useMemo, useState } from "react"
import { collection, getDocs, limit, query } from "firebase/firestore"

import { db } from "../../firebase/config"
import ProductCard, { type ProductItem } from "./ProductCard"
import { Button } from "./ui/button"

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: "top-fallback-1",
    name: "Vertical Striped Shirt",
    imageUrl:
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&w=700&q=80",
    rating: 5.0,
    price: 100,
    originalPrice: 140,
  },
  {
    id: "top-fallback-2",
    name: "Courage Graphic T-shirt",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    rating: 4.0,
    price: 45,
  },
  {
    id: "top-fallback-3",
    name: "Loose Fit Bermuda Shorts",
    imageUrl:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80",
    rating: 3.0,
    price: 60,
  },
  {
    id: "top-fallback-4",
    name: "Faded Skinny Jeans",
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
    rating: 4.5,
    price: 75,
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

const TopSellingSection = () => {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTopSelling = async () => {
      try {
        const topSellingQuery = query(collection(db, "topSelling"), limit(8))
        const snapshot = await getDocs(topSellingQuery)

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
        console.error("Failed to load top selling products from Firestore", error)
      } finally {
        setLoading(false)
      }
    }

    void loadTopSelling()
  }, [])

  const displayProducts = useMemo(() => {
    if (products.length > 0) return products.slice(0, 4)
    return FALLBACK_PRODUCTS
  }, [products])

  return (
    <section className="bg-[#f2f0f1]">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
          Top Selling
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

export default TopSellingSection
