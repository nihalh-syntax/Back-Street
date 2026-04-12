import type { ProductSource } from "@/data/productCatalog"

export function productDetailPath(source: ProductSource, productId: string) {
  return `/product/${source}/${encodeURIComponent(productId)}`
}
