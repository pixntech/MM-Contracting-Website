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
        <pattern id="partnersCross" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
          <circle cx="80" cy="80" r="2" fill="#419DF0" opacity="0.015" />
          <path d="M 80 60 L 80 100 M 60 80 L 100 80" fill="none" stroke="#419DF0" strokeWidth="0.3" opacity="0.02" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#partnersGrid)" />
      <rect width="100%" height="100%" fill="url(#partnersDots)" />
      <rect width="100%" height="100%" fill="url(#partnersCross)" />
    </svg>
  )
}

function LogoPlaceholder({ name, index }: { name: string; index: number }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 3)
  const hue = (index * 47 + 210) % 360
  return (
    <div
      className="flex items-center justify-center w-full h-full rounded-xl"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 20%, 96%), hsl(${hue + 30}, 15%, 92%))`,
      }}
    >
      <span
        className="text-lg font-bold tracking-wider select-none"
        style={{ color: `hsl(${hue}, 30%, 45%)` }}
      >
        {initials}
      </span>
    </div>
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
  const { t } = useTranslation()
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.5, 1, 1, 0.5]
  )

  const shuffled = useMemo(
    () => [...partners].sort((a, b) => a.order - b.order),
    []
  )

  const topItems = shuffled.slice(0, Math.ceil(shuffled.length / 2))
  const bottomItems = shuffled.slice(Math.ceil(shuffled.length / 2))

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      className="relative py-20 md:py-28 bg-white border-t border-border overflow-hidden"
    >
      <BackgroundPattern />

      <motion.div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(65,157,240,0.3), transparent)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <div className="content-container relative z-10 mb-12 md:mb-16">
        <motion.div
          className="text-center max-w-2xl mx-auto"
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
          <PreviewUnderline />
        </motion.div>
      </div>

      <div className="relative z-10 space-y-8 md:space-y-10">
        <Marquee
          items={topItems}
          getItemKey={(p) => p.id}
          renderItem={(partner, idx) => {
            const floatDur = 3 + (idx % 5) * 0.4
            const floatDelay = (idx % 5) * 0.3
            return (
              <div className="px-2 md:px-3" role="listitem">
                <motion.button
                  onClick={() => navigate('/partners')}
                  className="group relative cursor-pointer"
                  aria-label={t('partners.partnerAria', { name: partner.name })}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ animation: `float ${floatDur}s ease-in-out ${floatDelay}s infinite` }}
                >
                  <div
                    className="flex items-center gap-3 md:gap-4 h-14 md:h-16 px-5 md:px-6 rounded-xl border transition-all duration-500"
                    style={{
                      width: '210px',
                      background: 'rgba(248,250,252,0.7)',
                      borderColor: 'rgba(229,231,235,0.6)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-sm">
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" loading="lazy" />
                      ) : (
                        <LogoPlaceholder name={partner.name} index={idx} />
                      )}
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-secondary/70 leading-tight transition-colors duration-300 group-hover:text-primary">
                      {partner.name}
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(65,157,240,0.08), transparent 70%)',
                      boxShadow: '0 0 30px rgba(65,157,240,0.08)',
                    }}
                  />
                </motion.button>
              </div>
            )
          }}
          direction="left"
          speed={0.6}
          maskEdges
        />

        <Marquee
          items={bottomItems}
          getItemKey={(p) => p.id}
          renderItem={(partner, idx) => {
            const floatDur = 3 + (idx % 4) * 0.5
            const floatDelay = (idx % 4) * 0.25
            return (
              <div className="px-2 md:px-3" role="listitem">
                <motion.button
                  onClick={() => navigate('/partners')}
                  className="group relative cursor-pointer"
                  aria-label={t('partners.partnerAria', { name: partner.name })}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ animation: `float ${floatDur}s ease-in-out ${floatDelay}s infinite` }}
                >
                  <div
                    className="flex items-center gap-3 md:gap-4 h-14 md:h-16 px-5 md:px-6 rounded-xl border transition-all duration-500"
                    style={{
                      width: '210px',
                      background: 'rgba(248,250,252,0.7)',
                      borderColor: 'rgba(229,231,235,0.6)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-sm">
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" loading="lazy" />
                      ) : (
                        <LogoPlaceholder name={partner.name} index={idx + topItems.length} />
                      )}
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-secondary/70 leading-tight transition-colors duration-300 group-hover:text-primary">
                      {partner.name}
                    </span>
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(65,157,240,0.08), transparent 70%)',
                      boxShadow: '0 0 30px rgba(65,157,240,0.08)',
                    }}
                  />
                </motion.button>
              </div>
            )
          }}
          direction="right"
          speed={0.45}
          maskEdges
        />
      </div>
    </motion.section>
  )
}
