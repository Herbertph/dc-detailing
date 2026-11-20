import { describe, expect, it } from 'vitest'
import { EMPTY_BOOKING, MESSAGES, dateError, isValidPhone, makeBookingSchema, toISODate, type BookingValues } from './bookingSchema'

// A Wednesday; tests never depend on the real clock.
const TODAY = '2026-11-18'
const schema = makeBookingSchema(TODAY)

const valid: BookingValues = {
  ...EMPTY_BOOKING,
  fullName: 'John Doe',
  phone: '(506) 555-0199',
  vehicleType: 'sedan',
  vehicle: '2021 Toyota RAV4',
  package: 'full-detail',
  date: TODAY,
  timeWindow: 'morning',
}

function errorsFor(overrides: Partial<BookingValues>): Record<string, string> {
  const result = schema.safeParse({ ...valid, ...overrides })
  if (result.success) return {}
  return Object.fromEntries(result.error.issues.map((i) => [String(i.path[0]), i.message]))
}

describe('booking schema', () => {
  it('accepts a complete valid booking', () => {
    expect(errorsFor({})).toEqual({})
  })

  it('AC-21: an empty form reports every required field and not email or notes', () => {
    const result = schema.safeParse(EMPTY_BOOKING)
    expect(result.success).toBe(false)
    const fields = new Set(result.error!.issues.map((i) => i.path[0]))
    expect([...fields].sort()).toEqual(['date', 'fullName', 'package', 'phone', 'timeWindow', 'vehicle', 'vehicleType'])
  })

  it.each(['(506) 555-0199', '506-555-0199', '+1 506 555 0199', '15065550199', '506.555.0199'])(
    'AC-22: accepts phone %s',
    (phone) => {
      expect(isValidPhone(phone)).toBe(true)
      expect(errorsFor({ phone })).toEqual({})
    },
  )

  it.each(['555-0199', 'abc', '+44 20 7946 0958', '12345678901234', '25065550199', ''])('AC-22: rejects phone "%s"', (phone) => {
    expect(errorsFor({ phone }).phone).toBe(MESSAGES.phone)
  })

  it('AC-23: email is optional but must be valid when filled', () => {
    expect(errorsFor({ email: '' })).toEqual({})
    expect(errorsFor({ email: 'john@example.com' })).toEqual({})
    expect(errorsFor({ email: 'john@example' }).email).toBe(MESSAGES.email)
  })

  it('AC-24: full name must be 2–80 characters after trimming', () => {
    expect(errorsFor({ fullName: '    ' }).fullName).toBe(MESSAGES.nameLength)
    expect(errorsFor({ fullName: 'J' }).fullName).toBe(MESSAGES.nameLength)
    expect(errorsFor({ fullName: ' J ' }).fullName).toBe(MESSAGES.nameLength)
    expect(errorsFor({ fullName: 'Jo' })).toEqual({})
    expect(errorsFor({ fullName: 'a'.repeat(80) })).toEqual({})
    expect(errorsFor({ fullName: 'a'.repeat(81) }).fullName).toBe(MESSAGES.nameLength)
  })

  it('vehicle make/model/year must be 2–100 characters after trimming', () => {
    expect(errorsFor({ vehicle: ' x ' }).vehicle).toBe(MESSAGES.vehicle)
    expect(errorsFor({ vehicle: 'ab' })).toEqual({})
    expect(errorsFor({ vehicle: 'a'.repeat(100) })).toEqual({})
    expect(errorsFor({ vehicle: 'a'.repeat(101) }).vehicle).toBe(MESSAGES.vehicle)
  })

  it('vehicle type, package and time window only accept the listed options', () => {
    expect(errorsFor({ vehicleType: 'bus' }).vehicleType).toBe(MESSAGES.vehicleType)
    for (const vehicleType of ['sedan', 'suv', 'truck']) expect(errorsFor({ vehicleType })).toEqual({})
    expect(errorsFor({ package: 'gold' }).package).toBe(MESSAGES.package)
    for (const pkg of ['express', 'full-detail', 'ceramic', 'custom']) expect(errorsFor({ package: pkg })).toEqual({})
    expect(errorsFor({ timeWindow: 'night' }).timeWindow).toBe(MESSAGES.timeWindow)
    expect(errorsFor({ timeWindow: 'afternoon' })).toEqual({})
    expect(errorsFor({ location: 'moon' }).location).toBe(MESSAGES.location)
  })

  it('AC-25: date must be today or later, not a Sunday and within 90 days', () => {
    expect(errorsFor({ date: '2026-11-17' }).date).toBe(MESSAGES.datePast)
    expect(errorsFor({ date: '2026-11-22' }).date).toBe(MESSAGES.dateSunday)
    expect(errorsFor({ date: '2027-02-16' })).toEqual({}) // exactly 90 days
    expect(errorsFor({ date: '2027-02-17' }).date).toBe(MESSAGES.dateTooFar) // 91 days
    expect(errorsFor({ date: TODAY })).toEqual({})
    expect(errorsFor({ date: '' }).date).toBe(MESSAGES.dateRequired)
  })

  it('AC-25: today is rejected when today is a Sunday', () => {
    expect(dateError('2026-11-22', '2026-11-22')).toBe(MESSAGES.dateSunday)
  })

  it('AC-26: service address is required only for mobile service', () => {
    expect(errorsFor({ location: 'shop', address: '' })).toEqual({})
    expect(errorsFor({ location: 'mobile', address: '' }).address).toBe(MESSAGES.address)
    expect(errorsFor({ location: 'mobile', address: '   12  ' }).address).toBe(MESSAGES.address)
    expect(errorsFor({ location: 'mobile', address: '12 Main' })).toEqual({})
    expect(errorsFor({ location: 'mobile', address: 'a'.repeat(150) })).toEqual({})
    expect(errorsFor({ location: 'mobile', address: 'a'.repeat(151) }).address).toBe(MESSAGES.address)
  })

  it('AC-27: notes accept 1000 characters and reject 1001', () => {
    expect(errorsFor({ notes: 'a'.repeat(1000) })).toEqual({})
    expect(errorsFor({ notes: 'a'.repeat(1001) }).notes).toBe(MESSAGES.notes)
  })

  it('formats a local date as YYYY-MM-DD', () => {
    expect(toISODate(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})
