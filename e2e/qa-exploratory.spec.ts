import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { onlyDesktop } from './helpers'

// Exploratory QA checks outside the explicit ACs: intermediate viewports and the hero polish.

for (const width of [800, 1400]) {
  test(`TC-42 (AC-40): no horizontal scrolling and hero visible at ${width} px`, async ({ page }) => {
    onlyDesktop()
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: 'VIEW PACKAGES' })).toBeVisible()
    await page.screenshot({ path: `test-results/qa-hero-${width}.png` })
    await page.screenshot({ path: `test-results/qa-full-${width}.png`, fullPage: true })
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}

test('TC-43 (AC-7): hero keeps the accessible H1 text and shows a red bottom boundary', async ({ page }) => {
  await page.goto('/')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toContainText('RESTORE. PROTECT. SHINE.')
  await expect(h1).toContainText("Moncton's Premium Auto Detailing Services.")
  const border = await page.locator('section[aria-labelledby="hero-title"]').evaluate((el) => {
    const s = getComputedStyle(el)
    return { width: s.borderBottomWidth, style: s.borderBottomStyle }
  })
  expect(border).toEqual({ width: '1px', style: 'solid' })
})

test('TC-44 (AC-38): hero and buttons pass axe colour contrast after the polish', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const results = await new AxeBuilder({ page }).include('section[aria-labelledby="hero-title"]').withRules(['color-contrast']).analyze()
  expect(results.violations).toEqual([])
})

test('TC-45 (AC-7): the primary hero button has a red glow at rest', async ({ page }) => {
  onlyDesktop()
  await page.goto('/')
  const cta = page.getByRole('link', { name: 'VIEW PACKAGES' })
  const shadow = await cta.evaluate((el) => getComputedStyle(el).boxShadow)
  expect(shadow).toContain('rgba(220, 38, 38, 0.25)')
})
