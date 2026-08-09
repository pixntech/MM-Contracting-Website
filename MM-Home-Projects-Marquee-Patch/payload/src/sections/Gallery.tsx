import { useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Marquee } from '../components/ui/Marquee'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { projects } from '../data/projects'

function PreviewUnderline() {
  return (
    <motion.div
      className="mx-auto mt-4 h-[3px] rounded-full bg-primary"
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 80, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    />
  )
}

export function Gallery() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const isArabic = i18n.language === 'ar'

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.5, 1, 1, 0.5]
  )

  const topRow = useMemo(() => projects.filter((_, index) => index % 2 === 0), [])
  const bottomRow = useMemo(() => projects.filter((_, index) => index % 2 === 1), [])

  const renderProject = (project: (typeof projects)[number], index: number) => {
    const title = isArabic ? project.titleAr ?? project.title : project.title
    const category = isArabic ? project.categoryAr ?? project.category : project.category
    const floatDuration = 4 + (index % 4) * 0.45
    const floatDelay = (index % 4) * 0.18

    return (
      <div
        className="group cursor-pointer px-2 md:px-3"
        onClick={() => navigate('/gallery')}
        role="listitem"
        aria-label={t('gallery.openProject', { project: title })}
      >
        <motion.article
          className="relative w-[280px] overflow-hidden rounded-2xl bg-surface shadow-sm sm:w-[320px] md:w-[360px]"
          style={{ aspectRatio: '4 / 3' }}
          whileHover={{ y: -5, scale: 1.015 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        >
          <div
            className="h-full w-full"
            style={{
              animation: `float-gentle ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
            }}
          >
            <img
              src={project.image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <span className="mb-2 inline-flex rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-md">
              {category}
            </span>
            <div className="flex items-end justify-between gap-4">
              <h3 className="max-w-[82%] whitespace-normal text-base font-bold leading-snug text-white md:text-lg">
                {title}
              </h3>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white/20">
                <Icon name={isArabic ? 'ArrowLeft' : 'ArrowRight'} size={18} />
              </span>
            </div>
          </div>
        </motion.article>
      </div>
    )
  }

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity }}
      id="gallery"
      className="relative overflow-hidden bg-section py-20 md:py-28"
    >
      <div className="content-container relative z-10 mb-10 md:mb-14">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('gallery.subtitle')}
          </motion.span>
          <motion.h2
            className="mb-4 text-3xl font-extrabold text-title md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {t('gallery.title')}
          </motion.h2>
          <p className="mx-auto max-w-xl leading-relaxed text-muted">
            {t('gallery.homeDescription')}
          </p>
          <PreviewUnderline />
        </motion.div>
      </div>

      <div className="relative z-10 space-y-5 md:space-y-7">
        <Marquee
          items={topRow}
          getItemKey={(project) => project.id}
          renderItem={renderProject}
          direction="left"
          speed={0.7}
          maskEdges
        />

        <Marquee
          items={bottomRow}
          getItemKey={(project) => project.id}
          renderItem={renderProject}
          direction="right"
          speed={0.5}
          maskEdges
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-10 mt-12 text-center"
      >
        <Button to="/gallery" variant="outline" size="lg">
          {t('gallery.viewAllProjects')}
          <Icon name={isArabic ? 'ArrowLeft' : 'ArrowRight'} size={20} />
        </Button>
      </motion.div>
    </motion.section>
  )
}
