import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import {
  BOOKING_COPY,
  BOOKING_PACKAGES,
  BUSINESS,
  LOCATIONS,
  TIME_WINDOWS,
  VEHICLE_SIZES,
  type VehicleSize,
} from '../data/detailingData'
import { EMPTY_BOOKING, MAX_DAYS_AHEAD, makeBookingSchema, toISODate, type BookingValues } from '../lib/bookingSchema'
import { buildBookingPayload } from '../lib/bookingPayload'
import { submitBooking } from '../lib/submitBooking'

export interface BookingPrefill {
  packageId: string
  vehicleType: VehicleSize
  /** Changes on every package click so the same selection can be applied twice. */
  nonce: number
}

const inputClass =
  'mt-2 w-full rounded-md border border-brand-border bg-brand-bg px-4 py-3 text-brand-text placeholder:text-slate-500 focus:border-brand-primary focus:shadow-[inset_0_0_0_1px_rgba(220,38,38,0.6)] focus:outline-none aria-[invalid=true]:border-red-500'

function Field({ id, label, error, children, className = '' }: { id: string; label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-brand-text">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export function BookingForm({ prefill }: { prefill: BookingPrefill | null }) {
  const today = toISODate(new Date())
  const maxDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + MAX_DAYS_AHEAD)
    return toISODate(d)
  }, [])
  const schema = useMemo(() => makeBookingSchema(today), [today])
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({ resolver: zodResolver(schema), defaultValues: EMPTY_BOOKING })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const inFlight = useRef(false)
  const successHeading = useRef<HTMLHeadingElement>(null)
  const isMobile = watch('location') === 'mobile'

  useEffect(() => {
    if (!prefill) return
    setValue('package', prefill.packageId, { shouldValidate: false })
    setValue('vehicleType', prefill.vehicleType, { shouldValidate: false })
  }, [prefill, setValue])

  useEffect(() => {
    if (status === 'success') successHeading.current?.focus()
  }, [status])

  const onSubmit = async (values: BookingValues) => {
    if (inFlight.current) return
    inFlight.current = true
    setStatus('idle')
    try {
      await submitBooking(buildBookingPayload(values))
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      inFlight.current = false
    }
  }

  const a11y = (name: keyof BookingValues) => ({
    id: name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const phoneLink = (
    <a href={BUSINESS.phoneHref} className="font-semibold text-white underline underline-offset-2">
      {BUSINESS.phoneDisplay}
    </a>
  )

  return (
    <section id="booking" aria-labelledby="booking-title" className="bg-brand-topbar py-20">
      <div className="container-page max-w-3xl">
        <h2 id="booking-title" className="section-title text-center">
          {BOOKING_COPY.title}
        </h2>

        {status === 'success' ? (
          <div className="mt-10 rounded-md border border-brand-primary bg-brand-card p-8 text-center">
            <h3 ref={successHeading} tabIndex={-1} className="text-2xl font-bold text-brand-text">
              {BOOKING_COPY.successTitle}
            </h3>
            <p className="mt-4 leading-relaxed text-brand-muted">{BOOKING_COPY.successText}</p>
            <p className="mt-4 text-brand-muted">Need immediate assistance? Call or Text us directly at {phoneLink}.</p>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-5 rounded-md border border-brand-border bg-brand-card p-6 sm:grid-cols-2 sm:p-8">
            <Field id="fullName" label="Full Name" error={errors.fullName?.message}>
              <input type="text" autoComplete="name" placeholder="John Doe" className={inputClass} {...register('fullName')} {...a11y('fullName')} />
            </Field>
            <Field id="phone" label="Phone Number / SMS" error={errors.phone?.message}>
              <input type="tel" autoComplete="tel" placeholder="(506) 555-0199" className={inputClass} {...register('phone')} {...a11y('phone')} />
            </Field>
            <Field id="email" label="Email Address" error={errors.email?.message} className="sm:col-span-2">
              <input type="email" autoComplete="email" placeholder="john@example.com" className={inputClass} {...register('email')} {...a11y('email')} />
            </Field>
            <Field id="vehicleType" label="Vehicle Type" error={errors.vehicleType?.message}>
              <select className={inputClass} {...register('vehicleType')} {...a11y('vehicleType')}>
                <option value="">Select vehicle type</option>
                {VEHICLE_SIZES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="vehicle" label="Vehicle Make, Model & Year" error={errors.vehicle?.message}>
              <input type="text" placeholder="e.g. 2021 Toyota RAV4" className={inputClass} {...register('vehicle')} {...a11y('vehicle')} />
            </Field>
            <Field id="package" label="Desired Package" error={errors.package?.message} className="sm:col-span-2">
              <select className={inputClass} {...register('package')} {...a11y('package')}>
                <option value="">Select a package</option>
                {BOOKING_PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </Field>

            <fieldset className="sm:col-span-2">
              <legend className="text-sm font-semibold text-brand-text">Service Location Preference</legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {LOCATIONS.map((loc) => (
                  <label key={loc.id} className="flex cursor-pointer items-center gap-3 rounded-md border border-brand-border bg-brand-bg px-4 py-3 text-sm text-brand-text has-[:checked]:border-brand-primary">
                    <input type="radio" value={loc.id} className="accent-brand-primary" {...register('location')} />
                    {loc.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {isMobile && (
              <Field id="address" label="Service Address" error={errors.address?.message} className="sm:col-span-2">
                <input type="text" autoComplete="street-address" className={inputClass} {...register('address')} {...a11y('address')} />
              </Field>
            )}

            <Field id="date" label="Preferred Date" error={errors.date?.message}>
              <input type="date" min={today} max={maxDate} className={`${inputClass} [color-scheme:dark]`} {...register('date')} {...a11y('date')} />
            </Field>
            <Field id="timeWindow" label="Time Window" error={errors.timeWindow?.message}>
              <select className={inputClass} {...register('timeWindow')} {...a11y('timeWindow')}>
                <option value="">Select a time window</option>
                {TIME_WINDOWS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="notes" label="Additional Notes / Special Requests" error={errors.notes?.message} className="sm:col-span-2">
              <textarea
                rows={4}
                placeholder="Describe any specific concerns like pet hair, salt stains, scratches..."
                className={inputClass}
                {...register('notes')}
                {...a11y('notes')}
              />
            </Field>

            {status === 'error' && (
              <p role="alert" className="rounded-md border border-red-500 bg-red-950/60 px-4 py-3 text-sm text-brand-text sm:col-span-2">
                {BOOKING_COPY.errorText} {phoneLink}.
              </p>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:col-span-2">
              {isSubmitting ? BOOKING_COPY.sending : BOOKING_COPY.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
