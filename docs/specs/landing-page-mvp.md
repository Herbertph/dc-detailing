# Spec: DC Detailing Services — institutional website and booking request MVP

Branch: `feature/landing-page-mvp`
Visual reference: desktop mockup provided by Herbert (dark graphite background, red accents, hero with a black sports car being polished). The brief below is the source of truth for copy; the mockup is the source of truth for look and feel.

## 1. Context

DC Detailing Services is an auto detailing studio at 143 Waverley Ave, Moncton, NB, Canada, that also runs a mobile unit across Greater Moncton. The business needs a fast, responsive, single-page website whose main goal is to turn local visitors into **booking / free quote requests** and phone calls.

Users:
- **Visitors (car owners in Greater Moncton)**, mostly on phones: want prices, proof of quality, and an easy way to book or call.
- **The business owner**: receives booking requests and calls the customer back to confirm the slot.

## 2. Scope

### In scope (MVP)
- A single-page site with these sections, in order: Top Bar, sticky Navbar, Hero, Trust Bar ("Why Choose Us"), Services & Packages (with vehicle-size price tabs and add-ons), Before & After Gallery (with category filters and before/after slider), Shop vs Mobile split, Reviews, About Us, Booking & Free Quote form, Footer, and a mobile floating action bar.
- All copy exactly as listed in section 8 ("Content reference").
- Dark Automotive Premium design system (colors, typography, borders) from section 9.
- Client-side form validation and a submission adapter that sends the request to a configurable endpoint (see FR-24).
- Local SEO: title, meta description, Open Graph tags and the JSON-LD `AutoRepair` block in `<head>`.
- Responsive layout (mobile from 360 px, tablet, desktop) and accessibility (WCAG AA contrast, keyboard navigation, labelled controls, `prefers-reduced-motion`).
- Project setup: stack, unit tests, end-to-end tests, CI on GitHub Actions.

### Out of scope (later features)
- Real-time availability, calendar sync, online payment, deposits, customer accounts.
- Live Google reviews (reviews are static content in the MVP).
- A CMS or admin panel; content lives in `src/data/detailingData.ts`.
- Hosting, custom domain (`dcdetailing.ca`) and production deploy.
- French version of the site.
- Real photos of the business (provisional images are used; see Assumptions).

## 3. Functional requirements

### Top Bar
- **FR-1** The Top Bar shows, on desktop, a map-pin icon and the address "143 Waverley Ave, Moncton, NB E1C 7V1" as a link that opens Google Maps for that address in a new tab (`target="_blank"`, `rel="noopener noreferrer"`); and on the right, the phone "+1 (506) 940-6494" as a `tel:+15069406494` link, a vertical divider, a clock icon and "Mon–Sat: 8:00 AM – 6:00 PM".
- **FR-2** Below 768 px the address is hidden and only the phone link and hours are shown, centered.

### Navbar
- **FR-3** The Navbar is sticky at the top while scrolling, with a translucent blurred background and a 1 px red bottom border. It shows the logo (links to `#top`), the links HOME (`#top`), SERVICES & PACKAGES (`#packages`), GALLERY (`#gallery`), ABOUT US (`#about`), REVIEWS (`#reviews`), and a red "BOOK AN APPOINTMENT" button that scrolls to `#booking`.
- **FR-4** Below 1024 px the links are replaced by a hamburger button (`aria-label="Open menu"`, `aria-expanded`). It opens a dark drawer with all links and the "BOOK AN APPOINTMENT" button at the bottom. The drawer closes when a link is clicked, when the close button is clicked, or when Escape is pressed; focus returns to the hamburger button.
- **FR-5** The page scrolls smoothly to anchors (unless the user prefers reduced motion), and section headings are not hidden under the sticky header (scroll margin).

### Hero
- **FR-6** The Hero shows the eyebrow, the H1 (two lines), the subheadline, a primary "VIEW PACKAGES" button (to `#packages`) and a secondary outline "GET A FREE QUOTE" button (to `#booking`). On desktop it is a two-column grid (about 55% text / 45% image); on mobile the image stacks below the text. The image fades into the background on its left edge. It is the only `<h1>` on the page.

### Trust Bar
- **FR-7** The "Why Choose Us" band shows three columns (stars, shield, garage) with the titles and texts from the content reference, separated from neighbours by 1 px red top and bottom borders. Stars are gold, shield and garage icons red. On mobile the columns stack.

### Services & Packages
- **FR-8** The section (`id="packages"`) shows the eyebrow, H2 and subtitle, then a vehicle-size selector implemented as an accessible tab list (`role="tablist"`): "Coupe / Sedan" (selected by default), "SUV / Crossover", "Truck / Van".
- **FR-9** Three package cards show name, description, "Starting at $<price>" for the selected size, the feature list, and the CTA button. Prices come from `PACKAGES_DATA`: Express 129/159/179, Full Detail 249/279/299, Ceramic 599/629/649 (sedan/SUV/truck).
- **FR-10** Selecting a tab updates all three prices immediately, without reloading or scrolling. Arrow keys move between tabs.
- **FR-11** The "Complete Full Detail" card has the "MOST POPULAR" red badge, a 2 px red border, a slight elevation, and a solid red CTA.
- **FR-12** Clicking a package CTA ("Select Express", "Book Full Detail", "Request Inspection") scrolls to `#booking` and pre-fills the form: Desired Package = that package and Vehicle Type = the currently selected size tab. The user can still change both.
- **FR-13** Below the cards, an add-ons grid shows the four add-ons with their prices: Pet Hair Removal $40+, Headlight Restoration $75, Engine Bay Detailing $65, Ozone Odor Elimination $80.

### Gallery
- **FR-14** The gallery (`id="gallery"`) shows the eyebrow, H2, the filter tabs "All Work" (default), "Interior Restoration", "Paint Correction", "Ceramic Coating", and six cards. Each card shows the vehicle and service title and a before/after comparison slider.
- **FR-15** Card categories (a card can have more than one):
  | Card | Categories |
  |---|---|
  | 2022 Ford F-150 — Salt Stain Extraction & Interior Steam | Interior Restoration |
  | BMW M3 — 1-Stage Polish & Ceramic Coating | Paint Correction, Ceramic Coating |
  | Honda CR-V — Pet Hair Removal & Full Detail | Interior Restoration |
  | Porsche 911 — Multi-Stage Paint Correction | Paint Correction |
  | RAM 1500 — Complete Winter Prep & Shampoo | Interior Restoration |
  | Audi A4 — Leather Deep Clean & Conditioning | Interior Restoration |
- **FR-16** Selecting a filter shows only the cards in that category; "All Work" shows all six.
- **FR-17** The before/after slider can be dragged with mouse and touch, and moved with the keyboard (it is an element with `role="slider"`, an accessible name like "Before and after comparison: <card title>", `aria-valuemin=0`, `aria-valuemax=100`, `aria-valuenow`; Left/Right arrows move 5%, Home/End go to 0/100). It starts at 50%. "BEFORE" and "AFTER" labels are visible on each side.

### Shop vs Mobile
- **FR-18** A two-column block (stacked on mobile) shows "SHOP DETAILING / Visit Our Moncton Studio" and "MOBILE DETAILING / We Come to Your Driveway" with the texts from the content reference.

### Reviews
- **FR-19** The reviews section (`id="reviews"`) shows the badge "4.9 ★ Rating on Google — Based on 170+ Verified Reviews", the H2, three review cards (text, author, 5 gold stars with an accessible label "5 out of 5 stars"), and the link "Read all 170+ reviews on Google →" opening the Google Business profile in a new tab.

### About
- **FR-20** The About section (`id="about"`) shows the H2, the two paragraphs, and three metrics: "170+ 5-Star Google Reviews", "1,500+ Vehicles Detailed", "100% Satisfaction Guarantee".

### Booking form
- **FR-21** The booking section (`id="booking"`) contains a form with these fields, each with a visible `<label>`:
  | Field | Control | Required | Rule |
  |---|---|---|---|
  | Full Name | text | yes | 2–80 characters after trimming |
  | Phone Number / SMS | tel | yes | a valid North American number: 10 digits, or 11 starting with 1, ignoring spaces, dashes, dots, parentheses and a leading `+` |
  | Email Address | email | no | if filled, a valid email |
  | Vehicle Type | select | yes | Coupe / Sedan, SUV / Crossover, Truck / Van |
  | Vehicle Make, Model & Year | text | yes | 2–100 characters after trimming |
  | Desired Package | select | yes | Express Refresh, Complete Full Detail, Showroom Ceramic & Correction, Custom / Not Sure |
  | Service Location Preference | radio group | yes | "Drop-off at 143 Waverley Ave Shop" (default) or "Mobile Service at My Location" |
  | Service Address | text | only when Mobile is chosen | 5–150 characters; shown only when Mobile is selected |
  | Preferred Date | date | yes | today or later, at most 90 days ahead, not a Sunday (closed) |
  | Time Window | select | yes | Morning (8–12), Afternoon (12–6) |
  | Additional Notes / Special Requests | textarea | no | at most 1000 characters |
- **FR-22** Validation runs on submit and then on change for touched fields. Each invalid field shows a clear English error message under it, linked with `aria-describedby`, and the field gets `aria-invalid="true"`. On a failed submit, focus moves to the first invalid field. Nothing is sent while any field is invalid.
- **FR-23** Validation rules live in a pure, unit-tested schema (Zod) separate from the UI, so they can be reused.
- **FR-24** On a valid submit, the form sends the data as JSON (`POST`, `Content-Type: application/json`, `Accept: application/json`) to the URL in the build-time variable `VITE_BOOKING_ENDPOINT` (compatible with Formspree-style services). While sending, the submit button is disabled and shows "Sending…", so a double click sends only one request.
  - If `VITE_BOOKING_ENDPOINT` is not set, the app runs in **demo mode**: it does not send anything, waits briefly and treats it as a success, and logs a console warning. This mode exists for local development and tests only (see Assumptions).
- **FR-25** On success, the form fields are hidden and the confirmation message from the content reference is shown, with the phone number as a `tel:` link. Focus moves to the confirmation heading so screen readers announce it.
- **FR-26** On failure (network error or a non-2xx response), the form keeps all values and shows an error alert: "Sorry, we couldn't send your request. Please try again or call/text us at +1 (506) 940-6494." with the phone as a `tel:` link. The user can submit again.
- **FR-27** User input is never rendered as HTML.

### Footer
- **FR-28** The footer shows four columns on desktop (stacked on mobile): logo, summary and social icons (Instagram, Facebook, Google Business, each a link with an accessible name, opening in a new tab); Quick Links (Home, Services & Packages, Gallery, About Us, Reviews, Book Now → matching anchors); Service Areas (Moncton, Dieppe, Riverview, Shediac, Salisbury — all ", NB"); Contact & Hours (address, `tel:` phone, hours including "Sun: Closed"). The bottom bar shows "© <current year> DC Detailing Services. All rights reserved. | Moncton, New Brunswick."

### Mobile floating bar
- **FR-29** Below 768 px a bar fixed at the bottom shows two buttons: "Call Now" (`tel:+15069406494`) and "Book Online" (scrolls to `#booking`). The page has enough bottom padding so the bar never covers the footer content. The bar is hidden on 768 px and wider.

### SEO, performance, accessibility
- **FR-30** `<head>` contains: `lang="en"`, title "DC Detailing Services | Premium Auto Detailing in Moncton, NB", a meta description, Open Graph tags (title, description, image, url, type), and the JSON-LD block from the brief exactly as given (`AutoRepair`, rating 4.9, reviewCount 172).
- **FR-31** Images are served as WebP or AVIF, with explicit width/height, `loading="lazy"` for everything below the hero, and the hero image loaded eagerly.
- **FR-32** Reveal-on-scroll animations (framer-motion) are subtle and fully disabled when the user prefers reduced motion. Content is visible even if JavaScript animations do not run.
- **FR-33** All text meets WCAG AA contrast on its background; all interactive elements are reachable and usable by keyboard with a visible focus ring.
- **FR-34** All business data (contact, hours, areas, packages, add-ons, gallery, reviews, metrics, social URLs) lives in `src/data/detailingData.ts`; components do not hard-code it.

## 4. Acceptance criteria

### Top Bar and navigation
- **AC-1** Given a desktop viewport (1280 px), when the page loads, then the Top Bar shows the address link (to Google Maps, `target="_blank"`), the phone link `tel:+15069406494` and "Mon–Sat: 8:00 AM – 6:00 PM".
- **AC-2** Given a mobile viewport (375 px), when the page loads, then the address is not visible and the phone link and hours are visible.
- **AC-3** Given a desktop viewport, when the user clicks each navbar link (HOME, SERVICES & PACKAGES, GALLERY, ABOUT US, REVIEWS) and "BOOK AN APPOINTMENT", then the page scrolls to `#top`, `#packages`, `#gallery`, `#about`, `#reviews` and `#booking` respectively, and the section heading is not hidden behind the header.
- **AC-4** Given the user has scrolled to the bottom of the page, then the navbar is still visible at the top of the viewport.
- **AC-5** Given a mobile viewport, when the user opens the menu, then a drawer with all five links and "BOOK AN APPOINTMENT" appears and the hamburger has `aria-expanded="true"`; when the user clicks "GALLERY", then the drawer closes and the page is at `#gallery`.
- **AC-6** Given the mobile drawer is open, when the user presses Escape, then the drawer closes and focus is on the hamburger button.

### Hero and content sections
- **AC-7** Given the page loads, then there is exactly one `<h1>` containing "RESTORE. PROTECT. SHINE." and "Moncton's Premium Auto Detailing Services."; "VIEW PACKAGES" leads to `#packages` and "GET A FREE QUOTE" leads to `#booking`.
- **AC-8** Given the page loads, then the Trust Bar, Shop vs Mobile, Reviews, About and Footer sections show the exact copy from section 8 (headings, texts, three reviews with authors, three metrics, five service areas).

### Packages
- **AC-9** Given the page loads, then the "Coupe / Sedan" tab is selected (`aria-selected="true"`) and the cards show "$129", "$249" and "$599".
- **AC-10** Given the packages section, when the user selects "SUV / Crossover", then the cards show "$159", "$279", "$629"; when the user selects "Truck / Van", then they show "$179", "$299", "$649"; when the user goes back to "Coupe / Sedan", then they show "$129", "$249", "$599".
- **AC-11** Given focus is on the selected size tab, when the user presses the Right arrow key, then the next tab is selected and focused and prices update; at the last tab, Right arrow wraps to the first.
- **AC-12** Given the page loads, then only the "Complete Full Detail" card shows the "MOST POPULAR" badge.
- **AC-13** Given the "Truck / Van" tab is selected, when the user clicks "Book Full Detail", then the page scrolls to `#booking` and the form shows Vehicle Type = "Truck / Van" and Desired Package = "Complete Full Detail".
- **AC-14** Given the page loads, then the add-ons grid shows the four add-ons with "$40+", "$75", "$65" and "$80".
- **AC-15** (unit) Given `PACKAGES_DATA`, then for every package `suv = sedan + 30` and `truck = sedan + 50`, and the price helper returns the right price for each size.

### Gallery
- **AC-16** Given the page loads, then "All Work" is selected and six gallery cards are visible.
- **AC-17** Given the gallery, when the user selects "Interior Restoration", then exactly four cards are visible (F-150, CR-V, RAM 1500, Audi A4); "Paint Correction" shows exactly two (BMW M3, Porsche 911); "Ceramic Coating" shows exactly one (BMW M3); "All Work" shows six again.
- **AC-18** Given a gallery card, when the user focuses its slider and presses Right arrow twice, then `aria-valuenow` goes from 50 to 60; End sets 100; Home sets 0; Left at 0 stays at 0.
- **AC-19** Given a gallery card, when the user drags the slider handle with the mouse to the left, then `aria-valuenow` decreases and more of the "after" image is visible.
- **AC-20** (unit) Given the gallery filter function, when called with a category, then it returns only items with that category; when called with "all", it returns every item; when called with a category that has no items, it returns an empty list and the UI shows "No projects in this category yet."

### Booking form — validation
- **AC-21** Given an empty form, when the user clicks "BOOK MY APPOINTMENT", then no request is sent, Full Name, Phone, Vehicle Type, Vehicle Make/Model/Year, Desired Package, Preferred Date and Time Window show errors, Email and Notes show none, and focus moves to Full Name.
- **AC-22** Given the phone field, when the user enters "(506) 555-0199", "506-555-0199", "+1 506 555 0199" or "15065550199", then it is accepted; when the user enters "555-0199", "abc", "+44 20 7946 0958" or "12345678901234", then it shows "Enter a valid phone number, e.g. (506) 555-0199".
- **AC-23** Given the email field, when it is empty, then it is accepted; when it contains "john@example", then it shows "Enter a valid email address".
- **AC-24** Given Full Name contains only spaces or one letter, then it shows an error; with "Jo" it is accepted; with 81 characters it shows an error.
- **AC-25** Given the date field, when the user picks a past date, a Sunday, or a date more than 90 days ahead, then it shows an error ("Please choose a date from today onward", "We're closed on Sundays — please pick Monday to Saturday", "Please choose a date within the next 90 days"); today (if not Sunday) is accepted.
- **AC-26** Given "Drop-off at 143 Waverley Ave Shop" is selected by default, then the Service Address field is not shown; when the user selects "Mobile Service at My Location", then Service Address appears and is required; when the user switches back to Shop, it disappears and no longer blocks submission.
- **AC-27** Given Notes has 1001 characters, then it shows an error; with 1000 it is accepted.
- **AC-28** Given a field has an error, then the input has `aria-invalid="true"` and `aria-describedby` points to the error text.
- **AC-29** (unit) Given the booking schema, then every rule in FR-21 is covered by unit tests including the boundaries above (dates are checked against an injected "today" so tests do not depend on the real clock).

### Booking form — submission
- **AC-30** Given a valid form and a configured endpoint that returns 200, when the user submits, then exactly one POST with a JSON body containing all filled fields is sent, the button shows "Sending…" and is disabled while waiting, and afterwards the fields are hidden and the confirmation "Thank You! Your Request Has Been Received." is shown with a `tel:+15069406494` link.
- **AC-31** Given a valid form and an endpoint that returns 500 (or the network fails), when the user submits, then the error alert with the phone link is shown, all entered values are kept, and submitting again sends a new request.
- **AC-32** Given a valid form, when the user double-clicks the submit button, then only one request is sent.
- **AC-33** Given the Notes field contains `<img src=x onerror=alert(1)>`, when the form is submitted, then no HTML is rendered from it and no script runs.

### Footer and mobile bar
- **AC-34** Given the footer, then Quick Links point to the right anchors (Book Now → `#booking`), the phone is a `tel:` link, social links open in a new tab with accessible names, and the copyright shows the current year.
- **AC-35** Given a mobile viewport (375 px), then a fixed bottom bar shows "Call Now" (`tel:+15069406494`) and "Book Online"; clicking "Book Online" scrolls to `#booking`; scrolled to the very bottom, the bar does not cover the copyright line.
- **AC-36** Given a desktop viewport (1280 px), then the floating bar is not visible.

### SEO, accessibility, quality
- **AC-37** Given the built page, then `<head>` contains the title from FR-30, a meta description, `og:title`, `og:description`, `og:image`, and a `<script type="application/ld+json">` that parses as JSON with `@type` "AutoRepair", telephone "+15069406494" and `aggregateRating.ratingValue` "4.9".
- **AC-38** Given the page, when an automated accessibility check (axe via `@axe-core/playwright`) runs on desktop and mobile, then it reports no serious or critical violations.
- **AC-39** Given the user has `prefers-reduced-motion: reduce`, when the page loads and scrolls, then all section content is visible without waiting for animations.
- **AC-40** Given the viewport is 360 px wide, then no section causes horizontal scrolling.
- **AC-41** Given the project, then `npm run build`, `npm run test` (unit) and `npm run test:e2e` pass locally and in GitHub Actions CI.

## 5. Assumptions for Herbert to confirm

1. **Stack: Vite + React + TypeScript** instead of Next.js. It is a single static page, so Vite is simpler and cheaper to host; everything else follows the brief (Tailwind 3.4, lucide-react, framer-motion, React Hook Form + Zod).
2. **Where booking requests go:** the form posts to a configurable endpoint (for example a free Formspree form that emails the owner). Until you choose and configure one, the site runs in **demo mode** and requests are **not delivered**. This must be configured before the site goes live.
3. **Photos:** provisional, free stock images (or neutral placeholders) for the hero and gallery, listed in a credits file, to be swapped for the business's real before/after photos.
4. **Social links:** the Instagram, Facebook and Google Business URLs are not in the brief. They live in the data file with placeholder values to be filled in; the Google review link points to a Google Maps search for the business until the real profile URL is provided.
5. **Prices** use `PACKAGES_DATA` from the brief (SUV +$30, Truck +$50 over the sedan price).
6. **Package buttons** go to the booking form and pre-fill package and vehicle type (FR-12); the brief did not say where they lead.
7. **Mobile service** asks for a service address when chosen (FR-21); the brief's form did not include it, but the team needs it to reach the customer.
8. **Sundays are blocked** in the date picker and bookings are limited to the next 90 days.
9. **Copyright year** is the current year (shows 2026 today) instead of a fixed "2026".
10. **Language:** English only for the MVP.
11. **Logo:** a text logo built in HTML/CSS as described (no image file), until a real logo file is provided.

## 6. Technical notes

### Stack and commands (developer fills `CLAUDE.md` with the final versions)
- Vite + React 18 + TypeScript (strict), Tailwind CSS 3.4 with the `brand` color tokens from the brief, `lucide-react`, `framer-motion`, `react-hook-form` + `zod` + `@hookform/resolvers`.
- Fonts: Barlow (headings) and Inter (body), self-hosted via `@fontsource` packages (no external font requests).
- Unit tests: Vitest (+ Testing Library for the few component tests). E2E: Playwright (Chromium; desktop 1280 px and mobile 375 px projects) with `@axe-core/playwright`. E2E dev server runs on its own port (for example 5179), **never 4545**. Playwright intercepts the booking endpoint with `page.route` to simulate 200 / 500 responses.
- Scripts: `dev`, `build`, `preview`, `test`, `test:e2e`, `lint`.
- CI: GitHub Actions workflow running install, lint, unit tests, build and e2e on pull requests.

### Structure
Follow the component list in the brief (`TopBar`, `Navbar`, `Hero`, `TrustBar`, `PackagesSection`, `PackageCard`, `AddonsGrid`, `GallerySection`, `ServiceSplit`, `ReviewsSection`, `AboutSection`, `BookingForm`, `MobileCallFloat`, `Footer`), with `src/App.tsx` instead of `app/page.tsx`. Pure logic goes in `src/lib/` and is unit tested:
- `src/lib/pricing.ts` — price for package + vehicle size.
- `src/lib/gallery.ts` — filter by category.
- `src/lib/bookingSchema.ts` — Zod schema; date rules take `today` as a parameter.
- `src/lib/submitBooking.ts` — sends to `VITE_BOOKING_ENDPOINT` or runs demo mode.
- `src/data/detailingData.ts` — all content from section 8 plus contact, hours, areas, social URLs.
Package pre-fill (FR-12) can be shared state lifted to `App` or a small context; no global store needed. JSON-LD and meta tags go in `index.html`. Images go in `public/images/` (WebP), with `public/images/CREDITS.md`.

### Task list for the developer
1. Scaffold Vite + React + TS, Tailwind with brand tokens, fonts, ESLint, Vitest, Playwright (own port), GitHub Actions CI; update `CLAUDE.md` (stack, commands, structure) and `README.md`.
2. `detailingData.ts` with all content; `pricing.ts`, `gallery.ts` with unit tests (AC-15, AC-20).
3. TopBar, Navbar (desktop + mobile drawer), Hero, smooth scroll and scroll margin (AC-1–AC-7).
4. TrustBar, PackagesSection with accessible tabs, PackageCard, AddonsGrid (AC-9–AC-14).
5. GallerySection with filters and accessible before/after slider (AC-16–AC-19).
6. ServiceSplit, ReviewsSection, AboutSection, Footer, MobileCallFloat (AC-8, AC-34–AC-36).
7. `bookingSchema.ts` with unit tests (AC-29), then BookingForm with validation, conditional address, pre-fill, `submitBooking.ts`, success and error states (AC-21–AC-33).
8. Head: title, meta, Open Graph, JSON-LD; images in WebP with sizes; reveal animations with reduced-motion support (AC-37, AC-39).
9. Responsive and accessibility pass at 360 / 768 / 1280 px (AC-38, AC-40); make sure build, unit and e2e pass (AC-41).

The Front-End Dev follows to polish visual fidelity to the mockup (spacing, typography, glow on primary buttons, image edge fade, animations) without changing behavior.

## 7. Risks
- **Lost leads:** if the site goes live in demo mode, requests are silently not delivered. Mitigation: Assumption 2 must be resolved before deploy; demo mode logs a console warning.
- **Stock images** may look generic next to the real reviews. Mitigation: swap for real photos as soon as possible (one data file + image folder).

## 8. Content reference
The exact copy for every section is in Herbert's brief "ESPECIFICAÇÃO TÉCNICA E VISUAL DE DESENVOLVIMENTO WEB — DC Detailing Services", reproduced here for the team.

### Business data
- Brand: DC Detailing Services
- Address: 143 Waverley Ave, Moncton, NB E1C 7V1, Canada
- Phone / SMS: +1 (506) 940-6494 (`tel:+15069406494`)
- Mobile coverage: Moncton, Dieppe, Riverview, Shediac, Salisbury
- Hours: Mon–Sat 8:00 AM – 6:00 PM; Sunday closed
- Rating: 4.9 stars on Google, 170+ reviews

### Top Bar
"143 Waverley Ave, Moncton, NB E1C 7V1" · "+1 (506) 940-6494" · "Mon–Sat: 8:00 AM – 6:00 PM"

### Navbar
Logo: "DC DETAILING" (bold italic white) with "SERVICES" below in #94A3B8 between two thin horizontal lines. Links: HOME, SERVICES & PACKAGES, GALLERY, ABOUT US, REVIEWS. CTA: BOOK AN APPOINTMENT.

### Hero
- Eyebrow: PREMIUM AUTO DETAILING IN MONCTON
- H1 line 1: RESTORE. PROTECT. SHINE.
- H1 line 2: Moncton's Premium Auto Detailing Services.
- Subheadline: From everyday hand washes to paint correction and ceramic coatings, we bring back that showroom shine. Fully mobile and shop-based services.
- Buttons: VIEW PACKAGES · GET A FREE QUOTE
- Image: dark car in a studio being machine-polished, directional lighting, left edge fading into #0D0F12.

### Trust Bar — "Why Choose Us"
1. 5-Star Service (170+ Reviews) — Moncton's highest-rated auto detailing specialists on Google.
2. Experienced Professionals — Trained technicians using safe, swirl-free techniques and pro-grade products.
3. Fully Equipped Shop on Waverley Ave — Climate-controlled facility in Moncton plus convenient mobile service.
Background #13161C, 1 px red top/bottom borders.

### Services & Packages
- Eyebrow: TRANSPARENT PRICING & PACKAGES
- H2: Detailing Packages Tailored to Your Vehicle
- Subtitle: Choose from our signature interior, exterior, or full showroom packages. Prices vary slightly by vehicle size (Sedan, SUV/Crossover, Truck/Van).
- Tabs: Coupe / Sedan · SUV / Crossover · Truck / Van
- Package names, descriptions, features, prices and CTAs: exactly as `PACKAGES_DATA` in the brief (reproduced below). Price label format: "Starting at $129".

```ts
export const PACKAGES_DATA: PackageItem[] = [
  { id: "express", name: "Express Refresh", prices: { sedan: 129, suv: 159, truck: 179 },
    description: "Quick interior & exterior maintenance clean.",
    features: ["Hand wash & microfiber dry", "Wheel & tire deep clean + dressing", "Exterior window cleaning",
      "Full interior vacuum (seats, carpets, trunk)", "Dashboard, console & door panel wipe-down", "Interior glass & air freshener"],
    ctaText: "Select Express" },
  { id: "full-detail", name: "Complete Full Detail", badge: "MOST POPULAR", isPopular: true,
    prices: { sedan: 249, suv: 279, truck: 299 },
    description: "Deep restoration clean inside and out.",
    features: ["Everything in Express Refresh", "Clay bar decontamination & iron removal",
      "Carnauba wax or synthetic paint sealant (3-month protection)", "Deep steam cleaning & shampoo of carpets/mats",
      "Leather conditioning or fabric seat extraction", "Door jambs, vents & crevice detailing"],
    ctaText: "Book Full Detail" },
  { id: "ceramic", name: "Showroom Ceramic & Correction", prices: { sedan: 599, suv: 629, truck: 649 },
    description: "Paint enhancement and long-lasting ceramic protection.",
    features: ["Full exterior wash & chemical/mechanical decontamination",
      "Single-stage machine paint enhancement (removes light swirls & oxidation)",
      "2-Year Ceramic Coating application on paint & wheels", "Exterior trim restoration & hydrophobic glass coating",
      "Full interior deep detail included"],
    ctaText: "Request Inspection" }
];
```
- Add-ons: Pet Hair Removal $40+ · Headlight Restoration $75 · Engine Bay Detailing $65 · Ozone Odor Elimination $80

### Gallery
- Eyebrow: PROVEN RESULTS
- H2: See the DC Detailing Difference
- Filters: All Work · Interior Restoration · Paint Correction · Ceramic Coating
- Cards: see FR-15.
- Empty filter text: "No projects in this category yet."

### Shop vs Mobile
- SHOP DETAILING — Visit Our Moncton Studio — 143 Waverley Ave, Moncton, NB — "Climate-controlled facility optimized for precision paint correction, ceramic coatings, and deep interior detailing regardless of weather conditions."
- MOBILE DETAILING — We Come to Your Driveway — Serving Moncton, Dieppe & Riverview — "Fully equipped mobile unit bringing high-end detailing directly to your home or workplace. Perfect for routine washes and interior refreshes."

### Reviews
- Badge: 4.9 ★ Rating on Google — Based on 170+ Verified Reviews
- H2: Trusted by Drivers Across Greater Moncton
- "Brought my SUV in after a rough New Brunswick winter and it looks brand new inside. Zero salt stains left on the carpets. Hands down the best detailing in Moncton!" — Marc-André L. (Google Local Guide)
- "Super easy to book, transparent pricing, and incredible attention to detail. My black sedan had swirl marks everywhere and now looks like a mirror." — Sarah T.
- "Booked the Complete Full Detail for my truck. Worth every penny—they got dog hair out of places I didn't think was possible. Will definitely be back." — Jason M.
- Link: Read all 170+ reviews on Google →

### About
- H2: Passionate About Perfection, Built on Trust
- P1: At DC Detailing Services, we treat every vehicle as if it were our own. Based in Moncton, NB, our mission is to deliver uncompromising quality through professional techniques, pH-neutral products, and absolute transparency.
- P2: Whether you visit our fully equipped studio on Waverley Ave or request our mobile unit at your home, we guarantee a level of cleanliness and gloss that exceeds expectations.
- Metrics: 170+ 5-Star Google Reviews · 1,500+ Vehicles Detailed · 100% Satisfaction Guarantee

### Booking
- Section heading: Book Your Appointment or Get a Free Quote
- Placeholders: "John Doe", "(506) 555-0199", "john@example.com", "e.g. 2021 Toyota RAV4", "Describe any specific concerns like pet hair, salt stains, scratches..."
- Submit: BOOK MY APPOINTMENT
- Confirmation heading: Thank You! Your Request Has Been Received.
- Confirmation text: We have reserved your details. Our team will review your vehicle specifications and contact you via phone or SMS at the provided number to confirm your exact appointment time.
- Confirmation footer: Need immediate assistance? Call or Text us directly at +1 (506) 940-6494.

### Footer
- Summary: Moncton's premier auto detailing studio and mobile service. Restoring and protecting your vehicle's value.
- Quick Links: Home, Services & Packages, Gallery, About Us, Reviews, Book Now
- Service Areas: Moncton, NB · Dieppe, NB · Riverview, NB · Shediac, NB · Salisbury, NB
- Contact: Address: 143 Waverley Ave, Moncton, NB E1C 7V1 · Phone: +1 (506) 940-6494 · Hours: Mon–Sat: 8:00 AM – 6:00 PM | Sun: Closed
- Copyright: © <year> DC Detailing Services. All rights reserved. | Moncton, New Brunswick.

### JSON-LD (verbatim)
```json
{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "DC Detailing Services",
  "image": "https://dcdetailing.ca/images/hero-detailing.jpg",
  "@id": "https://dcdetailing.ca",
  "url": "https://dcdetailing.ca",
  "telephone": "+15069406494",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "143 Waverley Ave",
    "addressLocality": "Moncton",
    "addressRegion": "NB",
    "postalCode": "E1C 7V1",
    "addressCountry": "CA"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 46.0988, "longitude": -64.7964 },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "172" },
  "areaServed": ["Moncton", "Dieppe", "Riverview", "Shediac", "Salisbury"]
}
```

## 9. Design system reference

```js
// tailwind.config.js — theme.extend.colors
brand: {
  bg: '#0D0F12',      // primary background
  card: '#16191F',    // cards / secondary background
  topbar: '#090A0D',  // top bar and footer
  border: '#262A33',  // borders and dividers
  primary: '#DC2626', // sporty red, primary CTA
  hover: '#B91C1C',   // red hover
  text: '#F8FAFC',    // primary text
  muted: '#94A3B8',   // secondary text
  gold: '#FACC15',    // review stars
}
```
- Trust Bar background: #13161C.
- Headings: Barlow, Bold/ExtraBold, uppercase for badges and slogans, `tracking-wide`/`tracking-wider`.
- Body: Inter 400/500/600, line-height 1.4–1.5.
- 1 px red (#DC2626) lines under the navbar and around the Hero/Trust Bar boundary.
- Buttons and cards: `rounded-md` (6 px); soft red glow on primary button hover; subtle inner shadow on focused inputs.
- Top Bar: ~36 px tall, 12–13 px text in #94A3B8, red map-pin icon.
- Navbar: `bg-[#0D0F12]/90 backdrop-blur-md border-b border-[#DC2626]`.
