import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import workflow from '@/data/workflow.json'

const EASE = [0.16, 1, 0.3, 1]

function TimelineStep({ step, index }) {
  const Icon = getIcon(step.icon)
  const isLeft = index % 2 === 0

  return (
    <div className="relative pl-14 sm:pl-20 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
      {/* Animated node on the line */}
      <motion.div
        className="absolute left-5 top-0 z-10 -translate-x-1/2 sm:left-6 md:left-1/2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <span className="grid size-10 place-items-center rounded-2xl bg-brand-600 text-white shadow-glow ring-4 ring-surface sm:size-12">
          <Icon className="size-4 sm:size-5" aria-hidden="true" />
        </span>
      </motion.div>

      {/* Content card */}
      <motion.div
        className={cn(
          'pb-12 md:pb-16',
          isLeft
            ? 'md:col-start-1 md:pr-12 md:text-right'
            : 'md:col-start-2 md:pl-12',
        )}
        initial={{ opacity: 0, x: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span
          className={cn(
            'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400',
          )}
        >
          Step {String(step.step).padStart(2, '0')}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-ink sm:text-xl">{step.title}</h3>
        <p className="mt-2 text-sm text-ink-muted sm:text-base md:max-w-sm md:inline-block">
          {step.description}
        </p>
      </motion.div>
    </div>
  )
}

export function HowItWorks() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })
  const fillScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From connected to converting in four steps"
      description="Launch AI-powered engagement without touching a line of code."
    >
      <div ref={containerRef} className="relative mx-auto mt-4 max-w-4xl">
        {/* Track + animated fill line */}
        <div className="absolute bottom-0 left-5 top-0 w-0.5 -translate-x-1/2 bg-ink-muted/15 sm:left-6 md:left-1/2">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-brand-600 to-brand-400"
            style={{ scaleY: fillScale, height: '100%' }}
          />
        </div>

        <div>
          {workflow.steps.map((step, index) => (
            <TimelineStep key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}
