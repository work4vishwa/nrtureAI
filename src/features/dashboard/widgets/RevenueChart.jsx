import { useId } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import dashboard from '@/data/dashboard.json'

const W = 600
const H = 220
const PAD_TOP = 20
const PAD_BOTTOM = 8

export function RevenueChart() {
  const gradId = useId()
  const { points, unit, label, prefix = '', suffix = '', ariaLabel } = dashboard.revenueSeries
  const values = points.map((p) => p.value)
  const maxV = Math.max(...values) * 1.1
  const stepX = W / (points.length - 1)

  const coords = points.map((p, i) => {
    const x = i * stepX
    const y = H - PAD_BOTTOM - (p.value / maxV) * (H - PAD_TOP - PAD_BOTTOM)
    return [x, y]
  })

  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${W},${H} L0,${H} Z`
  const total = values[values.length - 1]

  return (
    <Card padding="md" className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-muted">{label}</p>
          <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
            {prefix}
            {total.toLocaleString()}
            {suffix}
          </p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          {unit}
        </span>
      </div>

      <div className="mt-6 flex-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="h-44 w-full"
          role="img"
          aria-label={ariaLabel}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(8 145 178)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(8 145 178)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1="0"
              x2={W}
              y1={H * g}
              y2={H * g}
              stroke="currentColor"
              strokeWidth="1"
              className="text-ink-muted/10"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <motion.path
            d={area}
            fill={`url(#${gradId})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="rgb(8 145 178)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        <div className="mt-3 flex justify-between gap-1 overflow-x-auto text-[10px] text-ink-muted sm:text-xs">
          {points.map((p) => (
            <span key={p.month} className="shrink-0">
              {p.month}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}
