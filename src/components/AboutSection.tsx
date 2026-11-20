import { ABOUT } from '../data/detailingData'
import { Reveal } from './Reveal'

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <h2 id="about-title" className="section-title">
            {ABOUT.title}
          </h2>
          {ABOUT.paragraphs.map((p) => (
            <p key={p} className="mt-5 leading-relaxed text-brand-muted">
              {p}
            </p>
          ))}
        </Reveal>
        <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {ABOUT.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse rounded-md border border-brand-border bg-brand-card p-6 text-center">
              <dt className="mt-2 text-sm text-brand-muted">{m.label}</dt>
              <dd className="font-heading text-4xl font-extrabold text-red-500">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
