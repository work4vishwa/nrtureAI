import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Bot, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/cn'
import { handleRovingKeyDown } from '@/lib/a11y'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { SCREEN_DATA, SCREEN_ORDER } from './dashboardPreview'

/**
 * Faux product dashboard used as the hero visual.
 */
export function DashboardMockup() {
  const [active, setActive] = useState('reviews')
  const reduce = usePrefersReducedMotion()
  const tabRefs = useRef([])
  const preloaded = useRef(new Set())
  const activeScreen = SCREEN_DATA[active]

  const onTabKeyDown = useCallback(
    (e, index) => {
      handleRovingKeyDown(e, index, SCREEN_ORDER.length, (next) => {
        setActive(SCREEN_ORDER[next])
        tabRefs.current[next]?.focus()
      })
    },
    [],
  )

  useEffect(() => {
    if (reduce) return

    const preload = () => {
      for (const id of SCREEN_ORDER) {
        if (id === active || preloaded.current.has(id)) continue
        const img = new Image()
        img.src = SCREEN_DATA[id].image
        img.decoding = 'async'
        preloaded.current.add(id)
      }
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preload, { timeout: 1200 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(preload, 300)
    return () => window.clearTimeout(timeoutId)
  }, [active, reduce])

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-ink-muted/10 bg-surface shadow-card"
      role="region"
      aria-label="Interactive dashboard preview"
    >
      <div className="flex items-center gap-2 border-b border-ink-muted/10 bg-surface-muted px-4 py-3">
        <span className="size-3 rounded-full bg-red-400" aria-hidden="true" />
        <span className="size-3 rounded-full bg-amber-400" aria-hidden="true" />
        <span className="size-3 rounded-full bg-emerald-400" aria-hidden="true" />
        <div className="ml-3 hidden flex-1 items-center gap-2 rounded-md bg-ink-muted/10 px-3 py-1 text-xs text-ink-muted sm:flex">
          <Bot className="size-3.5 text-brand-600" aria-hidden="true" />
          Ask Elara (Coming Soon)
        </div>
      </div>

      <div className="p-3 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-ink-muted">Live product preview</p>
            <p className="mt-1 font-display text-lg font-semibold text-ink sm:text-xl">
              {activeScreen.title}
            </p>
            <p className="mt-1 text-xs text-ink-muted">{activeScreen.subtitle}</p>
          </div>

          <div
            role="tablist"
            aria-label="Dashboard screenshot view"
            className="flex w-full gap-1 rounded-lg bg-surface-muted p-1 sm:w-auto"
          >
            {SCREEN_ORDER.map((id, i) => (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                aria-selected={active === id}
                tabIndex={active === id ? 0 : -1}
                onClick={() => setActive(id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={cn(
                  'min-h-11 flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:flex-none sm:text-sm',
                  active === id ? 'bg-surface text-ink shadow-sm' : 'text-ink-muted hover:text-ink',
                )}
              >
                {SCREEN_DATA[id].label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="mt-4 overflow-hidden rounded-xl border border-ink-muted/15 bg-surface"
          >
            <img
              src={activeScreen.image}
              alt={`${activeScreen.label} dashboard screenshot`}
              className="h-auto w-full object-cover"
              loading={active === SCREEN_ORDER[0] ? 'eager' : 'lazy'}
              fetchPriority={active === SCREEN_ORDER[0] ? 'high' : 'auto'}
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-3">
          {activeScreen.stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-0 rounded-lg border border-ink-muted/15 bg-surface-muted px-2 py-2 text-center sm:px-3"
            >
              <p className="truncate text-base font-semibold text-ink sm:text-lg md:text-xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[9px] uppercase leading-tight tracking-wide text-ink-muted sm:text-[10px] md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[10px] text-brand-700 sm:justify-end sm:text-left sm:text-xs">
          <LayoutGrid className="size-3.5 shrink-0" aria-hidden="true" />
          <span>Real screenshots from NrtureAI dashboard</span>
          <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
