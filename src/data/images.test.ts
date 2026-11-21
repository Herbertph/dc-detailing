// @vitest-environment node
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { describe, expect, it } from 'vitest'
import { GALLERY_ITEMS, GOOGLE_REVIEWS_URL, HERO, SOCIAL_LINKS } from './detailingData'

const dir = path.resolve(__dirname, '../../public/images')
const file = (src: string) => path.join(dir, path.basename(src))
const galleryFiles = GALLERY_ITEMS.flatMap((i) => [i.before, i.after])

async function expectWebp(src: string, width: number, height: number, maxKb: number) {
  const meta = await sharp(file(src)).metadata()
  expect(meta.format, src).toBe('webp')
  expect([meta.width, meta.height], src).toEqual([width, height])
  expect(meta.size ?? readFileSync(file(src)).length, src).toBeLessThanOrEqual(maxKb * 1024)
}

describe('images', () => {
  it('AC-1: the hero is a 1200x900 WebP of at most 250 KB', async () => {
    expect([HERO.image.width, HERO.image.height]).toEqual([1200, 900])
    await expectWebp(HERO.image.src, 1200, 900, 250)
  })

  it('AC-1: every gallery image is an 800x600 WebP of at most 150 KB', async () => {
    for (const src of galleryFiles) await expectWebp(src, 800, 600, 150)
  })

  it('AC-2: six gallery items and no unreferenced file', () => {
    expect(GALLERY_ITEMS).toHaveLength(6)
    const referenced = new Set([HERO.image.src, ...galleryFiles].map((s) => path.basename(s)))
    const present = readdirSync(dir).filter((f) => f !== 'CREDITS.md')
    expect(present.sort()).toEqual([...referenced].sort())
  })

  it('AC-3: CREDITS.md has a row with source, author and license for every image', () => {
    const credits = readFileSync(path.join(dir, 'CREDITS.md'), 'utf8')
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.webp'))) {
      const row = credits.split('\n').find((l) => l.startsWith(`| \`${f}\``))
      expect(row, f).toBeDefined()
      const [, , source, author, license, before] = row!.split('|').map((c) => c.trim())
      expect(source, f).toMatch(/^https:\/\/(www\.)?(pexels|unsplash)\.com\//)
      expect(author, f).not.toBe('')
      expect(license, f).toMatch(/^(Pexels|Unsplash) License$/)
      if (f.endsWith('-before.webp')) expect(before, f).toMatch(/^(original photo|simulated edit)$/)
    }
  })

  it('AC-7: the Google Business link is the shop place page without tracking query', () => {
    expect(GOOGLE_REVIEWS_URL).toMatch(/^https:\/\/www\.google\.com\/maps\/place\/DC\+Detailing\+Services\//)
    expect(GOOGLE_REVIEWS_URL).not.toContain('?')
    expect(SOCIAL_LINKS.find((l) => l.id === 'google')?.url).toBe(GOOGLE_REVIEWS_URL)
  })
})
