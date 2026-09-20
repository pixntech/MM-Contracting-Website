import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Badge } from '../components/ui/Badge'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { newsItems } from '../data/news'

export function LatestNews() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section id="news" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <SectionTitle
          subtitle={t('news.subtitle')}
          title={t('news.title')}
          description={t('news.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.slice(0, 3).map((item, index) => {
            const translationKey = `news.items.news${index + 1}`
            const title = t(`${translationKey}.title`, { defaultValue: item.title })
            const category = t(`${translationKey}.category`, { defaultValue: item.category })
            const excerpt = t(`${translationKey}.excerpt`, { defaultValue: item.excerpt })

            return (
              <ScrollReveal key={item.id} delay={index * 0.1}>
                <article className="group cursor-pointer">
                  <div className="relative h-56 rounded-xl overflow-hidden mb-5">
                    <img
                      src={item.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary">{category}</Badge>
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-title mb-2 group-hover:text-primary transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed line-clamp-2">{excerpt}</p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => navigate('/gallery')}>
            {t('news.viewAll')}
            <Icon name="ArrowRight" size={20} />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
