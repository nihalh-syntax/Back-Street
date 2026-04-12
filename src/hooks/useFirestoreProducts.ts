import { useCallback, useEffect, useState } from "react"
import {
  type DocumentData,
  type QuerySnapshot,
  collection,
  getDocs,
  limit,
  query,
} from "firebase/firestore"

import { db } from "../../firebase/config"
import type { ProductItem } from "@/components/ProductCard"
import type { ProductSource } from "@/data/productCatalog"

type FirestoreProductDoc = {
  name?: string
  imageUrl?: string
  image?: string
  rating?: number
  price?: number
  originalPrice?: number
}

export type UseFirestoreProductsOptions = {
  collectionName: ProductSource
  /** Maximum documents to fetch (default 100). */
  maxProducts?: number
  /** Used when Firestore returns no valid products or on error. */
  fallback?: ProductItem[]
}

export type UseFirestoreProductsResult = {
  /** Firestore results, or `fallback` when empty / error. */
  products: ProductItem[]
  /** Raw count from Firestore before fallback merge. */
  remoteCount: number
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

function mapDocs(snapshot: QuerySnapshot<DocumentData>): ProductItem[] {
  const mapped: ProductItem[] = []
  snapshot.docs.forEach((docSnap) => {
    const data = docSnap.data() as FirestoreProductDoc
    const imageUrl = data.imageUrl ?? data.image
    if (!data.name || !imageUrl || typeof data.price !== "number") {
      return
    }
    mapped.push({
      id: docSnap.id,
      name: data.name,
      imageUrl,
      rating: typeof data.rating === "number" ? data.rating : 4,
      price: data.price,
      originalPrice:
        typeof data.originalPrice === "number" ? data.originalPrice : undefined,
    })
  })
  return mapped
}

/**
 * Load product cards from a Firestore collection (`newArrivals` or `topSelling`).
 */
export function useFirestoreProducts(
  options: UseFirestoreProductsOptions,
): UseFirestoreProductsResult {
  const {
    collectionName,
    maxProducts = 100,
    fallback = [],
  } = options

  const [remote, setRemote] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const q = query(collection(db, collectionName), limit(maxProducts))
      const snapshot = await getDocs(q)
      setRemote(mapDocs(snapshot))
    } catch (e) {
      console.error(`Failed to load ${collectionName}`, e)
      setRemote([])
      setError(e instanceof Error ? e : new Error(String(e)))
    } finally {
      setLoading(false)
    }
  }, [collectionName, maxProducts])

  useEffect(() => {
    void fetchProducts()
  }, [fetchProducts])

  const products = remote.length > 0 ? remote : fallback

  return {
    products,
    remoteCount: remote.length,
    loading,
    error,
    refetch: fetchProducts,
  }
}
