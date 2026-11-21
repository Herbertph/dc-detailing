# Test cases: landing-page-mvp

Spec: `docs/specs/landing-page-mvp.md`. Tested at commit `7bf65c7`.

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

## Test cases

### TC-1: AC-1 behaviour
- **Acceptance criterion:** AC-1
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a desktop viewport (1280 px), when the page loads, then the Top Bar shows the address link (to Google Maps, `target="_blank"`), the phone link `tel:+15069406494` and "Mon–Sat: 8:00 AM – 6:00 PM".
- **Automated by:** `e2e/navigation.spec.ts` › `AC-1: desktop top bar shows address, phone and hours`
- **Status:** Pass

### TC-2: AC-2 behaviour
- **Acceptance criterion:** AC-2
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a mobile viewport (375 px), when the page loads, then the address is not visible and the phone link and hours are visible.
- **Automated by:** `e2e/navigation.spec.ts` › `AC-2: mobile top bar hides the address and shows phone and hours`
- **Status:** Pass

### TC-3: AC-3 behaviour
- **Acceptance criterion:** AC-3
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a desktop viewport, when the user clicks each navbar link (HOME, SERVICES & PACKAGES, GALLERY, ABOUT US, REVIEWS) and "BOOK AN APPOINTMENT", then the page scrolls to `#top`, `#packages`, `#gallery`, `#about`, `#reviews` and `#booking` respectively, and the section heading is not hidden behind the header.
- **Automated by:** `e2e/navigation.spec.ts` › `AC-3: navbar links scroll to their sections below the header`
- **Status:** Pass

### TC-4: AC-4 behaviour
- **Acceptance criterion:** AC-4
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the user has scrolled to the bottom of the page, then the navbar is still visible at the top of the viewport.
- **Automated by:** `e2e/navigation.spec.ts` › `AC-4: navbar stays visible at the bottom of the page`
- **Status:** Pass

### TC-5: AC-5 behaviour
- **Acceptance criterion:** AC-5
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a mobile viewport, when the user opens the menu, then a drawer with all five links and "BOOK AN APPOINTMENT" appears and the hamburger has `aria-expanded="true"`; when the user clicks "GALLERY", then the drawer closes and the page is at `#gallery`.
- **Automated by:** `e2e/navigation.spec.ts` › `AC-5: mobile drawer opens with all links and closes on navigation`
- **Status:** Pass

### TC-6: AC-6 behaviour
- **Acceptance criterion:** AC-6
- **Priority:** medium
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the mobile drawer is open, when the user presses Escape, then the drawer closes and focus is on the hamburger button.
- **Automated by:** `e2e/navigation.spec.ts` › `AC-6: Escape closes the drawer and returns focus to the hamburger`
- **Status:** Pass

### TC-7: AC-7 behaviour
- **Acceptance criterion:** AC-7
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the page loads, then there is exactly one `<h1>` containing "RESTORE. PROTECT. SHINE." and "Moncton's Premium Auto Detailing Services."; "VIEW PACKAGES" leads to `#packages` and "GET A FREE QUOTE" leads to `#booking`.
- **Automated by:** `e2e/navigation.spec.ts` › `AC-7: one h1 with both lines; hero buttons lead to packages and booking`
- **Status:** Pass

### TC-8: AC-8 behaviour
- **Acceptance criterion:** AC-8
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the page loads, then the Trust Bar, Shop vs Mobile, Reviews, About and Footer sections show the exact copy from section 8 (headings, texts, three reviews with authors, three metrics, five service areas).
- **Automated by:** `e2e/content.spec.ts` › `AC-8: trust bar, shop vs mobile, reviews, about and footer show the exact copy`
- **Status:** Pass

### TC-9: AC-9 behaviour
- **Acceptance criterion:** AC-9
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the page loads, then the "Coupe / Sedan" tab is selected (`aria-selected="true"`) and the cards show "$129", "$249" and "$599".
- **Automated by:** `e2e/packages.spec.ts` › `AC-9: Coupe / Sedan is selected by default with sedan prices`
- **Status:** Pass

### TC-10: AC-10 behaviour
- **Acceptance criterion:** AC-10
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the packages section, when the user selects "SUV / Crossover", then the cards show "$159", "$279", "$629"; when the user selects "Truck / Van", then they show "$179", "$299", "$649"; when the user goes back to "Coupe / Sedan", then they show "$129", "$249", "$599".
- **Automated by:** `e2e/packages.spec.ts` › `AC-10: selecting a size updates all prices`
- **Status:** Pass

### TC-11: AC-11 behaviour
- **Acceptance criterion:** AC-11
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given focus is on the selected size tab, when the user presses the Right arrow key, then the next tab is selected and focused and prices update; at the last tab, Right arrow wraps to the first.
- **Automated by:** `e2e/packages.spec.ts` › `AC-11: arrow keys move between size tabs and wrap`
- **Status:** Pass

### TC-12: AC-12 behaviour
- **Acceptance criterion:** AC-12
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the page loads, then only the "Complete Full Detail" card shows the "MOST POPULAR" badge.
- **Automated by:** `e2e/packages.spec.ts` › `AC-12: only Complete Full Detail has the MOST POPULAR badge`
- **Status:** Pass

### TC-13: AC-13 behaviour
- **Acceptance criterion:** AC-13
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the "Truck / Van" tab is selected, when the user clicks "Book Full Detail", then the page scrolls to `#booking` and the form shows Vehicle Type = "Truck / Van" and Desired Package = "Complete Full Detail".
- **Automated by:** `e2e/packages.spec.ts` › `AC-13: a package CTA pre-fills the booking form with package and size`
- **Status:** Pass

### TC-14: AC-14 behaviour
- **Acceptance criterion:** AC-14
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the page loads, then the add-ons grid shows the four add-ons with "$40+", "$75", "$65" and "$80".
- **Automated by:** `e2e/packages.spec.ts` › `AC-14: add-ons show their prices`
- **Status:** Pass

### TC-15: AC-15 behaviour
- **Acceptance criterion:** AC-15
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** (unit) Given `PACKAGES_DATA`, then for every package `suv = sedan + 30` and `truck = sedan + 50`, and the price helper returns the right price for each size.
- **Automated by:** `src/lib/pricing.test.ts` (all tests in file)
- **Status:** Pass

### TC-16: AC-16 behaviour
- **Acceptance criterion:** AC-16
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the page loads, then "All Work" is selected and six gallery cards are visible.
- **Automated by:** `e2e/gallery.spec.ts` › `AC-16: All Work is selected and six cards are visible`
- **Status:** Pass

### TC-17: AC-17 behaviour
- **Acceptance criterion:** AC-17
- **Priority:** medium
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the gallery, when the user selects "Interior Restoration", then exactly four cards are visible (F-150, CR-V, RAM 1500, Audi A4); "Paint Correction" shows exactly two (BMW M3, Porsche 911); "Ceramic Coating" shows exactly one (BMW M3); "All Work" shows six again.
- **Automated by:** `e2e/gallery.spec.ts` › `AC-17: filters show only the matching cards`
- **Status:** Pass

### TC-18: AC-18 behaviour
- **Acceptance criterion:** AC-18
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a gallery card, when the user focuses its slider and presses Right arrow twice, then `aria-valuenow` goes from 50 to 60; End sets 100; Home sets 0; Left at 0 stays at 0.
- **Automated by:** `e2e/gallery.spec.ts` › `AC-18: the slider moves with the keyboard`
- **Status:** Pass

### TC-19: AC-19 behaviour
- **Acceptance criterion:** AC-19
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a gallery card, when the user drags the slider handle with the mouse to the left, then `aria-valuenow` decreases and more of the "after" image is visible.
- **Automated by:** `e2e/gallery.spec.ts` › `AC-19: dragging the handle left reveals more of the after image`
- **Status:** Pass

### TC-20: AC-20 behaviour
- **Acceptance criterion:** AC-20
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** (unit) Given the gallery filter function, when called with a category, then it returns only items with that category; when called with "all", it returns every item; when called with a category that has no items, it returns an empty list and the UI shows "No projects in this category yet."
- **Automated by:** `src/lib/gallery.test.ts` (all tests in file); `e2e/gallery.spec.ts` (filter UI)
- **Status:** Pass

### TC-21: AC-21 behaviour
- **Acceptance criterion:** AC-21
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given an empty form, when the user clicks "BOOK MY APPOINTMENT", then no request is sent, Full Name, Phone, Vehicle Type, Vehicle Make/Model/Year, Desired Package, Preferred Date and Time Window show errors, Email and Notes show none, and focus moves to Full Name.
- **Automated by:** `e2e/booking.spec.ts` › `AC-21: an empty submit shows the required errors, sends nothing and focuses Full Name`
- **Status:** Pass

### TC-22: AC-22 behaviour
- **Acceptance criterion:** AC-22
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the phone field, when the user enters "(506) 555-0199", "506-555-0199", "+1 506 555 0199" or "15065550199", then it is accepted; when the user enters "555-0199", "abc", "+44 20 7946 0958" or "12345678901234", then it shows "Enter a valid phone number, e.g. (506) 555-0199".
- **Automated by:** `e2e/booking.spec.ts` › `AC-22: phone accepts North American formats and rejects others`
- **Status:** Pass

### TC-23: AC-23 behaviour
- **Acceptance criterion:** AC-23
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the email field, when it is empty, then it is accepted; when it contains "john@example", then it shows "Enter a valid email address".
- **Automated by:** `e2e/booking.spec.ts` › `AC-23: email is optional but must be valid`
- **Status:** Pass

### TC-24: AC-24 behaviour
- **Acceptance criterion:** AC-24
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given Full Name contains only spaces or one letter, then it shows an error; with "Jo" it is accepted; with 81 characters it shows an error.
- **Automated by:** `e2e/booking.spec.ts` › `AC-24: full name length rules`
- **Status:** Pass

### TC-25: AC-25 behaviour
- **Acceptance criterion:** AC-25
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the date field, when the user picks a past date, a Sunday, or a date more than 90 days ahead, then it shows an error ("Please choose a date from today onward", "We're closed on Sundays — please pick Monday to Saturday", "Please choose a date within the next 90 days"); today (if not Sunday) is accepted.
- **Automated by:** `e2e/booking.spec.ts` › `AC-25: date rules for past, Sunday and more than 90 days`
- **Status:** Pass

### TC-26: AC-26 behaviour
- **Acceptance criterion:** AC-26
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given "Drop-off at 143 Waverley Ave Shop" is selected by default, then the Service Address field is not shown; when the user selects "Mobile Service at My Location", then Service Address appears and is required; when the user switches back to Shop, it disappears and no longer blocks submission.
- **Automated by:** `e2e/booking.spec.ts` › `AC-26: service address appears only for mobile service`
- **Status:** Pass

### TC-27: AC-27 behaviour
- **Acceptance criterion:** AC-27
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given Notes has 1001 characters, then it shows an error; with 1000 it is accepted.
- **Automated by:** `e2e/booking.spec.ts` › `AC-27: notes accept 1000 characters and reject 1001`
- **Status:** Pass

### TC-28: AC-28 behaviour
- **Acceptance criterion:** AC-28
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a field has an error, then the input has `aria-invalid="true"` and `aria-describedby` points to the error text.
- **Automated by:** `e2e/booking.spec.ts` › `AC-28: an invalid field links to its error text`
- **Status:** Pass

### TC-29: AC-29 behaviour
- **Acceptance criterion:** AC-29
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** (unit) Given the booking schema, then every rule in FR-21 is covered by unit tests including the boundaries above (dates are checked against an injected "today" so tests do not depend on the real clock).
- **Automated by:** `src/lib/bookingSchema.test.ts` (all tests in file)
- **Status:** Pass

### TC-30: AC-30 behaviour
- **Acceptance criterion:** AC-30
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a valid form and a configured endpoint that returns 200, when the user submits, then exactly one POST with a JSON body containing all filled fields is sent, the button shows "Sending…" and is disabled while waiting, and afterwards the fields are hidden and the confirmation "Thank You! Your Request Has Been Received." is shown with a `tel:+15069406494` link.
- **Automated by:** `e2e/booking.spec.ts` › `AC-30: a valid submit sends one JSON POST and shows the confirmation`
- **Status:** Pass

### TC-31: AC-31 behaviour
- **Acceptance criterion:** AC-31
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a valid form and an endpoint that returns 500 (or the network fails), when the user submits, then the error alert with the phone link is shown, all entered values are kept, and submitting again sends a new request.
- **Automated by:** `e2e/booking.spec.ts` › `AC-31: a failed submit keeps the values, shows the error and allows a retry`; `e2e/booking.spec.ts` › `AC-31: a network failure shows the error alert`
- **Status:** Pass

### TC-32: AC-32 behaviour
- **Acceptance criterion:** AC-32
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a valid form, when the user double-clicks the submit button, then only one request is sent.
- **Automated by:** `e2e/booking.spec.ts` › `AC-32: a double click sends only one request`
- **Status:** Pass

### TC-33: AC-33 behaviour
- **Acceptance criterion:** AC-33
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the Notes field contains `<img src=x onerror=alert(1)>`, when the form is submitted, then no HTML is rendered from it and no script runs.
- **Automated by:** `e2e/booking.spec.ts` › `AC-33: HTML in notes is never rendered or executed`
- **Status:** Pass

### TC-34: AC-34 behaviour
- **Acceptance criterion:** AC-34
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the footer, then Quick Links point to the right anchors (Book Now → `#booking`), the phone is a `tel:` link, social links open in a new tab with accessible names, and the copyright shows the current year.
- **Automated by:** `e2e/content.spec.ts` › `AC-34: footer links, phone, social links and copyright year`
- **Status:** Pass

### TC-35: AC-35 behaviour
- **Acceptance criterion:** AC-35
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a mobile viewport (375 px), then a fixed bottom bar shows "Call Now" (`tel:+15069406494`) and "Book Online"; clicking "Book Online" scrolls to `#booking`; scrolled to the very bottom, the bar does not cover the copyright line.
- **Automated by:** `e2e/content.spec.ts` › `AC-35: mobile floating bar calls, books and never covers the copyright`
- **Status:** Pass

### TC-36: AC-36 behaviour
- **Acceptance criterion:** AC-36
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given a desktop viewport (1280 px), then the floating bar is not visible.
- **Automated by:** `e2e/content.spec.ts` › `AC-36: floating bar is hidden on desktop`
- **Status:** Pass

### TC-37: AC-37 behaviour
- **Acceptance criterion:** AC-37
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the built page, then `<head>` contains the title from FR-30, a meta description, `og:title`, `og:description`, `og:image`, and a `<script type="application/ld+json">` that parses as JSON with `@type` "AutoRepair", telephone "+15069406494" and `aggregateRating.ratingValue` "4.9".
- **Automated by:** `e2e/quality.spec.ts` › `AC-37: head has title, meta description, Open Graph and JSON-LD`
- **Status:** Pass

### TC-38: AC-38 behaviour
- **Acceptance criterion:** AC-38
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the page, when an automated accessibility check (axe via `@axe-core/playwright`) runs on desktop and mobile, then it reports no serious or critical violations.
- **Automated by:** `e2e/quality.spec.ts` › `AC-38: no serious or critical accessibility violations`
- **Status:** Pass

### TC-39: AC-39 behaviour
- **Acceptance criterion:** AC-39
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the user has `prefers-reduced-motion: reduce`, when the page loads and scrolls, then all section content is visible without waiting for animations.
- **Automated by:** `e2e/quality.spec.ts` › `AC-39: with reduced motion all section content is visible immediately`
- **Status:** Pass

### TC-40: AC-40 behaviour
- **Acceptance criterion:** AC-40
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the viewport is 360 px wide, then no section causes horizontal scrolling.
- **Automated by:** `e2e/quality.spec.ts` › `AC-40: no horizontal scrolling at 360 px`
- **Status:** Pass

### TC-41: AC-41 behaviour
- **Acceptance criterion:** AC-41
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served on port 5179 (desktop 1280 px and/or mobile 375 px project), booking endpoint intercepted
- **Test data:** as quoted in the AC
- **Steps:**
  1. Open `/`.
  2. Perform the actions described in the AC.
- **Expected result:** Given the project, then `npm run build`, `npm run test` (unit) and `npm run test:e2e` pass locally and in GitHub Actions CI.
- **Automated by:** `npm run build`, `npm run test`, `npm run test:e2e` (local run)
- **Status:** Pass

### TC-42: No horizontal scroll and hero visible at 800 px and 1400 px
- **Acceptance criterion:** AC-40
- **Priority:** low
- **Type:** boundary
- **Preconditions:** production build on port 5179
- **Test data:** viewport widths 800 and 1400 px where relevant
- **Steps:**
  1. Open `/` at the given width.
  2. Inspect the hero.
- **Expected result:** No horizontal scroll and hero visible at 800 px and 1400 px.
- **Automated by:** `e2e/qa-exploratory.spec.ts` › `TC-42 (AC-40): no horizontal scrolling and hero visible at 800/1400 px`
- **Status:** Pass; the cosmetic gap at 1400 px was reported as #1 (minor) and is verified fixed on `feature/post-mvp-fixes` (`e11f83c`) — see TC-1 in `docs/test-cases/post-mvp-fixes.md`

### TC-43: Uppercased H1 keeps both lines of text and the hero has a 1 px red bottom border
- **Acceptance criterion:** AC-7
- **Priority:** low
- **Type:** functional
- **Preconditions:** production build on port 5179
- **Test data:** viewport widths 800 and 1400 px where relevant
- **Steps:**
  1. Open `/` at the given width.
  2. Inspect the hero.
- **Expected result:** Uppercased H1 keeps both lines of text and the hero has a 1 px red bottom border.
- **Automated by:** `e2e/qa-exploratory.spec.ts` › `TC-43 (AC-7): ...`
- **Status:** Pass

### TC-44: Hero colours (slate-300 title, button glow) pass axe color-contrast
- **Acceptance criterion:** AC-38
- **Priority:** low
- **Type:** accessibility
- **Preconditions:** production build on port 5179
- **Test data:** viewport widths 800 and 1400 px where relevant
- **Steps:**
  1. Open `/` at the given width.
  2. Inspect the hero.
- **Expected result:** Hero colours (slate-300 title, button glow) pass axe color-contrast.
- **Automated by:** `e2e/qa-exploratory.spec.ts` › `TC-44 (AC-38): ...`
- **Status:** Pass

### TC-45: Primary hero button has a red glow at rest
- **Acceptance criterion:** AC-7
- **Priority:** low
- **Type:** functional
- **Preconditions:** production build on port 5179
- **Test data:** viewport widths 800 and 1400 px where relevant
- **Steps:**
  1. Open `/` at the given width.
  2. Inspect the hero.
- **Expected result:** Primary hero button has a red glow at rest.
- **Automated by:** `e2e/qa-exploratory.spec.ts` › `TC-45 (AC-7): ...`
- **Status:** Pass

## Not covered

- Real Formspree delivery: the endpoint is intercepted with `page.route`; a live smoke test is needed once `VITE_BOOKING_ENDPOINT` is set.
- AC-41 in GitHub Actions: verified locally only; CI runs on the pull request.
- Browsers other than Chromium and real touch devices.
- The `active:scale` press effect is visual only and was checked by eye, not automated.
