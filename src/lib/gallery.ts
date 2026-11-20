import type { GalleryFilter, GalleryItem } from '../data/detailingData'

export function filterGallery(items: GalleryItem[], filter: GalleryFilter): GalleryItem[] {
  if (filter === 'all') return items
  return items.filter((item) => item.categories.includes(filter))
}
