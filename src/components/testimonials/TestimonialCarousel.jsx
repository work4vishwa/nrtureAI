import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { Stars } from './Stars'
import { cn } from '@/lib/cn'
import { handleRovingKeyDown } from '@/lib/a11y'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { micro } from '@/lib/motion'

const EASE = [0.16, 1, 0.3, 1]
const AUTOPLAY_MS = 6000

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
}

/**
 * Responsive testimonial carousel with autoplay and manual controls.
 * @param {object} props
 * @param {Array<{ id: string, quote: string, author: string, role: string, company: string, avatar?: string, rating: number }>} props.items
 * @param {number} [props.autoplayMs=6000]
 * @param {string} [props.className]
 */
export function TestimonialCarousel({ items = [], autoplayMs = AUTOPLAY_MS, className }) {
  const reduce = usePrefersReducedMotion()
  const [[index, direction], setSlide] = useState([0, 0])
  const paused = useRef(false)
  const regionRef = useRef(null)
  const slideId = useId()
  const count = items.length

  const goTo = useCallback(
    (next) => {
      if (count === 0) return
      setSlide(([i]) => {
        const dir = next > i ? 1 : -1
        const wrapped = ((next % count) + count) % count
        return [wrapped, dir]
      })
    },
    [count],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (reduce || count <= 1) return
    const id = setInterval(() => {
      if (!paused.current) {
        setSlide(([i]) => {
          const wrapped = (i + 1) % count
          return [wrapped, 1]
        })
      }
    }, autoplayMs)
    return () => clearInterval(id)
  }, [autoplayMs, reduce, count])

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else {
        handleRovingKeyDown(e, index, count, goTo)
      }
    },
    [goTo, index, count, next, prev],
  )

  if (count === 0) return null

  const current = items[index]

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className={cn('relative', className)}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) paused.current = false
      }}
      onKeyDown={onKeyDown}
    >
      <Card
        padding="lg"
        className="premium-card premium-card-hover relative overflow-hidden px-6 py-6 sm:px-8 sm:py-8 md:px-10"
      >
        <Quote
          className="pointer-events-none absolute right-6 top-6 size-10 text-brand-500/15"
          aria-hidden="true"
        />

        <div
          className="relative min-h-[300px] sm:min-h-[240px] md:min-h-[200px]"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={current.id}
              id={`${slideId}-${current.id}`}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
              className="flex flex-col items-center text-center"
              aria-label={`Testimonial ${index + 1} of ${count}`}
            >
              <Stars rating={current.rating} />
              <p className="mt-5 max-w-2xl px-1 text-base leading-relaxed text-ink sm:px-0 sm:text-lg md:text-xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                <Avatar src={current.avatar} name={current.author} size="lg" />
                <div className="text-center sm:text-left">
                  <cite className="not-italic">
                    <p className="font-semibold text-ink">{current.author}</p>
                    <p className="text-sm text-ink-muted">
                      {current.role}
                      <span className="text-ink-muted/50" aria-hidden="true">
                        {' '}
                        ·{' '}
                      </span>
                      <span className="font-medium text-brand-600 dark:text-brand-400">
                        {current.company}
                      </span>
                    </p>
                  </cite>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </Card>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            aria-controls={`${slideId}-${current.id}`}
            className={cn(
              'absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-ink-muted/15 bg-surface text-ink shadow-card transition-colors hover:border-brand-500 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:grid sm:-left-6 md:-left-10',
              micro.press,
              micro.lift,
            )}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            aria-controls={`${slideId}-${current.id}`}
            className={cn(
              'absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-ink-muted/15 bg-surface text-ink shadow-card transition-colors hover:border-brand-500 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:grid sm:-right-6 md:-right-10',
              micro.press,
              micro.lift,
            )}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>

          <div className="mt-6 flex justify-center gap-1" role="group" aria-label="Choose testimonial">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-current={i === index ? 'true' : undefined}
                aria-label={`Go to testimonial ${i + 1} of ${count}`}
                onClick={() => goTo(i)}
                className={cn(
                  'grid size-11 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'block h-2 rounded-full motion-safe:transition-all motion-safe:duration-300',
                    i === index ? 'w-6 bg-brand-600' : 'w-2 bg-ink-muted/30 hover:bg-ink-muted/50',
                  )}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
