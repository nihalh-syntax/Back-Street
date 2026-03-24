import { ChevronDown, Search, ShoppingCart, User } from "lucide-react"

const navLinkClass =
  "text-foreground hover:text-foreground/80 transition-colors text-sm font-medium whitespace-nowrap"

const NavBar = () => {
  return (
    <header className="border-b border-border bg-[#f2f0f1]">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 md:gap-8 md:px-6">
        <div className="flex shrink-0 items-center gap-6 md:gap-8">
          <a href="/" className="text-lg font-bold tracking-tight text-foreground md:text-xl">
            Back.Street
          </a>
          <nav
            className="hidden items-center gap-5 text-sm sm:flex md:gap-6"
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

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="size-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted/80"
            aria-label="Account"
          >
            <User className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default NavBar
