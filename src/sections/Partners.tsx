import { useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Marquee } from '../components/ui/Marquee'
import { partners } from '../data/partners'

function BackgroundPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id="partnersGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#419DF0" strokeWidth="0.3" opacity="0.03" />
        </pattern>
        <pattern id="partnersDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#419DF0" opacity="0.025" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#partnersGrid)" />
      <rect width="100%" height="100%" fill="url(#partnersDots)" />
    </svg>
  )
}

function PreviewUnderline() {
  return (
    <motion.div
      className="h-[3px] bg-primary rounded-full mx-auto mt-4"
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 80, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    />
  )
}

export function Partners() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isArabic = i18n.resolvedLanguage?.startsWith('ar') ?? false

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5])

  const ordered = useMemo(() => [...partners].sort((a, b) => a.order - b.order), [])
  const topItems = ordered.filter((_, idx) => idx % 2 === 0)
  const bottomItems = ordered.filter((_, idx) => idx % 2 === 1)

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative py-20 md:py-28 bg-white border-t border-border overflow-hidden"
    >
      <BackgroundPattern />

      <motion.div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(65,157,240,0.3), transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <div className="content-container relative z-10 mb-12 md:mb-16">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('partners.subtitle')}
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {t('partners.title')}
          </motion.h2>
          <motion.p
            className="text-body text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('partners.description')}
          </motion.p>
          <PreviewUnderline />
        </motion.div>
      </div>

      <div className="relative z-10 space-y-5 md:space-y-6">
        {[{ items: topItems, dir: 'left' as const, speed: 0.55 }, { items: bottomItems, dir: 'right' as const, speed: 0.48 }].map((row, rowIndex) => (
          <Marquee
            key={rowIndex}
            items={row.items}
            getItemKey={(partner) => partner.id}
            direction={row.dir}
            speed={row.speed}
            maskEdges
            renderItem={(partner) => {
              const label = isArabic && partner.nameAr ? partner.nameAr : partner.name
              return (
                <div className="px-2 md:px-3" role="listitem">
                  <motion.button
                    type="button"
                    onClick={() => navigate('/partners')}
                    className="group relative cursor-pointer"
                    aria-label={t('partners.partnerAria', { name: label })}
                    whileHover={{ y: -2, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  >
                    <div className="flex items-center gap-3 md:gap-4 h-12 md:h-14 px-5 md:px-6 rounded-full border border-border/70 bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary/70 shrink-0" />
                      <span className="text-sm md:text-[15px] font-semibold text-secondary/80 whitespace-nowrap transition-colors duration-300 group-hover:text-primary">
                        {label}
                      </span>
                    </div>
                  </motion.button>
                </div>
              )
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}

