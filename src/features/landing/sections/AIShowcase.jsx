import { useId } from 'react'
import { BrainCircuit, Gauge, Hand } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Avatar } from '@/components/ui/Avatar'
import { GradientText } from '@/components/ui/GradientText'
import { Reveal } from '@/components/motion/Reveal'
import { AIProcessing } from '@/components/ai/AIProcessing'

const STEPS = [
  { id: 'review', label: 'Reading incoming review context' },
  { id: 'tone', label: 'Matching your approved brand tone' },
  { id: 'draft', label: 'Drafting a precise response' },
  { id: 'policy', label: 'Applying policy and compliance checks' },
  { id: 'handoff', label: 'Flagging edge cases for human approval' },
]

const HIGHLIGHTS = [
  { id: 'reasoning', label: 'Transparent, review-by-review reasoning', icon: BrainCircuit },
  { id: 'confidence', label: 'Confidence scoring before every publish', icon: Gauge },
  { id: 'handoff', label: 'Human handoff whenever needed', icon: Hand },
]

export function AIShowcase() {
  const headingId = useId()

  return (
    <section className="py-16 sm:py-20 md:py-28" aria-labelledby={headingId}>
      <Container className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Conversational AI
          </p>
          <h2 id={headingId} className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">
            Meet <GradientText>Elara</GradientText>, your review response copilot
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Elara reads each review, drafts an on-brand response, and runs quality
            checks before anything goes live. Your team stays in full control.
          </p>
          <ul className="mx-auto mt-6 max-w-md space-y-3 text-sm text-ink-muted lg:mx-0">
            {HIGHLIGHTS.map(({ id, label, icon: Icon }) => (
              <li key={id} className="flex items-center gap-2.5">
                <span className="grid size-6 place-items-center rounded-md bg-brand-100 text-brand-700" aria-hidden="true">
                  <Icon className="size-3.5" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full min-w-0 max-w-md space-y-4 lg:mx-0 lg:max-w-none">
          <div className="premium-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Avatar
                src="/team/elara.png"
                name="Elara"
                size="lg"
                loading="eager"
                fetchPriority="high"
              />
              <div>
                <p className="text-sm font-semibold text-ink">Elara AI</p>
                <p className="text-sm text-ink-muted">
                  Your conversational copilot for fast, high-quality review responses.
                </p>
              </div>
            </div>
          </div>
          <AIProcessing steps={STEPS} confidence={98} className="mx-auto max-w-md" />
        </Reveal>
      </Container>
    </section>
  )
}
