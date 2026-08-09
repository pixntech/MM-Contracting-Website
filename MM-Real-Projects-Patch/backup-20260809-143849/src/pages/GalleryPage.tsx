import { useState, useMemo, useCallback, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { galleryItems, galleryCategories } from '../data/gallery'

const SectionTitle = lazy(() =>
  import('../components/ui/SectionTitle').then((m) => ({ default: m.SectionTitle }))
)
const ScrollReveal = lazy(() =>
  import('../components/ui/ScrollReveal').then((m) => ({ default: m.ScrollReveal }))
)
const ImageLightbox = lazy(() =>
  import('../components/ui/ImageLightbox').then((m) => ({ default: m.ImageLightbox }))
)

const categories = galleryCategories

export function GalleryPage() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredItems = useMemo(
    () => {
      const items =
        activeCategory === 'all'
          ? galleryItems
          : galleryItems.filter((item) => item.category === activeCategory)
      return [...items].sort((a, b) => a.order - b.order)
    },
    [activeCategory]
  )

  const lightboxImages = useMemo(
    () =>
      filteredItems.map((item) => ({
        src: item.src,
        alt: item.alt,
        title: item.title,
      })),
    [filteredItems]
  )

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const navigateLightbox = useCallback(
    (index: number) => {
      setLightboxIndex(index)
    },
    []
  )

  const catLabelKeys: Record<string, string> = {
    'all': 'gallery.categories.all',
    'construction': 'gallery.categories.construction',
    'architecture': 'gallery.categories.architecture',
    'infrastructure': 'gallery.categories.infrastructure',
    'residential': 'gallery.categories.residential',
    'commercial': 'gallery.categories.commercial',
  }

  const itemKeyMap: Record<string, string> = {
    'gallery-3': 'palmResidences',
    'gallery-4': 'coastalBridge',
    'gallery-5': 'designStudio',
    'gallery-6': 'petrochemicalPlant',
    'gallery-7': 'greenValley',
    'gallery-8': 'bayfrontResort',
    'gallery-9': 'waterPlant',
    'gallery-10': 'solarFarm',
  }

  return (
    <div className="pt-28 pb-24">
      <div className="content-container">
        <SectionTitle
          subtitle={t('gallery.subtitle')}
          title={t('gallery.pageTitle')}
          description={t('gallery.description')}
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-surface text-body hover:bg-primary/10 hover:text-primary border border-border'
              }`}
              aria-pressed={activeCategory === cat.id}
            >
              {t(catLabelKeys[cat.id] || cat.label)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => {
            const isTall = item.width && item.height && item.height > item.width
            const key = itemKeyMap[item.id] || item.id
            return (
              <ScrollReveal key={item.id} delay={index * 0.04}>
                <div
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${
                    isTall && index % 3 === 0 ? 'sm:row-span-2' : ''
                  }`}
                  style={{
                    aspectRatio: isTall && index % 3 === 0 ? undefined : '4/3',
                    minHeight: isTall && index % 3 === 0 ? '400px' : undefined,
                  }}
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') openLightbox(index)
                  }}
                  aria-label={t(`gallery.items.${key}.title`)}
                >
                  <img
                    src={item.src}
                    alt={t(`gallery.items.${key}.alt`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                    <h3 className="text-white font-bold text-base leading-snug mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      {t(`gallery.items.${key}.title`)}
                    </h3>
                    <span className="text-white/60 text-xs capitalize translate-y-2 group-hover:translate-y-0 transition-transform duration-400 delay-75">
                      {item.category}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-muted py-16">
            {t('gallery.noImages')}
          </p>
        )}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  )
}
