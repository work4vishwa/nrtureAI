import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import site from '@/data/site.json'

/**
 * Newsletter signup form — client-side only, no backend.
 * @param {object} props
 * @param {string} [props.className]
 */
export function NewsletterSignup({ className }) {
  const [submitted, setSubmitted] = useState(false)
  const { title, description, placeholder, buttonLabel, successMessage } = site.footer.newsletter

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '' } })

  const onSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className={cn(
          'flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5',
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" aria-hidden="true" />
        <p className="text-sm text-ink">{successMessage}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-muted">{description}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4" noValidate>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder={placeholder}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
              className={cn(
                'h-11 w-full min-w-0 rounded-xl border bg-surface px-3.5 text-sm text-ink placeholder:text-ink-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40',
                errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-ink-muted/20 focus:border-brand-500',
              )}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full shrink-0 sm:w-auto sm:px-6">
            {buttonLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
        {errors.email && (
          <p id="newsletter-email-error" className="mt-1.5 text-xs font-medium text-red-500">
            {errors.email.message}
          </p>
        )}
      </form>
    </div>
  )
}
