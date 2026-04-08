import { ChevronDown, Search, ShoppingCart, User } from "lucide-react"
import { SignInButton, UserButton, useAuth } from "@clerk/react"
import { Link } from "react-router-dom"

import ModeToggle from "./ModeToggle"
import { useCart } from "@/context/CartContext"

const navLinkClass =
  "text-foreground hover:text-foreground/90 transition-colors text-sm font-medium whitespace-nowrap"

const NavBar = () => {
  const { isSignedIn } = useAuth()
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 md:gap-8 md:px-6">
        <div className="flex shrink-0 items-center gap-6 md:gap-8">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-foreground md:text-xl"
          >
            BackStreet
          </Link>
          <nav
            className="hidden items-center gap-5 text-sm sm:flex ml-10 md:gap-6"
            aria-label="Main"
          >
            <button
              type="button"
              className={`${navLinkClass} inline-flex items-center gap-1`}
            >
              Shop
              <ChevronDown className="size-3.5 opacity-70" aria-hidden />
            </button>
            <a href="#" className={navLinkClass}>
              On Sale
            </a>
            <a href="#" className={navLinkClass}>
              New Arrivals
            </a>
            <a href="#" className={navLinkClass}>
              Brands
            </a>
          </nav>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-1 sm:gap-2">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search for products..."
              className="h-10 w-full rounded-full border-0 bg-muted py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label="Search for products"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <Link
            to="/cart"
            className="relative inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="size-5" strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-bold leading-none text-background">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          <ModeToggle />

          {isSignedIn ? (
            <div className="inline-flex size-10 items-center justify-center">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "size-8",
                  },
                }}
              />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button
                type="button"
                className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted/80"
                aria-label="Sign in"
              >
                <User className="size-5" strokeWidth={1.75} />
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
