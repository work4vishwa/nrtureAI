import CountUp from '@/lib/CountUp'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import { Sparkline } from './Sparkline'
import dashboard from '@/data/dashboard.json'

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
      {dashboard.kpis.map((kpi) => {
        const up = kpi.trend === 'up'
        const Trend = up ? TrendingUp : TrendingDown

        return (
          <Card key={kpi.id} padding="md" className="flex min-w-0 flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 text-xs text-ink-muted sm:text-sm">{kpi.label}</p>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                  up
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400',
                )}
              >
                <Trend className="size-3" aria-hidden="true" />
                {Math.abs(kpi.delta)}%
              </span>
            </div>

            <div className="flex items-end justify-between gap-2">
              <p className="min-w-0 font-display text-lg font-semibold text-ink sm:text-xl md:text-2xl">
                {kpi.prefix}
                <CountUp end={kpi.value} duration={1.5} separator="," enableScrollSpy scrollSpyOnce />
                {kpi.suffix}
              </p>
              <span className={cn('shrink-0', up ? 'text-emerald-500' : 'text-red-500')}>
                <Sparkline data={kpi.spark} />
              </span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
