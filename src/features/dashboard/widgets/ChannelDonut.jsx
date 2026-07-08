import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import dashboard from '@/data/dashboard.json'

const SIZE = 160
const STROKE = 22
const R = (SIZE - STROKE) / 2
const C = 2 * Math.PI * R

export function ChannelDonut() {
  const data = dashboard.channelBreakdown
  const total = data.reduce((sum, d) => sum + d.value, 0)

  let offset = 0
  const segments = data.map((d) => {
    const fraction = d.value / total
    const seg = { ...d, dash: fraction * C, gap: C - fraction * C, rotation: (offset / total) * 360 }
    offset += d.value
    return seg
  })

  return (
    <Card padding="md" className="flex h-full flex-col">
      <p className="text-sm text-ink-muted">Review volume by source</p>

      <div className="mt-4 flex flex-1 flex-col items-center gap-5 sm:flex-row sm:justify-around">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg width={SIZE} height={SIZE} className="-rotate-90">
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              strokeWidth={STROKE}
              className="stroke-ink-muted/10"
            />
            {segments.map((s) => (
              <motion.circle
                key={s.channel}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={R}
                fill="none"
                stroke={s.color}
                strokeWidth={STROKE}
                strokeLinecap="butt"
                strokeDasharray={`${s.dash} ${s.gap}`}
                style={{ rotate: `${s.rotation}deg`, transformOrigin: 'center' }}
                initial={{ strokeDasharray: `0 ${C}` }}
                whileInView={{ strokeDasharray: `${s.dash} ${s.gap}` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="font-display text-2xl font-semibold text-ink">{total}%</p>
              <p className="text-xs text-ink-muted">total</p>
            </div>
          </div>
        </div>

        <ul className="w-full min-w-0 space-y-2 sm:w-auto">
          {data.map((d) => (
            <li key={d.channel} className="flex items-center justify-between gap-6 text-sm">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-ink-muted">{d.channel}</span>
              </span>
              <span className="font-semibold text-ink">{d.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
