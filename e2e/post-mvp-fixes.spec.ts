import { expect, test } from '@playwright/test'
import { onlyDesktop, onlyMobile } from './helpers'

test('AC-1: the hero image reaches the right edge on viewports wider than 1280 px', async ({ page }) => {
  onlyDesktop()
  for (const width of [1400, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const img = page.locator('section[aria-labelledby="hero-title"] img')
    const rect = (await img.boundingBox())!
    const client = await page.evaluate(() => document.documentElement.clientWidth)
    expect(Math.abs(rect.x + rect.width - client)).toBeLessThanOrEqual(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(client)
  }
})

test('AC-2: the hero layout at 1280 px and 375 px matches the MVP', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  const hero = page.locator('section[aria-labelledby="hero-title"]')
  const client = await page.evaluate(() => document.documentElement.clientWidth)
  const wide = (await hero.locator('img').boundingBox())!
  // Two columns, about 55% text / 45% image, image ending at the page edge.
  expect(wide.x / client).toBeGreaterThan(0.53)
  expect(wide.x / client).toBeLessThan(0.57)
  expect(Math.abs(wide.x + wide.width - client)).toBeLessThanOrEqual(1)

  await page.setViewportSize({ width: 375, height: 740 })
  await page.goto('/')
  const narrowClient = await page.evaluate(() => document.documentElement.clientWidth)
  const h1 = (await page.getByRole('heading', { level: 1 }).boundingBox())!
  const stacked = (await hero.locator('img').boundingBox())!
  // Image stacks below the text and spans the full width.
  expect(stacked.y).toBeGreaterThan(h1.y + h1.height)
  expect(stacked.x).toBeLessThanOrEqual(1)
  expect(Math.abs(stacked.x + stacked.width - narrowClient)).toBeLessThanOrEqual(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(narrowClient)
})

test('AC-3: footer has only the Instagram and Google Business social links', async ({ page }) => {
  await page.goto('/')
  const social = page.locator('footer').getByRole('link', { name: /^(Instagram|Facebook|Google Business)$/ })
  await expect(social).toHaveCount(2)
  const instagram = page.locator('footer').getByRole('link', { name: 'Instagram' })
  await expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/dc_detailling_/')
  await expect(instagram).toHaveAttribute('target', '_blank')
  await expect(page.locator('footer').getByRole('link', { name: 'Google Business' })).toHaveAttribute('target', '_blank')
  await expect(page.getByRole('link', { name: /facebook/i })).toHaveCount(0)
  await expect(page.locator('a[href*="facebook.com"]')).toHaveCount(0)
})

test('AC-5: a package pre-fill clears the errors on the two pre-filled fields only', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'BOOK MY APPOINTMENT' }).click()
  const vehicleType = page.getByLabel('Vehicle Type')
  const pkg = page.getByLabel('Desired Package')
  await expect(vehicleType).toHaveAttribute('aria-invalid', 'true')
  await expect(pkg).toHaveAttribute('aria-invalid', 'true')

  await page.getByRole('link', { name: 'Book Full Detail' }).click()

  await expect(page.getByLabel('Full Name')).toHaveAttribute('aria-invalid', 'true')
  await expect(vehicleType).not.toHaveAttribute('aria-invalid', 'true')
  await expect(pkg).not.toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('#vehicleType-error')).toHaveCount(0)
  await expect(page.locator('#package-error')).toHaveCount(0)
  await expect(page.locator('#fullName-error')).toBeVisible()
  await expect(vehicleType.locator('option:checked')).toHaveText('Coupe / Sedan')
  await expect(pkg.locator('option:checked')).toHaveText('Complete Full Detail')
})

test('AC-6: a package pre-fill does not trigger validation on other fields', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Select Express' }).click()
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(0)
  await expect(page.getByLabel('Vehicle Type').locator('option:checked')).toHaveText('Coupe / Sedan')
})

test('AC-7: the mobile drawer is a modal dialog and receives focus on open', async ({ page }) => {
  onlyMobile()
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  const drawer = page.getByRole('dialog', { name: 'Menu' })
  await expect(drawer).toHaveAttribute('aria-modal', 'true')
  await expect
    .poll(() => drawer.evaluate((el) => el.contains(document.activeElement)))
    .toBe(true)
})

test('AC-8: Tab and Shift+Tab cycle inside the mobile drawer', async ({ page }) => {
  onlyMobile()
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  const drawer = page.getByRole('dialog', { name: 'Menu' })
  const first = drawer.getByRole('button', { name: 'Close menu' })
  const last = drawer.getByRole('link', { name: 'BOOK AN APPOINTMENT' })

  await last.focus()
  await page.keyboard.press('Tab')
  await expect(first).toBeFocused()

  await page.keyboard.press('Shift+Tab')
  await expect(last).toBeFocused()

  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Tab')
    await expect.poll(() => drawer.evaluate((el) => el.contains(document.activeElement))).toBe(true)
  }
})

test('AC-9: Escape closes the drawer and returns focus to the hamburger', async ({ page }) => {
  onlyMobile()
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Open menu' })
  await menu.click()
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
  await expect(menu).toBeFocused()
})
