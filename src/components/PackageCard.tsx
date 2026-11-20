import { Check } from 'lucide-react'
import type { PackageItem, VehicleSize } from '../data/detailingData'
import { formatStartingAt, getPrice } from '../lib/pricing'

interface Props {
  pkg: PackageItem
  size: VehicleSize
  onSelect: () => void
}

export function PackageCard({ pkg, size, onSelect }: Props) {
  const popular = pkg.isPopular
  return (
    <article
      aria-labelledby={`pkg-${pkg.id}`}
      className={`relative flex flex-col rounded-md bg-brand-card p-7 ${
        popular ? 'border-2 border-brand-primary shadow-[0_12px_40px_rgba(220,38,38,0.18)] lg:-translate-y-2' : 'border border-brand-border'
      }`}
    >
      {pkg.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-brand-primary px-3 py-1 font-heading text-xs font-bold tracking-wider text-white">
          {pkg.badge}
        </span>
      )}
      <h3 id={`pkg-${pkg.id}`} className="text-2xl font-bold text-brand-text">
        {pkg.name}
      </h3>
      <p className="mt-2 text-sm text-brand-muted">{pkg.description}</p>
      <p className="mt-6 font-heading text-3xl font-extrabold text-white" aria-live="polite">
        {formatStartingAt(getPrice(pkg, size))}
      </p>
      <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm text-brand-text">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            {feature}
          </li>
        ))}
      </ul>
      <a href="#booking" onClick={onSelect} className={`mt-8 ${popular ? 'btn-primary' : 'btn-outline'}`}>
        {pkg.ctaText}
      </a>
    </article>
  )
}
