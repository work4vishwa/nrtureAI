import { lazy } from 'react'
import { Link } from 'react-router-dom'
import { AtSign, Briefcase, Code2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/brand/Logo'
import { LazySection } from './LazySection'
import { cn } from '@/lib/cn'
import { micro } from '@/lib/motion'
import site from '@/data/site.json'

const NewsletterSignup = lazy(() =>
  import('./NewsletterSignup').then((m) => ({ default: m.NewsletterSignup })),
)

const socialIcons = { twitter: AtSign, github: Code2, linkedin: Briefcase }

function FooterLink({ href, children }) {
  const external = href.startsWith('http')
  const className = cn(
    'text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:rounded',
    micro.linkUnderline,
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-ink-muted/10 bg-surface-muted">
      <Container className="py-12 sm:py-14 md:py-16">
        {/* Top row: brand + newsletter */}
        <div className="grid gap-10 border-b border-ink-muted/10 pb-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Logo size="lg" />
            <p className="mt-4 max-w-sm text-sm text-ink-muted">{site.tagline}</p>

            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {site.social.map((s) => {
                const Icon = socialIcons[s.icon]
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={cn(
                        'grid size-11 place-items-center rounded-xl border border-ink-muted/20 bg-surface text-ink-muted transition-colors hover:border-brand-500 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                        micro.lift,
                      )}
                    >
                      {Icon && <Icon className="size-4" aria-hidden="true" />}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <LazySection minHeight={148} rootMargin="120px 0px">
            <NewsletterSignup />
          </LazySection>
        </div>

        {/* Link groups */}
        <nav
          className="grid grid-cols-2 gap-8 pt-10 sm:pt-12 md:grid-cols-4"
          aria-label="Footer"
        >
          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-muted/10 pt-8 text-sm text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
            <FooterLink href="#">Cookies</FooterLink>
          </div>
        </div>
      </Container>
    </footer>
  )
}
