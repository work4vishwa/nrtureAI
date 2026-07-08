import { cn } from '@/lib/cn'

const sizes = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-8 border-[3px]',
}

/**
 * Accessible loading spinner.
 * @param {object} props
 * @param {keyof typeof sizes} [props.size='md']
 * @param {string} [props.label='Loading']
 * @param {string} [props.className]
 */
export function Spinner({ size = 'md', label = 'Loading', className }) {
  return (
    <span role="status" aria-live="polite" className={cn('inline-flex', className)}>
      <span
        className={cn(
          'animate-spin rounded-full border-current border-t-transparent text-brand-600',
          sizes[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  )
}
