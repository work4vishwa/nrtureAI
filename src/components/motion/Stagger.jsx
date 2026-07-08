import { motion } from 'framer-motion'
import { MOTION } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.durations.base, ease: MOTION.ease },
  },
}

/** Staggered parent container. Skips animation when reduced motion is preferred. */
export function Stagger({ className, children }) {
  const reduce = usePrefersReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

/** Staggered child item. Renders a plain div when reduced motion is preferred. */
export function StaggerItem({ className, children }) {
  const reduce = usePrefersReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}
