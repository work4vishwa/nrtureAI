import { useEffect } from 'react'

/**
 * Lock body scroll while `locked` is true (e.g. when a modal is open).
 * @param {boolean} locked
 */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}
