import { useMediaQuery } from './useMediaQuery'

/** @returns {boolean} true if the user prefers reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
