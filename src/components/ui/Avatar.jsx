import { useState } from 'react'
import { cn } from '@/lib/cn'
import { avatarPixels } from '@/lib/avatarSizes'

const sizes = {
  xs: 'size-6 text-[10px]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
  xl: 'size-16 text-lg',
}

function initialsFrom(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/**
 * User avatar with image + graceful initials fallback.
 * @param {object} props
 * @param {string} [props.src]
 * @param {string} props.name - used for alt text and initials fallback
 * @param {keyof typeof sizes} [props.size='md']
 * @param {'lazy'|'eager'} [props.loading='lazy']
 * @param {'high'|'low'|'auto'} [props.fetchPriority='auto']
 * @param {string} [props.className]
 */
export function Avatar({
  src,
  name = '',
  size = 'md',
  loading = 'lazy',
  fetchPriority = 'auto',
  className,
}) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed
  const px = avatarPixels[size]

  return (
    <span
      className={cn(
        'inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-brand-600/10 font-semibold text-brand-700 dark:text-brand-300',
        sizes[size],
        className,
      )}
      style={{ width: px, height: px }}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          width={px}
          height={px}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <span aria-hidden={!name ? 'true' : undefined}>{initialsFrom(name) || '?'}</span>
      )}
    </span>
  )
}

/**
 * Overlapping avatar group.
 * @param {object} props
 * @param {Array<{ src?: string, name: string }>} props.items
 * @param {number} [props.max=4]
 * @param {keyof typeof sizes} [props.size='md']
 * @param {string} [props.className]
 */
export function AvatarGroup({ items = [], max = 4, size = 'md', className }) {
  const visible = items.slice(0, max)
  const overflow = items.length - visible.length
  const px = avatarPixels[size]

  return (
    <div className={cn('flex items-center -space-x-2', className)} style={{ minHeight: px }}>
      {visible.map((item, i) => (
        <Avatar
          key={`${item.name}-${i}`}
          {...item}
          size={size}
          className="ring-2 ring-surface"
        />
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            'inline-grid place-items-center rounded-full bg-ink-muted/20 font-semibold text-ink ring-2 ring-surface',
            sizes[size],
          )}
          style={{ width: px, height: px }}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
