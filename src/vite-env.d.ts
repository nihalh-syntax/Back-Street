/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string
  readonly VITE_FIREBASE_API_KEY: string
  /** Optional. Set when the checkout API is on another origin (production). Defaults to same-origin `/api` (use Vite proxy in dev). */
  readonly VITE_CHECKOUT_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
