/** Shared motion tokens and helpers. */

export const MOTION = {
  ease: [0.16, 1, 0.3, 1],
  durations: { fast: 0.15, base: 0.3, slow: 0.5 },
}

/**
 * Framer Motion transition that collapses to instant when reduced motion is on.
 * @param {boolean} reduce
 * @param {object} [overrides]
 */
export function motionTransition(reduce, overrides = {}) {
  if (reduce) return { duration: 0 }
  return { ease: MOTION.ease, ...overrides }
}

/**
 * GPU-friendly CSS microinteraction classes.
 * All are gated behind the `motion-safe` variant (no-preference only).
 */
export const micro = {
  /** Subtle press feedback on click/tap */
  press:
    'motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:active:scale-[0.98]',
  /** Hover lift for tiles (not cards) */
  lift: 'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-0.5',
  /** Neon cyan border glow on hover — no lift or fill shift */
  neonBorder:
    'neon-border neon-border-hover transition-[border-color,box-shadow] duration-300',
  /** Persistent neon border (e.g. highlighted plan) */
  neonBorderActive: 'neon-border neon-border-active',
  /** Nav link underline slide */
  linkUnderline:
    'relative after:pointer-events-none after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-600 after:transition-transform after:duration-200 motion-safe:hover:after:scale-x-100 motion-safe:[&.active]:after:scale-x-100',
  /** Icon nudge inside a group on hover */
  iconNudge:
    'motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5',
  /** Soft brightness bump for filled surfaces */
  brighten: 'motion-safe:transition-[filter,transform] motion-safe:duration-200 motion-safe:hover:brightness-105',
}
