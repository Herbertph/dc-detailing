import type { PackageItem, VehicleSize } from '../data/detailingData'

export function getPrice(pkg: PackageItem, size: VehicleSize): number {
  return pkg.prices[size]
}

export function formatStartingAt(price: number): string {
  return `Starting at $${price}`
}
