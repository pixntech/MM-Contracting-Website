import { useTranslation } from 'react-i18next'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'

export function VisionMission() {
  const { t } = useTranslation()

  return (
    <section className="py-24 md:py-32 bg-section">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <ScrollReveal direction="left">
            <div className="bg-white p-10 lg:p-14 rounded-xl border border-border h-full">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-8">
                <Icon name="Eye" size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-title mb-6">
                {t('visionMission.visionTitle')}
              </h3>
              <p className="text-body text-lg leading-relaxed">
                {t('visionMission.visionDescription')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bg-white p-10 lg:p-14 rounded-xl border border-border h-full">
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-8">
                <Icon name="Target" size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-title mb-6">
                {t('visionMission.missionTitle')}
              </h3>
              <p className="text-body text-lg leading-relaxed">
                {t('visionMission.missionDescription')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
