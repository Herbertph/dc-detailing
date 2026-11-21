export type VehicleSize = 'sedan' | 'suv' | 'truck'

export interface PackageItem {
  id: string
  name: string
  badge?: string
  isPopular?: boolean
  prices: Record<VehicleSize, number>
  description: string
  features: string[]
  ctaText: string
}

export const BUSINESS = {
  name: 'DC Detailing Services',
  addressShort: '143 Waverley Ave, Moncton, NB E1C 7V1',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=143+Waverley+Ave%2C+Moncton%2C+NB+E1C+7V1',
  phoneDisplay: '+1 (506) 940-6494',
  phoneHref: 'tel:+15069406494',
  hours: 'Mon–Sat: 8:00 AM – 6:00 PM',
  hoursClosed: 'Sun: Closed',
}

// Google Business stays a Maps search until the real profile URL is provided.
export const GOOGLE_REVIEWS_URL = 
  'https://www.google.com/maps/place/DC+Detailing+Services/@46.1028102,-142.8663798,3z/data=!4m10!1m2!2m1!1sDC+Detailing+Services!3m6!1s0x4ca0b9a8c564c535:0xc19cbc18f7a46110!8m2!3d46.1028102!4d-64.8195048!15sChVEQyBEZXRhaWxpbmcgU2VydmljZXNaFyIVZGMgZGV0YWlsaW5nIHNlcnZpY2VzkgEVY2FyX2RldGFpbGluZ19zZXJ2aWNl4AEA!16s%2Fg%2F11y3z505nm'

export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/dc_detailling_/' },
  { id: 'google', label: 'Google Business', url: GOOGLE_REVIEWS_URL },
] as const

export const NAV_LINKS = [
  { label: 'HOME', href: '#top' },
  { label: 'SERVICES & PACKAGES', href: '#packages' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'REVIEWS', href: '#reviews' },
]

export const HERO = {
  eyebrow: 'PREMIUM AUTO DETAILING IN MONCTON',
  titleLine1: 'RESTORE. PROTECT. SHINE.',
  titleLine2: "Moncton's Premium Auto Detailing Services.",
  subheadline:
    'From everyday hand washes to paint correction and ceramic coatings, we bring back that showroom shine. Fully mobile and shop-based services.',
  image: {
    src: '/images/hero-detailing.webp',
    alt: 'Black car hood being machine-polished with a dual-action polisher in a detailing shop',
    width: 1200,
    height: 900,
  },
}

export const TRUST_ITEMS = [
  { id: 'stars', title: '5-Star Service (170+ Reviews)', text: "Moncton's highest-rated auto detailing specialists on Google." },
  { id: 'shield', title: 'Experienced Professionals', text: 'Trained technicians using safe, swirl-free techniques and pro-grade products.' },
  { id: 'garage', title: 'Fully Equipped Shop on Waverley Ave', text: 'Climate-controlled facility in Moncton plus convenient mobile service.' },
] as const

export const PACKAGES_INTRO = {
  eyebrow: 'TRANSPARENT PRICING & PACKAGES',
  title: 'Detailing Packages Tailored to Your Vehicle',
  subtitle:
    'Choose from our signature interior, exterior, or full showroom packages. Prices vary slightly by vehicle size (Sedan, SUV/Crossover, Truck/Van).',
}

export const VEHICLE_SIZES: { id: VehicleSize; label: string }[] = [
  { id: 'sedan', label: 'Coupe / Sedan' },
  { id: 'suv', label: 'SUV / Crossover' },
  { id: 'truck', label: 'Truck / Van' },
]

export const PACKAGES_DATA: PackageItem[] = [
  { id: 'express', name: 'Express Refresh', prices: { sedan: 129, suv: 159, truck: 179 },
    description: 'Quick interior & exterior maintenance clean.',
    features: ['Hand wash & microfiber dry', 'Wheel & tire deep clean + dressing', 'Exterior window cleaning',
      'Full interior vacuum (seats, carpets, trunk)', 'Dashboard, console & door panel wipe-down', 'Interior glass & air freshener'],
    ctaText: 'Select Express' },
  { id: 'full-detail', name: 'Complete Full Detail', badge: 'MOST POPULAR', isPopular: true,
    prices: { sedan: 249, suv: 279, truck: 299 },
    description: 'Deep restoration clean inside and out.',
    features: ['Everything in Express Refresh', 'Clay bar decontamination & iron removal',
      'Carnauba wax or synthetic paint sealant (3-month protection)', 'Deep steam cleaning & shampoo of carpets/mats',
      'Leather conditioning or fabric seat extraction', 'Door jambs, vents & crevice detailing'],
    ctaText: 'Book Full Detail' },
  { id: 'ceramic', name: 'Showroom Ceramic & Correction', prices: { sedan: 599, suv: 629, truck: 649 },
    description: 'Paint enhancement and long-lasting ceramic protection.',
    features: ['Full exterior wash & chemical/mechanical decontamination',
      'Single-stage machine paint enhancement (removes light swirls & oxidation)',
      '2-Year Ceramic Coating application on paint & wheels', 'Exterior trim restoration & hydrophobic glass coating',
      'Full interior deep detail included'],
    ctaText: 'Request Inspection' },
]

export const ADDONS = [
  { name: 'Pet Hair Removal', price: '$40+' },
  { name: 'Headlight Restoration', price: '$75' },
  { name: 'Engine Bay Detailing', price: '$65' },
  { name: 'Ozone Odor Elimination', price: '$80' },
]

export type GalleryCategory = 'interior' | 'paint' | 'ceramic'
export type GalleryFilter = GalleryCategory | 'all'

export const GALLERY_INTRO = {
  eyebrow: 'PROVEN RESULTS',
  title: 'See the DC Detailing Difference',
  emptyText: 'No projects in this category yet.',
}

export const GALLERY_FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'interior', label: 'Interior Restoration' },
  { id: 'paint', label: 'Paint Correction' },
  { id: 'ceramic', label: 'Ceramic Coating' },
]

export interface GalleryItem {
  id: string
  title: string
  categories: GalleryCategory[]
  before: string
  after: string
}

const galleryItem = (id: string, title: string, categories: GalleryCategory[]): GalleryItem => ({
  id,
  title,
  categories,
  before: `/images/gallery-${id}-before.webp`,
  after: `/images/gallery-${id}-after.webp`,
})

export const GALLERY_ITEMS: GalleryItem[] = [
  galleryItem('luxury-suv', 'Luxury SUV — Salt Stain Extraction & Interior Steam', ['interior']),
  galleryItem('mustang', 'Ford Mustang — 1-Stage Polish & Ceramic Coating', ['paint', 'ceramic']),
  galleryItem('explorer', 'Ford Explorer — Pet Hair Removal & Full Detail', ['interior']),
  galleryItem('audi-a6', 'Audi A6 — Multi-Stage Paint Correction', ['paint']),
  galleryItem('focus-rs', 'Ford Focus RS — Complete Winter Prep & Shampoo', ['interior']),
  galleryItem('c-class', 'Mercedes-Benz C-Class — Leather Deep Clean & Conditioning', ['interior']),
]

export const SERVICE_SPLIT = [
  { id: 'shop', eyebrow: 'SHOP DETAILING', title: 'Visit Our Moncton Studio', place: '143 Waverley Ave, Moncton, NB',
    text: 'Climate-controlled facility optimized for precision paint correction, ceramic coatings, and deep interior detailing regardless of weather conditions.' },
  { id: 'mobile', eyebrow: 'MOBILE DETAILING', title: 'We Come to Your Driveway', place: 'Serving Moncton, Dieppe & Riverview',
    text: 'Fully equipped mobile unit bringing high-end detailing directly to your home or workplace. Perfect for routine washes and interior refreshes.' },
] as const

export const REVIEWS_INTRO = {
  badge: '4.9 ★ Rating on Google — Based on 170+ Verified Reviews',
  title: 'Trusted by Drivers Across Greater Moncton',
  linkText: 'Read all 170+ reviews on Google →',
}

export const REVIEWS: { author: string; note?: string; text: string }[] = [
  { author: 'Marc-André L.', note: 'Google Local Guide',
    text: 'Brought my SUV in after a rough New Brunswick winter and it looks brand new inside. Zero salt stains left on the carpets. Hands down the best detailing in Moncton!' },
  { author: 'Sarah T.',
    text: 'Super easy to book, transparent pricing, and incredible attention to detail. My black sedan had swirl marks everywhere and now looks like a mirror.' },
  { author: 'Jason M.',
    text: "Booked the Complete Full Detail for my truck. Worth every penny—they got dog hair out of places I didn't think was possible. Will definitely be back." },
]

export const ABOUT = {
  title: 'Passionate About Perfection, Built on Trust',
  paragraphs: [
    'At DC Detailing Services, we treat every vehicle as if it were our own. Based in Moncton, NB, our mission is to deliver uncompromising quality through professional techniques, pH-neutral products, and absolute transparency.',
    'Whether you visit our fully equipped studio on Waverley Ave or request our mobile unit at your home, we guarantee a level of cleanliness and gloss that exceeds expectations.',
  ],
  metrics: [
    { value: '170+', label: '5-Star Google Reviews' },
    { value: '1,500+', label: 'Vehicles Detailed' },
    { value: '100%', label: 'Satisfaction Guarantee' },
  ],
}

export const SERVICE_AREAS = ['Moncton, NB', 'Dieppe, NB', 'Riverview, NB', 'Shediac, NB', 'Salisbury, NB']

export const FOOTER = {
  summary: "Moncton's premier auto detailing studio and mobile service. Restoring and protecting your vehicle's value.",
  quickLinks: [
    { label: 'Home', href: '#top' },
    { label: 'Services & Packages', href: '#packages' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About Us', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Book Now', href: '#booking' },
  ],
}

export const BOOKING_PACKAGES = [
  ...PACKAGES_DATA.map((p) => ({ id: p.id, label: p.name })),
  { id: 'custom', label: 'Custom / Not Sure' },
]

export const TIME_WINDOWS = [
  { id: 'morning', label: 'Morning (8–12)' },
  { id: 'afternoon', label: 'Afternoon (12–6)' },
]

export const LOCATIONS = [
  { id: 'shop', label: 'Drop-off at 143 Waverley Ave Shop' },
  { id: 'mobile', label: 'Mobile Service at My Location' },
]

export const BOOKING_COPY = {
  title: 'Book Your Appointment or Get a Free Quote',
  submit: 'BOOK MY APPOINTMENT',
  sending: 'Sending…',
  successTitle: 'Thank You! Your Request Has Been Received.',
  successText:
    'We have reserved your details. Our team will review your vehicle specifications and contact you via phone or SMS at the provided number to confirm your exact appointment time.',
  errorText: "Sorry, we couldn't send your request. Please try again or call/text us at",
}
