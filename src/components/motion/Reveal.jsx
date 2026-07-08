import { motion } from 'framer-motion'
import { MOTION, motionTransition } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Scroll-triggered reveal. Fades + slides content into view once.
 * @param {{ delay?: number, y?: number, className?: string, children: React.ReactNode }} props
 */
export function Reveal({ delay = 0, y = 24, className, children }) {
  const reduce = usePrefersReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={motionTransition(false, { duration: MOTION.durations.slow, delay })}
    >
      {children}
    </motion.div>
  )
}
