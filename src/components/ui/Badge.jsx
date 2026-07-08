import { cn } from '@/lib/cn'

const variants = {
  neutral: 'bg-ink-muted/10 text-ink-muted',
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  outline: 'border border-ink-muted/30 text-ink-muted',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
}

/**
 * Small status/label pill.
 * @param {object} props
 * @param {keyof typeof variants} [props.variant='neutral']
 * @param {keyof typeof sizes} [props.size='md']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Badge({ variant = 'neutral', size = 'md', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold leading-none motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:scale-105',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
