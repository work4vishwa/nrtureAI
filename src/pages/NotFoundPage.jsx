import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFoundPage() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-5xl font-semibold text-brand-600 sm:text-6xl" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-ink-muted">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Button as={Link} to="/" className="mt-8">
        Back home
      </Button>
    </Container>
  )
}
