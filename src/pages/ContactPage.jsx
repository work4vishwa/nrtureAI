import { Clock, Mail } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { ContactForm } from '@/features/contact/ContactForm'
import site from '@/data/site.json'

export default function ContactPage() {
  const { title, description } = site.contact

  return (
    <div className="relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden py-6 sm:min-h-[calc(100svh-4rem)] sm:py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 size-72 rounded-full bg-brand-400/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 size-64 rounded-full bg-accent-400/10 blur-3xl"
      />

      <Container className="relative w-full">
        <div className="mx-auto w-full max-w-2xl">
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Contact
            </p>
            <h1 className="section-title-gradient mt-2 text-2xl font-semibold sm:text-3xl">
              {title}
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
              {description}
            </p>

            <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <li className="inline-flex items-center gap-1.5 rounded-full border border-ink-muted/15 bg-surface/80 px-3 py-1 text-xs text-ink-muted backdrop-blur-sm">
                <Mail className="size-3.5 text-brand-600" aria-hidden="true" />
                hello@nrture.ai
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-ink-muted/15 bg-surface/80 px-3 py-1 text-xs text-ink-muted backdrop-blur-sm">
                <Clock className="size-3.5 text-brand-600" aria-hidden="true" />
                Reply within 1 business day
              </li>
            </ul>
          </header>

          <ContactForm className="mt-6 sm:mt-8" />
        </div>
      </Container>
    </div>
  )
}
