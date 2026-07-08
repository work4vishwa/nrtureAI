import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Infinite, seamless auto-scrolling marquee.
 * Renders two copies of its children and advances a motion value each
 * frame, wrapping at one period for a gap-free loop. Optionally pauses
 * on hover and fully halts for `prefers-reduced-motion` users.
 *
 * @param {object} props
 * @param {number} [props.speed=40] - scroll speed in pixels per second
 * @param {number} [props.gap=48] - space between items in pixels
 * @param {'left'|'right'} [props.direction='left']
 * @param {boolean} [props.pauseOnHover=true]
 * @param {string} [props.label='Scrolling content']
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Marquee({
  speed = 40,
  gap = 48,
  direction = 'left',
  pauseOnHover = true,
  label = 'Scrolling content',
  className,
  children,
}) {
  const reduce = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const groupRef = useRef(null)
  const paused = useRef(false)
  const [period, setPeriod] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (groupRef.current) setPeriod(groupRef.current.offsetWidth + gap)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [gap, children])

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current || !period) return
    const distance = (speed * delta) / 1000
    let next = direction === 'left' ? x.get() - distance : x.get() + distance
    if (next <= -period) next += period
    if (next >= 0) next -= period
    x.set(next)
  })

  return (
    <div
      role="region"
      aria-label={label}
      aria-live="off"
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => pauseOnHover && (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) paused.current = false
      }}
    >
      <motion.div className="flex w-max" style={{ x: reduce ? 0 : x, gap }}>
        <div ref={groupRef} className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        {!reduce && (
          <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden="true">
            {children}
          </div>
        )}
      </motion.div>
    </div>
  )
}
