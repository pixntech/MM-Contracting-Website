import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { CertificateCard } from '../components/ui/CertificateCard'
import { certificates } from '../data/certificates'

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
    x: dir * vp * 300,
    z: a === 0 ? 0 : a === 1 ? -80 : -160,
    rotateY: vp === 0 ? 0 : vp < 0 ? 15 : -15,
    scale: a === 0 ? 1 : a === 1 ? 0.84 : 0.68,
    opacity: a === 0 ? 1 : a === 1 ? 0.48 : 0,
    filter: `blur(${a === 0 ? 0 : a === 1 ? 2 : 6}px)`,
    zIndex: a === 0 ? 10 : 10 - a,
  }
}

export function Certificates() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'
  const isArabic = isRtl
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const items = useMemo(() => [...certificates].sort((a, b) => a.order - b.order), [])
  const total = items.length

  const next = useCallback(() => {
    if (total === 0) return
    setCurrent((p) => (p + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    if (total === 0) return
    setCurrent((p) => (p - 1 + total) % total)
  }, [total])

  useEffect(() => {
    if (isPaused || total === 0) return
    intervalRef.current = setInterval(next, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, next, total])

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

  if (total === 0) return null

  return (
    <section
      id="certificates"
      className="py-20 md:py-24 bg-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={t('certificates.carouselAria')}
    >
      <div className="content-container mb-12">
        <SectionTitle
          subtitle={isArabic ? 'الشهادات والمستندات الرسمية' : 'Certificates & Official Documents'}
          title={isArabic ? 'اعتمادات وسجلات الشركة' : 'Company Credentials & Registrations'}
          description={
            isArabic
              ? 'معلومات المستندات الرسمية الواردة في ملف شركة إم إم للمقاولات والتوريدات، وتشمل المستندات الضريبية والسجل التجاري وعضوية اتحاد المقاولين والاتفاقيات القانونية.'
              : 'Information from the official documents supplied in the MM Contracting & Supplying Co. profile, including tax records, commercial registration, contractor federation membership and legal agreements.'
          }
        />
      </div>

      <div className="relative mx-auto" style={{ maxWidth: '1240px', perspective: '1200px' }}>
        <div className="relative h-[430px] md:h-[390px] flex items-center justify-center" style={{ perspective: '1200px' }}>
          {items.map((item, index) => {
            const vp = getVisualPos(index, current, total)
            const a = Math.abs(vp)
            const transform = getSlideTransform(vp, isRtl)

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: transform.x,
                  z: transform.z,
                  rotateY: transform.rotateY,
                  scale: transform.scale,
                  opacity: transform.opacity,
                  filter: transform.filter,
                  zIndex: transform.zIndex,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute w-[340px] md:w-[480px]"
                style={{
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  pointerEvents: a >= 2 ? 'none' : 'auto',
                }}
                onClick={() => {
                  if (vp !== 0) setCurrent((p) => (p + vp + total) % total)
                }}
              >
                <CertificateCard certificate={item} variant="carousel" />
              </motion.div>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-7">
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
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current ? 'bg-primary w-6' : 'bg-border hover:bg-primary/50'
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

      <ScrollReveal className="text-center mt-14">
        <Button to="/certificates" variant="outline" size="lg">
          {t('certificates.pageTitle')}
          <Icon name="ArrowRight" size={20} />
        </Button>
      </ScrollReveal>
    </section>
  )
}
