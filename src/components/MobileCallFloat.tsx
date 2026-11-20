import { CalendarCheck, Phone } from 'lucide-react'
import { BUSINESS } from '../data/detailingData'

export function MobileCallFloat() {
  return (
    <div
      data-testid="mobile-float"
      className="fixed inset-x-0 bottom-0 z-30 grid h-16 grid-cols-2 gap-2 border-t border-brand-border bg-brand-topbar/95 p-2 backdrop-blur md:hidden"
    >
      <a href={BUSINESS.phoneHref} className="btn-outline px-2 py-0">
        <Phone aria-hidden="true" className="h-4 w-4" />
        Call Now
      </a>
      <a href="#booking" className="btn-primary px-2 py-0">
        <CalendarCheck aria-hidden="true" className="h-4 w-4" />
        Book Online
      </a>
    </div>
  )
}
