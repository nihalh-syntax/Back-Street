import { cn } from "@/lib/utils"

type DressStyle = {
  id: string
  title: string
  imageUrl: string
  href: string
  className?: string
  cardHeightClass?: string
  imageClassName?: string
}

const DRESS_STYLES: DressStyle[] = [
  {
    id: "casual",
    title: "Casual",
    href: "#casual",
    imageUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    className: "md:col-span-2",
    cardHeightClass: "h-52 md:h-56",
  },
  {
    id: "formal",
    title: "Formal",
    href: "#formal",
    imageUrl:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80",
    className: "md:col-span-3",
    cardHeightClass: "h-52 md:h-56",
    imageClassName: "object-top",
  },
  {
    id: "party",
    title: "Party",
    href: "#party",
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=80",
    className: "md:col-span-3",
    cardHeightClass: "h-56 md:h-64",
  },
  {
    id: "gym",
    title: "Gym",
    href: "#gym",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
    className: "md:col-span-2",
    cardHeightClass: "h-56 md:h-64",
    imageClassName: "object-top",
  },
  // {
  //   id: "vacation",
  //   title: "Vacation",
  //   href: "#vacation",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  //   className: "md:col-span-5",
  //   cardHeightClass: "h-52 md:h-56",
  // },
]

type DressStyleCardProps = {
  style: DressStyle
}

const DressStyleCard = ({ style }: DressStyleCardProps) => {
  return (
    <a
      href={style.href}
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-zinc-100",
        style.cardHeightClass ?? "h-52 md:h-56",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        style.className,
      )}
      aria-label={`Browse ${style.title} style`}
    >
      <img
        src={style.imageUrl}
        alt={`${style.title} clothing style`}
        loading="lazy"
        className={cn(
          "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-focus-visible:scale-110",
          style.imageClassName,
        )}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/15 to-transparent" />
      <span className="absolute left-5 top-4 text-3xl font-bold text-black md:text-[2rem]">
        {style.title}
      </span>
    </a>
  )
}

const BrowseSection = () => {
  return (
    <section className="bg-[#f2f0f1] pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-4xl bg-zinc-200 px-6 py-10 md:px-9 md:py-12">
          <h2 className="text-center text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
            Browse by Dress Style
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-5">
            {DRESS_STYLES.map((style) => (
              <DressStyleCard key={style.id} style={style} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrowseSection
