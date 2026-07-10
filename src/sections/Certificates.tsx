import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { certificates } from '../data/certificates'

const items = certificates.sort((a, b) => a.order - b.order)

export function Certificates() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startX = useRef(0)
  const offsetX = useRef(0)

  const total = items.length

  const goTo = useCallback(
    (index: number) => {
      setCurrent((current + index + total) % total)
    },
    [current, total]
  )

  const next = useCallback(() => goTo(1), [goTo])
  const prev = useCallback(() => goTo(-1), [goTo])

  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(next, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, next])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    },
    [prev, next]
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    offsetX.current = 0
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    offsetX.current = e.clientX - startX.current
  }

  return (
    <section
      id="certificates"
      className="py-20 md:py-20 bg-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={t('certificates.carouselAria')}
    >
      <div className="content-container mb-12">
        <SectionTitle
          subtitle={t('certificates.subtitle')}
          title={t('certificates.title')}
          description={t('certificates.description')}
        />
      </div>

      <div
        className="relative mx-auto"
        style={{ maxWidth: '1200px', perspective: '1200px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <div className="relative h-[480px] md:h-[560px] flex items-center justify-center" style={{ perspective: '1200px' }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, index) => {
              const position = (index - current + total) % total
              const isCenter = position === 0
              const isVisible = isCenter || position === 1 || position === total - 1 || position === 2 || position === total - 2

              if (!isVisible) return null

              const centerOffset =
                position === 0
                  ? 0
                  : position <= Math.floor(total / 2)
                    ? position
                    : position - total

              const absOffset = Math.abs(centerOffset)

              const scale = isCenter ? 1 : absOffset === 1 ? 0.82 : 0.65
              const opacity = isCenter ? 1 : absOffset === 1 ? 0.55 : 0
              const zIndex = isCenter ? 10 : 10 - absOffset
              const translateX = centerOffset * 280
              const translateZ = isCenter ? 0 : absOffset === 1 ? -80 : -160
              const rotateY = isCenter ? 0 : centerOffset < 0 ? 18 : -18
              const blur = isCenter ? 0 : absOffset === 1 ? 3 : 6

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity,
                    scale,
                    x: translateX,
                    z: translateZ,
                    rotateY,
                    filter: `blur(${blur}px)`,
                    zIndex,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute w-[360px] md:w-[440px] cursor-pointer"
                  style={{ backfaceVisibility: 'hidden' }}
                  onClick={() => !isCenter && goTo(index - current)}
                  aria-hidden={!isCenter}
                >
                  <div
                    className={`bg-white rounded-xl border overflow-hidden transition-shadow duration-300 ${
                      isCenter
                        ? 'shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] border-primary/20'
                        : 'shadow-md border-border'
                    }`}
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden bg-section">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        {item.organization}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-title mt-1.5 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-body"
            aria-label={t('certificates.prevCertificateAria')}
          >
            <Icon name="ChevronRight" size={18} className="rotate-180" />
          </button>

          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-primary w-6'
                    : 'bg-border hover:bg-primary/50'
                }`}
                aria-label={t('certificates.gotoCertificate', { number: index + 1 })}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-body"
            aria-label={t('certificates.nextCertificateAria')}
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>

      <ScrollReveal className="text-center mt-16">
        <Button to="/certificates" variant="outline" size="lg">
          {t('certificates.pageTitle')}
          <Icon name="ArrowRight" size={20} />
        </Button>
      </ScrollReveal>
    </section>
  )
}
