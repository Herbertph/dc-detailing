import { expect, test, type Page, type Route } from '@playwright/test'
import { BOOKING_ENDPOINT, fillValidForm, isoDaysFromToday } from './helpers'

const submit = (page: Page) => page.getByRole('button', { name: 'BOOK MY APPOINTMENT' })

/** Intercepts the booking endpoint; returns the list of request bodies received. */
async function mockEndpoint(page: Page, handler: (route: Route) => Promise<void>) {
  const bodies: unknown[] = []
  await page.route(BOOKING_ENDPOINT, async (route) => {
    bodies.push(route.request().postDataJSON())
    await handler(route)
  })
  return bodies
}

const errorOf = (page: Page, label: string) =>
  page.getByLabel(label).evaluate((el) => {
    const id = el.getAttribute('aria-describedby')
    return id ? document.getElementById(id)?.textContent ?? null : null
  })

test.beforeEach(async ({ page }) => {
  await page.goto('/#booking')
})

test('AC-21: an empty submit shows the required errors, sends nothing and focuses Full Name', async ({ page }) => {
  const bodies = await mockEndpoint(page, (route) => route.fulfill({ status: 200, body: '{}' }))
  await submit(page).click()
  for (const label of ['Full Name', 'Phone Number / SMS', 'Vehicle Type', 'Vehicle Make, Model & Year', 'Desired Package', 'Preferred Date', 'Time Window']) {
    await expect(page.getByLabel(label)).toHaveAttribute('aria-invalid', 'true')
  }
  for (const label of ['Email Address', 'Additional Notes / Special Requests']) {
    await expect(page.getByLabel(label)).not.toHaveAttribute('aria-invalid', 'true')
  }
  await expect(page.getByLabel('Full Name')).toBeFocused()
  expect(bodies).toHaveLength(0)
})

test('AC-22: phone accepts North American formats and rejects others', async ({ page }) => {
  const phone = page.getByLabel('Phone Number / SMS')
  await submit(page).click()
  for (const value of ['555-0199', 'abc', '+44 20 7946 0958', '12345678901234']) {
    await phone.fill(value)
    expect(await errorOf(page, 'Phone Number / SMS')).toBe('Enter a valid phone number, e.g. (506) 555-0199')
  }
  for (const value of ['(506) 555-0199', '506-555-0199', '+1 506 555 0199', '15065550199']) {
    await phone.fill(value)
    await expect(phone).not.toHaveAttribute('aria-invalid', 'true')
  }
})

test('AC-23: email is optional but must be valid', async ({ page }) => {
  await submit(page).click()
  await expect(page.getByLabel('Email Address')).not.toHaveAttribute('aria-invalid', 'true')
  await page.getByLabel('Email Address').fill('john@example')
  expect(await errorOf(page, 'Email Address')).toBe('Enter a valid email address')
})

test('AC-24: full name length rules', async ({ page }) => {
  const name = page.getByLabel('Full Name')
  await submit(page).click()
  for (const value of ['   ', 'J', 'a'.repeat(81)]) {
    await name.fill(value)
    await expect(name).toHaveAttribute('aria-invalid', 'true')
  }
  await name.fill('Jo')
  await expect(name).not.toHaveAttribute('aria-invalid', 'true')
})

test('AC-25: date rules for past, Sunday and more than 90 days', async ({ page }) => {
  const date = page.getByLabel('Preferred Date')
  await submit(page).click()
  await date.fill(isoDaysFromToday(-1))
  expect(await errorOf(page, 'Preferred Date')).toBe('Please choose a date from today onward')
  let sundayOffset = 1
  while (new Date(Date.now() + sundayOffset * 864e5).getDay() !== 0) sundayOffset++
  await date.fill(isoDaysFromToday(sundayOffset))
  expect(await errorOf(page, 'Preferred Date')).toBe("We're closed on Sundays — please pick Monday to Saturday")
  let farOffset = 91
  if (new Date(Date.now() + farOffset * 864e5).getDay() === 0) farOffset++
  await date.fill(isoDaysFromToday(farOffset))
  expect(await errorOf(page, 'Preferred Date')).toBe('Please choose a date within the next 90 days')
  if (new Date().getDay() !== 0) {
    await date.fill(isoDaysFromToday(0))
    await expect(date).not.toHaveAttribute('aria-invalid', 'true')
  }
})

test('AC-26: service address appears only for mobile service', async ({ page }) => {
  const bodies = await mockEndpoint(page, (route) => route.fulfill({ status: 200, body: '{}' }))
  await expect(page.getByLabel('Drop-off at 143 Waverley Ave Shop')).toBeChecked()
  await expect(page.getByLabel('Service Address')).toHaveCount(0)
  await fillValidForm(page)
  await page.getByLabel('Mobile Service at My Location').check()
  await expect(page.getByLabel('Service Address')).toBeVisible()
  await submit(page).click()
  await expect(page.getByLabel('Service Address')).toHaveAttribute('aria-invalid', 'true')
  expect(bodies).toHaveLength(0)
  await page.getByLabel('Drop-off at 143 Waverley Ave Shop').check()
  await expect(page.getByLabel('Service Address')).toHaveCount(0)
  await submit(page).click()
  await expect(page.getByRole('heading', { name: 'Thank You! Your Request Has Been Received.' })).toBeVisible()
  expect(bodies).toHaveLength(1)
})

test('AC-27: notes accept 1000 characters and reject 1001', async ({ page }) => {
  const notes = page.getByLabel('Additional Notes / Special Requests')
  await submit(page).click()
  await notes.fill('a'.repeat(1001))
  await expect(notes).toHaveAttribute('aria-invalid', 'true')
  await notes.fill('a'.repeat(1000))
  await expect(notes).not.toHaveAttribute('aria-invalid', 'true')
})

test('AC-28: an invalid field links to its error text', async ({ page }) => {
  await submit(page).click()
  const name = page.getByLabel('Full Name')
  await expect(name).toHaveAttribute('aria-invalid', 'true')
  await expect(name).toHaveAttribute('aria-describedby', 'fullName-error')
  await expect(page.locator('#fullName-error')).toBeVisible()
})

test('AC-30: a valid submit sends one JSON POST and shows the confirmation', async ({ page }) => {
  let release!: () => void
  const gate = new Promise<void>((resolve) => (release = resolve))
  const requests: { headers: Record<string, string>; method: string }[] = []
  const bodies = await mockEndpoint(page, async (route) => {
    requests.push({ headers: route.request().headers(), method: route.request().method() })
    await gate
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  await fillValidForm(page, 'Salt stains on the mats')
  await submit(page).click()
  const sending = page.getByRole('button', { name: 'Sending…' })
  await expect(sending).toBeDisabled()
  release()
  const heading = page.getByRole('heading', { name: 'Thank You! Your Request Has Been Received.' })
  await expect(heading).toBeVisible()
  await expect(heading).toBeFocused()
  await expect(page.getByLabel('Full Name')).toHaveCount(0)
  await expect(page.locator('#booking a[href="tel:+15069406494"]')).toBeVisible()
  expect(bodies).toHaveLength(1)
  expect(requests[0].method).toBe('POST')
  expect(requests[0].headers['content-type']).toBe('application/json')
  expect(bodies[0]).toMatchObject({
    fullName: 'John Doe',
    phone: '(506) 555-0199',
    email: 'john@example.com',
    vehicleType: 'SUV / Crossover',
    vehicle: '2021 Toyota RAV4',
    package: 'Express Refresh',
    location: 'Drop-off at 143 Waverley Ave Shop',
    timeWindow: 'Morning (8–12)',
    notes: 'Salt stains on the mats',
  })
})

test('AC-31: a failed submit keeps the values, shows the error and allows a retry', async ({ page }) => {
  let fail = true
  const bodies = await mockEndpoint(page, (route) =>
    fail ? route.fulfill({ status: 500, body: 'error' }) : route.fulfill({ status: 200, body: '{}' }),
  )
  await fillValidForm(page)
  await submit(page).click()
  const alert = page.getByRole('alert')
  await expect(alert).toContainText("Sorry, we couldn't send your request. Please try again or call/text us at +1 (506) 940-6494.")
  await expect(alert.locator('a[href="tel:+15069406494"]')).toBeVisible()
  await expect(page.getByLabel('Full Name')).toHaveValue('John Doe')
  await expect(page.getByLabel('Vehicle Make, Model & Year')).toHaveValue('2021 Toyota RAV4')
  fail = false
  await submit(page).click()
  await expect(page.getByRole('heading', { name: 'Thank You! Your Request Has Been Received.' })).toBeVisible()
  expect(bodies).toHaveLength(2)
})

test('AC-31: a network failure shows the error alert', async ({ page }) => {
  await mockEndpoint(page, (route) => route.abort('failed'))
  await fillValidForm(page)
  await submit(page).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByLabel('Full Name')).toHaveValue('John Doe')
})

test('AC-32: a double click sends only one request', async ({ page }) => {
  const bodies = await mockEndpoint(page, async (route) => {
    await new Promise((r) => setTimeout(r, 300))
    await route.fulfill({ status: 200, body: '{}' })
  })
  await fillValidForm(page)
  await submit(page).dblclick()
  await expect(page.getByRole('heading', { name: 'Thank You! Your Request Has Been Received.' })).toBeVisible()
  expect(bodies).toHaveLength(1)
})

test('AC-33: HTML in notes is never rendered or executed', async ({ page }) => {
  let dialogs = 0
  page.on('dialog', async (d) => {
    dialogs++
    await d.dismiss()
  })
  const payload = '<img src=x onerror=alert(1)>'
  const bodies = await mockEndpoint(page, (route) => route.fulfill({ status: 500, body: '' }))
  await fillValidForm(page, payload)
  await submit(page).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByLabel('Additional Notes / Special Requests')).toHaveValue(payload)
  await expect(page.locator('img[src="x"]')).toHaveCount(0)
  expect(dialogs).toBe(0)
  expect((bodies[0] as { notes: string }).notes).toBe(payload)
})
