import path from "node:path"
import { fileURLToPath } from "node:url"

import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import Stripe from "stripe"

import {
  computeOrderTotal,
  type OrderItemForTotal,
} from "../src/lib/orderTotals.ts"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.resolve(__dirname, "../.env.local") })
dotenv.config({ path: path.resolve(__dirname, "../.env") })
dotenv.config({ path: path.resolve(__dirname, "../src/.env.local") })

const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173"
const port = Number(process.env.CHECKOUT_API_PORT) || 4242

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

const app = express()
app.use(
  cors({
    origin: [
      clientOrigin,
      /^http:\/\/127\.0\.0\.1:\d+$/,
      /^http:\/\/localhost:\d+$/,
    ],
    credentials: true,
  }),
)
app.use(express.json({ limit: "256kb" }))

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    if (!stripe) {
      res.status(500).json({
        error: "Stripe is not configured (missing STRIPE_SECRET_KEY).",
      })
      return
    }

    const body = req.body as {
      items?: unknown
      promoCode?: string | null
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      res.status(400).json({ error: "Cart is empty." })
      return
    }

    const clean: OrderItemForTotal[] = []
    for (const row of body.items) {
      if (!row || typeof row !== "object") {
        res.status(400).json({ error: "Invalid cart payload." })
        return
      }
      const r = row as Record<string, unknown>
      const unitPrice = Number(r.unitPrice)
      const quantity = Number(r.quantity)
      if (
        !Number.isFinite(unitPrice) ||
        unitPrice < 0 ||
        !Number.isFinite(quantity) ||
        quantity < 1 ||
        !Number.isInteger(quantity)
      ) {
        res.status(400).json({ error: "Invalid line item." })
        return
      }
      clean.push({ unitPrice, quantity })
    }

    const promoCode =
      typeof body.promoCode === "string" && body.promoCode.trim()
        ? body.promoCode
        : null

    const { total } = computeOrderTotal(clean, promoCode)
    const amountCents = Math.round(total * 100)

    if (amountCents < 50) {
      res.status(400).json({ error: "Order total is too small to charge." })
      return
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "BackStreet order",
              description: "Thank you for shopping with BackStreet.",
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${clientOrigin.replace(/\/$/, "")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientOrigin.replace(/\/$/, "")}/cart`,
    })

    if (!session.url) {
      res.status(500).json({ error: "No checkout URL returned." })
      return
    }

    res.json({ url: session.url })
  } catch (e) {
    console.error("create-checkout-session", e)
    res.status(500).json({ error: "Could not start checkout. Try again." })
  }
})

app.listen(port, "127.0.0.1", () => {
  console.log(`Checkout API listening on http://127.0.0.1:${port}`)
})
