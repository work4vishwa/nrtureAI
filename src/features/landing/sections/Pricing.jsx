import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { cn } from '@/lib/cn'
import { micro } from '@/lib/motion'
import pricing from '@/data/pricing.json'

const PLAN_IDS = ['lite', 'lite-plus', 'pro', 'enterprise']

function formatPrice(plan) {
  if (plan.priceLabel) return plan.priceLabel
  return `${pricing.currencySymbol}${plan.priceMonthly}`
}

function PriceCard({ plan }) {
  const price = formatPrice(plan)
  const isCustom = plan.priceLabel === 'Custom'

  return (
    <StaggerItem className="h-full">
      <div
        className={cn(
          'relative flex h-full flex-col rounded-2xl bg-surface p-6 premium-card premium-card-hover',
          plan.popular ? micro.neonBorderActive : micro.neonBorder,
        )}
      >
        {(plan.badge || plan.popular) && (
          <Badge variant="brand" className="absolute -top-3 left-1/2 -translate-x-1/2">
            {plan.badge ?? 'Most popular'}
          </Badge>
        )}

        <div>
          <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
          <p className="mt-1 text-sm text-ink-muted">{plan.description}</p>
        </div>

        <div className="mt-6">
          <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {price}
            {!isCustom && (
              <span className="text-base font-normal text-ink-muted">/month</span>
            )}
          </p>
        </div>

        <Button
          as={Link}
          to={plan.cta.href}
          variant={plan.popular ? 'primary' : 'outline'}
          className="mt-6 w-full"
        >
          {plan.cta.label}
        </Button>

        <ul className="mt-6 flex-1 space-y-3 border-t border-ink-muted/10 pt-6">
          {plan.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </StaggerItem>
  )
}

function CellValue({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex justify-center">
        <Check className="size-4 text-emerald-500" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex justify-center">
        <X className="size-4 text-ink-muted/40" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    )
  }
  return <span className="text-sm text-ink">{value}</span>
}

function ComparisonTable() {
  return (
    <div className="mt-12 sm:mt-16">
      <p className="mb-3 text-center text-xs text-ink-muted lg:hidden">
        Swipe horizontally to compare plans
      </p>
      <div className="-mx-4 overflow-x-auto rounded-2xl border border-ink-muted/10 premium-card sm:mx-0">
        <table className="w-full min-w-[36rem] border-collapse text-left sm:min-w-[720px]">
        <caption className="sr-only">Feature comparison across plans</caption>
        <thead>
          <tr className="border-b border-ink-muted/10 bg-surface-muted/50">
            <th
              scope="col"
              className="sticky left-0 z-10 bg-surface-muted/95 px-3 py-3 text-xs font-semibold text-ink backdrop-blur-sm sm:px-4 sm:py-4 sm:text-sm md:px-6"
            >
              Features
            </th>
            {pricing.plans.map((plan) => (
              <th
                key={plan.id}
                scope="col"
                className={cn(
                  'px-3 py-3 text-center text-xs font-semibold sm:px-4 sm:py-4 sm:text-sm md:px-6',
                  plan.popular ? 'text-brand-600' : 'text-ink',
                )}
              >
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricing.comparison.map((row, i) => (
            <tr
              key={row.feature}
              className={cn(
                'border-b border-ink-muted/10 last:border-0',
                i % 2 === 0 && 'bg-surface-muted/30',
              )}
            >
              <th
                scope="row"
                className={cn(
                  'sticky left-0 z-10 px-3 py-3 text-xs font-medium text-ink-muted backdrop-blur-sm sm:px-4 sm:py-3.5 sm:text-sm md:px-6',
                  i % 2 === 0 ? 'bg-surface-muted/95' : 'bg-surface/95',
                )}
              >
                {row.feature}
              </th>
              {PLAN_IDS.map((id) => (
                <td key={id} className="px-3 py-3 text-center sm:px-4 sm:py-3.5 md:px-6">
                  <CellValue value={row[id]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Plans that grow with your reputation program"
      description={pricing.billingNote}
    >
      <Stagger className="mt-8 grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 xl:mt-10 xl:grid-cols-4 xl:gap-6">
        {pricing.plans.map((plan) => (
          <PriceCard key={plan.id} plan={plan} />
        ))}
      </Stagger>

      <ComparisonTable />
    </Section>
  )
}
