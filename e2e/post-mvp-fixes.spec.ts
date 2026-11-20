import { expect, test } from '@playwright/test'

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
