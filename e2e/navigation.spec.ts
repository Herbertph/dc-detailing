import { expect, test } from '@playwright/test'
import { expectBelowHeader, onlyDesktop, onlyMobile } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('AC-1: desktop top bar shows address, phone and hours', async ({ page }) => {
  onlyDesktop()
  const address = page.getByRole('link', { name: '143 Waverley Ave, Moncton, NB E1C 7V1' }).first()
  await expect(address).toBeVisible()
  await expect(address).toHaveAttribute('href', /google\.com\/maps/)
  await expect(address).toHaveAttribute('target', '_blank')
  await expect(address).toHaveAttribute('rel', 'noopener noreferrer')
  await expect(page.locator('a[href="tel:+15069406494"]').first()).toBeVisible()
  await expect(page.getByText('Mon–Sat: 8:00 AM – 6:00 PM').first()).toBeVisible()
})

test('AC-2: mobile top bar hides the address and shows phone and hours', async ({ page }) => {
  onlyMobile()
  await expect(page.getByRole('link', { name: '143 Waverley Ave, Moncton, NB E1C 7V1' }).first()).toBeHidden()
  await expect(page.locator('a[href="tel:+15069406494"]').first()).toBeVisible()
  await expect(page.getByText('Mon–Sat: 8:00 AM – 6:00 PM').first()).toBeVisible()
})

test('AC-3: navbar links scroll to their sections below the header', async ({ page }) => {
  onlyDesktop()
  const nav = page.getByRole('navigation', { name: 'Main' })
  const targets: [string, string][] = [
    ['SERVICES & PACKAGES', '#packages-title'],
    ['GALLERY', '#gallery-title'],
    ['ABOUT US', '#about-title'],
    ['REVIEWS', '#reviews-title'],
    ['BOOK AN APPOINTMENT', '#booking-title'],
  ]
  for (const [name, heading] of targets) {
    await nav.getByRole('link', { name, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${heading.replace('-title', '')}$`))
    await expectBelowHeader(page, heading)
  }
  await nav.getByRole('link', { name: 'HOME', exact: true }).click()
  await expect(page).toHaveURL(/#top$/)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})

test('AC-4: navbar stays visible at the bottom of the page', async ({ page }) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await expect.poll(() => page.locator('header').evaluate((el) => el.getBoundingClientRect().top)).toBe(0)
  await expect(page.locator('header')).toBeInViewport()
})

test('AC-5: mobile drawer opens with all links and closes on navigation', async ({ page }) => {
  onlyMobile()
  const menu = page.getByRole('button', { name: 'Open menu' })
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  const drawer = page.getByRole('dialog', { name: 'Menu' })
  for (const name of ['HOME', 'SERVICES & PACKAGES', 'GALLERY', 'ABOUT US', 'REVIEWS', 'BOOK AN APPOINTMENT']) {
    await expect(drawer.getByRole('link', { name, exact: true })).toBeVisible()
  }
  await drawer.getByRole('link', { name: 'GALLERY' }).click()
  await expect(drawer).toBeHidden()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(page).toHaveURL(/#gallery$/)
  await expectBelowHeader(page, '#gallery-title')
})

test('AC-6: Escape closes the drawer and returns focus to the hamburger', async ({ page }) => {
  onlyMobile()
  const menu = page.getByRole('button', { name: 'Open menu' })
  await menu.click()
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
  await expect(menu).toBeFocused()
})

test('AC-7: one h1 with both lines; hero buttons lead to packages and booking', async ({ page }) => {
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toContainText('RESTORE. PROTECT. SHINE.')
  await expect(page.locator('h1')).toContainText("Moncton's Premium Auto Detailing Services.")
  await expect(page.getByRole('link', { name: 'VIEW PACKAGES' })).toHaveAttribute('href', '#packages')
  await expect(page.getByRole('link', { name: 'GET A FREE QUOTE' })).toHaveAttribute('href', '#booking')
  await page.getByRole('link', { name: 'VIEW PACKAGES' }).click()
  await expectBelowHeader(page, '#packages-title')
})
