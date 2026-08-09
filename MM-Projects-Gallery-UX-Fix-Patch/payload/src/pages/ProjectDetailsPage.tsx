import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import { Badge } from '../components/ui/Badge'
import { Icon } from '../components/ui/Icon'
import { ImageLightbox } from '../components/ui/ImageLightbox'
import { ScrollReveal } from '../components/ui/ScrollReveal'

export function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projectId]
  )

  if (!project) return <Navigate to="/gallery" replace />

  const title = isArabic ? project.titleAr ?? project.title : project.title
  const category = isArabic ? project.categoryAr ?? project.category : project.category
  const client = isArabic ? project.clientAr ?? project.client : project.client
  const consultant = isArabic ? project.consultantAr ?? project.consultant : project.consultant
  const value = isArabic ? project.valueAr ?? project.value : project.value
  const scope = isArabic ? project.scopeAr ?? project.scope : project.scope
  const completion = isArabic
    ? project.completionDateAr ?? project.completionDate
    : project.completionDate

  const lightboxImages = project.images.map((src, index) => ({
    src,
    alt: `${title} ${t('gallery.photoNumber', { number: index + 1 })}`,
    title,
  }))

  const details = [
    { icon: 'Building', label: t('projectPortfolio.client'), value: client },
    { icon: 'UserRound', label: t('projectPortfolio.consultant'), value: consultant },
    { icon: 'BadgeDollarSign', label: t('projectPortfolio.worksValue'), value },
    { icon: 'ClipboardCheck', label: t('projectPortfolio.scope'), value: scope },
    { icon: 'Calendar', label: t('projectPortfolio.completion'), value: completion },
  ].filter((item) => item.value)

  return (
    <main className="pt-24 pb-24 bg-white min-h-screen">
      <section className="border-b border-border bg-section/60">
        <div className="content-container py-8 md:py-12">
          <Link
            to="/gallery"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary"
          >
            <Icon name={isArabic ? 'ArrowRight' : 'ArrowLeft'} size={17} />
            {t('gallery.backToGallery')}
          </Link>

          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
                  {category}
                </span>
                <Badge variant={project.status === 'completed' ? 'primary' : 'accent'}>
                  {project.status === 'completed'
                    ? t('featuredProjects.completed')
                    : t('featuredProjects.ongoing')}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-title">
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted">
              <Icon name="Images" size={18} className="text-primary" />
              <span>{project.images.length} {t('gallery.projectPhotos')}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="content-container pt-10 md:pt-14">
        <ScrollReveal>
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="group relative block w-full overflow-hidden rounded-3xl bg-surface text-start shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t('projectPortfolio.openGallery', { project: title })}
          >
            <div className="aspect-[16/8] min-h-[300px] md:min-h-[430px]">
              <img
                src={project.image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span className="absolute bottom-5 end-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
              <Icon name="Expand" size={17} />
              {t('gallery.openPhotos')}
            </span>
          </button>
        </ScrollReveal>

        <div className="grid gap-10 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <ScrollReveal>
            <section>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                {t('gallery.projectInformation')}
              </p>
              <h2 className="mb-7 text-2xl md:text-3xl font-extrabold text-title">
                {t('gallery.projectDetails')}
              </h2>

              <dl className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
                {details.map((detail) => (
                  <div key={detail.label} className="grid grid-cols-[44px_1fr] gap-3 p-5 md:p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                      <Icon name={detail.icon} size={19} />
                    </span>
                    <div>
                      <dt className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                        {detail.label}
                      </dt>
                      <dd className="font-bold leading-relaxed text-title">{detail.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <section>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                {t('gallery.visualRecord')}
              </p>
              <h2 className="mb-7 text-2xl md:text-3xl font-extrabold text-title">
                {t('gallery.projectGallery')}
              </h2>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {project.images.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className={`group relative overflow-hidden rounded-2xl bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      index === 0 ? 'col-span-2 aspect-[16/8]' : 'aspect-[4/3]'
                    }`}
                    aria-label={t('projectPortfolio.openPhoto', { number: index + 1, project: title })}
                  >
                    <img
                      src={src}
                      alt={`${title} ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                  </button>
                ))}
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </main>
  )
}
