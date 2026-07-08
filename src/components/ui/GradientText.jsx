import { cn } from '@/lib/cn'

const gradients = {
  brand: 'from-brand-800 to-brand-500',
  sunset: 'from-brand-700 via-brand-500 to-accent-500',
  ocean: 'from-accent-600 to-brand-400',
}

/**
 * Applies a gradient fill to inline text.
 * @param {object} props
 * @param {keyof typeof gradients} [props.gradient='brand']
 * @param {React.ElementType} [props.as='span']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function GradientText({ gradient = 'brand', as: Comp = 'span', className, children }) {
  return (
    <Comp
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent',
        gradients[gradient],
        className,
      )}
    >
      {children}
    </Comp>
  )
}
