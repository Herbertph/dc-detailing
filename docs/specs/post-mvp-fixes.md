# Spec: Post-MVP fixes

Branch: `feature/post-mvp-fixes`
Base spec: `docs/specs/landing-page-mvp.md` (all its acceptance criteria must keep passing).
Issues: #1, #3, #4, #5, #6

## 1. Context

The MVP (PR #2) is merged. Herbert will show the site to the shop owner as a sales prototype, so it needs to look finished. This round fixes the bugs and follow-ups from testing and review of PR #2.

## 2. Scope

### In scope
- #1: the hero image reaches the right edge on wide viewports.
- #3: the real Instagram link, and no Facebook link.
- #4: upgrade zod to v4.
- #5: clear stale validation errors after a package pre-fills the form.
- #6: trap keyboard focus in the open mobile menu.

### Out of scope
- The booking endpoint. The site is a sales prototype, and the form intentionally stays in demo mode (no `VITE_BOOKING_ENDPOINT`). Reviewer item R-4 (block deploys without an endpoint) is dropped.
- Any other visual or content change.

## 3. Functional requirements

- **FR-1 (#1)** On viewports wider than 1280 px, the hero image extends to the right edge of the viewport (full bleed). The text column stays aligned with the page container. The left-edge fade into the background and the red bottom border stay as they are. At 1280 px and below, the layout does not change.
- **FR-2 (#3)** `SOCIAL_LINKS` in `src/data/detailingData.ts` contains only Instagram (`https://www.instagram.com/dc_detailling_/`) and Google Business. The footer shows only those two icons. This updates FR-28 of the base spec (Facebook removed).
- **FR-3 (#4)** The project uses zod 4. `npm audit` no longer reports GHSA-mrhx-c7xc-m3w5. Validation behavior and error messages do not change.
- **FR-4 (#5)** When a package button pre-fills Desired Package and Vehicle Type, the errors on those two fields are cleared. Errors on other fields stay as they were.
- **FR-5 (#6)** While the mobile drawer is open, it behaves as a modal dialog (`role="dialog"`, `aria-modal="true"`, accessible name "Menu"). Tab and Shift+Tab cycle only through the drawer's focusable elements. When the drawer opens, focus moves into it. Escape, the close button, or a link click closes it, and focus returns to the hamburger (or the page scrolls to the link's anchor).

## 4. Acceptance criteria

- **AC-1** Given a 1400 px and a 1920 px wide viewport, when the page loads, then the right edge of the hero image is at the right edge of the viewport (within 1 px), and there is no horizontal scrolling.
- **AC-2** Given a 1280 px and a 375 px viewport, when the page loads, then the hero layout matches the MVP (the base spec's AC-7 and AC-40 still pass).
- **AC-3** Given the footer, then it has exactly two social links: "Instagram", with href `https://www.instagram.com/dc_detailling_/`, and "Google Business". Both open in a new tab, and there is no Facebook link anywhere on the page.
- **AC-4** Given the project, then `package.json` depends on zod `^4`, `npm audit` does not list GHSA-mrhx-c7xc-m3w5, and every booking unit test (base AC-29) and booking e2e test (base AC-21 to AC-33) passes with the same error messages.
- **AC-5** Given the empty form was submitted and every required field shows an error, when the user clicks "Book Full Detail" in Packages, then Desired Package and Vehicle Type are filled, have no error message, and do not have `aria-invalid="true"`, while Full Name still shows its error.
- **AC-6** Given the form has no errors, when the user clicks a package button, then no error appears on any field (pre-fill does not trigger validation of other fields).
- **AC-7** Given a 375 px viewport and the drawer is open, then the drawer has `role="dialog"` and `aria-modal="true"`, and focus is inside it.
- **AC-8** Given the drawer is open and focus is on its last focusable element, when the user presses Tab, then focus moves to its first focusable element. When the user presses Shift+Tab on the first element, then focus moves to the last. Focus never reaches an element outside the drawer.
- **AC-9** Given the drawer is open, when the user presses Escape, then it closes and focus returns to the hamburger button (base AC-6 still passes).
- **AC-10** Given the whole project, then lint, build, unit tests and e2e tests (including every base-spec test) pass.

## 5. Assumptions
1. "Full bleed" on the right only: the text column keeps the container's left alignment.
2. The Google Business link keeps its current URL (Google Maps search) until Herbert provides the profile URL.

## 6. Technical notes and tasks
1. #3: edit `SOCIAL_LINKS` in `src/data/detailingData.ts` and remove the Facebook icon import in `Footer`. Update the AC-34 e2e test.
2. #4: bump `zod` to v4 and `@hookform/resolvers` to a version that supports it. Fix `src/lib/bookingSchema.ts` for API changes (for example `message` → `error` options) and keep the messages identical.
3. #5: in `BookingForm`, when applying the pre-fill (`setValue`), call `clearErrors` for the two pre-filled fields, or use `setValue(..., { shouldValidate: true })` only for those fields. Do not run `trigger()` on the whole form.
4. #6: in `Navbar`, give the drawer dialog semantics, move focus into it on open, and trap Tab/Shift+Tab. A small hand-written trap is fine; there is no need for a new dependency.
5. #1: in `Hero.tsx`, let the image column break out of `max-w-7xl` on the right (for example with an absolutely positioned image area, or a negative right margin computed from the container gutter) without causing horizontal overflow.
6. Add e2e tests named `AC-n: ...` for AC-1 and AC-3 to AC-9 of this spec, and commit fixes as `fix: ... (#n)`.
