import { Star } from "lucide-react"

type StarRatingProps = {
  rating: number
  max?: number
  className?: string
  showValue?: boolean
}

const StarRating = ({
  rating,
  max = 5,
  className = "",
  showValue = true,
}: StarRatingProps) => {
  const normalized = Number.isFinite(rating)
    ? Math.min(max, Math.max(0, rating))
    : 0

  return (
    <div className={`inline-flex items-center gap-2 ${className}`.trim()}>
      <div className="flex items-center gap-0.5" aria-hidden>
        {Array.from({ length: max }).map((_, index) => {
          const filled = normalized >= index + 1
          return (
            <Star
              key={index}
              className={filled ? "size-3 fill-amber-400 text-amber-400" : "size-3 fill-transparent text-amber-300"}
              strokeWidth={1.75}
            />
          )
        })}
      </div>
      {showValue && (
        <span className="text-xs text-muted-foreground">{normalized.toFixed(1)}/5</span>
      )}
    </div>
  )
}

export default StarRating
