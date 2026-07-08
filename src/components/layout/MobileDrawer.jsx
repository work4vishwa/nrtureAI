import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/brand/Logo'
import { cn } from '@/lib/cn'
import { FOCUSABLE, trapFocus } from '@/lib/a11y'
import { useScrollLock } from '@/hooks/useScrollLock'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import site from '@/data/site.json'

/**
 * Slide-in mobile navigation drawer.
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export function MobileDrawer({ open, onClose }) {
  const panelRef = useRef(null)
  const reduce = usePrefersReducedMotion()

  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement
    const panel = panelRef.current
    panel?.querySelector(FOCUSABLE)?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (panel) trapFocus(e, panel)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            id="mobile-nav-dialog"
            tabIndex={-1}
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'tween', duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex w-4/5 max-w-sm flex-col bg-surface shadow-xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-ink-muted/10 px-5">
              <Logo onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-ink-muted/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile">
              {site.nav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'min-h-11 rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                        : 'text-ink-muted hover:bg-ink-muted/10 hover:text-ink',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-col gap-2 border-t border-ink-muted/10 p-4">
              <Button as={Link} to="/pricing" variant="outline" onClick={onClose}>
                Sign in
              </Button>
              <Button as={Link} to={site.cta.href} onClick={onClose}>
                {site.cta.label}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
