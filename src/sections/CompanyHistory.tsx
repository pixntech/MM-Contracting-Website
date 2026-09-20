import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { CheckpointNode } from '../components/ui/CheckpointNode'
import { Icon } from '../components/ui/Icon'
import { JourneyRoad } from '../components/ui/JourneyRoad'
import { MILESTONE_COORDS } from '../data/journeyRoad'
import { projects } from '../data/projects'
import type { Project } from '../types'

const TIMELINE_ORDER = [
  'mmk-pack-factory',
  'altameer-arabian-sales-office',
  'luxor-azhar-institute',
  'palm-hills-factory',
  'hadaek-el-asema',
  'rivan-compound',
  'rivan-square',
  'rivan-tower',
  'mansoura-azhar-institute',
]

const timelineProjects = TIMELINE_ORDER
  .map((id) => projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project))

function BackgroundPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id="bpGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#419DF0" strokeWidth="0.4" opacity="0.04" />
        </pattern>
        <pattern id="bpDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="1" fill="#419DF0" opacity="0.035" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bpGrid)" />
      <rect width="100%" height="100%" fill="url(#bpDots)" />
    </svg>
  )
}

interface TimelineProjectCardProps {
  project: Project
  side: 'left' | 'right'
  isActive: boolean
  index: number
}

function TimelineProjectCard({ project, side, isActive, index }: TimelineProjectCardProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')
  const title = isArabic ? project.titleAr || project.title : project.title
  const category = isArabic ? project.categoryAr || project.category : project.category
  const client = isArabic ? project.clientAr || project.client : project.client
  const scope = isArabic ? project.scopeAr || project.scope : project.scope
  const value = isArabic ? project.valueAr || project.value : project.value
  const completionDate = isArabic
    ? project.completionDateAr || project.completionDate
    : project.completionDate

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.04, 0.24),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`${side === 'right' ? 'md:text-end' : ''}`}
    >
      <Link
        to={`/gallery/${project.id}`}
        className={`group block overflow-hidden rounded-2xl border bg-white transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          isActive
            ? 'border-primary/15 shadow-[0_12px_36px_rgba(65,157,240,0.10)]'
            : 'border-border/60 shadow-sm hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl'
        }`}
        aria-label={`${t('history.viewProject')}: ${title}`}
      >
        <div className="relative h-40 overflow-hidden md:h-48">
          <img
            src={project.image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
            <span className="rounded-full border border-white/20 bg-slate-950/35 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              {category}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold backdrop-blur-md ${
                project.status === 'ongoing'
                  ? 'bg-amber-400/90 text-amber-950'
                  : 'bg-emerald-500/90 text-white'
              }`}
            >
              {project.status === 'ongoing' ? t('history.ongoing') : t('history.completed')}
            </span>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {completionDate}
              </p>
              <h3 className="text-lg font-bold leading-snug text-title md:text-xl">
                {title}
              </h3>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Icon name="Building2" size={19} />
            </div>
          </div>

          <div className="space-y-2 border-t border-border/60 pt-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="text-muted">{t('history.client')}</span>
              <span className="text-end font-semibold text-body">{client}</span>
            </div>
            {scope && (
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted">{t('history.scope')}</span>
                <span className="text-end font-semibold text-body">{scope}</span>
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <span className="text-muted">{t('history.worksValue')}</span>
              <span className="text-end font-semibold text-primary">{value}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-sm font-semibold text-primary">
            <span>{t('history.viewProject')}</span>
            <Icon
              name={isArabic ? 'ArrowLeft' : 'ArrowRight'}
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export function CompanyHistory() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const roadProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const observers = rowRefs.current.map((ref, i) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex((prev) => Math.max(prev, i))
          }
        },
        { threshold: 0.3, rootMargin: '-60px 0px' }
      )
      observer.observe(ref)
      return observer
    })

    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  return (
    <section
      id="history"
      className="relative overflow-hidden bg-section py-16 md:py-32"
      ref={containerRef}
    >
      <BackgroundPattern />

      <div className="content-container relative z-10 mb-10 md:mb-16">
        <SectionTitle
          subtitle={t('history.subtitle')}
          title={t('history.title')}
          description={t('history.description')}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="absolute inset-0 z-0 hidden md:block">
          <JourneyRoad progress={roadProgress} className="h-full w-full" />
        </div>

        <div className="relative z-10">
          {timelineProjects.map((project, index) => {
            const coord = MILESTONE_COORDS[index]
            const isActive = index <= activeIndex
            const isLeft = coord.x < 100

            return (
              <div
                key={project.id}
                ref={(element) => {
                  rowRefs.current[index] = element
                }}
                className="relative"
              >
                <div className="relative hidden min-h-[390px] items-start md:flex">
                  <div
                    className="absolute top-1/2 z-20 -translate-y-1/2"
                    style={{ left: `${(coord.x / 200) * 100}%` }}
                  >
                    <CheckpointNode active={isActive} index={index} />
                  </div>

                  {isLeft ? (
                    <div
                      className="w-[39%]"
                      style={{ marginInlineStart: `${(coord.x / 200) * 100 + 5}%` }}
                    >
                      <TimelineProjectCard
                        project={project}
                        side="left"
                        isActive={isActive}
                        index={index}
                      />
                    </div>
                  ) : (
                    <div
                      className="ms-auto w-[39%]"
                      style={{ marginInlineEnd: `${(200 - coord.x) / 2 + 5}%` }}
                    >
                      <TimelineProjectCard
                        project={project}
                        side="right"
                        isActive={isActive}
                        index={index}
                      />
                    </div>
                  )}
                </div>

                <div className="md:hidden">
                  <div className="flex gap-4">
                    <div className="flex w-10 shrink-0 flex-col items-center">
                      <div className="pt-3">
                        <CheckpointNode active={isActive} index={index} />
                      </div>
                      {index < timelineProjects.length - 1 && (
                        <div
                          className={`min-h-[24px] w-[2px] flex-1 transition-colors duration-700 ${
                            index < activeIndex ? 'bg-primary' : 'bg-border/60'
                          }`}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 pb-6">
                      <TimelineProjectCard
                        project={project}
                        side="left"
                        isActive={isActive}
                        index={index}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
