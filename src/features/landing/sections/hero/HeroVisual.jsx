import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { DashboardMockup } from './DashboardMockup'

const EASE = [0.16, 1, 0.3, 1]

/** Hero product mockup — lazy-loaded to keep framer-motion off the critical path. */
export default function HeroVisual() {
  const reduce = usePrefersReducedMotion()
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onPointerMove = useCallback(
    (e) => {
      if (reduce || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ x: x * 6, y: -y * 6 })
    },
    [reduce],
  )

  const onPointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.95, y: 30 }}
      animate={reduce ? false : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : 0.2 }}
      className="relative mx-auto w-full min-w-0 max-w-xl pt-4 sm:pt-0"
    >
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={
          reduce
            ? undefined
            : {
                transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }
        }
      >
        <DashboardMockup />
      </div>
    </motion.div>
  )
}
