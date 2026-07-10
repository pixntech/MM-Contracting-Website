import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { industries } from '../data/industries'

export function Industries() {
  const { t } = useTranslation()

  return (
    <section id="industries" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <SectionTitle
          subtitle={t('industries.subtitle')}
          title={t('industries.title')}
          description={t('industries.description')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <ScrollReveal key={industry.id} delay={index * 0.1}>
              <article className="group relative h-80 rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={industry.image}
                  alt={t(`industries.${industry.id}.title`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B45]/95 via-[#0D2B45]/40 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                    <Icon
                      name={industry.icon}
                      size={24}
                      className="text-white"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t(`industries.${industry.id}.title`)}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t(`industries.${industry.id}.description`)}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
