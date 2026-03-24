// Hero Page is the main page of the website

import { useId } from "react"
import { Button } from "../ui/button"

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1619789332426-00fc137633d1?auto=format&fit=crop&w=800&q=80"

/** Single outline path — inner clip uses the same path scaled from center for even inset. */
const FRAME_PATH =
  "M52 96C28 188 18 292 42 384C66 476 148 508 246 502C344 496 398 448 412 356C426 264 408 172 372 92C336 12 248 -8 156 8C64 24 76 4 52 96Z"

const VIEW_W = 420
const VIEW_H = 520
const CX = VIEW_W / 2
const CY = VIEW_H / 2
/** ~6% inset on all sides between stroke and photo (uniform scale from center). */
const INNER_SCALE = 0.88

function FourPointStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
    </svg>
  )
}

const Hero = () => {
  const clipId = useId().replace(/:/g, "")

  return (
    <section className="bg-[#f2f0f1]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 md:gap-12 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-16">
        <div className="flex flex-col gap-6 md:gap-8">
          <h1 className="max-w-xl font-sans text-[2.25rem] font-black uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]">
            Find clothes that matches your style
          </h1>
          <p className="max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div>
            <Button
              asChild
              className="h-12 rounded-full bg-foreground px-10 text-[0.95rem] font-medium text-background hover:bg-foreground/90"
            >
              <a href="#shop">Shop Now</a>
            </Button>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:mt-4 sm:grid-cols-3 sm:gap-0 sm:border-t-0 sm:pt-0 sm:divide-x sm:divide-border">
            <div className="flex flex-col gap-1 sm:pr-8">
              <span className="text-2xl font-bold tabular-nums text-foreground md:text-3xl">
                200+
              </span>
              <span className="text-xs text-muted-foreground sm:text-sm">
                International Brands
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:px-8">
              <span className="text-2xl font-bold tabular-nums text-foreground md:text-3xl">
                2,000+
              </span>
              <span className="text-xs text-muted-foreground sm:text-sm">
                High-Quality Products
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:pl-8">
              <span className="text-2xl font-bold tabular-nums text-foreground md:text-3xl">
                30,000+
              </span>
              <span className="text-xs text-muted-foreground sm:text-sm">
                Happy Customers
              </span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none lg:justify-self-end">
          <FourPointStar className="absolute -left-2 top-[18%] z-10 size-8 text-foreground md:left-0 md:size-10" />
          <FourPointStar className="absolute -right-1 -top-2 z-10 size-14 text-foreground md:right-2 md:size-18" />

          <div className="relative aspect-4/5 w-full sm:aspect-5/6">
            <svg
              className="h-full w-full text-foreground"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                  <path
                    transform={`translate(${CX} ${CY}) scale(${INNER_SCALE}) translate(${-CX} ${-CY})`}
                    d={FRAME_PATH}
                  />
                </clipPath>
              </defs>
              <image
                href={HERO_IMAGE}
                x={0}
                y={0}
                width={VIEW_W}
                height={VIEW_H}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${clipId})`}
              />
              <path
                d={FRAME_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
