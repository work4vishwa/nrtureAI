import { useEffect, useState } from 'react'

/**
 * Track whether the window has scrolled past a threshold.
 * @param {number} [threshold=8] - pixels scrolled before returning true
 * @returns {boolean}
 */
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > threshold,
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
