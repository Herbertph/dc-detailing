import { describe, expect, it } from 'vitest'
import { clampPercent } from './slider'

describe('clampPercent', () => {
  it('keeps values between 0 and 100', () => {
    expect(clampPercent(-5)).toBe(0)
    expect(clampPercent(55)).toBe(55)
    expect(clampPercent(105)).toBe(100)
  })
})
