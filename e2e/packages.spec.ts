import { expect, test, type Page } from '@playwright/test'

const prices = (page: Page) => page.getByRole('tabpanel').getByText(/^Starting at \$\d+$/)

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('AC-9: Coupe / Sedan is selected by default with sedan prices', async ({ page }) => {
  await expect(page.getByRole('tab', { name: 'Coupe / Sedan' })).toHaveAttribute('aria-selected', 'true')
  await expect(prices(page)).toHaveText(['Starting at $129', 'Starting at $249', 'Starting at $599'])
})

test('AC-10: selecting a size updates all prices', async ({ page }) => {
  await page.getByRole('tab', { name: 'SUV / Crossover' }).click()
  await expect(prices(page)).toHaveText(['Starting at $159', 'Starting at $279', 'Starting at $629'])
  await page.getByRole('tab', { name: 'Truck / Van' }).click()
  await expect(prices(page)).toHaveText(['Starting at $179', 'Starting at $299', 'Starting at $649'])
  await page.getByRole('tab', { name: 'Coupe / Sedan' }).click()
  await expect(prices(page)).toHaveText(['Starting at $129', 'Starting at $249', 'Starting at $599'])
})

test('AC-11: arrow keys move between size tabs and wrap', async ({ page }) => {
  await page.getByRole('tab', { name: 'Coupe / Sedan' }).focus()
  await page.keyboard.press('ArrowRight')
  const suv = page.getByRole('tab', { name: 'SUV / Crossover' })
  await expect(suv).toHaveAttribute('aria-selected', 'true')
  await expect(suv).toBeFocused()
  await expect(prices(page).first()).toHaveText('Starting at $159')
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  const sedan = page.getByRole('tab', { name: 'Coupe / Sedan' })
  await expect(sedan).toHaveAttribute('aria-selected', 'true')
  await expect(sedan).toBeFocused()
  await expect(prices(page).first()).toHaveText('Starting at $129')
})

test('AC-12: only Complete Full Detail has the MOST POPULAR badge', async ({ page }) => {
  await expect(page.getByText('MOST POPULAR', { exact: true })).toHaveCount(1)
  await expect(page.getByRole('article', { name: 'Complete Full Detail' }).getByText('MOST POPULAR')).toBeVisible()
})

test('AC-13: a package CTA pre-fills the booking form with package and size', async ({ page }) => {
  await page.getByRole('tab', { name: 'Truck / Van' }).click()
  await page.getByRole('link', { name: 'Book Full Detail' }).click()
  await expect(page).toHaveURL(/#booking$/)
  await expect(page.locator('#booking-title')).toBeInViewport()
  await expect(page.getByLabel('Vehicle Type').locator('option:checked')).toHaveText('Truck / Van')
  await expect(page.getByLabel('Desired Package').locator('option:checked')).toHaveText('Complete Full Detail')
  await page.getByLabel('Desired Package').selectOption({ label: 'Express Refresh' })
  await expect(page.getByLabel('Desired Package').locator('option:checked')).toHaveText('Express Refresh')
})

test('AC-14: add-ons show their prices', async ({ page }) => {
  for (const [name, price] of [
    ['Pet Hair Removal', '$40+'],
    ['Headlight Restoration', '$75'],
    ['Engine Bay Detailing', '$65'],
    ['Ozone Odor Elimination', '$80'],
  ]) {
    await expect(page.getByRole('list', { name: 'Add-Ons' }).getByRole('listitem').filter({ hasText: name })).toContainText(price)
  }
})
