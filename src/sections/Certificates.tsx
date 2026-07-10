import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { certificates } from '../data/certificates'

const items = [...certificates].sort((a, b) => a.order - b.order)

function getVisualPos(idx: number, cur: number, tot: number) {
  const half = Math.floor(tot / 2)
  let p = idx - cur
  if (p > half) p -= tot
  if (p < -half) p += tot
  return p
}

function getSlideTransform(vp: number, rtl: boolean) {
  const a = Math.abs(vp)
  const dir = rtl ? -1 : 1
  return {
    x: dir * vp * 280,
    z: a === 0 ? 0 : a === 1 ? -80 : -160,
    rotateY: vp === 0 ? 0 : vp < 0 ? 18 : -18,
    scale: a === 0 ? 1 : a === 1 ? 0.82 : 0.65,
    opacity: a === 0 ? 1 : a === 1 ? 0.55 : 0,
    filter: `blur(${a === 0 ? 0 : a === 1 ? 3 : 6}px)`,
    zIndex: a === 0 ? 10 : 10 - a,
  }
}

export function Certificates() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startX = useRef(0)
  const offsetX = useRef(0)

  const total = items.length

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(next, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, next])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isRtl) {
        if (e.key === 'ArrowLeft') next()
        if (e.key === 'ArrowRight') prev()
      } else {
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      }
    },
    [prev, next, isRtl]
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
          {items.map((item, index) => {
            const vp = getVisualPos(index, current, total)
            const a = Math.abs(vp)
            const t = getSlideTransform(vp, isRtl)

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: t.x,
                  z: t.z,
                  rotateY: t.rotateY,
                  scale: t.scale,
                  opacity: t.opacity,
                  filter: t.filter,
                  zIndex: t.zIndex,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute w-[360px] md:w-[440px]"
                style={{
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  pointerEvents: a >= 2 ? 'none' as const : 'auto' as const,
                }}
                onClick={() => {
                  if (vp !== 0) {
                    setCurrent((p) => (p + vp + total) % total)
                  }
                }}
              >
                <div
                  className={`bg-white rounded-xl border overflow-hidden transition-shadow duration-300 ${
                    vp === 0
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
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-body"
            aria-label={t('certificates.prevCertificateAria')}
          >
            {isRtl ? (
              <Icon name="ChevronRight" size={18} />
            ) : (
              <Icon name="ChevronRight" size={18} className="rotate-180" />
            )}
          </button>

          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrent((prev) => {
                    const rawDiff = index - prev
                    const modDiff = ((rawDiff % total) + total) % total
                    const half = Math.floor(total / 2)
                    const steps = modDiff <= half ? modDiff : modDiff - total
                    return (prev + steps + total) % total
                  })
                }}
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
            {isRtl ? (
              <Icon name="ChevronRight" size={18} className="rotate-180" />
            ) : (
              <Icon name="ChevronRight" size={18} />
            )}
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
