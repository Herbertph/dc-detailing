import { describe, expect, it } from 'vitest'
import { buildBookingPayload } from './bookingPayload'
import { EMPTY_BOOKING } from './bookingSchema'

const base = {
  ...EMPTY_BOOKING,
  fullName: ' John Doe ',
  phone: '(506) 555-0199',
  vehicleType: 'truck',
  vehicle: '2021 RAM 1500',
  package: 'full-detail',
  date: '2026-11-18',
  timeWindow: 'afternoon',
}

describe('buildBookingPayload', () => {
  it('uses readable labels and leaves out empty fields', () => {
    expect(buildBookingPayload(base)).toEqual({
      fullName: 'John Doe',
      phone: '(506) 555-0199',
      vehicleType: 'Truck / Van',
      vehicle: '2021 RAM 1500',
      package: 'Complete Full Detail',
      location: 'Drop-off at 143 Waverley Ave Shop',
      date: '2026-11-18',
      timeWindow: 'Afternoon (12–6)',
    })
  })

  it('includes the address only for mobile service', () => {
    expect(buildBookingPayload({ ...base, address: '12 Main St' }).address).toBeUndefined()
    expect(buildBookingPayload({ ...base, location: 'mobile', address: '12 Main St' }).address).toBe('12 Main St')
  })

  it('keeps notes as plain text', () => {
    expect(buildBookingPayload({ ...base, notes: '<img src=x onerror=alert(1)>' }).notes).toBe('<img src=x onerror=alert(1)>')
  })
})
