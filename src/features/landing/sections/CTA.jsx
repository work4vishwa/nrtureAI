import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Bot, LineChart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Avatar } from '@/components/ui/Avatar'
import { GradientText } from '@/components/ui/GradientText'
import { Reveal } from '@/components/motion/Reveal'
import { micro } from '@/lib/motion'
import { cn } from '@/lib/cn'

const OUTCOMES = [
  { id: 'srs', label: 'Track your live SRS across every outlet', icon: LineChart },
  { id: 'peers', label: 'Benchmark against category leaders', icon: BarChart3 },
  { id: 'elara', label: 'Respond faster with Elara draft assistance', icon: Bot },
]

export function CTA() {
  return (
    <section className="py-16 sm:py-20 md:py-28" aria-labelledby="cta-heading">
      <Container>
        <Reveal className="relative overflow-hidden rounded-2xl border border-brand-200/60 bg-[linear-gradient(135deg,#EFF6FF_0%,#EEF2FF_45%,#F0F9FF_100%)] px-4 py-10 sm:rounded-3xl sm:px-6 sm:py-14 md:px-12 md:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-accent-400/20 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
                Get started
              </p>
              <h2
                id="cta-heading"
                className="mt-3 text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl"
              >
                Turn feedback into a higher{' '}
                <GradientText gradient="sunset">reputation score</GradientText>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted sm:text-lg lg:mx-0">
                Join operators who use Nrture.ai to monitor SRS, close the gap on
                peers, and publish on-brand responses — with{' '}
                <span className="font-medium text-ink">Elara</span> handling the heavy
                lifting.
              </p>

              <ul className="mx-auto mt-6 max-w-xl space-y-3 text-left lg:mx-0">
                {OUTCOMES.map(({ id, label, icon: Icon }) => (
                  <li key={id} className="flex items-start gap-3 text-sm text-ink-muted sm:text-base">
                    <span
                      className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border border-brand-200 bg-white/80 text-brand-600"
                      aria-hidden="true"
                    >
                      <Icon className="size-3.5" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                <Button as={Link} to="/contact" size="lg" className="w-full shadow-none sm:w-auto">
                  Book a demo
                  <ArrowRight className={cn('size-4', micro.iconNudge)} aria-hidden="true" />
                </Button>
                <Button
                  as={Link}
                  to="/dashboard"
                  variant="outline"
                  size="lg"
                  className="w-full bg-white/70 sm:w-auto"
                >
                  See the dashboard
                </Button>
              </div>
            </div>

            <div className="premium-card min-w-0 rounded-2xl border border-white/70 bg-white/75 p-5 text-center backdrop-blur-sm sm:p-7 lg:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <Avatar
                  src="/team/elara.png"
                  name="Elara"
                  size="lg"
                  className="ring-4 ring-brand-100"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-600">Elara AI</p>
                  <p className="mt-1 text-lg font-semibold text-ink">
                    Your reputation copilot, ready on day one
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Elara reads incoming reviews, drafts context-aware replies in your
                brand voice, and flags anything that needs a human touch — so your
                team stays fast without losing control.
              </p>
              <p className="mt-5 rounded-xl border border-brand-100 bg-brand-50/80 px-4 py-3 text-sm text-ink-muted">
                <span className="font-semibold text-ink">Lite starts at $59/month</span>
                {' '}with Elara as your AI Social Reputation Manager.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
