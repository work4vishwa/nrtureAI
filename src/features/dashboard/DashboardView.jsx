import { Calendar, Download } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { KpiCards } from './widgets/KpiCards'
import { RevenueChart } from './widgets/RevenueChart'
import { ChannelDonut } from './widgets/ChannelDonut'
import { AutomationStatus } from './widgets/AutomationStatus'
import { GoalsCard } from './widgets/GoalsCard'
import { ReviewFeed } from './widgets/ReviewFeed'
import { NotificationsPanel } from './widgets/NotificationsPanel'
import dashboard from '@/data/dashboard.json'

export function DashboardView() {
  return (
    <div className="bg-surface-muted/40 py-6 sm:py-8 md:py-10">
      <Container className="min-w-0 space-y-5 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between lg:items-center">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-ink sm:text-2xl">Reputation Dashboard</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Live view of Social Reputation Score, response performance, and benchmark movement.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
            <Button variant="outline" size="sm" className="w-full justify-center sm:w-auto">
              <Calendar className="size-4" aria-hidden="true" />
              {dashboard.period}
            </Button>
            <Button size="sm" className="w-full justify-center sm:w-auto">
              <Download className="size-4" aria-hidden="true" />
              Export report
            </Button>
          </div>
        </div>

        {/* KPI row */}
        <KpiCards />

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <ChannelDonut />
        </div>

        {/* Automation + goals row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AutomationStatus />
          </div>
          <GoalsCard />
        </div>

        {/* Reviews + notifications row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ReviewFeed />
          </div>
          <NotificationsPanel />
        </div>
      </Container>
    </div>
  )
}
