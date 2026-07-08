import { cn } from '@/lib/cn'
import { micro } from '@/lib/motion'

const variants = {
  primary:
    'bg-brand-600 text-white shadow-glow hover:bg-brand-700 focus-visible:ring-brand-600',
  secondary:
    'border border-border bg-surface text-ink hover:bg-surface-muted focus-visible:ring-brand-600',
  outline:
    'border border-border bg-surface text-ink hover:bg-surface-muted hover:border-brand-300 focus-visible:ring-brand-600',
  ghost:
    'text-brand-700 hover:text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-600',
}

const sizes = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-6 text-sm',
  lg: 'min-h-[2.75rem] px-8 text-base',
}

/**
 * Design-system button.
 * @param {{ as?: React.ElementType, variant?: keyof typeof variants, size?: keyof typeof sizes, className?: string } & React.ComponentProps<'button'>} props
 */
export function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  return (
    <Comp
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50',
        micro.press,
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
