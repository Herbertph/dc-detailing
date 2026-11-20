import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { GALLERY_ITEMS } from '../data/detailingData'
import { GallerySection } from './GallerySection'

describe('GallerySection', () => {
  it('AC-20: shows the empty message when a category has no projects', async () => {
    render(<GallerySection items={GALLERY_ITEMS.filter((i) => i.id === 'f150')} />)
    await userEvent.click(screen.getByRole('button', { name: 'Ceramic Coating' }))
    expect(screen.getByText('No projects in this category yet.')).toBeInTheDocument()
  })
})
