import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GradientText } from '@/components/ui/GradientText'
import { Avatar, AvatarGroup } from '@/components/ui/Avatar'
import { GradientBackdrop } from './hero/GradientBackdrop'
import site from '@/data/site.json'

const HeroVisual = lazy(() => import('./hero/HeroVisual'))

const TEAM = [
  { name: 'Elara', src: '/team/elara.png' },
  { name: 'Ava Chen' },
  { name: 'Ben Ford' },
  { name: 'Cara Diaz' },
  { name: 'Dev Rao' },
]

const visualFallback = (
  <div className="relative mx-auto w-full max-w-xl pt-4 sm:pt-0" aria-hidden="true">
    <div className="aspect-[5/4] w-full rounded-2xl bg-surface-muted/80 motion-safe:animate-pulse" />
  </div>
)

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <GradientBackdrop />

      <Container className="grid min-w-0 items-center gap-10 pt-8 pb-12 sm:gap-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 lg:grid-cols-2 lg:gap-10 lg:pt-16 lg:pb-24 xl:pt-20 xl:pb-28 2xl:max-w-[88rem]">
        <div className="min-w-0 text-center lg:text-left">
          <span className="hero-reveal inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[11px] font-medium text-brand-700 sm:px-4 sm:text-sm lg:justify-start">
            <Sparkles className="size-4" aria-hidden="true" />
            Introducing Elara for reputation teams
          </span>

          <h1
            id="hero-heading"
            className="hero-reveal hero-reveal-delay-1 mt-5 text-[1.75rem] font-semibold leading-[1.12] min-[400px]:text-3xl sm:mt-6 sm:text-5xl md:text-6xl"
          >
            Lead your market with{' '}
            <GradientText gradient="sunset">AI-powered reputation</GradientText>
          </h1>

          <p className="hero-reveal hero-reveal-delay-2 mx-auto mt-5 max-w-xl text-base text-ink-muted sm:text-lg lg:mx-0">
            Track SRS, benchmark peers, run quarterly reports, and manage review
            responses in one place — with Elara assisting every conversation.
          </p>

          <div className="hero-reveal hero-reveal-delay-2 mx-auto mt-5 flex w-full max-w-xl items-center gap-3 rounded-xl border border-brand-200/70 bg-white/80 px-3 py-2.5 text-left shadow-sm sm:inline-flex sm:w-auto lg:mx-0">
            <Avatar
              src="/team/elara.png"
              name="Elara"
              size="sm"
              loading="eager"
              fetchPriority="high"
              className="ring-2 ring-surface"
            />
            <p className="text-xs text-ink-muted sm:text-sm">
              <span className="font-semibold text-ink">Elara AI</span> drafts smart, on-brand
              review responses in seconds.
            </p>
          </div>

          <div className="hero-reveal hero-reveal-delay-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Button as={Link} to={site.cta.href} size="lg" className="w-full sm:w-auto">
              {site.cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              as={Link}
              to="/features"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <PlayCircle className="size-4" aria-hidden="true" />
              Watch demo
            </Button>
          </div>

          <div className="hero-reveal hero-reveal-delay-4 mt-8 flex w-full flex-col items-center gap-3 sm:mt-9 sm:flex-row lg:justify-start">
            <AvatarGroup items={TEAM} size="sm" />
            <p className="max-w-xs text-center text-sm text-ink-muted sm:max-w-none sm:text-left">
              <span className="font-semibold text-ink">Reputation teams</span> trust {site.name}{' '}
              for faster, consistent responses
            </p>
          </div>
        </div>

        <Suspense fallback={visualFallback}>
          <HeroVisual />
        </Suspense>
      </Container>
    </section>
  )
}
