# Test report: post-mvp-fixes

- **Verdict:** **FAIL** — every acceptance criterion passes, but one major issue found in exploration is open: #7 (mobile drawer overlay).
- **Branch / commit tested:** `feature/post-mvp-fixes` @ `bc7b330` (the only later changes are this report, the test cases and one added test)
- **Spec:** `docs/specs/post-mvp-fixes.md` (base: `docs/specs/landing-page-mvp.md`)
- **Test cases:** `docs/test-cases/post-mvp-fixes.md` (TC-1 to TC-10 for AC-1 to AC-10, TC-11 to TC-13 exploratory)
- **Run date:** 2026-11-21

## Counts

| Suite | Result |
|---|---|
| Lint (`npm run lint`) | Pass |
| Build (`npm run build`) | Pass |
| Unit (Vitest) | 38 / 38 passed |
| E2E (Playwright, desktop + mobile) | 91 passed, 15 skipped by design, 0 failed (two full runs) |
| `npm audit` | 0 vulnerabilities (zod 4.6.7 installed) |

No flaky tests: the full e2e suite passed on the first run, and again on a second full run after adding TC-11.

The 15 skips are by design, via `onlyDesktop()` / `onlyMobile()` (desktop-only and mobile-only tests).

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
| FR-4 / FR-5 (exploratory) | TC-12 | Fail (#7) |
| FR-5 (exploratory) | TC-13 | Fail (#8) |

## Issues opened

- **#7 (major): Mobile menu overlay is only 64 px tall and the page shows through it.** On every viewport below 1024 px the open drawer is 375 x 64 instead of covering the screen; the hero, page text and the mobile floating bar show through and overlap the menu. Cause: `backdrop-filter` on the sticky `<header>` makes it the containing block for the `fixed inset-0` drawer, which is rendered inside the header. Present on `main` since #2; the MVP visual check never opened the drawer.
- **#8 (minor): Tab stops working after resizing past 1024 px with the mobile menu open.** The focus trap keeps intercepting Tab after `lg:hidden` hides the drawer, so focus stays on `body` and the page cannot be tabbed until Escape is pressed. Edge case outside the ACs.

## Retested issues (from this branch's scope)

| Issue | Fix commit | Result |
|---|---|---|
| #1 hero full bleed | `e11f83c` | Verified fixed — AC-1 passes at 1400 and 1920 px; text stays container-aligned (TC-11) |
| #3 Instagram / no Facebook | `5dc5bdc` | Verified fixed — AC-3 and base AC-34 pass |
| #4 zod 4 | `4f57042` | Verified fixed — zod 4.6.7, audit clean, booking tests pass with unchanged messages |
| #5 stale validation errors | `cf87760` | Verified fixed — AC-5 passes; other field errors stay |
| #6 focus trap | `bc7b330` | Verified fixed — AC-7/AC-8/AC-9 and base AC-6 pass (edge case filed as #8) |

Each issue received a verification comment; none was closed (merging the PR closes them).

## Visual checks

- 1400 px and 1920 px: hero image reaches the right edge (right edge exactly at `clientWidth`, `scrollWidth == clientWidth`); H1 starts at x=92 / x=352, the same left content edge as the packages container. At 1920 px the widened text column lets "RESTORE. PROTECT. SHINE." fit on one line (it wrapped at 1400 px and in the MVP); base AC-7 still passes and nothing in the spec requires the wrap.
- 1280 px: two columns 704 / 576 px, image ends at the viewport edge — unchanged from the MVP.
- 375 px: hero stacks as before.
- 375 / 800 / 1023 px with the drawer open: drawer box is 64 px tall and its content overflows over the page — #7. Screenshots: `test-results/drawer-375-full.png`, `test-results/drawer-800-full.png` (local only).

## Code review (branch against `main`)

- **Hero (`Hero.tsx`):** the arbitrary value `lg:pl-[max(0px,calc((100%-80rem)/2))]` is valid; the build normalizes it to `padding-left: max(0px, 50% - 40rem)` and the measured left padding is 60 px at 1400, 320 px at 1920. No horizontal overflow. Correct.
- **Footer (`data/detailingData.ts`, `Footer.tsx`):** Facebook entry and icon removed together; the `SOCIAL_ICONS` record is still exhaustive for the two remaining ids (build and lint pass). Correct.
- **Zod 4 (`bookingSchema.ts`):** `{ error: ... }` options and top-level `z.email()` are the v4 API; `MESSAGES` are untouched, so messages are unchanged. `@hookform/resolvers` 7 already supports v4, so no extra bump was needed. Email acceptance spot-checked zod 3.25.76 vs 4.6.7 on 17 valid/invalid samples: identical.
- **Pre-fill (`BookingForm.tsx`):** `clearErrors(['package', 'vehicleType'])` after `setValue` clears exactly the two fields; no `trigger()` on the whole form. Correct.
- **Drawer (`Navbar.tsx`):** the focus-trap logic is correct and covered (hidden elements are excluded by the selector, first/last wrap works). Two structural findings: the trap is not gated on the drawer being visible (#8), and the drawer's `fixed` positioning is broken by the header's `backdrop-filter` (#7). Suggested fix for #7: render the drawer outside the header (fragment/portal), keeping `fixed inset-0`; then add a geometry assertion.
- **Tests:** the new e2e file covers AC-1 and AC-3 to AC-9; AC-4 is covered by the dependency unit test plus these manual checks; AC-2 and AC-10 are covered through base tests/the suite. Tests assert observable behavior, not implementation. Gap: nothing asserted the drawer's geometry, which is why #7 slipped through the MVP run — regression assertion proposed in #7.
- **Security:** no new input path or HTML rendering; validation still runs on the client (not a security boundary, but the booking endpoint is intentionally disabled in this demo). The dependency upgrade removes the only advisory; `npm audit` is clean; no secrets in the diff.
- **Suggestions (not issues):** `src/lib/dependencies.test.ts` only asserts the `package.json` range; consider also asserting the installed version or running `npm audit` in CI. Consider gating the focus trap on `matchMedia('(min-width: 1024px)')` rather than only on `open`.

## Spec issues

None. One scope note: the spec lists "any other visual or content change" as out of scope, yet #7 is a pre-existing visual defect in the drawer that this round touches (#6) and that is visible on every phone; it needs a scope decision when the branch comes back.

## Not covered

- Non-Chromium browsers and real mobile devices (Chromium desktop + mobile emulation only).
- The live booking endpoint (intentionally out of scope; the form stays in demo mode).
- The GitHub Actions CI run (AC-10 verified locally; base AC-41 still relies on CI).
- Hero widths between the sampled breakpoints (1280, 1400 and 1920 px are measured).

## Verdict rationale

All ten acceptance criteria have at least one passing test case and the full suite is green, but #7 (major) is open: the mobile menu — the surface changed by #6 — is visually broken on every phone viewport. Per the verdict rule, a major issue open for this feature means FAIL. #8 is minor and can stay in the backlog.
