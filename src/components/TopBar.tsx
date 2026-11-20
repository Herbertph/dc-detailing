import { Clock, MapPin, Phone } from 'lucide-react'
import { BUSINESS } from '../data/detailingData'

export function TopBar() {
  return (
    <div className="bg-brand-topbar text-[13px] text-brand-muted">
      <div className="container-page flex min-h-9 items-center justify-center gap-4 py-2 md:justify-between">
        <a
          href={BUSINESS.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 hover:text-brand-text md:flex"
        >
          <MapPin aria-hidden="true" className="h-4 w-4 text-brand-primary" />
          {BUSINESS.addressShort}
        </a>
        <div className="flex items-center gap-3">
          <a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-brand-text">
            <Phone aria-hidden="true" className="h-4 w-4 text-brand-primary" />
            {BUSINESS.phoneDisplay}
          </a>
          <span aria-hidden="true" className="h-4 w-px bg-brand-border" />
          <span className="flex items-center gap-2">
            <Clock aria-hidden="true" className="h-4 w-4 text-brand-primary" />
            {BUSINESS.hours}
          </span>
        </div>
      </div>
    </div>
  )
}
