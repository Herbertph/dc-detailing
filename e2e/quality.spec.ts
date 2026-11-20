import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('AC-37: head has title, meta description, Open Graph and JSON-LD', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('DC Detailing Services | Premium Auto Detailing in Moncton, NB')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  for (const selector of ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:image"]']) {
    await expect(page.locator(selector)).toHaveAttribute('content', /.+/)
  }
  const json = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)
  expect(json['@type']).toBe('AutoRepair')
  expect(json.telephone).toBe('+15069406494')
  expect(json.aggregateRating.ratingValue).toBe('4.9')
})

test('AC-38: no serious or critical accessibility violations', async ({ page }) => {
  // Reduced motion so axe checks the final, fully visible state rather than mid-animation frames.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const results = await new AxeBuilder({ page }).analyze()
  const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
  expect(blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([])
})

test('AC-39: with reduced motion all section content is visible immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const id of ['packages-title', 'gallery-title', 'reviews-title', 'about-title', 'booking-title']) {
    const heading = page.locator(`#${id}`)
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
    const opacity = await heading.evaluate((el) => {
      let node: Element | null = el
      let value = 1
      while (node) {
        value *= Number(getComputedStyle(node).opacity)
        node = node.parentElement
      }
      return value
    })
    expect(opacity).toBe(1)
  }
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
})

test('AC-40: no horizontal scrolling at 360 px', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 })
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360)
})

test('FR-31: images below the hero are lazy and the hero is eager', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('main img').first()).toHaveAttribute('loading', 'eager')
  const lazy = await page.locator('#gallery img').evaluateAll((imgs) => imgs.every((i) => i.getAttribute('loading') === 'lazy' && i.getAttribute('width') && i.getAttribute('height')))
  expect(lazy).toBe(true)
})
