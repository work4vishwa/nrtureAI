import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import site from '@/data/site.json'

const SIZES = {
  sm: 'h-7',
  md: 'h-8',
  lg: 'h-10',
}

/**
 * Brand wordmark from the Nrture.ai logo asset.
 */
export function Logo({ size = 'md', className, asLink = true, to = '/', onClick }) {
  const image = (
    <img
      src={site.logo}
      alt={site.name}
      width={196}
      height={32}
      className={cn('block w-auto object-contain object-left', SIZES[size], className)}
      decoding="async"
    />
  )

  if (!asLink) return image

  return (
    <Link
      to={to}
      onClick={onClick}
      className="inline-flex shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      aria-label={`${site.name} home`}
    >
      {image}
    </Link>
  )
}
