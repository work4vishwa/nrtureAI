import { Section } from '@/components/ui/Section'
import { CTA } from '@/features/landing/sections/CTA'

const principles = [
  'Visitor-first intelligence built for operators',
  'Transparent scoring with actionable guidance',
  'Human oversight for every AI-assisted response',
]

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="About Nrture.ai"
        title="Helping teams turn feedback into better experiences"
        description="Nrture.ai combines Social Reputation Score, benchmarking, reports, and Elara conversations so operators can improve guest experience with confidence."
      >
        <div className="mx-auto grid min-w-0 max-w-4xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          <article className="premium-card rounded-2xl border border-ink-muted/10 bg-surface p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-ink">Our mission</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              We help every location understand what guests feel, where they are falling behind, and
              what to improve next. Our platform focuses on practical decisions, not vanity metrics.
            </p>
          </article>

          <article className="premium-card rounded-2xl border border-ink-muted/10 bg-surface p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-ink">How we work</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              {principles.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <CTA />
    </>
  )
}
