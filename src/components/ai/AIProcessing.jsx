import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import CountUp from '@/lib/CountUp'
import { RotateCcw, Sparkles } from 'lucide-react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const EASE = [0.16, 1, 0.3, 1]
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

/** Animated checkmark that draws itself in. */
function CheckMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <motion.path
        d="M20 6 9 17l-5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </svg>
  )
}

/** Small indeterminate spinner shown while a step is processing. */
function StepSpinner() {
  return (
    <span
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  )
}

/** Animated radial confidence gauge with a counting number. */
function ConfidenceScore({ value }) {
  const R = 52
  const C = 2 * Math.PI * R

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex items-center gap-4"
    >
      <div className="relative grid size-28 place-items-center">
        <svg width="112" height="112" viewBox="0 0 120 120" className="-rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" strokeWidth="10" className="stroke-ink-muted/15" />
          <motion.circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            stroke="url(#confGrad)"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - value / 100) }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <defs>
            <linearGradient id="confGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(8 145 178)" />
              <stop offset="100%" stopColor="rgb(168 85 247)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute grid place-items-center text-center">
          <span className="font-display text-2xl font-semibold text-ink">
            <CountUp end={value} duration={1.1} />%
          </span>
        </div>
      </div>
      <div>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
          <Sparkles className="size-4 text-brand-500" aria-hidden="true" />
          Confidence score
        </p>
        <p className="mt-1 max-w-[16rem] text-sm text-ink-muted">
          The AI is highly confident in this response and ready to send.
        </p>
      </div>
    </motion.div>
  )
}

/**
 * Animated AI processing sequence. Steps reveal and complete one by one,
 * each earning a checkmark, followed by an animated confidence score.
 *
 * @param {object} props
 * @param {Array<{ id: string, label: string }>} props.steps
 * @param {number} [props.confidence=98]
 * @param {number} [props.stepDuration=900] - processing time per step (ms)
 * @param {string} [props.className]
 */
export function AIProcessing({ steps, confidence = 98, stepDuration = 900, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = usePrefersReducedMotion()
  const [runKey, setRunKey] = useState(0)
  const [statuses, setStatuses] = useState(() => steps.map(() => 'pending'))
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!inView) return
    let cancelled = false

    const setStatus = (index, value) =>
      setStatuses((prev) => {
        const next = [...prev]
        next[index] = value
        return next
      })

    const run = async () => {
      setStatuses(steps.map(() => 'pending'))
      setFinished(false)

      // Reduced motion: resolve everything immediately.
      const appear = reduce ? 0 : 350
      const process = reduce ? 0 : stepDuration

      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return
        await wait(appear)
        if (cancelled) return
        setStatus(i, 'processing')
        await wait(process)
        if (cancelled) return
        setStatus(i, 'done')
      }
      await wait(reduce ? 0 : 300)
      if (!cancelled) setFinished(true)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [inView, runKey, steps, stepDuration, reduce])

  const allDone = statuses.every((s) => s === 'done')

  return (
    <div
      ref={ref}
      role="region"
      aria-label="AI processing demonstration"
      className={cn(
        'rounded-2xl border border-ink-muted/10 bg-surface p-6 shadow-card',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          AI processing
        </p>
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
            allDone
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-brand-500/10 text-brand-600 dark:text-brand-400',
          )}
          aria-live="polite"
        >
          {allDone ? 'Complete' : 'Working…'}
        </span>
      </div>

      <ul className="mt-5 space-y-2" aria-label="Processing steps">
        <AnimatePresence>
          {steps.map((step, i) => {
            const status = statuses[i]
            if (status === 'pending') return null
            return (
              <motion.li
                key={step.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex items-center gap-3 rounded-xl bg-surface-muted/60 px-3.5 py-2.5"
              >
                <span
                  className={cn(
                    'grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-300',
                    status === 'done'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-brand-500/15 text-brand-600 dark:text-brand-400',
                  )}
                  aria-hidden="true"
                >
                  {status === 'done' ? <CheckMark /> : <StepSpinner />}
                </span>
                <span
                  className={cn(
                    'text-sm transition-colors',
                    status === 'done' ? 'text-ink' : 'text-ink-muted',
                  )}
                  aria-live={status === 'processing' ? 'polite' : undefined}
                >
                  {step.label}
                </span>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ul>

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-5 overflow-hidden border-t border-ink-muted/10 pt-5"
          >
            <ConfidenceScore value={confidence} />
            <button
              type="button"
              onClick={() => setRunKey((k) => k + 1)}
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-brand-400"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Run again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
