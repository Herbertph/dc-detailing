import { describe, expect, it } from 'vitest'
import { GALLERY_ITEMS } from '../data/detailingData'
import { filterGallery } from './gallery'

const ids = (filter: Parameters<typeof filterGallery>[1]) => filterGallery(GALLERY_ITEMS, filter).map((i) => i.id)

describe('filterGallery', () => {
  it('AC-20: "all" returns every item', () => {
    expect(ids('all')).toHaveLength(6)
  })

  it('AC-20: returns only items with the category', () => {
    expect(ids('interior')).toEqual(['f150', 'crv', 'ram-1500', 'audi-a4'])
    expect(ids('paint')).toEqual(['bmw-m3', 'porsche-911'])
    expect(ids('ceramic')).toEqual(['bmw-m3'])
  })

  it('AC-20: returns an empty list when no item has the category', () => {
    const onlyInterior = GALLERY_ITEMS.filter((i) => i.id === 'f150')
    expect(filterGallery(onlyInterior, 'ceramic')).toEqual([])
  })
})
