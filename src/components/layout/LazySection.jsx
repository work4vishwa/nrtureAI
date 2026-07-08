import { Suspense, useEffect, useRef, useState } from 'react'

/**
 * Mounts children (typically a lazy route/section) when near the viewport.
 * Reserves min-height before load to limit CLS.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.minHeight=240] - reserved height in px before content loads
 * @param {string} [props.rootMargin='240px 0px'] - IntersectionObserver root margin
 * @param {string} [props.className]
 */
export function LazySection({ children, minHeight = 240, rootMargin = '240px 0px', className }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div
      ref={ref}
      className={className}
      style={visible ? undefined : { minHeight }}
    >
      {visible ? (
        <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
          <div className="[content-visibility:auto]">{children}</div>
        </Suspense>
      ) : null}
    </div>
  )
}
