import { z } from 'zod'

export const MESSAGES = {
  nameLength: 'Please enter your full name (2–80 characters)',
  phone: 'Enter a valid phone number, e.g. (506) 555-0199',
  email: 'Enter a valid email address',
  vehicleType: 'Please choose your vehicle type',
  vehicle: 'Please enter your vehicle make, model and year (2–100 characters)',
  package: 'Please choose a package',
  location: 'Please choose a service location',
  address: 'Please enter the service address (5–150 characters)',
  dateRequired: 'Please choose a preferred date',
  datePast: 'Please choose a date from today onward',
  dateSunday: "We're closed on Sundays — please pick Monday to Saturday",
  dateTooFar: 'Please choose a date within the next 90 days',
  timeWindow: 'Please choose a time window',
  notes: 'Notes can be at most 1000 characters',
}

export const MAX_DAYS_AHEAD = 90

/** True for a North American number: 10 digits, or 11 starting with 1. */
export function isValidPhone(value: string): boolean {
  const cleaned = value.trim().replace(/^\+/, '').replace(/[\s\-.()]/g, '')
  if (!/^\d+$/.test(cleaned)) return false
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'))
}

/** Formats a local Date as YYYY-MM-DD. */
export function toISODate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const DAY_MS = 24 * 60 * 60 * 1000
const parseISODate = (value: string) => (/^\d{4}-\d{2}-\d{2}$/.test(value) ? Date.parse(`${value}T00:00:00Z`) : NaN)

/** Returns the error message for a date, or null when it is acceptable. `today` is YYYY-MM-DD. */
export function dateError(value: string, today: string): string | null {
  const date = parseISODate(value)
  if (Number.isNaN(date)) return MESSAGES.dateRequired
  const days = Math.round((date - parseISODate(today)) / DAY_MS)
  if (days < 0) return MESSAGES.datePast
  if (days > MAX_DAYS_AHEAD) return MESSAGES.dateTooFar
  if (new Date(date).getUTCDay() === 0) return MESSAGES.dateSunday
  return null
}

const trimmedLength = (min: number, max: number, message: string) =>
  z.string().trim().min(min, { error: message }).max(max, { error: message })

const oneOf = (values: string[], message: string) =>
  z.string().refine((v) => values.includes(v), { error: message })

export function makeBookingSchema(today: string) {
  return z
    .object({
      fullName: trimmedLength(2, 80, MESSAGES.nameLength),
      phone: z.string().refine(isValidPhone, { error: MESSAGES.phone }),
      email: z
        .string()
        .trim()
        .refine((v) => v === '' || z.email().safeParse(v).success, { error: MESSAGES.email }),
      vehicleType: oneOf(['sedan', 'suv', 'truck'], MESSAGES.vehicleType),
      vehicle: trimmedLength(2, 100, MESSAGES.vehicle),
      package: oneOf(['express', 'full-detail', 'ceramic', 'custom'], MESSAGES.package),
      location: oneOf(['shop', 'mobile'], MESSAGES.location),
      address: z.string().trim(),
      date: z.string(),
      timeWindow: oneOf(['morning', 'afternoon'], MESSAGES.timeWindow),
      notes: z.string().max(1000, { error: MESSAGES.notes }),
    })
    .superRefine((data, ctx) => {
      if (data.location === 'mobile' && (data.address.length < 5 || data.address.length > 150)) {
        ctx.addIssue({ code: 'custom', path: ['address'], message: MESSAGES.address })
      }
      const error = dateError(data.date, today)
      if (error) ctx.addIssue({ code: 'custom', path: ['date'], message: error })
    })
}

export type BookingValues = z.input<ReturnType<typeof makeBookingSchema>>

export const EMPTY_BOOKING: BookingValues = {
  fullName: '',
  phone: '',
  email: '',
  vehicleType: '',
  vehicle: '',
  package: '',
  location: 'shop',
  address: '',
  date: '',
  timeWindow: '',
  notes: '',
}
