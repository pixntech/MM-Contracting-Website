import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Badge } from '../components/ui/Badge'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { newsItems } from '../data/news'

export function LatestNews() {
  const { t } = useTranslation()

  return (
    <section id="news" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <SectionTitle
          subtitle={t('news.subtitle')}
          title={t('news.title')}
          description={t('news.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.slice(0, 3).map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1}>
              <article className="group cursor-pointer">
                <div className="relative h-56 rounded-xl overflow-hidden mb-5">
                  <img
                    src={item.image}
                    alt={t(`news.items.${item.id}.title`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary">{t(`news.items.${item.id}.category`)}</Badge>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-title mb-2 group-hover:text-primary transition-colors leading-snug">
                  {t(`news.items.${item.id}.title`)}
                </h3>
                <p className="text-body text-sm leading-relaxed line-clamp-2">
                  {t(`news.items.${item.id}.excerpt`)}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Button variant="outline" size="lg">
            {t('news.viewAll')}
            <Icon name="ArrowRight" size={20} />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
