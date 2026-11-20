import { useRef, type KeyboardEvent } from 'react'
import { PACKAGES_DATA, PACKAGES_INTRO, VEHICLE_SIZES, type VehicleSize } from '../data/detailingData'
import { AddonsGrid } from './AddonsGrid'
import { PackageCard } from './PackageCard'
import { Reveal } from './Reveal'

interface Props {
  size: VehicleSize
  onSizeChange: (size: VehicleSize) => void
  onSelectPackage: (packageId: string) => void
}

export function PackagesSection({ size, onSizeChange, onSelectPackage }: Props) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const last = VEHICLE_SIZES.length - 1
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[
      e.key
    ]
    if (next === undefined) return
    e.preventDefault()
    onSizeChange(VEHICLE_SIZES[next].id)
    tabs.current[next]?.focus()
  }

  return (
    <section id="packages" aria-labelledby="packages-title" className="py-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{PACKAGES_INTRO.eyebrow}</p>
          <h2 id="packages-title" className="section-title">
            {PACKAGES_INTRO.title}
          </h2>
          <p className="mt-4 text-brand-muted">{PACKAGES_INTRO.subtitle}</p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Vehicle size"
          className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-md border border-brand-border bg-brand-card p-1"
        >
          {VEHICLE_SIZES.map((s, i) => {
            const selected = s.id === size
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`size-tab-${s.id}`}
                aria-selected={selected}
                aria-controls="packages-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => onSizeChange(s.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`rounded px-4 py-2 text-sm font-semibold transition ${
                  selected ? 'bg-brand-primary text-white' : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                {s.label}
              </button>
            )
          })}
        </div>

        <div
          id="packages-panel"
          role="tabpanel"
          aria-labelledby={`size-tab-${size}`}
          className="mt-10 grid items-stretch gap-6 lg:grid-cols-3"
        >
          {PACKAGES_DATA.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} size={size} onSelect={() => onSelectPackage(pkg.id)} />
          ))}
        </div>

        <AddonsGrid />
      </div>
    </section>
  )
}
