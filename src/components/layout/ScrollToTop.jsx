import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the top of the page when the route changes.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduce ? 'auto' : 'instant',
    })

    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname])

  return null
}
