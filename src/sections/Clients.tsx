import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { clients, testimonials } from '../data/clients'

export function Clients() {
  const { t } = useTranslation()

  return (
    <section className="py-24 md:py-32 bg-section">
      <div className="content-container">
        <SectionTitle
          subtitle={t('clients.subtitle')}
          title={t('clients.title')}
          description={t('clients.description')}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {clients.map((client, index) => (
            <ScrollReveal key={client.id} delay={index * 0.05}>
              <div className="h-20 bg-white rounded-lg border border-border flex items-center justify-center px-4 hover:border-primary/30 transition-colors">
                <span className="text-xs md:text-sm font-semibold text-muted text-center leading-tight">
                  {client.name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <SectionTitle
          subtitle={t('clients.testimonialsSubtitle')}
          title={t('clients.testimonialsTitle')}
          description=""
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-xl border border-border h-full">
                <Icon
                  name="Quote"
                  size={32}
                  className="text-primary/20 mb-6"
                />
                <p className="text-body leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.testimonial}&rdquo;
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-title text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-muted text-xs mt-1">{testimonial.role}</p>
                  <p className="text-muted text-xs">{testimonial.name}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
