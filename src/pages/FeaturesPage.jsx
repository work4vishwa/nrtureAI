import { Features } from '@/features/landing/sections/Features'
import { HowItWorks } from '@/features/landing/sections/HowItWorks'
import { AIShowcase } from '@/features/landing/sections/AIShowcase'
import { CTA } from '@/features/landing/sections/CTA'

export default function FeaturesPage() {
  return (
    <>
      <Features />
      <HowItWorks />
      <AIShowcase />
      <CTA />
    </>
  )
}
