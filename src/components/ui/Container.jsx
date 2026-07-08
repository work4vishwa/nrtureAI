import { cn } from '@/lib/cn'

/**
 * Centered max-width wrapper with responsive gutters.
 * @param {{ className?: string, children: React.ReactNode }} props
 */
export function Container({ className, children }) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8',
        'max-[360px]:px-3',
        className,
      )}
    >
      {children}
    </div>
  )
}
