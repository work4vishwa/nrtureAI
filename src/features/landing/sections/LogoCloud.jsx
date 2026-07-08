import { Aperture, Boxes, Command, Globe, Hexagon, Layers, Orbit, Zap } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Marquee } from '@/components/motion/Marquee'
import { cn } from '@/lib/cn'
import companies from '@/data/companies.json'

// Deterministic mark per company so the wordmarks feel like distinct brands.
const MARKS = [Hexagon, Zap, Globe, Aperture, Boxes, Command, Orbit, Layers]

function LogoItem({ name, Icon }) {
  return (
    <div className={cn('flex items-center gap-2.5 px-2 text-ink-muted transition-colors duration-300 motion-safe:hover:text-ink')}>
      <Icon className="size-6 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight">
        {name}
      </span>
    </div>
  )
}

export function LogoCloud() {
  return (
    <section
      className="border-y border-ink-muted/10 bg-surface-muted/50 py-12"
      aria-labelledby="logo-cloud-heading"
    >
      <Container>
        <p
          id="logo-cloud-heading"
          className="text-center text-sm font-medium uppercase tracking-widest text-ink-muted"
        >
          Trusted by fast-growing teams worldwide
        </p>
      </Container>

      {/* Edge fade masks for a polished bleed into the background */}
      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-muted/50 to-transparent sm:w-32" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-muted/50 to-transparent sm:w-32" aria-hidden="true" />

        <Marquee speed={40} gap={56} pauseOnHover label="Partner companies">
          {companies.map((company, i) => (
            <LogoItem key={company.id} name={company.name} Icon={MARKS[i % MARKS.length]} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
