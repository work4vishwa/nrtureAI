import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import dashboard from '@/data/dashboard.json'

function format(value, prefix = '', suffix = '') {
  return `${prefix}${value.toLocaleString()}${suffix}`
}

export function GoalsCard() {
  return (
    <Card padding="md" className="flex h-full flex-col">
      <p className="text-sm font-semibold text-ink">Quarterly improvement goals</p>

      <ul className="mt-4 space-y-5">
        {dashboard.goals.map((goal) => {
          const pct = Math.round((goal.current / goal.target) * 100)
          const prefix = goal.prefix ?? ''
          const suffix = goal.suffix ?? ''
          return (
            <li key={goal.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-muted">{goal.label}</span>
                <span className="font-semibold text-ink">{pct}%</span>
              </div>
              <Progress
                value={goal.current}
                max={goal.target}
                color={pct >= 90 ? 'success' : 'brand'}
                size="md"
                label={goal.label}
                className="mt-2"
              />
              <p className="mt-1.5 text-xs text-ink-muted">
                {format(goal.current, prefix, suffix)} of {format(goal.target, prefix, suffix)}
              </p>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
