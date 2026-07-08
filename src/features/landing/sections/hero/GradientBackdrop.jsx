/**
 * Ambient animated gradient background for the hero.
 * Pure CSS animation (blobs + subtle grid); automatically stilled
 * for users with `prefers-reduced-motion` via the global reset.
 */
export function GradientBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_50%,#EFF6FF_100%)]"
      aria-hidden="true"
    >
      {/* Animated color blobs */}
      <div className="absolute -left-24 -top-24 size-[32rem] rounded-full bg-brand-200/50 blur-3xl [animation:var(--animate-blob)]" />
      <div className="absolute -right-24 top-10 size-[28rem] rounded-full bg-accent-400/20 blur-3xl [animation:var(--animate-blob)] [animation-delay:-5s]" />
      <div className="absolute bottom-[-8rem] left-1/3 size-[26rem] rounded-full bg-brand-100/70 blur-3xl [animation:var(--animate-blob)] [animation-delay:-9s]" />

      {/* Subtle moving grid */}
      <div className="absolute inset-0 opacity-[0.1] [animation:var(--animate-grid)] [background-image:linear-gradient(to_right,rgb(var(--color-ink-muted)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--color-ink-muted)/0.2)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* AI circuit traces and node points */}
      <div className="absolute inset-0 opacity-[0.18] [animation:var(--animate-grid)] [background-image:repeating-linear-gradient(120deg,transparent_0_18px,rgb(37_99_235/0.14)_18px_19px,transparent_19px_52px),radial-gradient(circle_at_1px_1px,rgb(37_99_235/0.18)_1.2px,transparent_1.4px)] [background-size:220px_220px,26px_26px]" />

      {/* Soft data rings */}
      <div className="absolute left-[-8rem] top-8 size-[26rem] rounded-full border border-brand-300/35 [mask-image:radial-gradient(circle,transparent_58%,black_59%)]" />
      <div className="absolute bottom-[-7rem] right-[-5rem] size-[22rem] rounded-full border border-accent-400/30 [mask-image:radial-gradient(circle,transparent_60%,black_61%)]" />

      {/* Fade grid toward the bottom for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface" />
    </div>
  )
}
