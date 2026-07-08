import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { getIcon } from '@/lib/icons'
import { cn } from '@/lib/cn'
import { micro } from '@/lib/motion'
import features from '@/data/features.json'

const CARD_CLASS =
  'group relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-2xl bg-surface p-5 premium-card premium-card-hover sm:min-h-0 sm:p-6'

function FeatureCardContent({ feature, Icon }) {
  return (
    <>
      {feature.badge && (
        <span className="absolute right-4 top-4 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
          {feature.badge}
        </span>
      )}

      <div className="grid size-12 place-items-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600">
        <Icon className="size-6" aria-hidden="true" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-ink">{feature.title}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-muted">{feature.description}</p>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
        Learn more
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </span>
    </>
  )
}

function StandardFeatureCard({ feature }) {
  const Icon = getIcon(feature.icon)

  return (
    <StaggerItem className="h-full">
      <div className={cn(CARD_CLASS, micro.neonBorder, micro.press)}>
        <FeatureCardContent feature={feature} Icon={Icon} />
      </div>
    </StaggerItem>
  )
}

function ElaraFeatureCard({ feature }) {
  const Icon = getIcon(feature.icon)

  return (
    <StaggerItem className="h-full">
      <div className={cn(CARD_CLASS, micro.neonBorderActive, micro.press)}>
        <img
          src="/team/elara.png"
          alt=""
          aria-hidden="true"
          decoding="async"
          className="elara-portrait-beside pointer-events-none absolute right-0 top-0 z-0 h-full w-auto max-w-[44%] object-contain object-top"
        />
        <div className="relative z-10 flex h-full max-w-[70%] flex-col">
          <FeatureCardContent feature={feature} Icon={Icon} />
        </div>
      </div>
    </StaggerItem>
  )
}

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title="Everything you need to manage reputation with AI"
      description="Monitor SRS, benchmark peers, explore your dashboard, publish reports, respond to reviews, and automate conversations with Elara."
    >
      <Stagger className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {features.map((feature) =>
          feature.id === 'conversational-ai-elara' ? (
            <ElaraFeatureCard key={feature.id} feature={feature} />
          ) : (
            <StandardFeatureCard key={feature.id} feature={feature} />
          ),
        )}
      </Stagger>
    </Section>
  )
}
