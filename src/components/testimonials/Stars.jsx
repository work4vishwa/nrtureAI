import { Star } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Accessible star rating display.
 * @param {object} props
 * @param {number} props.rating - 1–5
 * @param {string} [props.className]
 */
export function Stars({ rating, className }) {
  return (
    <span className={cn('flex gap-0.5', className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'size-4',
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-ink-muted/30',
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}
