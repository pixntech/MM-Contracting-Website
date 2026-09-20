import type { GalleryItem } from '../types'

export const galleryCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'construction', label: 'Construction' },
  { id: 'industrial', label: 'Industrial' },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 'building-site-works',
    src: '/projects/building-site-works.webp',
    alt: 'MM Contracting construction works at night with concrete pumping equipment',
    title: 'Building Construction Works',
    category: 'construction',
    width: 435,
    height: 346,
    order: 1,
  },
  {
    id: 'mmk-pack-factory',
    src: '/projects/mmk-pack-factory.webp',
    alt: 'Industrial production facility at MMK Pack Factory for Cartons',
    title: 'MMK Pack Factory for Cartons',
    category: 'industrial',
    width: 435,
    height: 278,
    order: 2,
  },
]
