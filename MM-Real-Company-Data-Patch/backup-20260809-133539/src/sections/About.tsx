import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { COMPANY } from '../constants'

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                  alt={t('about.altImage')}
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -end-6 bg-primary text-white p-6 rounded-xl hidden md:block">
                <span className="text-4xl font-extrabold block">{COMPANY.projectsDelivered}+</span>
                <span className="text-sm font-medium text-white/80">{t('about.projectsDelivered')}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <SectionTitle
              subtitle={t('about.subtitle')}
              title={t('about.title')}
              description=""
              align="left"
              className="mb-0"
            />
            <p className="text-body text-lg leading-relaxed mb-6">
              {t('about.description1', { year: COMPANY.founded })}
            </p>
            <p className="text-body text-lg leading-relaxed mb-8">
              {t('about.description2', { employees: COMPANY.employees, projectsDelivered: COMPANY.projectsDelivered, countries: COMPANY.employees })}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-s-4 border-primary ps-4">
                <span className="text-3xl font-extrabold text-title">27+</span>
                <p className="text-muted text-sm mt-1">{t('about.yearsExperience')}</p>
              </div>
              <div className="border-s-4 border-accent ps-4">
                <span className="text-3xl font-extrabold text-title">25+</span>
                <p className="text-muted text-sm mt-1">{t('about.countries')}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
