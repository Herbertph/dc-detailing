export const DEMO_DELAY_MS = 600

/**
 * Sends a booking request as JSON to `endpoint` (Formspree-compatible).
 * Without an endpoint it runs in demo mode: nothing is sent and it resolves after a short delay.
 * Throws on network errors and non-2xx responses.
 */
export async function submitBooking(
  data: Record<string, unknown>,
  endpoint: string | undefined = import.meta.env.VITE_BOOKING_ENDPOINT,
  fetchImpl: typeof fetch = fetch,
): Promise<void> {
  if (!endpoint) {
    console.warn('[booking] VITE_BOOKING_ENDPOINT is not set: demo mode, the request was NOT sent.')
    await new Promise((resolve) => setTimeout(resolve, DEMO_DELAY_MS))
    return
  }
  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error(`Booking request failed with status ${response.status}`)
}
