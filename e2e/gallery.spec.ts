import { expect, test, type Page } from '@playwright/test'

const cards = (page: Page) => page.getByTestId('gallery-card')

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('AC-16: All Work is selected and six cards are visible', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'All Work' })).toHaveAttribute('aria-pressed', 'true')
  await expect(cards(page)).toHaveCount(6)
})

test('AC-17: filters show only the matching cards', async ({ page }) => {
  await page.getByRole('button', { name: 'Interior Restoration' }).click()
  await expect(cards(page)).toHaveCount(4)
  for (const name of ['Luxury SUV', 'Ford Explorer', 'Focus RS', 'C-Class']) await expect(cards(page).filter({ hasText: name })).toHaveCount(1)
  await page.getByRole('button', { name: 'Paint Correction' }).click()
  await expect(cards(page)).toHaveCount(2)
  for (const name of ['Mustang', 'Audi A6']) await expect(cards(page).filter({ hasText: name })).toHaveCount(1)
  await page.getByRole('button', { name: 'Ceramic Coating' }).click()
  await expect(cards(page)).toHaveCount(1)
  await expect(cards(page)).toContainText('Ford Mustang')
  await page.getByRole('button', { name: 'All Work' }).click()
  await expect(cards(page)).toHaveCount(6)
})

test('AC-18: the slider moves with the keyboard', async ({ page }) => {
  const slider = page.getByRole('slider', { name: /Before and after comparison: Ford Mustang/ })
  await expect(slider).toHaveAttribute('aria-valuenow', '50')
  await expect(slider).toHaveAttribute('aria-valuemin', '0')
  await expect(slider).toHaveAttribute('aria-valuemax', '100')
  await slider.focus()
  await page.keyboard.press('ArrowRight')
  await page.keyboard.press('ArrowRight')
  await expect(slider).toHaveAttribute('aria-valuenow', '60')
  await page.keyboard.press('End')
  await expect(slider).toHaveAttribute('aria-valuenow', '100')
  await page.keyboard.press('Home')
  await expect(slider).toHaveAttribute('aria-valuenow', '0')
  await page.keyboard.press('ArrowLeft')
  await expect(slider).toHaveAttribute('aria-valuenow', '0')
  const card = cards(page).filter({ hasText: 'Ford Mustang' })
  await expect(card.getByText('BEFORE', { exact: true })).toBeVisible()
  await expect(card.getByText('AFTER', { exact: true })).toBeVisible()
})

test('AC-19: dragging the handle left reveals more of the after image', async ({ page }) => {
  const card = cards(page).first()
  const slider = card.getByRole('slider')
  await slider.scrollIntoViewIfNeeded()
  const before = card.getByRole('img', { name: /^Before:/ })
  const box = (await slider.boundingBox())!
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width / 2 - 80, box.y + box.height / 2, { steps: 5 })
  await page.mouse.up()
  const value = Number(await slider.getAttribute('aria-valuenow'))
  expect(value).toBeLessThan(50)
  // The "before" layer is clipped from the right, so a smaller value shows more of the "after" image.
  expect(await before.evaluate((el) => (el as HTMLElement).style.clipPath)).toBe(`inset(0px ${100 - value}% 0px 0px)`)
})
