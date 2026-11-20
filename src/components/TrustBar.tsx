import { ShieldCheck, Star, Warehouse } from 'lucide-react'
import { TRUST_ITEMS } from '../data/detailingData'

const ICONS = {
  stars: (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
      ))}
    </span>
  ),
  shield: <ShieldCheck aria-hidden="true" className="h-8 w-8 text-brand-primary" />,
  garage: <Warehouse aria-hidden="true" className="h-8 w-8 text-brand-primary" />,
}

export function TrustBar() {
  return (
    <section aria-labelledby="trust-title" className="border-y border-brand-primary bg-brand-trust">
      <h2 id="trust-title" className="sr-only">
        Why Choose Us
      </h2>
      <ul className="container-page grid gap-8 py-10 md:grid-cols-3">
        {TRUST_ITEMS.map((item) => (
          <li key={item.id} className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-9 items-center">{ICONS[item.id]}</div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-brand-text">{item.title}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-brand-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
