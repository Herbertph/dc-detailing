# Review: real-photos

- **Verdict:** APPROVED
- **Commit reviewed:** 519d81f
- **Spec:** docs/specs/real-photos.md
- **Build and tests (run by the reviewer):** `npm run lint` → clean; `npm run test` → 9 files, 43/43 pass; `npm run build` → OK; `npm run test:e2e` → 100 pass, 18 skipped (viewport-specific), 0 fail
- **QA report:** agrees with my run (QA tested at 1380692; 519d81f only adds tests and docs)

## Requirements coverage
| AC | Implemented in | Tested by | Status |
|---|---|---|---|
| AC-1 | `public/images/*.webp`, `scripts/build-images.mjs` | `src/data/images.test.ts` (AC-1 x2) | OK |
| AC-2 | `src/data/detailingData.ts:135-142` | `src/data/images.test.ts` (AC-2) | OK |
| AC-3 | `public/images/CREDITS.md` | `src/data/images.test.ts` (AC-3) | OK |
| AC-4 | hero + gallery images | `e2e/real-photos.spec.ts` TC-1 (both viewports) | OK |
| AC-5 | simulated before edits | TC-2 + screenshots in test report; reviewer viewed the images | OK |
| AC-6 | photo selection/crop | manual (QA TC-11); reviewer viewed hero and gallery images, nothing readable or identifying found | OK |
| AC-7 | `src/data/detailingData.ts:25-26` | TC-3, `images.test.ts` (AC-7) | OK |
| AC-8 | `GALLERY_ITEMS` titles, `CREDITS.md` | TC-4, `e2e/gallery.spec.ts` AC-17, `src/lib/gallery.test.ts` AC-20 | OK |
| AC-9 | whole project | reviewer run above | OK |

## Blockers
None.

## Should fix
- R-1: `e2e/real-photos.spec.ts:36,39` writes screenshots into the tracked folder `docs/test-reports/real-photos/` on every e2e run, so a plain `npm run test:e2e` leaves the working tree dirty (after my run `luxury-suv-0.png` showed as modified). Write to Playwright's output dir or attach them, and copy to the report only when QA updates it.

## Suggestions
- R-2: `src/data/detailingData.ts:24` keeps the stale comment "Google Business stays a Maps search until the real profile URL is provided", and line 25 has a trailing space after `=`.
- R-3: the simulated swirl marks (`scripts/build-images.mjs:44-47`) are perfect circles that also cover glass and background; they read as an overlay up close. Acceptable under spec assumption 1, replace with real photos before going live.
- R-4 (pre-existing, out of scope): `index.html:20` JSON-LD `image` points to `hero-detailing.jpg`, which does not exist; `og:image` uses the `.webp`.

## Not reviewed
- Vehicle models in the titles (Explorer, C-Class, "Luxury SUV") are plausible from the photos but cannot be confirmed; Mustang (pony badge), Audi A6 and Focus RS ("RS" seats) are consistent with the images.
- License status of the Pexels source pages was taken from `CREDITS.md`; I did not open the pages.
