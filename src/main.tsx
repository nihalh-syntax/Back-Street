import { createRoot } from "react-dom/client"
import { ClerkProvider } from "@clerk/react"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App.tsx"
import { AuthProvider } from "./context/AuthContext.tsx"
import { CartProvider } from "./context/CartContext.tsx"
import { AppThemeProvider } from "@/theme"

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!clerkPublishableKey) {
  throw new Error(
    "Missing VITE_CLERK_PUBLISHABLE_KEY. Add it to `.env.local` in the project root (Back-Street/).",
  )
}

createRoot(document.getElementById("root")!).render(
  <AppThemeProvider>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ClerkProvider>
  </AppThemeProvider>,
)
