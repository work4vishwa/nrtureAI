import { cn } from '@/lib/cn'
import { micro } from '@/lib/motion'

const variants = {
  elevated: 'bg-surface shadow-card',
  outline: 'bg-surface',
  ghost: 'bg-surface-muted',
  gradient:
    'border border-ink-muted/10 bg-gradient-to-br from-surface to-surface-muted shadow-card',
}

const staticBorders = {
  elevated: 'border border-ink-muted/10',
  outline: 'border border-ink-muted/20',
  ghost: '',
  gradient: '',
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

/**
 * Container surface for grouped content.
 * @param {object} props
 * @param {keyof typeof variants} [props.variant='elevated']
 * @param {keyof typeof paddings} [props.padding='md']
 * @param {boolean} [props.interactive=false] - neon border glow on hover
 * @param {React.ElementType} [props.as='div']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Card({
  variant = 'elevated',
  padding = 'md',
  interactive = false,
  as: Comp = 'div',
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(
        'rounded-2xl premium-card',
        variants[variant],
        interactive ? micro.neonBorder : staticBorders[variant],
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
