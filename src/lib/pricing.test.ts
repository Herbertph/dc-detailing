import { describe, expect, it } from 'vitest'
import { PACKAGES_DATA } from '../data/detailingData'
import { formatStartingAt, getPrice } from './pricing'

describe('pricing', () => {
  it('AC-15: SUV is sedan + 30 and truck is sedan + 50 for every package', () => {
    for (const pkg of PACKAGES_DATA) {
      expect(pkg.prices.suv).toBe(pkg.prices.sedan + 30)
      expect(pkg.prices.truck).toBe(pkg.prices.sedan + 50)
    }
  })

  it('AC-15: returns the price for each vehicle size', () => {
    const [express, full, ceramic] = PACKAGES_DATA
    expect([getPrice(express, 'sedan'), getPrice(express, 'suv'), getPrice(express, 'truck')]).toEqual([129, 159, 179])
    expect([getPrice(full, 'sedan'), getPrice(full, 'suv'), getPrice(full, 'truck')]).toEqual([249, 279, 299])
    expect([getPrice(ceramic, 'sedan'), getPrice(ceramic, 'suv'), getPrice(ceramic, 'truck')]).toEqual([599, 629, 649])
  })

  it('formats the price label', () => {
    expect(formatStartingAt(129)).toBe('Starting at $129')
  })
})
