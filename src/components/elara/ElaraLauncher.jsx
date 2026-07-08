import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  CalendarCheck,
  ChevronRight,
  Info,
  LayoutGrid,
  Tag,
  X,
} from 'lucide-react'
import { FOCUSABLE, trapFocus } from '@/lib/a11y'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** Questions a visitor might ask Elara, each mapped to a destination page. */
const DESTINATIONS = [
  {
    to: '/features',
    icon: LayoutGrid,
    label: 'What can Nrture.ai do?',
  },
  {
    to: '/dashboard',
    icon: BarChart3,
    label: 'Can I see the dashboard?',
  },
  {
    to: '/pricing',
    icon: Tag,
    label: 'How much does it cost?',
  },
  {
    to: '/about',
    icon: Info,
    label: "Who's behind Nrture.ai?",
  },
  {
    to: '/contact',
    icon: CalendarCheck,
    label: 'Can I book a demo?',
  },
]

/**
 * Floating Elara assistant launcher. Sits bottom-right like a chat widget and
 * expands into a panel of quick links that navigate directly to key pages.
 */
export function ElaraLauncher() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const reduce = usePrefersReducedMotion()
  const panelId = useId()

  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    panel?.querySelector(FOCUSABLE)?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (panel) trapFocus(e, panel)
    }

    const onPointerDown = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-4 z-[100] flex flex-col items-end sm:bottom-6 sm:right-6"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Ask Elara"
            id={panelId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'bottom right' }}
            className="mb-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 bg-gradient-to-br from-brand-600 to-brand-500 px-4 py-4 text-white">
              <span className="relative shrink-0">
                <img
                  src="/team/elara.png"
                  alt="Elara"
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover object-top ring-2 ring-white/60"
                />
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-brand-600 bg-emerald-400" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">Elara</p>
                <p className="truncate text-xs text-white/80">AI Reputation Manager · Online</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close Elara"
                className="grid size-8 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Greeting */}
            <div className="bg-white px-4 pt-4">
              <p className="rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2.5 text-sm font-medium text-slate-800">
                Hi, I&apos;m Elara. What would you like to know?
              </p>
            </div>

            {/* Question chips */}
            <nav
              className="flex max-h-[46vh] flex-col gap-2 overflow-y-auto bg-white p-3"
              aria-label="Suggested questions"
            >
              {DESTINATIONS.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={close}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-left transition-colors hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium text-slate-800">
                    {label}
                  </span>
                  <ChevronRight
                    className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close Elara' : 'Ask Elara'}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className="group relative grid size-14 place-items-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-transform hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-safe:hover:scale-105 motion-safe:active:scale-95"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-brand-500/60 motion-safe:animate-ping" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={reduce ? false : { opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90 }}
              transition={{ duration: reduce ? 0 : 0.18 }}
              className="relative"
            >
              <X className="size-6" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="avatar"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: reduce ? 0 : 0.18 }}
              className="relative size-14 overflow-hidden rounded-full ring-2 ring-white/70"
            >
              <img
                src="/team/elara.png"
                alt=""
                width={56}
                height={56}
                className="size-full object-cover object-top"
              />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <span className="sr-only" aria-live="polite">
        {open ? 'Elara menu open' : ''}
      </span>
    </div>
  )
}
