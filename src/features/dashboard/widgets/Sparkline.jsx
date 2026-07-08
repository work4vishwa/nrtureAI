/**
 * Minimal inline sparkline chart.
 * @param {object} props
 * @param {number[]} props.data
 * @param {string} [props.stroke='currentColor']
 * @param {number} [props.width=96]
 * @param {number} [props.height=32]
 */
export function Sparkline({ data = [], stroke = 'currentColor', width = 96, height = 32 }) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)
  const pad = 3

  const points = data.map((v, i) => {
    const x = i * stepX
    const y = height - pad - ((v - min) / range) * (height - pad * 2)
    return [x, y]
  })

  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="overflow-visible"
      aria-hidden="true"
    >
      <path d={line} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
