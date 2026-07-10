import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface ImageLightboxProps {
  images: { src: string; alt: string; title?: string }[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'
  const current = images[currentIndex]
  const total = images.length

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % total)
  }, [currentIndex, total, onNavigate])

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + total) % total)
  }, [currentIndex, total, onNavigate])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (isRtl) {
        if (e.key === 'ArrowLeft') goNext()
        if (e.key === 'ArrowRight') goPrev()
      } else {
        if (e.key === 'ArrowRight') goNext()
        if (e.key === 'ArrowLeft') goPrev()
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev, isRtl])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label={current?.title ?? current?.alt ?? t('imageLightbox.ariaLabel')}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={t('imageLightbox.close')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l10 10M15 5l-10 10" />
          </svg>
        </button>

        {total > 1 && (
          <button
            onClick={goPrev}
            className="absolute start-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t('imageLightbox.previous')}
          >
            {isRtl ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            )}
          </button>
        )}

        {total > 1 && (
          <button
            onClick={goNext}
            className="absolute end-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t('imageLightbox.next')}
          >
            {isRtl ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </button>
        )}

        {total > 1 && (
          <div className="absolute bottom-6 start-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {currentIndex + 1} / {total}
          </div>
        )}

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        >
          <img
            src={current.src}
            alt={current.alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
          {(current.title || current.alt) && (
            <p className="mt-4 text-white/80 text-sm text-center max-w-lg">
              {current.title ?? current.alt}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
