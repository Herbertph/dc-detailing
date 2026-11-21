import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NAV_LINKS } from '../data/detailingData'
import { Logo } from './Logo'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const drawer = useRef<HTMLDivElement>(null)

  const close = () => {
    setOpen(false)
    menuButton.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !drawer.current) return
      const items = Array.from(
        drawer.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      )
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (!drawer.current.contains(active)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-brand-primary bg-brand-bg/90 backdrop-blur-md">
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top">
          <Logo />
        </a>
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-heading text-sm font-semibold tracking-wider text-brand-text transition hover:text-red-500"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#booking" className="btn-primary hidden lg:inline-flex">
          BOOK AN APPOINTMENT
        </a>
        <button
          ref={menuButton}
          type="button"
          className="rounded-md p-2 text-brand-text lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </nav>

      {open &&
        createPortal(
          <div
            ref={drawer}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-brand-topbar px-6 py-4 lg:hidden"
          >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              ref={closeButton}
              type="button"
              className="rounded-md p-2 text-brand-text"
              aria-label="Close menu"
              onClick={close}
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <ul className="mt-8 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block border-b border-brand-border py-4 font-heading text-lg font-semibold tracking-wider"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#booking" onClick={close} className="btn-primary mt-auto w-full">
            BOOK AN APPOINTMENT
          </a>
          </div>,
          document.body,
        )}
    </header>
  )
}
