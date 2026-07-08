import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import site from '@/data/site.json'

const inputClass = (hasError) =>
  cn(
    'h-10 w-full min-w-0 rounded-lg border bg-white/90 px-3 text-sm text-ink placeholder:text-ink-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30',
    hasError
      ? 'border-red-400 focus:border-red-400'
      : 'border-ink-muted/15 hover:border-ink-muted/30 focus:border-brand-500',
  )

function Field({ id, label, error, children, required, className }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink-muted"
      >
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[11px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm({ className }) {
  const [submitted, setSubmitted] = useState(false)
  const { successTitle, successMessage, submitLabel } = site.contact

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', email: '', company: '', message: '' },
  })

  const onSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className={cn(
          'premium-card flex min-h-[14rem] flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-surface px-6 py-8 text-center',
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="size-9 text-emerald-500" aria-hidden="true" />
        <p className="mt-3 text-lg font-semibold text-ink">{successTitle}</p>
        <p className="mt-1 max-w-sm text-sm text-ink-muted">{successMessage}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        'premium-card rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_20px_50px_-24px_rgb(37_99_235/0.35)] backdrop-blur-sm sm:p-6',
        className,
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="contact-name" label="Full name" error={errors.name?.message} required>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Jordan Lee"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={inputClass(!!errors.name)}
            {...register('name', { required: 'Required' })}
          />
        </Field>

        <Field id="contact-email" label="Work email" error={errors.email?.message} required>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={inputClass(!!errors.email)}
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email',
              },
            })}
          />
        </Field>

        <Field
          id="contact-company"
          label="Company"
          error={errors.company?.message}
          className="sm:col-span-2"
        >
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            placeholder="Your brand or outlet group"
            className={inputClass(!!errors.company)}
            {...register('company')}
          />
        </Field>

        <Field
          id="contact-message"
          label="Message"
          error={errors.message?.message}
          required
          className="sm:col-span-2"
        >
          <textarea
            id="contact-message"
            rows={3}
            placeholder="Tell us about your outlets and what you'd like to improve..."
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={cn(inputClass(!!errors.message), 'h-auto resize-none py-2.5 leading-relaxed')}
            {...register('message', {
              required: 'Required',
              minLength: { value: 10, message: 'At least 10 characters' },
            })}
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-ink-muted/10 pt-5 sm:flex-row">
        <p className="text-center text-[11px] text-ink-muted sm:text-left">
          We&apos;ll use your details only to respond to this inquiry.
        </p>
        <Button type="submit" disabled={isSubmitting} className="w-full shrink-0 sm:w-auto">
          {submitLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
