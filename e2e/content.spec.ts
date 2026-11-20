import { expect, test } from '@playwright/test'
import { onlyDesktop, onlyMobile } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('AC-8: trust bar, shop vs mobile, reviews, about and footer show the exact copy', async ({ page }) => {
  const texts = [
    '5-Star Service (170+ Reviews)',
    "Moncton's highest-rated auto detailing specialists on Google.",
    'Experienced Professionals',
    'Trained technicians using safe, swirl-free techniques and pro-grade products.',
    'Fully Equipped Shop on Waverley Ave',
    'Climate-controlled facility in Moncton plus convenient mobile service.',
    'SHOP DETAILING',
    'Visit Our Moncton Studio',
    'Climate-controlled facility optimized for precision paint correction, ceramic coatings, and deep interior detailing regardless of weather conditions.',
    'MOBILE DETAILING',
    'We Come to Your Driveway',
    'Serving Moncton, Dieppe & Riverview',
    'Fully equipped mobile unit bringing high-end detailing directly to your home or workplace. Perfect for routine washes and interior refreshes.',
    '4.9 ★ Rating on Google — Based on 170+ Verified Reviews',
    'Trusted by Drivers Across Greater Moncton',
    'Zero salt stains left on the carpets.',
    'Marc-André L.',
    'Google Local Guide',
    'My black sedan had swirl marks everywhere and now looks like a mirror.',
    'Sarah T.',
    "they got dog hair out of places I didn't think was possible.",
    'Jason M.',
    'Passionate About Perfection, Built on Trust',
    'At DC Detailing Services, we treat every vehicle as if it were our own.',
    'we guarantee a level of cleanliness and gloss that exceeds expectations.',
    '5-Star Google Reviews',
    '1,500+',
    'Vehicles Detailed',
    'Satisfaction Guarantee',
    "Moncton's premier auto detailing studio and mobile service. Restoring and protecting your vehicle's value.",
  ]
  for (const text of texts) {
    const el = page.getByText(text).first()
    await el.scrollIntoViewIfNeeded()
    await expect(el).toBeVisible()
  }
  const footer = page.locator('footer')
  for (const area of ['Moncton, NB', 'Dieppe, NB', 'Riverview, NB', 'Shediac, NB', 'Salisbury, NB']) {
    await expect(footer.getByText(area, { exact: true })).toBeVisible()
  }
  await expect(page.getByRole('img', { name: '5 out of 5 stars' })).toHaveCount(3)
  await expect(page.getByRole('link', { name: 'Read all 170+ reviews on Google →' })).toHaveAttribute('target', '_blank')
})

test('AC-34: footer links, phone, social links and copyright year', async ({ page }) => {
  const footer = page.locator('footer')
  const expected: [string, string][] = [
    ['Home', '#top'],
    ['Services & Packages', '#packages'],
    ['Gallery', '#gallery'],
    ['About Us', '#about'],
    ['Reviews', '#reviews'],
    ['Book Now', '#booking'],
  ]
  for (const [name, href] of expected) {
    await expect(footer.getByRole('link', { name, exact: true })).toHaveAttribute('href', href)
  }
  await expect(footer.locator('a[href="tel:+15069406494"]')).toBeVisible()
  await expect(footer.getByText('Sun: Closed')).toBeVisible()
  for (const name of ['Instagram', 'Facebook', 'Google Business']) {
    await expect(footer.getByRole('link', { name })).toHaveAttribute('target', '_blank')
  }
  const year = new Date().getFullYear()
  await expect(footer.getByText(`© ${year} DC Detailing Services. All rights reserved. | Moncton, New Brunswick.`)).toBeVisible()
})

test('AC-35: mobile floating bar calls, books and never covers the copyright', async ({ page }) => {
  onlyMobile()
  const bar = page.getByTestId('mobile-float')
  await expect(bar.getByRole('link', { name: 'Call Now' })).toHaveAttribute('href', 'tel:+15069406494')
  await bar.getByRole('link', { name: 'Book Online' }).click()
  await expect(page).toHaveURL(/#booking$/)
  await expect(page.locator('#booking-title')).toBeInViewport()

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  const copyright = page.getByText(/All rights reserved/)
  await expect
    .poll(async () => {
      const text = (await copyright.boundingBox())!
      const barTop = (await bar.boundingBox())!.y
      return text.y + text.height <= barTop
    })
    .toBe(true)
})

test('AC-36: floating bar is hidden on desktop', async ({ page }) => {
  onlyDesktop()
  await expect(page.getByTestId('mobile-float')).toBeHidden()
})
