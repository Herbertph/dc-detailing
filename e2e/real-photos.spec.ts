import { expect, test } from '@playwright/test'
import { GALLERY_ITEMS, GOOGLE_REVIEWS_URL } from '../src/data/detailingData'
import { onlyDesktop } from './helpers'

const SHOTS = 'docs/test-reports/real-photos'

test('TC-1 (AC-4): hero and first gallery pair load with no broken or failed images', async ({ page }) => {
  const failed: string[] = []
  page.on('requestfailed', (r) => r.resourceType() === 'image' && failed.push(r.url()))
  page.on('response', (r) => r.request().resourceType() === 'image' && r.status() >= 400 && failed.push(r.url()))
  await page.goto('/')
  const hero = page.locator('img[src="/images/hero-detailing.webp"]')
  await expect(hero).toBeVisible()
  const card = page.getByTestId('gallery-card').first()
  await card.scrollIntoViewIfNeeded()
  for (const img of await card.locator('img').all()) {
    await expect(img).toBeVisible()
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBe(800)
  }
  expect(await hero.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBe(1200)
  expect(failed).toEqual([])
})

test('TC-2 (AC-5): every pair visibly differs between 0% and 100% (screenshots saved)', async ({ page }) => {
  onlyDesktop()
  await page.goto('/')
  for (const item of GALLERY_ITEMS) {
    const slider = page.getByRole('slider', { name: `Before and after comparison: ${item.title}` })
    const box = page.getByTestId('gallery-card').filter({ hasText: item.title }).locator('div.relative').first()
    await box.scrollIntoViewIfNeeded()
    for (const img of await box.locator('img').all())
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
    await slider.focus()
    await page.keyboard.press('Home')
    await expect(slider).toHaveAttribute('aria-valuenow', '0')
    const at0 = await box.screenshot({ path: `${SHOTS}/${item.id}-0.png` })
    await page.keyboard.press('End')
    await expect(slider).toHaveAttribute('aria-valuenow', '100')
    const at100 = await box.screenshot({ path: `${SHOTS}/${item.id}-100.png` })
    expect(at0.equals(at100), item.id).toBe(false)
  }
})

test('TC-3 (AC-7): Reviews and footer Google links use the place URL and open in a new tab', async ({ page }) => {
  await page.goto('/')
  const links = page.locator(`a[href="${GOOGLE_REVIEWS_URL}"]`)
  expect(await links.count()).toBeGreaterThanOrEqual(2)
  await expect(page.locator('#reviews').locator(`a[href="${GOOGLE_REVIEWS_URL}"]`)).toHaveCount(1)
  await expect(page.locator('footer').getByRole('link', { name: /Google Business/ })).toHaveAttribute('href', GOOGLE_REVIEWS_URL)
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
  }
})

test('TC-4 (AC-8): title, alt text and slider name the same vehicle for each item', async ({ page }) => {
  await page.goto('/')
  for (const item of GALLERY_ITEMS) {
    const card = page.getByTestId('gallery-card').filter({ hasText: item.title })
    await expect(card).toHaveCount(1)
    await expect(card.getByRole('img', { name: `Before: ${item.title}` })).toHaveAttribute('src', item.before)
    await expect(card.getByRole('img', { name: `After: ${item.title}` })).toHaveAttribute('src', item.after)
  }
})
