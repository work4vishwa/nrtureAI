/** Selectors for focusable elements inside dialogs and drawers. */
export const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Handle arrow / Home / End navigation inside a roving list of controls.
 * @param {KeyboardEvent} e
 * @param {number} index - current item index
 * @param {number} count - total items
 * @param {(next: number) => void} onSelect
 */
export function handleRovingKeyDown(e, index, count, onSelect) {
  if (count <= 1) return

  let next = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % count
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + count) % count
  if (e.key === 'Home') next = 0
  if (e.key === 'End') next = count - 1

  if (next !== null) {
    e.preventDefault()
    onSelect(next)
  }
}

/**
 * Trap Tab focus inside a container element.
 * @param {KeyboardEvent} e
 * @param {HTMLElement} container
 */
export function trapFocus(e, container) {
  if (e.key !== 'Tab') return

  const items = [...container.querySelectorAll(FOCUSABLE)]
  if (items.length === 0) return

  const first = items[0]
  const last = items[items.length - 1]

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}
