// Dev-only: builds public/images/*.webp from the original stock photos (see public/images/CREDITS.md).
// Usage: node scripts/build-images.mjs <dir-with-originals>
// Originals are named pexels-<id>.jpg (download from the CREDITS.md source URLs). They are not committed.
import sharp from 'sharp'
import path from 'node:path'

const src = process.argv[2]
if (!src) throw new Error('Usage: node scripts/build-images.mjs <dir-with-originals>')
const out = path.resolve('public/images')

// x / y: where the 4:3 crop sits inside the original, from 0 (left/top) to 1 (right/bottom).
const HERO = { file: 'hero-detailing', photo: 5233259, x: 0.35, y: 0.5 }
const GALLERY = [
  { id: 'luxury-suv', photo: 29293845, x: 0.5, y: 0.55, dirt: 'interior' },
  { id: 'mustang', photo: 8012508, x: 0.5, y: 0.6, dirt: 'paint' },
  { id: 'explorer', photo: 12173186, x: 0.5, y: 0.5, dirt: 'interior' },
  { id: 'audi-a6', photo: 305070, x: 0, y: 0.5, dirt: 'paint' },
  { id: 'focus-rs', photo: 7796996, x: 0.5, y: 0.62, dirt: 'interior' },
  { id: 'c-class', photo: 18318612, x: 1, y: 0.5, dirt: 'interior' },
]

async function crop(photo, x, y, width, height) {
  const input = sharp(path.join(src, `pexels-${photo}.jpg`))
  const meta = await input.metadata()
  const w = Math.min(meta.width, Math.round((meta.height * 4) / 3))
  const h = Math.round((w * 3) / 4)
  const left = Math.round((meta.width - w) * x)
  const top = Math.round((meta.height - h) * y)
  return input.extract({ left, top, width: w, height: h }).resize(width, height)
}

// Deterministic pseudo-random numbers so the simulated "before" edit is reproducible.
function rng(seed) {
  let s = seed % 2147483647
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

function dirtOverlay(kind, seed) {
  const r = rng(seed)
  const shapes = []
  if (kind === 'paint') {
    // Haze, swirl marks and water spots.
    shapes.push('<rect width="800" height="600" fill="#9a9a9a" opacity="0.28"/>')
    for (let i = 0; i < 70; i++) {
      const cx = r() * 800, cy = r() * 600, rad = 20 + r() * 90
      shapes.push(`<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="#fff" stroke-width="${0.6 + r()}" opacity="${0.25 + r() * 0.3}"/>`)
    }
    for (let i = 0; i < 500; i++) {
      shapes.push(`<circle cx="${r() * 800}" cy="${r() * 600}" r="${1 + r() * 3}" fill="#d8d2c4" opacity="${0.35 + r() * 0.4}"/>`)
    }
  } else {
    // Stains, dust and debris.
    for (let i = 0; i < 14; i++) {
      shapes.push(`<ellipse cx="${r() * 800}" cy="${r() * 600}" rx="${25 + r() * 60}" ry="${15 + r() * 40}" fill="#5a4630" opacity="${0.3 + r() * 0.25}" filter="url(#b)"/>`)
    }
    for (let i = 0; i < 900; i++) {
      shapes.push(`<circle cx="${r() * 800}" cy="${r() * 600}" r="${0.8 + r() * 2.5}" fill="${r() > 0.5 ? '#e6dcc8' : '#3b3026'}" opacity="${0.5 + r() * 0.4}"/>`)
    }
  }
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><filter id="b"><feGaussianBlur stdDeviation="8"/></filter></defs>${shapes.join('')}</svg>`,
  )
}

await (await crop(HERO.photo, HERO.x, HERO.y, 1200, 900)).webp({ quality: 72 }).toFile(path.join(out, `${HERO.file}.webp`))

for (const g of GALLERY) {
  const after = await (await crop(g.photo, g.x, g.y, 800, 600)).toBuffer()
  await sharp(after).webp({ quality: 72 }).toFile(path.join(out, `gallery-${g.id}-after.webp`))
  await sharp(after)
    .modulate({ saturation: 0.35, brightness: 0.85 })
    .blur(1.2)
    .composite([{ input: dirtOverlay(g.dirt, g.photo) }])
    .webp({ quality: 72 })
    .toFile(path.join(out, `gallery-${g.id}-before.webp`))
}
console.log('done')
