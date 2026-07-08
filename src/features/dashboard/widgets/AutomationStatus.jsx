import { CircleCheck, CirclePause, TriangleAlert } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { cn } from '@/lib/cn'
import dashboard from '@/data/dashboard.json'

const STATUS = {
  active: { label: 'Active', icon: CircleCheck, cls: 'text-emerald-600 dark:text-emerald-400', bar: 'success' },
  paused: { label: 'Paused', icon: CirclePause, cls: 'text-ink-muted', bar: 'brand' },
  error: { label: 'Error', icon: TriangleAlert, cls: 'text-red-600 dark:text-red-400', bar: 'danger' },
}

export function AutomationStatus() {
  return (
    <Card padding="md" className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Response automation status</p>
        <span className="text-xs text-ink-muted">{dashboard.automations.length} playbooks</span>
      </div>

      <ul className="mt-4 space-y-4">
        {dashboard.automations.map((a) => {
          const s = STATUS[a.status]
          const Icon = s.icon
          return (
            <li key={a.id}>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Icon className={cn('size-4', s.cls)} aria-hidden="true" />
                  {a.name}
                </span>
                <span className={cn('text-xs font-semibold', s.cls)}>{s.label}</span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Progress
                  value={a.successRate}
                  color={s.bar}
                  size="sm"
                  label={`${a.name} success rate`}
                  className="flex-1"
                />
                <span className="w-24 text-right text-xs text-ink-muted">
                  {a.runs.toLocaleString()} runs
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
