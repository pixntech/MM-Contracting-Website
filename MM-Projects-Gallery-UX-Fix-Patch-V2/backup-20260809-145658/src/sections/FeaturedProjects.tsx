import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { projects } from '../data/projects'

const categoryConfig = [
  { key: 'industrial', label: 'Industrial Buildings', icon: 'Factory' },
  { key: 'educational', label: 'Educational Buildings', icon: 'Building' },
  { key: 'residential', label: 'Residential Buildings', icon: 'Building2' },
  { key: 'commercial', label: 'Commercial & Administrative Buildings', icon: 'Store' },
]

const projectTranslationKeys: Record<string, string> = {
  'mmk-pack-factory': 'mmkPackFactory',
  'palm-hills-dates-factory': 'palmHillsDatesFactory',
  'mansoura-azhar-institute': 'mansouraAzharInstitute',
  'luxor-azhar-institute': 'luxorAzharInstitute',
  'hadaek-el-asema': 'hadaekElAsema',
  'rivan-compound': 'rivanCompound',
  'rivan-tower': 'rivanTower',
  'rivan-square': 'rivanSquare',
  'altameer-arabian-sales-office': 'altameerArabianSalesOffice',
}

export function FeaturedProjects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <SectionTitle
          subtitle={t('featuredProjects.subtitle')}
          title={t('featuredProjects.title')}
          description={t('featuredProjects.description')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          <ScrollReveal className="lg:col-span-7">
            <div className="h-full rounded-3xl border border-border bg-surface p-6 md:p-8">
              <div className="flex items-start gap-4 mb-7">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon name="Building2" size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-[0.16em] mb-2">
                    {t('featuredProjects.profileLabel')}
                  </p>
                  <p className="text-body leading-relaxed max-w-2xl">
                    {t('featuredProjects.profileStatement')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <figure className="rounded-2xl overflow-hidden bg-white border border-border">
                  <img
                    src="/projects/building-site-works.webp"
                    alt={t('featuredProjects.siteImageAlt')}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                  <figcaption className="px-4 py-3 text-sm font-medium text-body">
                    {t('featuredProjects.siteImageCaption')}
                  </figcaption>
                </figure>
                <figure className="rounded-2xl overflow-hidden bg-white border border-border">
                  <img
                    src="/projects/mmk-pack-factory.webp"
                    alt={t('featuredProjects.factoryImageAlt')}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                  <figcaption className="px-4 py-3 text-sm font-medium text-body">
                    {t('featuredProjects.factoryImageCaption')}
                  </figcaption>
                </figure>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-5" delay={0.1}>
            <div className="h-full rounded-3xl bg-title text-white p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-primary-light text-sm font-semibold uppercase tracking-[0.16em] mb-3">
                  {t('featuredProjects.portfolioLabel')}
                </p>
                <p className="text-4xl md:text-5xl font-extrabold mb-3">9</p>
                <p className="text-white/70 leading-relaxed">
                  {t('featuredProjects.portfolioSummary')}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {categoryConfig.map((category) => (
                  <div key={category.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Icon name={category.icon} size={20} className="text-primary-light mb-3" />
                    <p className="text-sm font-semibold leading-snug">
                      {t(`featuredProjects.categories.${category.key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categoryConfig.map((category, categoryIndex) => {
            const categoryProjects = projects.filter((project) => project.category === category.label)
            return (
              <ScrollReveal key={category.key} delay={categoryIndex * 0.06}>
                <article className="h-full rounded-2xl border border-border bg-white p-6 md:p-7 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon name={category.icon} size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-title">
                        {t(`featuredProjects.categories.${category.key}`)}
                      </h3>
                      <p className="text-xs text-muted mt-0.5">
                        {categoryProjects.length} {t('featuredProjects.projectsCount')}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {categoryProjects.map((project) => {
                      const key = projectTranslationKeys[project.id]
                      return (
                        <li key={project.id} className="flex items-start gap-3 text-body">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="font-medium leading-relaxed">
                            {key ? t(`projects.${key}.title`) : project.title}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </article>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Button href="/gallery" variant="outline" size="lg">
            {t('featuredProjects.viewAll')}
            <Icon name="ArrowRight" size={20} />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
