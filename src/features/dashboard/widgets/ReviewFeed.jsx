import { Star } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/cn'
import dashboard from '@/data/dashboard.json'

function Stars({ rating }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'size-3.5',
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-ink-muted/30',
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

export function ReviewFeed() {
  const avgRating =
    dashboard.reviews.reduce((sum, review) => sum + review.rating, 0) / Math.max(dashboard.reviews.length, 1)

  return (
    <Card padding="md" className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Latest reviews</p>
        <span className="text-xs text-ink-muted">Avg {avgRating.toFixed(1)} / 5</span>
      </div>

      <ul className="mt-4 divide-y divide-ink-muted/10">
        {dashboard.reviews.map((r) => (
          <li key={r.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
            <Avatar src={r.avatar} name={r.author} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-x-2">
                <p className="text-sm font-medium text-ink">
                  {r.author}
                  <span className="font-normal text-ink-muted"> · {r.company}</span>
                </p>
                <span className="text-xs text-ink-muted">{r.time}</span>
              </div>
              <div className="mt-1">
                <Stars rating={r.rating} />
              </div>
              <p className="mt-1.5 text-sm text-ink-muted">{r.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
