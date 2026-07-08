import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { motionTransition } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const colors = {
  brand: 'bg-brand-600',
  accent: 'bg-accent-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
}

const sizes = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
}

/**
 * Accessible progress bar. Animates its fill into view.
 * @param {object} props
 * @param {number} props.value - current value
 * @param {number} [props.max=100]
 * @param {keyof typeof colors} [props.color='brand']
 * @param {keyof typeof sizes} [props.size='md']
 * @param {string} [props.label] - accessible label (visually hidden)
 * @param {string} [props.className]
 */
export function Progress({ value, max = 100, color = 'brand', size = 'md', label, className }) {
  const reduce = usePrefersReducedMotion()
  const pct = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn('w-full overflow-hidden rounded-full bg-ink-muted/15', sizes[size], className)}
    >
      {reduce ? (
        <div className={cn('h-full rounded-full', colors[color])} style={{ width: `${pct}%` }} />
      ) : (
        <motion.div
          className={cn('h-full rounded-full', colors[color])}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={motionTransition(false, { duration: 0.9 })}
        />
      )}
    </div>
  )
}
