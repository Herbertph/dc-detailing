import { useState } from 'react'
import { GALLERY_FILTERS, GALLERY_INTRO, GALLERY_ITEMS, type GalleryFilter, type GalleryItem } from '../data/detailingData'
import { filterGallery } from '../lib/gallery'
import { BeforeAfterSlider } from './BeforeAfterSlider'
import { Reveal } from './Reveal'

export function GallerySection({ items = GALLERY_ITEMS }: { items?: GalleryItem[] }) {
  const [filter, setFilter] = useState<GalleryFilter>('all')
  const visible = filterGallery(items, filter)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-brand-topbar py-20">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="eyebrow">{GALLERY_INTRO.eyebrow}</p>
          <h2 id="gallery-title" className="section-title">
            {GALLERY_INTRO.title}
          </h2>
        </Reveal>

        <div role="group" aria-label="Filter projects" className="mt-8 flex flex-wrap justify-center gap-2">
          {GALLERY_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={f.id === filter}
              onClick={() => setFilter(f.id)}
              className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                f.id === filter
                  ? 'border-brand-primary bg-brand-primary text-white'
                  : 'border-brand-border text-brand-muted hover:text-brand-text'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 text-center text-brand-muted">{GALLERY_INTRO.emptyText}</p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <li key={item.id} className="rounded-md border border-brand-border bg-brand-card p-3" data-testid="gallery-card">
                <BeforeAfterSlider title={item.title} before={item.before} after={item.after} />
                <h3 className="px-1 pb-1 pt-4 text-base font-bold text-brand-text">{item.title}</h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
