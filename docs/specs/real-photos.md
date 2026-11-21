# Spec: Real photos and Google Business link

Branch: `feature/real-photos`
Base specs: `docs/specs/landing-page-mvp.md`, `docs/specs/post-mvp-fixes.md` (all their acceptance criteria must keep passing, except where this spec updates them).

## 1. Context

Herbert will show the site to the shop owner as a sales prototype. The hero image and the six gallery before/after pairs are drawn placeholders, which make the site look unfinished. This round replaces them with real photographs, and points the Google Business link to the shop's real Google Maps page.

The shop's own photos are not available yet, so the photos come from free stock libraries. They are provisional and must be swapped for the shop's photos before the site goes live to customers.

## 2. Scope

### In scope
- The hero image becomes a real photograph.
- All six gallery pairs (`gallery-<id>-before.webp` / `-after.webp`) become real photographs.
- Gallery titles and alt text may change to match the photos.
- `public/images/CREDITS.md` lists the source, author and license of every photo.
- `GOOGLE_REVIEWS_URL` points to the shop's Google Maps place page.

### Out of scope
- Layout, styling, copy other than gallery titles and image alt text.
- The booking endpoint (the form stays in demo mode).
- `BUSINESS.mapsUrl` (the top-bar address link keeps its address search).
- Reviewer suggestions R-1 to R-3 from PR #9.

## 3. Functional requirements

- **FR-1 Photo source.** Every image is a real photograph (not an illustration, 3D render or AI-generated image) from Pexels or Unsplash, whose licenses allow free commercial use and modification. No other source is used.
- **FR-2 Hero.** `hero-detailing.webp` shows a car being detailed or a freshly detailed car in a shop setting, fits the dark brand (dark or neutral tones), 1200x900, WebP. The car sits so that the left-edge fade of the hero does not hide it. `HERO.image.alt` describes the new photo.
- **FR-3 Gallery pairs.** For each of the six gallery items, the "after" image is a real photo that matches the item's service category (`interior` items show a vehicle interior; `paint` / `ceramic` items show exterior paint). Each pair shows the same vehicle and the same framing, so the slider compares like with like:
  - If a genuine before/after pair of the same vehicle is found, use it.
  - Otherwise, create the "before" image from the same "after" photo with an edit that makes the dirt or damage plain to see (for example dull and desaturated paint, swirl marks, dust, stains, debris on seats). The edit must be clearly visible at slider size.
- **FR-4 Gallery titles.** If the photo shows a different model than the current title, change the model in the title to match the photo (or use a generic description such as "Pickup Truck" when the model can't be identified). Keep the service part of the title and the item's categories. The `id` and file names may change with the title, as long as each pair stays `gallery-<id>-before.webp` / `gallery-<id>-after.webp`.
- **FR-5 Format and weight.** Gallery images are 800x600 WebP. The hero is at most 250 KB; each gallery image is at most 150 KB. `width` / `height` attributes stay correct.
- **FR-6 No identifying details.** No readable license plates, no recognizable faces, no other business's name or logo in any photo (crop or blur when needed). Car maker badges are fine.
- **FR-7 Credits.** `public/images/CREDITS.md` has one row per file: file name, source URL of the original photo, author, license (Pexels License / Unsplash License), and whether the "before" image is a **simulated edit**. The file states that all photos are provisional stock and that simulated before images must be replaced with the shop's real photos before going live.
- **FR-8 Google Business link.** `GOOGLE_REVIEWS_URL` in `src/data/detailingData.ts` is
  `https://www.google.com/maps/place/DC+Detailing+Services/@46.1028102,-142.8663798,3z/data=!4m10!1m2!2m1!1sDC+Detailing+Services!3m6!1s0x4ca0b9a8c564c535:0xc19cbc18f7a46110!8m2!3d46.1028102!4d-64.8195048!15sChVEQyBEZXRhaWxpbmcgU2VydmljZXNaFyIVZGMgZGV0YWlsaW5nIHNlcnZpY2VzkgEVY2FyX2RldGFpbGluZ19zZXJ2aWNl4AEA!16s%2Fg%2F11y3z505nm`
  (the link Herbert provided, without the `?entry=...&g_ep=...` tracking query). Both the footer "Google Business" icon and the Reviews section link use it.

## 4. Acceptance criteria

- **AC-1** Given `public/images/`, then `hero-detailing.webp` is a 1200x900 WebP of at most 250 KB, and every gallery image referenced by `GALLERY_ITEMS` exists as an 800x600 WebP of at most 150 KB.
- **AC-2** Given `GALLERY_ITEMS`, then there are still six items, every item has a before and an after file that exist, and no file in `public/images/` is unreferenced (except `CREDITS.md`).
- **AC-3** Given `public/images/CREDITS.md`, then every image file in the folder has a row with a source URL on `pexels.com` or `unsplash.com`, an author and a license, and every "before" row says either "original photo" or "simulated edit".
- **AC-4** Given the page at 1280 px and 375 px, when it loads, then the hero image and the first gallery pair are visible and load without errors (no broken images, no failed image requests).
- **AC-5** Given each gallery pair, when the slider is at 0% and at 100%, then the two images visibly differ (manual check, with screenshots in the test report), and both show the same vehicle and framing.
- **AC-6** Given the photos, then none shows a readable license plate, a recognizable face, or another business's name or logo, and none is an illustration or render (manual check).
- **AC-7** Given the Reviews section and the footer, then the "Google Business" link and the Google reviews link both have the href from FR-8 and open in a new tab.
- **AC-8** Given a gallery title changed under FR-4, then the title on the page, the image alt text and `CREDITS.md` all name the same vehicle, and the gallery filters still show each item under its categories.
- **AC-9** Given the whole project, then lint, build, unit tests and e2e tests (including every base-spec test, updated only where this spec changes titles or URLs) pass.

## 5. Assumptions (Herbert to confirm in review)

1. Simulated "before" images are acceptable for the sales prototype, are recorded only in `CREDITS.md` (no visible label on the page), and must be replaced before going live.
2. The Open Graph image (`index.html`, `og:image`) keeps the same file name, so it picks up the new hero automatically.
3. The top-bar address link keeps its address search (it is a directions link, not the business profile).

## 6. Technical notes and tasks

- Images live in `public/images/`; paths come from `HERO.image` and `galleryItem()` in `src/data/detailingData.ts`. Components do not change.
- Converting and editing images can use a dev-only script (for example `sharp`, added as a devDependency) kept in `scripts/`, so the edit is reproducible. Do not ship the originals; commit only the final WebP files.
- Check the existing e2e and unit tests for hard-coded gallery titles or the old Google URL and update them.

Tasks:
1. Update `GOOGLE_REVIEWS_URL` (FR-8) and its tests.
2. Pick and download the hero photo, crop/convert to 1200x900 WebP, update alt text.
3. For each gallery item: pick the photo(s), crop/convert to 800x600 WebP, create the simulated before when needed, update title/alt/id.
4. Write `CREDITS.md` (FR-7).
5. Add a unit test that checks AC-1 to AC-3 (sizes, weights, references, credits rows).
6. Run lint, build, unit and e2e; check the hero and gallery visually at 1280 px and 375 px.
