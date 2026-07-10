import { useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Marquee } from '../components/ui/Marquee'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { galleryItems } from '../data/gallery'

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

export function Gallery() {
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

  const sorted = useMemo(
    () => [...galleryItems].sort((a, b) => a.order - b.order),
    []
  )

  const topRow = sorted.filter((_, i) => i % 2 === 0)
  const bottomRow = sorted.filter((_, i) => i % 2 === 1)

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
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      id="gallery"
      className="relative py-20 md:py-28 bg-section overflow-hidden"
    >
      <div className="content-container relative z-10 mb-10 md:mb-14">
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
            {t('gallery.subtitle')}
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {t('gallery.title')}
          </motion.h2>
          <PreviewUnderline />
        </motion.div>
      </div>

      <div className="relative z-10 space-y-6 md:space-y-8">
        <Marquee
          items={topRow}
          getItemKey={(item) => item.id}
          renderItem={(item, idx) => {
            const floatDur = 4 + (idx % 4) * 0.5
            const floatDelay = (idx % 4) * 0.2
            const key = itemKeyMap[item.id] || item.id
            return (
              <div
                className="px-2 md:px-3 group cursor-pointer"
                onClick={() => navigate('/gallery')}
                role="listitem"
                aria-label={t(`gallery.items.${key}.title`)}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-sm"
                  style={{
                    width: '320px',
                    aspectRatio: '4/3',
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      animation: `float-gentle ${floatDur}s ease-in-out ${floatDelay}s infinite`,
                    }}
                  >
                    <img
                      src={item.src}
                      alt={t(`gallery.items.${key}.alt`)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <span className="inline-block text-[10px] font-semibold text-white bg-primary/70 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold text-sm leading-snug">
                        {t(`gallery.items.${key}.title`)}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          }}
          direction="left"
          speed={0.7}
          maskEdges
        />

        <Marquee
          items={bottomRow}
          getItemKey={(item) => item.id}
          renderItem={(item, idx) => {
            const floatDur = 4 + (idx % 3) * 0.6
            const floatDelay = (idx % 3) * 0.3
            const key = itemKeyMap[item.id] || item.id
            return (
              <div
                className="px-2 md:px-3 group cursor-pointer"
                onClick={() => navigate('/gallery')}
                role="listitem"
                aria-label={t(`gallery.items.${key}.title`)}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-sm"
                  style={{
                    width: '320px',
                    aspectRatio: '4/3',
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      animation: `float-gentle ${floatDur}s ease-in-out ${floatDelay}s infinite`,
                    }}
                  >
                    <img
                      src={item.src}
                      alt={t(`gallery.items.${key}.alt`)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 inset-x-0 p-5">
                      <span className="inline-block text-[10px] font-semibold text-white bg-primary/70 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="text-white font-bold text-sm leading-snug">
                        {t(`gallery.items.${key}.title`)}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          }}
          direction="right"
          speed={0.5}
          maskEdges
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12 relative z-10"
      >
        <Button to="/gallery" variant="outline" size="lg">
          {t('gallery.viewFull')}
          <Icon name="ArrowRight" size={20} />
        </Button>
      </motion.div>
    </motion.section>
  )
}
