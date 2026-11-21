import { Globe } from 'lucide-react'
import type { ReactNode } from 'react'
import { BUSINESS, FOOTER, SERVICE_AREAS, SOCIAL_LINKS } from '../data/detailingData'
import { Logo } from './Logo'

const svg = (path: ReactNode) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    {path}
  </svg>
)

const SOCIAL_ICONS: Record<(typeof SOCIAL_LINKS)[number]['id'], ReactNode> = {
  instagram: svg(
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </>,
  ),
  google: <Globe aria-hidden="true" className="h-5 w-5" />,
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-brand-border bg-brand-topbar text-sm text-brand-muted">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="w-fit">
            <Logo />
          </div>
          <p className="mt-5 leading-relaxed">{FOOTER.summary}</p>
          <ul className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-brand-border text-brand-text hover:border-brand-primary"
                >
                  {SOCIAL_ICONS[s.id]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className="text-base font-bold uppercase tracking-wider text-brand-text">
            Quick Links
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {FOOTER.quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-brand-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-base font-bold uppercase tracking-wider text-brand-text">Service Areas</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {SERVICE_AREAS.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-bold uppercase tracking-wider text-brand-text">Contact &amp; Hours</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li>Address: {BUSINESS.addressShort}</li>
            <li>
              Phone:{' '}
              <a href={BUSINESS.phoneHref} className="hover:text-brand-text">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              Hours: {BUSINESS.hours} | {BUSINESS.hoursClosed}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-border">
        <p className="container-page py-5 text-center text-xs">
          © {year} DC Detailing Services. All rights reserved. | Moncton, New Brunswick.
        </p>
      </div>
    </footer>
  )
}
