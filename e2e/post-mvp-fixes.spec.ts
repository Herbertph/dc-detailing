import { expect, test } from '@playwright/test'
import { onlyMobile } from './helpers'

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
