import { Bell, CheckCircle2, Info, MessageSquare, TriangleAlert } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import dashboard from '@/data/dashboard.json'

const TYPE = {
  success: { icon: CheckCircle2, cls: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  info: { icon: Info, cls: 'bg-brand-500/10 text-brand-600 dark:text-brand-400' },
  warning: { icon: TriangleAlert, cls: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  message: { icon: MessageSquare, cls: 'bg-accent-500/10 text-accent-500' },
}

export function NotificationsPanel() {
  const unread = dashboard.notifications.filter((n) => !n.read).length

  return (
    <Card padding="md" className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Bell className="size-4 text-ink-muted" aria-hidden="true" />
          Notifications
        </p>
        {unread > 0 && (
          <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white">
            {unread} new
          </span>
        )}
      </div>

      <ul className="mt-4 space-y-1">
        {dashboard.notifications.map((n) => {
          const t = TYPE[n.type] ?? TYPE.info
          const Icon = t.icon
          return (
            <li
              key={n.id}
              className={cn(
                'flex gap-3 rounded-xl p-3 transition-colors hover:bg-ink-muted/5',
                !n.read && 'bg-ink-muted/[0.03]',
              )}
            >
              <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg', t.cls)}>
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-ink">{n.title}</p>
                  {!n.read && <span className="size-2 shrink-0 rounded-full bg-brand-500" aria-label="Unread" />}
                </div>
                <p className="text-sm text-ink-muted">{n.message}</p>
                <p className="mt-0.5 text-xs text-ink-muted/70">{n.time}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
