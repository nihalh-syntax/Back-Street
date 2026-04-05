import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronRight, Tag, Trash2 } from "lucide-react"

import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const SITE_DISCOUNT_PERCENT = 20
const DELIVERY_FEE = 15

function formatMoney(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

const CartPage = () => {
  const {
    items,
    removeItem,
    setLineQuantity,
    appliedPromo,
    applyPromo,
    clearPromo,
  } = useCart()

  const [promoInput, setPromoInput] = useState("")
  const [promoMessage, setPromoMessage] = useState<string | null>(null)

  const { subtotal, discount20, promoOff, delivery, total } = useMemo(() => {
    const sub = items.reduce((acc, l) => acc + l.unitPrice * l.quantity, 0)
    const d20 = sub * (SITE_DISCOUNT_PERCENT / 100)
    const promo = appliedPromo ? Math.min(appliedPromo.discount, sub - d20) : 0
    const del = items.length > 0 ? DELIVERY_FEE : 0
    const tot = Math.max(0, sub - d20 - promo + del)
    return {
      subtotal: sub,
      discount20: d20,
      promoOff: promo,
      delivery: del,
      total: tot,
    }
  }, [items, appliedPromo])

  const handleApplyPromo = () => {
    setPromoMessage(null)
    if (!promoInput.trim()) {
      setPromoMessage("Enter a code")
      return
    }
    const ok = applyPromo(promoInput)
    if (ok) {
      setPromoMessage(`Applied ${promoInput.trim().toUpperCase()}`)
      setPromoInput("")
    } else {
      setPromoMessage("Invalid code. Try SAVE10 or WELCOME.")
    }
  }

  return (
    <div className="min-h-screen bg-[#f2f0f1] pb-16">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <nav
          className="mb-8 flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="size-4 shrink-0" aria-hidden />
          <span className="text-foreground">Cart</span>
        </nav>

        <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-border bg-background p-10 text-center shadow-sm">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/">Continue shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(280px,380px)] lg:items-start">
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              {items.map((line, index) => (
                <div
                  key={line.lineKey}
                  className={cn(
                    "relative grid gap-4 p-4 sm:grid-cols-[100px_1fr_auto] sm:items-start sm:gap-6 md:p-6",
                    index > 0 && "border-t border-border",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => removeItem(line.lineKey)}
                    className="absolute right-3 top-3 text-red-500 transition-colors hover:text-red-600 sm:right-6 sm:top-6"
                    aria-label={`Remove ${line.name}`}
                  >
                    <Trash2 className="size-5" strokeWidth={1.75} />
                  </button>

                  <div className="overflow-hidden rounded-xl bg-zinc-100 sm:row-span-2">
                    <img
                      src={line.imageUrl}
                      alt=""
                      className="aspect-square w-full object-contain p-2"
                    />
                  </div>

                  <div className="min-w-0 pr-10 sm:pr-0">
                    <h2 className="text-base font-bold text-foreground md:text-lg">
                      {line.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Size: {line.size}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Color: {line.colorLabel}
                    </p>
                    <p className="mt-3 text-xl font-bold tabular-nums">
                      {formatMoney(line.unitPrice)}
                    </p>
                  </div>

                  <div className="flex items-end justify-end sm:col-span-1 sm:row-span-2 sm:flex-col sm:items-end sm:justify-between">
                    <span className="sr-only sm:not-sr-only sm:h-6" />
                    <div className="inline-flex h-10 items-center justify-between gap-4 rounded-full bg-zinc-100 px-3 text-sm font-medium">
                      <button
                        type="button"
                        className="px-1 text-lg leading-none"
                        onClick={() =>
                          setLineQuantity(line.lineKey, line.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-[1.5rem] text-center tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className="px-1 text-lg leading-none"
                        onClick={() =>
                          setLineQuantity(line.lineKey, line.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground">
                  Order Summary
                </h2>

                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="font-semibold tabular-nums">
                      {formatMoney(subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                      Discount (-{SITE_DISCOUNT_PERCENT}%)
                    </dt>
                    <dd className="font-semibold tabular-nums text-red-500">
                      −{formatMoney(discount20)}
                    </dd>
                  </div>
                  {appliedPromo && promoOff > 0 && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">
                        Promo ({appliedPromo.code})
                      </dt>
                      <dd className="font-semibold tabular-nums text-red-500">
                        −{formatMoney(promoOff)}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Delivery Fee</dt>
                    <dd className="font-semibold tabular-nums">
                      {formatMoney(delivery)}
                    </dd>
                  </div>
                </dl>

                <div className="my-6 border-t border-border" />

                <div className="flex justify-between gap-4 text-base">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-xl font-bold tabular-nums">
                    {formatMoney(total)}
                  </span>
                </div>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <Tag
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden
                    />
                    <Input
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Add promo code"
                      className="h-11 rounded-full border-border pl-10 pr-3"
                      aria-label="Promo code"
                    />
                  </div>
                  <Button
                    type="button"
                    className="h-11 shrink-0 rounded-full px-6 font-semibold"
                    onClick={handleApplyPromo}
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <button
                    type="button"
                    onClick={() => {
                      clearPromo()
                      setPromoMessage(null)
                    }}
                    className="mt-2 text-xs text-muted-foreground underline hover:text-foreground"
                  >
                    Remove promo
                  </button>
                )}
                {promoMessage && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {promoMessage}
                  </p>
                )}

                <Button
                  type="button"
                  className="mt-6 h-12 w-full rounded-full text-base font-semibold"
                  size="lg"
                >
                  Go to Checkout
                  <ArrowRight className="ml-2 size-5" strokeWidth={2} />
                </Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
