import { lazy } from 'react'
import { Hero } from './sections/Hero'
import { LazySection } from '@/components/layout/LazySection'

const LogoCloud = lazy(() =>
  import('./sections/LogoCloud').then((m) => ({ default: m.LogoCloud })),
)
const Features = lazy(() =>
  import('./sections/Features').then((m) => ({ default: m.Features })),
)
const HowItWorks = lazy(() =>
  import('./sections/HowItWorks').then((m) => ({ default: m.HowItWorks })),
)
const AIShowcase = lazy(() =>
  import('./sections/AIShowcase').then((m) => ({ default: m.AIShowcase })),
)
const Testimonials = lazy(() =>
  import('./sections/Testimonials').then((m) => ({ default: m.Testimonials })),
)
const Pricing = lazy(() =>
  import('./sections/Pricing').then((m) => ({ default: m.Pricing })),
)
const FAQ = lazy(() => import('./sections/FAQ').then((m) => ({ default: m.FAQ })))
const CTA = lazy(() => import('./sections/CTA').then((m) => ({ default: m.CTA })))

export function LandingPage() {
  return (
    <>
      <Hero />
      <LazySection minHeight={88}>
        <LogoCloud />
      </LazySection>
      <LazySection minHeight={420}>
        <Features />
      </LazySection>
      <LazySection minHeight={480}>
        <HowItWorks />
      </LazySection>
      <LazySection minHeight={400}>
        <AIShowcase />
      </LazySection>
      <LazySection minHeight={320}>
        <Testimonials />
      </LazySection>
      <LazySection minHeight={520}>
        <Pricing />
      </LazySection>
      <LazySection minHeight={280}>
        <FAQ />
      </LazySection>
      <LazySection minHeight={200}>
        <CTA />
      </LazySection>
    </>
  )
}
