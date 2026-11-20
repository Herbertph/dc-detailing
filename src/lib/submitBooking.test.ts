import { afterEach, describe, expect, it, vi } from 'vitest'
import { submitBooking } from './submitBooking'

afterEach(() => vi.restoreAllMocks())

describe('submitBooking', () => {
  it('posts the data as JSON to the endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    await submitBooking({ fullName: 'Jo' }, 'https://example.test/f', fetchMock)
    expect(fetchMock).toHaveBeenCalledWith('https://example.test/f', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: '{"fullName":"Jo"}',
    })
  })

  it('rejects on a non-2xx response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('', { status: 500 }))
    await expect(submitBooking({}, 'https://example.test/f', fetchMock)).rejects.toThrow('500')
  })

  it('rejects on a network error', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(submitBooking({}, 'https://example.test/f', fetchMock)).rejects.toThrow()
  })

  it('demo mode sends nothing, warns and resolves', async () => {
    vi.useFakeTimers()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const fetchMock = vi.fn()
    const promise = submitBooking({}, '', fetchMock)
    await vi.runAllTimersAsync()
    await expect(promise).resolves.toBeUndefined()
    expect(fetchMock).not.toHaveBeenCalled()
    expect(warn).toHaveBeenCalled()
    vi.useRealTimers()
  })
})
