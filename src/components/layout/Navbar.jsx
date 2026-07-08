import { lazy, Suspense, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/brand/Logo'
import { cn } from '@/lib/cn'
import { micro } from '@/lib/motion'
import { useScrolled } from '@/hooks/useScrolled'
import site from '@/data/site.json'

const MobileDrawer = lazy(() =>
  import('./MobileDrawer').then((m) => ({ default: m.MobileDrawer })),
)

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const scrolled = useScrolled(8)

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-colors duration-300',
          scrolled
            ? 'border-b border-ink-muted/10 bg-surface/80 backdrop-blur-lg supports-[backdrop-filter]:bg-surface/70'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container>
          <nav
            className="flex h-14 min-w-0 items-center justify-between gap-3 sm:h-16"
            aria-label="Primary"
          >
            <Logo size="sm" className="sm:hidden" />
            <Logo size="md" className="hidden sm:inline-flex" />

            <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        micro.linkUnderline,
                        'rounded px-0.5 text-sm font-medium transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                        isActive ? 'active text-ink' : 'text-ink-muted',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2 lg:flex lg:gap-3">
              <Button as={Link} to="/pricing" variant="ghost" size="sm">
                Sign in
              </Button>
              <Button as={Link} to={site.cta.href} size="sm">
                {site.cta.label}
              </Button>
            </div>

            <button
              type="button"
              className="grid size-11 shrink-0 place-items-center rounded-lg text-ink transition-colors hover:bg-ink-muted/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden motion-safe:transition-transform motion-safe:active:scale-95"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-dialog"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </nav>
        </Container>
      </header>

      {drawerOpen && (
        <Suspense fallback={null}>
          <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
