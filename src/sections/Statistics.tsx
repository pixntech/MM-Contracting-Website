import { useTranslation } from 'react-i18next'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { StatsCounter } from '../components/ui/StatsCounter'
import { companyStats } from '../data/stats'

const statLabelKeys: Record<string, string> = {
  'Years of Excellence': 'statistics.years',
  'Projects Delivered': 'statistics.projects',
  'Skilled Professionals': 'statistics.professionals',
  'Countries Worldwide': 'statistics.countries',
}

export function Statistics() {
  const { t } = useTranslation()

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1541888946425-d81bb4b88d9b?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-[#0D2B45]/95" />

      <div className="content-container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {companyStats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <span className="block text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-3">
                  <StatsCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-white/70 text-base md:text-lg font-medium">
                  {t(statLabelKeys[stat.label] || stat.label)}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
