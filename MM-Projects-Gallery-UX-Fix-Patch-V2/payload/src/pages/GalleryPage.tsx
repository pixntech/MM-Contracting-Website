import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Badge } from '../components/ui/Badge'
import { Icon } from '../components/ui/Icon'

const categoryFilters = [
  { id: 'all', category: null },
  { id: 'industrial', category: 'Industrial' },
  { id: 'educational', category: 'Educational' },
  { id: 'residential', category: 'Residential' },
  { id: 'commercial', category: 'Commercial & Administrative' },
] as const

export function GalleryPage() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = useMemo(() => {
    const selected = categoryFilters.find((filter) => filter.id === activeCategory)
    if (!selected?.category) return projects
    return projects.filter((project) => project.category === selected.category)
  }, [activeCategory])

  return (
    <main className="pt-28 pb-24 bg-white min-h-screen">
      <div className="content-container">
        <SectionTitle
          subtitle={t('gallery.subtitle')}
          title={t('gallery.pageTitle')}
          description={t('gallery.description')}
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveCategory(filter.id)}
              aria-pressed={activeCategory === filter.id}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                activeCategory === filter.id
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-body border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5'
              }`}
            >
              {t(`gallery.categories.${filter.id}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filteredProjects.map((project, index) => {
            const title = isArabic ? project.titleAr ?? project.title : project.title
            const category = isArabic ? project.categoryAr ?? project.category : project.category

            return (
              <ScrollReveal key={project.id} delay={Math.min(index * 0.05, 0.25)}>
                <Link
                  to={`/gallery/${project.id}`}
                  className="group block h-full overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={t('gallery.openProject', { project: title })}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    <img
                      src={project.image}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                    <div className="absolute top-4 start-4">
                      <Badge variant={project.status === 'completed' ? 'primary' : 'accent'}>
                        {project.status === 'completed'
                          ? t('featuredProjects.completed')
                          : t('featuredProjects.ongoing')}
                      </Badge>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                        {category}
                      </p>
                      <h2 className="text-xl md:text-2xl font-extrabold leading-snug text-white">
                        {title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Icon name="Images" size={17} className="text-primary" />
                      <span>{project.images.length} {t('gallery.projectPhotos')}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3">
                      {t('gallery.viewProject')}
                      <Icon name={isArabic ? 'ArrowLeft' : 'ArrowRight'} size={17} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-muted py-16">{t('gallery.noProjects')}</p>
        )}
      </div>
    </main>
  )
}
