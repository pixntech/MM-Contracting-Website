import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { projects } from '../data/projects'

export function Gallery() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const previewProjects = useMemo(() => projects.slice(0, 6), [])

  return (
    <section id="gallery" className="relative overflow-hidden bg-section py-20 md:py-28">
      <div className="content-container">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {t('gallery.subtitle')}
          </span>
          <h2 className="mb-4 text-3xl font-extrabold text-title md:text-4xl lg:text-5xl">
            {t('gallery.title')}
          </h2>
          <p className="mx-auto max-w-xl leading-relaxed text-muted">
            {t('gallery.homeDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {previewProjects.map((project, index) => {
            const title = isArabic ? project.titleAr ?? project.title : project.title
            const category = isArabic ? project.categoryAr ?? project.category : project.category

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24) }}
              >
                <Link
                  to={`/gallery/${project.id}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <img
                    src={project.image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                      {category}
                    </p>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="text-lg font-bold leading-snug text-white md:text-xl">{title}</h3>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform group-hover:scale-110">
                        <Icon name={isArabic ? 'ArrowLeft' : 'ArrowRight'} size={18} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Button to="/gallery" variant="outline" size="lg">
            {t('gallery.viewAllProjects')}
            <Icon name={isArabic ? 'ArrowLeft' : 'ArrowRight'} size={20} />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
