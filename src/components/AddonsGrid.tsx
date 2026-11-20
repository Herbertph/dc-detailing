import { ADDONS } from '../data/detailingData'

export function AddonsGrid() {
  return (
    <div className="mt-14">
      <h3 id="addons-title" className="text-center text-xl font-bold uppercase tracking-wide text-brand-text">Add-Ons</h3>
      <ul aria-labelledby="addons-title" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADDONS.map((addon) => (
          <li
            key={addon.name}
            className="flex items-center justify-between gap-4 rounded-md border border-brand-border bg-brand-card px-5 py-4"
          >
            <span className="text-sm font-medium text-brand-text">{addon.name}</span>
            <span className="font-heading text-lg font-bold text-red-500">{addon.price}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
