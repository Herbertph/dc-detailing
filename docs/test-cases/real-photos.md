# Test cases: real-photos

Spec: `docs/specs/real-photos.md`

| AC | Test cases |
|---|---|
| AC-1 | TC-5, TC-6 |
| AC-2 | TC-7 |
| AC-3 | TC-8 |
| AC-4 | TC-1 |
| AC-5 | TC-2, TC-10 |
| AC-6 | TC-11 |
| AC-7 | TC-3, TC-9 |
| AC-8 | TC-4, TC-12 |
| AC-9 | TC-13 |

### TC-1: Hero and first gallery pair load with no broken or failed images
- **Acceptance criterion:** AC-4
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served on port 5179
- **Test data:** viewports 1280 px (desktop) and 375 px (mobile)
- **Steps:**
  1. Open `/`, record failed image requests and image responses >= 400.
  2. Check the hero is visible with natural width 1200.
  3. Scroll to the first gallery card and check both images are visible and decoded at 800 px.
- **Expected result:** hero and first pair visible; no broken image, no failed image request.
- **Automated by:** `e2e/real-photos.spec.ts` › `TC-1 (AC-4): hero and first gallery pair load with no broken or failed images`
- **Status:** Pass

### TC-2: Every pair visibly differs between slider 0% and 100%
- **Acceptance criterion:** AC-5
- **Priority:** high
- **Type:** functional
- **Preconditions:** desktop, page loaded
- **Test data:** the six `GALLERY_ITEMS`
- **Steps:**
  1. For each item, focus its slider, press Home (0%) and screenshot the image box.
  2. Press End (100%) and screenshot again.
  3. Compare the two screenshots.
- **Expected result:** screenshots differ; saved to `docs/test-reports/real-photos/<id>-0.png` and `-100.png`.
- **Automated by:** `e2e/real-photos.spec.ts` › `TC-2 (AC-5): every pair visibly differs between 0% and 100% (screenshots saved)`
- **Status:** Pass

### TC-3: Google links use the place URL and open in a new tab
- **Acceptance criterion:** AC-7
- **Priority:** high
- **Type:** functional
- **Preconditions:** page loaded
- **Test data:** URL from FR-8
- **Steps:**
  1. Find the link in `#reviews` and the footer "Google Business" link.
  2. Check `href`, `target="_blank"` and `rel` containing `noopener`.
- **Expected result:** both links have the FR-8 href and open in a new tab.
- **Automated by:** `e2e/real-photos.spec.ts` › `TC-3 (AC-7): Reviews and footer Google links use the place URL and open in a new tab`
- **Status:** Pass

### TC-4: Title and alt text name the same vehicle
- **Acceptance criterion:** AC-8
- **Priority:** medium
- **Type:** functional
- **Preconditions:** page loaded
- **Test data:** the six `GALLERY_ITEMS`
- **Steps:**
  1. For each item, find its card by title.
  2. Check the images named `Before: <title>` and `After: <title>` point to the item's files.
- **Expected result:** title, alt text and files match for every item.
- **Automated by:** `e2e/real-photos.spec.ts` › `TC-4 (AC-8): title, alt text and slider name the same vehicle for each item`
- **Status:** Pass

### TC-5: Hero is a 1200x900 WebP of at most 250 KB
- **Acceptance criterion:** AC-1
- **Priority:** high
- **Type:** boundary
- **Preconditions:** none
- **Test data:** `public/images/hero-detailing.webp`
- **Steps:**
  1. Read metadata with sharp.
- **Expected result:** WebP, 1200x900, at most 250 KB (actual 47 KB).
- **Automated by:** `src/data/images.test.ts` › `AC-1: the hero is a 1200x900 WebP of at most 250 KB`
- **Status:** Pass

### TC-6: Every gallery image is an 800x600 WebP of at most 150 KB
- **Acceptance criterion:** AC-1
- **Priority:** high
- **Type:** boundary
- **Preconditions:** none
- **Test data:** the 12 gallery files
- **Steps:**
  1. Read metadata of each file.
- **Expected result:** WebP, 800x600, at most 150 KB (largest is 54 KB).
- **Automated by:** `src/data/images.test.ts` › `AC-1: every gallery image is an 800x600 WebP of at most 150 KB`
- **Status:** Pass

### TC-7: Six items and no unreferenced file
- **Acceptance criterion:** AC-2
- **Priority:** medium
- **Type:** functional
- **Preconditions:** none
- **Test data:** `public/images/`
- **Steps:**
  1. Compare the files in the folder (minus `CREDITS.md`) to the hero and gallery references.
- **Expected result:** six items; both sets are equal.
- **Automated by:** `src/data/images.test.ts` › `AC-2: six gallery items and no unreferenced file`
- **Status:** Pass

### TC-8: CREDITS.md has a complete row for every image
- **Acceptance criterion:** AC-3
- **Priority:** medium
- **Type:** functional
- **Preconditions:** none
- **Test data:** `public/images/CREDITS.md`
- **Steps:**
  1. For each `.webp`, find its row and check source host, author, license and the "before" column.
- **Expected result:** all rows complete; every "before" row says "original photo" or "simulated edit".
- **Automated by:** `src/data/images.test.ts` › `AC-3: CREDITS.md has a row with source, author and license for every image`
- **Status:** Pass

### TC-9: Google URL has no tracking query and is shared by the social link
- **Acceptance criterion:** AC-7
- **Priority:** medium
- **Type:** functional
- **Preconditions:** none
- **Test data:** `GOOGLE_REVIEWS_URL`
- **Steps:**
  1. Check the prefix, the absence of `?`, and that the `google` entry of `SOCIAL_LINKS` uses it.
- **Expected result:** matches FR-8.
- **Automated by:** `src/data/images.test.ts` › `AC-7: the Google Business link is the shop place page without tracking query`
- **Status:** Pass

### TC-10: Manual check of same vehicle, same framing, visible difference
- **Acceptance criterion:** AC-5
- **Priority:** high
- **Type:** functional
- **Preconditions:** screenshots from TC-2
- **Test data:** `docs/test-reports/real-photos/*.png`
- **Steps:**
  1. View each 0% / 100% pair side by side.
- **Expected result:** same vehicle and framing; dirt or damage clearly visible at slider size.
- **Automated by:** manual
- **Status:** Pass

### TC-11: Manual check for plates, faces, third-party logos and renders
- **Acceptance criterion:** AC-6
- **Priority:** high
- **Type:** functional
- **Preconditions:** none
- **Test data:** all 13 images at full size (C-Class background zoomed 2x)
- **Steps:**
  1. Inspect each image for license plates, faces, other businesses' names or logos, and signs of illustration or render.
- **Expected result:** none found.
- **Automated by:** manual
- **Status:** Pass

### TC-12: Gallery filters still show each item under its categories
- **Acceptance criterion:** AC-8
- **Priority:** medium
- **Type:** functional
- **Preconditions:** page loaded
- **Test data:** filter buttons
- **Steps:**
  1. Click each filter and check the visible cards.
- **Expected result:** Interior 4, Paint 2, Ceramic 1 (Mustang), All 6.
- **Automated by:** `e2e/gallery.spec.ts` › `AC-17: filters show only the matching cards`
- **Status:** Pass

### TC-13: Lint, build, unit and full e2e suite pass
- **Acceptance criterion:** AC-9
- **Priority:** high
- **Type:** functional
- **Preconditions:** clean checkout of the branch
- **Test data:** n/a
- **Steps:**
  1. Run `npm run lint`, `npm run test` and `npx playwright test` (which builds).
- **Expected result:** all pass.
- **Automated by:** project scripts
- **Status:** Pass

## Not covered
- FR-1 (real photograph from Pexels or Unsplash): checked only by viewing the images and the CREDITS URLs; the source pages were not opened.
- The exact vehicle models (for example that the "Ford Explorer" interior is really an Explorer) cannot be confirmed from the photos; the titles are plausible.
