# Test report: post-mvp-fixes

- **Verdict:** **PASS** — all acceptance criteria pass, the full suite is green, and the two issues found in the first run (#7, #8) are verified fixed.
- **Branch / commit tested:** `feature/post-mvp-fixes` @ `83e0ead` (retest; the only later changes are this report and the test cases)
- **Spec:** `docs/specs/post-mvp-fixes.md` (base: `docs/specs/landing-page-mvp.md`)
- **Test cases:** `docs/test-cases/post-mvp-fixes.md` (TC-1 to TC-10 for AC-1 to AC-10, TC-11 to TC-13 exploratory)
- **Runs:** 2026-11-21, first full run @ `e11f83c` (FAIL, #7/#8), retest @ `83e0ead` (PASS)

## Counts

| Suite | Result |
|---|---|
| Lint (`npm run lint`) | Pass |
| Build (`npm run build`) | Pass |
| Unit (Vitest) | 38 / 38 passed |
| E2E (Playwright, desktop + mobile) | 93 passed, 17 skipped by design, 0 failed |
| `npm audit` | 0 vulnerabilities (zod 4.6.7 installed; no dependency change in the retest) |

No flaky tests: every e2e run (two full runs before the retest, one after) was green on the first attempt.

The 17 skips are by design, via `onlyDesktop()` / `onlyMobile()` (desktop-only and mobile-only tests).

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
| FR-1 (exploratory) | TC-11 | Pass |
| FR-4 / FR-5 (exploratory) | TC-12 | Pass (retest, #7) |
| FR-5 (exploratory) | TC-13 | Pass (retest, #8) |

## Retest @ `83e0ead`

| Issue | Fix commit | Verification |
|---|---|---|
| #7 (major) mobile drawer overlay | `7079f81` | Drawer is now portaled to `document.body`. Measured rect 375 x 740 at a 375 x 740 viewport and 800 x 900 at an 800 x 900 viewport (`y=0`, width/height within 1 px); background opaque; CTA bottom at 724/740 and 884/900. Screenshots `test-results/drawer-fixed-375.png`, `drawer-fixed-800.png`. `TC-12 (#7)` passes; base AC-5/AC-6/AC-7/AC-8/AC-9 pass. Commented on #7. |
| #8 (minor) Tab after resize | `83e0ead` | At 375 px with the drawer open, resizing to 1200 px unmounts the dialog, sets `aria-expanded="false"` on the hamburger and the first Tab focuses the top-bar link (no longer `BODY`). `TC-13 (#8)` passes. Commented on #8. |

No regressions found: full lint, build, unit and e2e suite re-run after both fixes.

## Issues opened in the first run (now verified fixed)

- **#7 (major): Mobile menu overlay is only 64 px tall and the page shows through it.** Caused by `backdrop-filter` on the header acting as the containing block for the `fixed inset-0` drawer. Fixed by portaling the drawer to `document.body` (plus `overflow-y-auto` for short viewports). Verified fixed; the issue stays open until the pull request merges.
- **#8 (minor): Tab stops working after resizing past 1024 px with the mobile menu open.** Fixed by closing the drawer on the `(min-width: 1024px)` media-query change, which removes the trap listener. Verified fixed; the issue stays open until the pull request merges.

Earlier scope issues, all verified fixed in the first run: #1 (`e11f83c`), #3 (`5dc5bdc`), #4 (`4f57042`), #5 (`cf87760`), #6 (`bc7b330`).

## Visual checks

- 375 px and 800 px with the drawer open: full-screen dark overlay, page and mobile floating bar hidden, links readable, "BOOK AN APPOINTMENT" at the bottom; no overlap with page content. At 1023 px the drawer is 1023 x 800 (full viewport); at 1024 px it closes automatically.
- 1400 px and 1920 px hero: image reaches the right edge (right edge at `clientWidth`, `scrollWidth == clientWidth`); the H1 starts at the same left content edge as the packages container (x=92 / x=352).
- 1280 px: two columns 704 / 576 px, image ends at the viewport edge — unchanged from the MVP.
- 375 px: hero stacks as before.

## Code review (branch against `main`)

- **Drawer fix (`Navbar.tsx`):** `createPortal(..., document.body)` removes the `backdrop-filter` containing-block problem without changing the header's visual design; `overflow-y-auto` keeps the menu usable on short/landscape screens. The `matchMedia('(min-width: 1024px)')` listener closes the drawer when the desktop layout takes over, which also disables the focus trap; the listener is cleaned up on unmount. The `closeButton` ref and the trap still work after portaling (verified with the keyboard and e2e). Correct.
- **Portal lifecycle:** the portal is only created while `open`, so there is no extra markup at rest. No SSR is used (Vite SPA), so `document.body` is always available.
- **Hero / footer / zod / pre-fill** code is unchanged since the first run and was already reviewed there.
- **Tests:** `TC-12 (#7)` asserts the drawer's box against `documentElement.clientWidth` / `innerHeight` and the CTA's distance from the bottom at two viewports; `TC-13 (#8)` asserts the dialog unmounts, `aria-expanded` becomes `false`, and Tab focuses a real element. Both are behavior tests and would fail on the old code.
- **Nit (not an issue):** the JSX inside `createPortal` is not re-indented after the change; formatting only.
- **Security:** no new input path or HTML rendering; no secrets. No dependency changes since the clean `npm audit` in the first run.

## Spec issues

None. The scope note from the first run (#7 was a pre-existing visual defect in a surface this round touched) was resolved by fixing it.

## Not covered

- Non-Chromium browsers and real mobile devices (Chromium desktop + mobile emulation only).
- The live booking endpoint (intentionally out of scope; the form stays in demo mode).
- The GitHub Actions CI run (AC-10 verified locally; base AC-41 still relies on CI).
- Hero widths between the sampled breakpoints (1280, 1400 and 1920 px are measured).
- Drawer geometry at viewports other than 375 x 740 and 800 x 900.

## Verdict rationale

All ten acceptance criteria have at least one passing test case, the full suite is green, and no unverified critical or major issue remains: #7 is verified fixed (the issue stays open only until the pull request merges) and #8 is verified fixed. No new defects were found. PASS.
