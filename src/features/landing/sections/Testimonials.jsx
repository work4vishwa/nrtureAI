import { Section } from '@/components/ui/Section'
import { TestimonialCarousel } from '@/components/testimonials/TestimonialCarousel'
import testimonials from '@/data/testimonials.json'

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      eyebrow="Testimonials"
      title="Trusted by reputation teams everywhere"
      description="See why teams rely on Nrture.ai to improve response quality, consistency, and review outcomes."
    >
      <TestimonialCarousel items={testimonials} className="mx-auto w-full max-w-3xl px-4 sm:px-14 md:px-16" />
    </Section>
  )
}
