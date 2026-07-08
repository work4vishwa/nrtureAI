import { useId } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

/**
 * Semantic section with consistent vertical rhythm and optional heading.
 * @param {{ id?: string, eyebrow?: string, title?: string, description?: string, className?: string, containerClassName?: string, children: React.ReactNode }} props
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  containerClassName,
  children,
}) {
  const headingId = useId()
  const hasHeader = eyebrow || title || description

  return (
    <section
      id={id}
      className={cn('pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-28', className)}
      aria-labelledby={title ? headingId : undefined}
    >
      <Container className={containerClassName}>
        {hasHeader && (
          <header className="mx-auto mb-10 max-w-2xl px-1 text-center sm:mb-14">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={headingId}
                className="section-title-gradient text-2xl font-semibold sm:text-3xl md:text-4xl"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base text-ink-muted sm:text-lg">{description}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  )
}
