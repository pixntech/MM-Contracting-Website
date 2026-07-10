import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { services } from '../data/services'

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="py-24 md:py-32 bg-section">
      <div className="content-container">
        <SectionTitle
          subtitle={t('services.subtitle')}
          title={t('services.title')}
          description={t('services.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.1}>
              <Card hover padding="none" className="h-full group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={t(`services.${service.id}.title`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 start-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon
                      name={service.icon}
                      size={24}
                      className="text-white"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-title mb-3">
                    {t(`services.${service.id}.title`)}
                  </h3>
                  <p className="text-body mb-4 leading-relaxed">
                    {t(`services.${service.id}.description`)}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {(t(`services.${service.id}.features`, { returnObjects: true }) as string[]).slice(0, 4).map((feature: string) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <Icon
                          name="Check"
                          size={14}
                          className="text-primary shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" size="sm">
                    {t('services.learnMore')}
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
