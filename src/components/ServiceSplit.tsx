import { MapPin, Store, Truck } from 'lucide-react'
import { SERVICE_SPLIT } from '../data/detailingData'
import { Reveal } from './Reveal'

const ICONS = { shop: Store, mobile: Truck }

export function ServiceSplit() {
  return (
    <section aria-label="Shop and mobile detailing" className="py-20">
      <div className="container-page grid gap-6 md:grid-cols-2">
        {SERVICE_SPLIT.map((block) => {
          const Icon = ICONS[block.id]
          return (
            <Reveal key={block.id} className="rounded-md border border-brand-border bg-brand-card p-8">
              <Icon aria-hidden="true" className="h-9 w-9 text-brand-primary" />
              <p className="eyebrow mt-5">{block.eyebrow}</p>
              <h2 className="mt-2 text-2xl font-extrabold text-brand-text md:text-3xl">{block.title}</h2>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-text">
                <MapPin aria-hidden="true" className="h-4 w-4 text-brand-primary" />
                {block.place}
              </p>
              <p className="mt-4 leading-relaxed text-brand-muted">{block.text}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
