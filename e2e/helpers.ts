import { expect, test, type Page } from '@playwright/test'

export const BOOKING_ENDPOINT = 'https://booking.test/submit'

export const onlyDesktop = () => test.skip(test.info().project.name !== 'desktop', 'desktop only')
export const onlyMobile = () => test.skip(test.info().project.name !== 'mobile', 'mobile only')

/** Asserts the element is scrolled into view and not hidden behind the sticky header. */
export async function expectBelowHeader(page: Page, selector: string) {
  await expect
    .poll(async () => {
      const headerBottom = await page.locator('header').evaluate((el) => el.getBoundingClientRect().bottom)
      const top = await page.locator(selector).evaluate((el) => el.getBoundingClientRect().top)
      const viewport = page.viewportSize()!.height
      return top >= headerBottom - 1 && top < viewport
    })
    .toBe(true)
}

/** Next date (YYYY-MM-DD, local time) from today that is not a Sunday. */
export function nextOpenDate(): string {
  const d = new Date()
  if (d.getDay() === 0) d.setDate(d.getDate() + 1)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function isoDaysFromToday(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export async function fillValidForm(page: Page, notes = '') {
  await page.getByLabel('Full Name').fill('John Doe')
  await page.getByLabel('Phone Number / SMS').fill('(506) 555-0199')
  await page.getByLabel('Email Address').fill('john@example.com')
  await page.getByLabel('Vehicle Type').selectOption({ label: 'SUV / Crossover' })
  await page.getByLabel('Vehicle Make, Model & Year').fill('2021 Toyota RAV4')
  await page.getByLabel('Desired Package').selectOption({ label: 'Express Refresh' })
  await page.getByLabel('Preferred Date').fill(nextOpenDate())
  await page.getByLabel('Time Window').selectOption({ label: 'Morning (8–12)' })
  if (notes) await page.getByLabel('Additional Notes / Special Requests').fill(notes)
}
