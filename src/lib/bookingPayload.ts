import { BOOKING_PACKAGES, LOCATIONS, TIME_WINDOWS, VEHICLE_SIZES } from '../data/detailingData'
import type { BookingValues } from './bookingSchema'

const labelOf = (options: { id: string; label: string }[], id: string) => options.find((o) => o.id === id)?.label ?? id

/** Turns form values into the request body: readable labels, trimmed text, empty fields left out. */
export function buildBookingPayload(values: BookingValues): Record<string, string> {
  const payload: Record<string, string> = {
    fullName: values.fullName.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    vehicleType: labelOf(VEHICLE_SIZES, values.vehicleType),
    vehicle: values.vehicle.trim(),
    package: labelOf(BOOKING_PACKAGES, values.package),
    location: labelOf(LOCATIONS, values.location),
    address: values.location === 'mobile' ? values.address.trim() : '',
    date: values.date,
    timeWindow: labelOf(TIME_WINDOWS, values.timeWindow),
    notes: values.notes.trim(),
  }
  return Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== ''))
}
