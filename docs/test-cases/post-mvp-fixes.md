# Test cases: post-mvp-fixes

- **Spec:** `docs/specs/post-mvp-fixes.md`
- **Branch:** `feature/post-mvp-fixes`
- **Base spec:** `docs/specs/landing-page-mvp.md` (all its acceptance criteria must keep passing)
- **Environment:** production build (`npm run build`) served on port 5179 by Playwright; desktop project 1280 x 800, mobile project 375 x 740
- **Run date:** 2026-11-21

## Traceability

| AC | Test case(s) | Result |
|---|---|---|
| AC-1 | TC-1 | Pass |
| AC-2 | TC-2 | Pass |
| AC-3 | TC-3 | Pass |
| AC-4 | TC-4 | Pass |
| AC-5 | TC-5 | Pass |
| AC-6 | TC-6 | Pass |
| AC-7 | TC-7 | Pass |
| AC-8 | TC-8 | Pass |
| AC-9 | TC-9 | Pass |
| AC-10 | TC-10 | Pass |
| FR-1 | TC-11 (exploratory) | Pass |
| FR-4 / FR-5 | TC-12 (exploratory) | Fail (#7) |
| FR-5 | TC-13 (exploratory) | Fail (#8) |

## Test cases

### TC-1: hero image reaches the right edge at 1400 px and 1920 px
- **Acceptance criterion:** AC-1
- **Priority:** high
- **Type:** boundary
- **Preconditions:** production build served on port 5179, desktop project
- **Test data:** viewport 1400 x 900 and 1920 x 900
- **Steps:**
  1. Open `/` at 1400 px.
  2. Measure the hero image's right edge and `documentElement.clientWidth`; check `scrollWidth`.
  3. Repeat at 1920 px.
- **Expected result:** image right edge is within 1 px of the viewport right edge and there is no horizontal scrolling.
- **Automated by:** `e2e/post-mvp-fixes.spec.ts` › `AC-1: the hero image reaches the right edge on viewports wider than 1280 px`
- **Status:** Pass

### TC-2: hero layout at 1280 px and 375 px still matches the MVP
- **Acceptance criterion:** AC-2
- **Priority:** high
- **Type:** boundary
- **Preconditions:** production build served on port 5179
- **Test data:** viewport 1280 x 800 and 375 x 740
- **Steps:**
  1. Open `/` at 1280 px; measure the image column start (about 55% of the width), its right edge and `scrollWidth`.
  2. Open `/` at 375 px; check the image stacks below the H1, spans the full width and does not overflow.
  3. Run the base AC-7 (`e2e/navigation.spec.ts`) and AC-40 (`e2e/quality.spec.ts`) tests.
- **Expected result:** two-column layout at 1280 px, stacked hero at 375 px, no horizontal scrolling; base AC-7 and AC-40 pass.
- **Automated by:** `e2e/post-mvp-fixes.spec.ts` › `AC-2: the hero layout at 1280 px and 375 px matches the MVP`; `e2e/navigation.spec.ts` › `AC-7`; `e2e/quality.spec.ts` › `AC-40: no horizontal scrolling at 360 px`
- **Status:** Pass

### TC-3: footer has exactly Instagram and Google Business
- **Acceptance criterion:** AC-3
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served on port 5179
- **Test data:** expected Instagram URL `https://www.instagram.com/dc_detailling_/`
- **Steps:**
  1. Open `/`.
  2. List the footer social links and their attributes.
  3. Search the whole page for Facebook links and names.
- **Expected result:** exactly two social links: "Instagram" with the real profile URL and "Google Business", both `target="_blank"`; no Facebook link anywhere.
- **Automated by:** `e2e/post-mvp-fixes.spec.ts` › `AC-3: footer has only the Instagram and Google Business social links`; base AC-34 in `e2e/content.spec.ts`
- **Status:** Pass

### TC-4: zod 4, advisory gone, booking validation unchanged
- **Acceptance criterion:** AC-4
- **Priority:** high
- **Type:** security
- **Preconditions:** clean install from the committed lockfile
- **Test data:** `package.json`, `package-lock.json`, `npm audit`
- **Steps:**
  1. Check `package.json` declares zod `^4` and the lockfile installs a 4.x version.
  2. Run `npm audit` and search for GHSA-mrhx-c7xc-m3w5.
  3. Run the booking schema unit tests and the booking e2e tests (base AC-21 to AC-33).
  4. Spot-check zod 3 vs zod 4 email acceptance on a sample of valid and invalid addresses.
- **Expected result:** zod 4 installed, `npm audit` reports no vulnerabilities, and every booking test passes with the same messages and behavior.
- **Automated by:** `src/lib/dependencies.test.ts` › `AC-4: depends on zod 4 (fixes GHSA-mrhx-c7xc-m3w5)`; `src/lib/bookingSchema.test.ts`; `e2e/booking.spec.ts`; manual `npm audit` (0 vulnerabilities, zod 4.6.7 installed)
- **Status:** Pass

### TC-5: a package pre-fill clears only the two pre-filled field errors
- **Acceptance criterion:** AC-5
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served on port 5179, empty form
- **Test data:** package "Book Full Detail", current size tab "Coupe / Sedan"
- **Steps:**
  1. Open `/`, click "BOOK MY APPOINTMENT" on the empty form.
  2. Confirm Vehicle Type and Desired Package show `aria-invalid="true"` and error text.
  3. Click "Book Full Detail" in Packages.
- **Expected result:** both fields are filled, no error text, no `aria-invalid="true"`; Full Name still shows its error.
- **Automated by:** `e2e/post-mvp-fixes.spec.ts` › `AC-5: a package pre-fill clears the errors on the two pre-filled fields only`
- **Status:** Pass

### TC-6: a package pre-fill does not validate the rest of the form
- **Acceptance criterion:** AC-6
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served on port 5179, untouched form
- **Test data:** package CTA "Select Express"
- **Steps:**
  1. Open `/`.
  2. Click "Select Express".
- **Expected result:** Vehicle Type and Desired Package are filled and no field anywhere shows `aria-invalid="true"` or an error message.
- **Automated by:** `e2e/post-mvp-fixes.spec.ts` › `AC-6: a package pre-fill does not trigger validation on other fields`
- **Status:** Pass

### TC-7: the mobile drawer is a modal dialog and receives focus
- **Acceptance criterion:** AC-7
- **Priority:** high
- **Type:** accessibility
- **Preconditions:** mobile project (375 x 740), production build served on port 5179
- **Test data:** none
- **Steps:**
  1. Open `/`.
  2. Click "Open menu".
  3. Inspect the drawer's role and `aria-modal`; check `document.activeElement`.
- **Expected result:** the drawer has `role="dialog"`, `aria-modal="true"`, accessible name "Menu", and focus is inside it.
- **Automated by:** `e2e/post-mvp-fixes.spec.ts` › `AC-7: the mobile drawer is a modal dialog and receives focus on open`
- **Status:** Pass

### TC-8: Tab and Shift+Tab cycle inside the drawer
- **Acceptance criterion:** AC-8
- **Priority:** high
- **Type:** accessibility
- **Preconditions:** mobile project, drawer open
- **Test data:** first focusable = "Close menu", last focusable = "BOOK AN APPOINTMENT"
- **Steps:**
  1. Focus the last element and press Tab.
  2. Press Shift+Tab from the first element.
  3. Press Tab four more times.
- **Expected result:** Tab wraps to the first element, Shift+Tab wraps to the last, and focus never leaves the drawer.
- **Automated by:** `e2e/post-mvp-fixes.spec.ts` › `AC-8: Tab and Shift+Tab cycle inside the mobile drawer`
- **Status:** Pass

### TC-9: Escape closes the drawer and restores focus
- **Acceptance criterion:** AC-9
- **Priority:** high
- **Type:** accessibility
- **Preconditions:** mobile project, drawer open
- **Test data:** none
- **Steps:**
  1. Open the drawer.
  2. Press Escape.
- **Expected result:** the drawer closes and focus is on "Open menu"; base AC-6 still passes.
- **Automated by:** `e2e/post-mvp-fixes.spec.ts` › `AC-9: Escape closes the drawer and returns focus to the hamburger`; `e2e/navigation.spec.ts` › `AC-6: Escape closes the drawer and returns focus to the hamburger`
- **Status:** Pass

### TC-10: lint, build, unit and e2e pass
- **Acceptance criterion:** AC-10
- **Priority:** high
- **Type:** functional
- **Preconditions:** committed lockfile, clean working tree
- **Test data:** none
- **Steps:**
  1. Run `npm run lint`.
  2. Run `npm run build`.
  3. Run `npm run test`.
  4. Run `npm run test:e2e` (desktop and mobile projects, including every base-spec test).
- **Expected result:** all commands succeed; no test fails.
- **Automated by:** whole suite (see `docs/test-reports/post-mvp-fixes.md`)
- **Status:** Pass

### TC-11: hero text stays aligned with the page container on wide viewports
- **Acceptance criterion:** FR-1 (assumption 1), exploratory
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179, desktop project
- **Test data:** viewport 1400 x 900 and 1920 x 900
- **Steps:**
  1. Open `/` at 1400 px and 1920 px.
  2. Compare the H1 left edge with the left content edge of a page container (container box + its horizontal padding).
- **Expected result:** the text column starts on the same vertical line as the rest of the page container (within 1 px).
- **Automated by:** `e2e/post-mvp-fixes.spec.ts` › `TC-11 (FR-1): the hero text aligns with the page container on wide viewports`
- **Status:** Pass

### TC-12: the open mobile drawer covers the viewport
- **Acceptance criterion:** base FR-4 / post-MVP FR-5, exploratory
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served on port 5179
- **Test data:** viewport 375 x 740 and 800 x 900
- **Steps:**
  1. Open `/` at 375 px and tap "Open menu".
  2. Measure the `#mobile-menu` bounding box and compare it with the viewport.
  3. Repeat at 800 px.
- **Expected result:** the dark drawer covers the whole viewport, the page behind it is hidden, and "BOOK AN APPOINTMENT" is at the bottom.
- **Automated by:** not automated (visual/geometry check; the existing e2e tests only assert roles, focus and clicks)
- **Status:** Fail (#7)

### TC-13: resizing past 1024 px with the drawer open keeps keyboard navigation working
- **Acceptance criterion:** FR-5, exploratory
- **Priority:** low
- **Type:** boundary
- **Preconditions:** mobile viewport, drawer open
- **Test data:** open at 375 px, resize to 1200 px
- **Steps:**
  1. Open the drawer at 375 px.
  2. Resize the viewport to 1200 px.
  3. Press Tab several times; check `aria-expanded` on the hamburger.
- **Expected result:** the drawer closes when the desktop layout takes over, or Tab keeps moving focus through the visible page.
- **Automated by:** not automated (manual exploration)
- **Status:** Fail (#8)

## Not covered

- Non-Chromium browsers and real mobile devices (the suite runs Chromium desktop and mobile emulation only).
- The live booking endpoint (out of scope for this round; the form stays in demo mode).
- The GitHub Actions CI run (AC-10 is verified locally; base AC-41 still relies on CI).
- The visual quality of the hero at widths between the tested breakpoints (only 1280, 1400 and 1920 px are measured).
- The mobile drawer's visual geometry is not covered by any AC; it is reported as #7 in TC-12.
