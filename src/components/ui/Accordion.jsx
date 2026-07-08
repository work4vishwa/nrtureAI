import { useCallback, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { motionTransition } from '@/lib/motion'

/**
 * Normalize item shape — accepts `title`/`content` or `question`/`answer`.
 * @param {object} item
 */
function normalizeItem(item) {
  return {
    id: item.id,
    title: item.title ?? item.question,
    content: item.content ?? item.answer,
  }
}

/**
 * Accessible accordion with smooth animation and keyboard navigation.
 *
 * Keyboard (when focus is on a trigger):
 * - ArrowDown / ArrowUp — move focus between triggers
 * - Home / End — first / last trigger
 * - Enter / Space — toggle panel (native button behavior)
 *
 * @param {object} props
 * @param {Array<{ id?: string, title?: string, question?: string, content?: React.ReactNode, answer?: React.ReactNode }>} props.items
 * @param {boolean} [props.allowMultiple=false]
 * @param {string[]} [props.defaultOpen=[]] - ids of panels open on mount
 * @param {string} [props.className]
 */
export function Accordion({ items = [], allowMultiple = false, defaultOpen = [], className }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen))
  const triggerRefs = useRef([])

  const normalized = items.map(normalizeItem)

  const toggle = useCallback(
    (key) => {
      setOpen((prev) => {
        const next = new Set(allowMultiple ? prev : [])
        if (prev.has(key)) next.delete(key)
        else next.add(key)
        return next
      })
    },
    [allowMultiple],
  )

  const onTriggerKeyDown = useCallback((e, index) => {
    const triggers = triggerRefs.current.filter(Boolean)
    if (triggers.length === 0) return

    let nextIndex = null
    if (e.key === 'ArrowDown') nextIndex = (index + 1) % triggers.length
    if (e.key === 'ArrowUp') nextIndex = (index - 1 + triggers.length) % triggers.length
    if (e.key === 'Home') nextIndex = 0
    if (e.key === 'End') nextIndex = triggers.length - 1

    if (nextIndex !== null) {
      e.preventDefault()
      triggers[nextIndex].focus()
    }
  }, [])

  return (
    <div className={cn('divide-y divide-ink-muted/10 rounded-2xl border border-ink-muted/10', className)}>
      {normalized.map((item, i) => {
        const key = item.id ?? String(i)
        return (
          <AccordionItem
            key={key}
            itemKey={key}
            title={item.title}
            content={item.content}
            isOpen={open.has(key)}
            onToggle={() => toggle(key)}
            triggerRef={(el) => {
              triggerRefs.current[i] = el
            }}
            onKeyDown={(e) => onTriggerKeyDown(e, i)}
          />
        )
      })}
    </div>
  )
}

function AccordionItem({ itemKey, title, content, isOpen, onToggle, triggerRef, onKeyDown }) {
  const baseId = useId()
  const triggerId = `${baseId}-${itemKey}-trigger`
  const panelId = `${baseId}-${itemKey}-panel`
  const reduce = usePrefersReducedMotion()

  return (
    <div>
      <h3 className="m-0">
        <button
          ref={triggerRef}
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={onKeyDown}
            className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink transition-colors hover:bg-ink-muted/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500 motion-safe:transition-[background-color,padding] motion-safe:duration-200"
        >
          {title}
          <ChevronDown
            className={cn(
              'size-5 shrink-0 text-ink-muted motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]',
              isOpen && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={motionTransition(reduce, { duration: 0.3 })}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
