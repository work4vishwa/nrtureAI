import RC from 'react-countup'

/**
 * Normalized CountUp component.
 * Vite 8 / Rolldown can surface the CJS module namespace as the default export,
 * so unwrap `.default` when needed.
 */
const CountUp = typeof RC === 'function' ? RC : RC.default

export default CountUp
