# Review: post-mvp-fixes

- **Verdict:** APPROVED
- **Commit reviewed:** `95f7a07` (the code was last changed in `83e0ead`; `95f7a07` only updates the QA docs, confirmed with `git diff 83e0ead..HEAD`)
- **Spec:** `docs/specs/post-mvp-fixes.md` (base: `docs/specs/landing-page-mvp.md`)
- **Build and tests (run by the reviewer):**
  - `npm run lint` -> pass, no output
  - `npm run build` -> pass (tsc -b + vite build)
  - `npm run test` -> 8 files, 38/38 tests pass
  - `npm run test:e2e` -> 93 passed, 17 skipped by design, 0 failed
  - `npm audit` -> 0 vulnerabilities; `npm ls zod` -> zod 4.6.7 installed
- **QA report:** agrees with my run (same counts, same retested commit; the report records `83e0ead` and the only later commits are docs)

## Requirements coverage

| AC | Implemented in | Tested by | Status |
|---|---|---|---|
| AC-1 | `src/components/Hero.tsx:6` | `e2e/post-mvp-fixes.spec.ts:4` | Pass |
| AC-2 | `src/components/Hero.tsx:6` | `e2e/post-mvp-fixes.spec.ts:17`, base AC-7 / AC-40 | Pass |
| AC-3 | `src/data/detailingData.ts:27-30`, `src/components/Footer.tsx:12-21,34-46` | `e2e/post-mvp-fixes.spec.ts:40`, `e2e/content.spec.ts:66` | Pass |
| AC-4 | `package.json:23`, `src/lib/bookingSchema.ts:49-79` | `src/lib/dependencies.test.ts:5-7`, `src/lib/bookingSchema.test.ts`, `e2e/booking.spec.ts`, manual `npm audit` | Pass |
| AC-5 | `src/components/BookingForm.tsx:64-69` | `e2e/post-mvp-fixes.spec.ts:52` | Pass |
| AC-6 | `src/components/BookingForm.tsx:64-69` | `e2e/post-mvp-fixes.spec.ts:72` | Pass |
| AC-7 | `src/components/Navbar.tsx:18-20,93-101` | `e2e/post-mvp-fixes.spec.ts:79` | Pass |
| AC-8 | `src/components/Navbar.tsx:27-44` | `e2e/post-mvp-fixes.spec.ts:90` | Pass |
| AC-9 | `src/components/Navbar.tsx:13-16,21-26` | `e2e/post-mvp-fixes.spec.ts:150`, base AC-6 | Pass |
| AC-10 | whole branch | full suite above | Pass |

## Blockers

None.

## Should fix

- R-1: After the drawer closes on an anchor link, `close()` puts focus back on the hamburger, so the next Tab starts again from the top of the page while the viewport is already at `#gallery` / `#booking`. FR-5 allows returning focus to the hamburger, so this is not a blocker, and the behavior predates this branch; for anchor links, leaving focus at the target (or not stealing it) is the better keyboard outcome. `src/components/Navbar.tsx:13-16,118-130`.

## Suggestions

- R-2: On viewports wider than 1280 px the text column scales with the viewport (55% of viewport minus the left gutter): at 1920 px it is 880 px wide instead of the 704 px it would have inside the `max-w-7xl` container. FR-1 only pins the left alignment, so this is within spec, but it changes the hero composition at very wide screens; cap the text column if the MVP composition matters. `src/components/Hero.tsx:6`.
- R-3: The open drawer does not lock background scrolling; when the menu content fits, a wheel/touch gesture on the overlay can chain to the page behind it. Not required by FR-5 and pre-existing. `src/components/Navbar.tsx:93-102`.
- R-4: `AC-9` in the new spec duplicates the base AC-6 test body; the spec asked for the AC-9 test, but a comment pointing at the base test would avoid drift. `e2e/post-mvp-fixes.spec.ts:150` vs `e2e/navigation.spec.ts:68`.
- R-5: `dependencies.test.ts` asserts the declared range in `package.json`, not the installed version. With `^4.6.7` that is enough to keep GHSA-mrhx-c7xc-m3w5 out, so no action is needed now. `src/lib/dependencies.test.ts:6`.

## Not reviewed

- That `https://www.instagram.com/dc_detailling_/` is the shop's real profile: I verified the href matches the spec, but the handle itself is an external fact I cannot check.
- Equivalence of email acceptance between zod 3 and zod 4 beyond the existing base tests (QA spot-checked it; I did not re-derive it).
- Non-Chromium browsers, real devices and the GitHub Actions CI run (same limits as the QA report).
- Behavior at hero widths between 1280 and 1400 px: geometry was measured at 1280, 1400 and 1920 px only.

## Verdict rationale

All ten acceptance criteria are implemented and have a test that can fail, the full suite is green on `95f7a07`, and no regression or security issue was found in the diff. The two QA-found defects (#7, #8) are verified fixed in the retested code. The remaining items are non-blocking design and UX suggestions for the product owner.