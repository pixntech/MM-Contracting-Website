import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Card } from '../components/ui/Card'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { whyChooseUs } from '../data/whyChooseUs'

export function WhyChooseUs() {
  const { t } = useTranslation()

  return (
    <section className="py-24 md:py-32 bg-section">
      <div className="content-container">
        <SectionTitle
          subtitle={t('whyChooseUs.subtitle')}
          title={t('whyChooseUs.title')}
          description={t('whyChooseUs.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1}>
              <Card hover padding="lg" className="h-full">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon name={item.icon} size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-title mb-3">
                  {t(`whyChooseUs.${item.id}.title`)}
                </h3>
                <p className="text-body leading-relaxed">{t(`whyChooseUs.${item.id}.description`)}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
