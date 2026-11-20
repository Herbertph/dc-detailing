import { HERO } from '../data/detailingData'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden border-b border-brand-primary">
      <div className="grid items-center lg:grid-cols-[55fr_45fr] lg:pl-[max(0px,calc((100%-80rem)/2))]">
        <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1 id="hero-title" className="mt-4 font-extrabold leading-tight">
            <span className="block text-4xl uppercase tracking-wide text-slate-300 sm:text-5xl lg:text-6xl">{HERO.titleLine1}</span>
            <span className="mt-2 block text-2xl text-brand-text sm:text-3xl lg:text-4xl">{HERO.titleLine2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">{HERO.subheadline}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#packages" className="btn-primary">
              VIEW PACKAGES
            </a>
            <a href="#booking" className="btn-outline">
              GET A FREE QUOTE
            </a>
          </div>
        </div>
        <div className="relative h-full min-h-[280px]">
          <img
            src={HERO.image.src}
            alt={HERO.image.alt}
            width={HERO.image.width}
            height={HERO.image.height}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-bg lg:via-brand-bg/20"
          />
        </div>
      </div>
    </section>
  )
}
