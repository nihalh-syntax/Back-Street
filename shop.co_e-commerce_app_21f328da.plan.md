---
name: SHOP.CO E-Commerce App
overview: Build a full-featured e-commerce web app called "SHOP.CO" from scratch in the empty `Idea-2` directory, using React + TypeScript + TailwindCSS + Shadcn + react-router-dom + Firebase, matching the provided design mockup.
todos:
  - id: scaffold
    content: Scaffold Vite + React + TypeScript project in Idea-2, install all dependencies (TailwindCSS, Shadcn, react-router-dom, Firebase)
    status: completed
  - id: firebase
    content: Set up Firebase project config, initialize Firestore in lib/firebase.ts, write seed script for sample products
    status: pending
  - id: types-context
    content: Define TypeScript types (Product, CartItem, Review) and create CartContext with useContext/useState/localStorage persistence
    status: pending
  - id: custom-hook
    content: Build useProducts custom hook that queries Firestore with useEffect and supports category/price/color/size filters
    status: pending
  - id: components
    content: "Build reusable components: Navbar, ProductCard, StarRating, FilterSidebar, NewsletterForm (with email validation), Footer"
    status: pending
  - id: homepage
    content: Build HomePage with hero, brand logos, New Arrivals, Top Selling, Browse by Style, Testimonials sections
    status: pending
  - id: shoppage
    content: Build ShopPage with FilterSidebar, grid/list toggle, product grid, URL param sync
    status: pending
  - id: productpage
    content: Build ProductPage with image gallery, selectors, Add to Cart, You Might Also Like, Reviews
    status: pending
  - id: cartpage
    content: Build CartPage with line items, order summary, checkout form with validation
    status: pending
  - id: routing
    content: Wire up react-router-dom routes in App.tsx, add 404 fallback
    status: pending
  - id: vercel
    content: Add vercel.json SPA rewrite config and .env.example for Firebase vars
    status: pending
isProject: false
---

# SHOP.CO E-Commerce App

A modern clothing e-commerce site scaffolded with Vite + React + TypeScript, styled with TailwindCSS + Shadcn/ui, with Firebase Firestore for persistence and react-router-dom for navigation.

## Tech Stack

- **Vite** — project scaffold
- **React 18 + TypeScript**
- **TailwindCSS v3** + **Shadcn/ui** (Button, Badge, Input, Slider, Sheet, etc.)
- **react-router-dom v6** — routing
- **Firebase v10** (Firestore for products/reviews, Auth for user accounts)
- **Vercel** — deployment target (via `vercel.json` config)

---

## Pages (Routes)


| Route          | Page               | Type               |
| -------------- | ------------------ | ------------------ |
| `/`            | Homepage           | Landing            |
| `/shop`        | Category/Shop Page | Master View (Grid) |
| `/product/:id` | Product Detail     | Detail View        |
| `/cart`        | Cart               | Form + Context     |


---

## Architecture

```
src/
├── components/         # Reusable components (5+)
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── StarRating.tsx
│   ├── FilterSidebar.tsx
│   ├── NewsletterForm.tsx
│   └── Footer.tsx
├── context/
│   └── CartContext.tsx  # useContext, useState
├── hooks/
│   └── useProducts.ts   # custom hook — fetches from Firestore with useEffect
├── pages/
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── ProductPage.tsx
│   └── CartPage.tsx
├── lib/
│   ├── firebase.ts      # Firebase init
│   └── utils.ts         # Shadcn util
├── types/
│   └── index.ts         # Product, CartItem, Review types
└── main.tsx
```

---

## Key Requirements Mapping

- **Master View**: `ShopPage` — product grid with list/grid toggle, filter sidebar
- **Detail View**: `ProductPage` — images, color/size selectors, reviews, add to cart
- **5+ Reusable Components**: `Navbar`, `ProductCard`, `StarRating`, `FilterSidebar`, `NewsletterForm`, `Footer`
- **Custom Hook**: `useProducts(filters)` — queries Firestore, returns `{ products, loading, error }`
- **Form with Validation**: `NewsletterForm` (email validation) + `CartPage` checkout fields (name, address, email) using React controlled inputs and inline error states
- **useState / useEffect / useContext**: Cart state via `CartContext`, Firestore fetching in `useProducts` with `useEffect`, local filter state in `ShopPage`
- **Firebase**: Firestore collection `products` seeded with clothing data; cart items stored in `localStorage` (or Firestore if user is authenticated)
- **Persistence**: Product catalog from Firestore; cart persisted via `localStorage` through `CartContext`

---

## Pages — Visual Description

### Homepage

- Hero section: bold headline + CTA button + brand logos bar (Versace, Zara, Gucci, Prada, Calvin Klein)
- "New Arrivals" horizontal scroll of `ProductCard`s
- "Top Selling" grid
- "Browse by Dress Style" category cards (Casual, Formal, Party, Gym)
- "Our Happy Customers" testimonials with star ratings
- `NewsletterForm` banner + `Footer`

### Shop Page (`/shop`)

- Left: `FilterSidebar` (price range Slider, category checkboxes, color swatches, size pills)
- Right: grid/list toggle + product grid using `ProductCard`
- URL search params sync'd with filters for shareability

### Product Detail Page (`/product/:id`)

- Image gallery, product name + price, color + size selector, quantity + Add to Cart button
- "You Might Also Like" row of `ProductCard`s
- Reviews section with `StarRating`

### Cart Page (`/cart`)

- Line items with quantity stepper + remove
- Order summary panel
- Checkout form (name, email, address) with validation

---

## Firebase Setup

- `lib/firebase.ts` initializes app with env vars (`VITE_FIREBASE_`*)
- Firestore collection: `products` — fields: `id, name, price, originalPrice, category, colors, sizes, images, rating, reviewCount`
- A seed script (`scripts/seed.ts`) populates Firestore with ~12 sample products

---

## Implementation Steps

