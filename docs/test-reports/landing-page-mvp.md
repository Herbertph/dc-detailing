# Test report: landing-page-mvp

- **Verdict:** PASS
- **Branch / commit tested:** `feature/landing-page-mvp` @ `7bf65c7` (hero polish)
- **Spec:** `docs/specs/landing-page-mvp.md`
- **Test cases:** `docs/test-cases/landing-page-mvp.md` (45 test cases: TC-1 to TC-41 for AC-1 to AC-41, TC-42 to TC-45 exploratory)

## Counts

| Suite | Result |
|---|---|
| Lint | Pass |
| Unit (Vitest) | 37 / 37 passed |
| E2E (Playwright, desktop + mobile) | 71 passed, 7 skipped by design (desktop-only / mobile-only), 0 failed |
| QA exploratory (`e2e/qa-exploratory.spec.ts`) | 7 passed, 3 skipped by design |
| Build | Pass |

No flaky tests seen (every test passed on the first run).

## Traceability
| AC | Test case | Result |
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
| AC-11 | TC-11 | Pass |
| AC-12 | TC-12 | Pass |
| AC-13 | TC-13 | Pass |
| AC-14 | TC-14 | Pass |
| AC-15 | TC-15 | Pass |
| AC-16 | TC-16 | Pass |
| AC-17 | TC-17 | Pass |
| AC-18 | TC-18 | Pass |
| AC-19 | TC-19 | Pass |
| AC-20 | TC-20 | Pass |
| AC-21 | TC-21 | Pass |
| AC-22 | TC-22 | Pass |
| AC-23 | TC-23 | Pass |
| AC-24 | TC-24 | Pass |
| AC-25 | TC-25 | Pass |
| AC-26 | TC-26 | Pass |
| AC-27 | TC-27 | Pass |
| AC-28 | TC-28 | Pass |
| AC-29 | TC-29 | Pass |
| AC-30 | TC-30 | Pass |
| AC-31 | TC-31 | Pass |
| AC-32 | TC-32 | Pass |
| AC-33 | TC-33 | Pass |
| AC-34 | TC-34 | Pass |
| AC-35 | TC-35 | Pass |
| AC-36 | TC-36 | Pass |
| AC-37 | TC-37 | Pass |
| AC-38 | TC-38 | Pass |
| AC-39 | TC-39 | Pass |
| AC-40 | TC-40 | Pass |
| AC-41 | TC-41 | Pass |
| AC-40 (exploratory) | TC-42 | Pass |
| AC-7 (exploratory) | TC-43 | Pass |
| AC-38 (exploratory) | TC-44 | Pass |
| AC-7 (exploratory) | TC-45 | Pass |

## Issues

- #1 (minor): Hero image does not reach the right edge on viewports wider than 1280 px. Found while checking 1400 px by eye. Backlog.

No critical or major issues open.

## Visual check (800 px and 1400 px)

- 800 px: hamburger menu, uppercase slate title, red glow on VIEW PACKAGES, red line under the hero; image stacks below the text. No problems.
- 1400 px: layout correct, no horizontal scroll; cosmetic gap to the right of the hero image (#1).

## Code review (commit 7bf65c7 and branch against `main`)

- Hero polish diff is small and correct; uppercase is CSS-only, so the H1 text and AC-7 stay intact; `active:scale` is behind `motion-safe`, respecting reduced motion.
- Suggestion (not a defect): the `btn-primary` resting glow is also applied to the disabled submit button; consider `disabled:shadow-none`.
- Security: no user input is rendered as HTML (no `dangerouslySetInnerHTML`/`innerHTML` in `src`); the booking POST sends JSON only. `npm audit` reports GHSA-mrhx-c7xc-m3w5 (high) in `zod` < 4.6.6; risk is low here because validation runs in the browser on small fixed-size fields, but upgrading `zod` before go-live is recommended.

## Spec issues

None.

## Not covered

See the "Not covered" list in the test cases file (live endpoint, CI run, non-Chromium browsers).
