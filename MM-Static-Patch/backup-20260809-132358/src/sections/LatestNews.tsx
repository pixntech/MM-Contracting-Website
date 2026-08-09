import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Badge } from '../components/ui/Badge'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'

export function LatestNews() {
  const { t, i18n } = useTranslation()
  const [news, setNews] = useState<any[]>([])
  const lang = i18n.language

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(r => r.json())
      .then(data => setNews(data))
      .catch(() => setNews([]))
  }, [])

  if (news.length === 0) return null

  return (
    <section id="news" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <SectionTitle
          subtitle={t('news.subtitle')}
          title={t('news.title')}
          description={t('news.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(0, 3).map((item, index) => (
            <ScrollReveal key={item._id || item.id} delay={index * 0.1}>
              <article className="group cursor-pointer">
                <div className="relative h-56 rounded-xl overflow-hidden mb-5">
                  <img
                    src={item.image || ''}
                    alt={lang === 'ar' ? item.title_ar || item.title : item.title_en || item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary">
                    {lang === 'ar' ? item.category_ar || item.category : item.category_en || item.category}
                  </Badge>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {item.date || ''}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-title mb-2 group-hover:text-primary transition-colors leading-snug">
                  {lang === 'ar' ? item.title_ar || item.title : item.title_en || item.title}
                </h3>
                <p className="text-body text-sm leading-relaxed line-clamp-2">
                  {lang === 'ar' ? item.excerpt_ar || item.excerpt : item.excerpt_en || item.excerpt}
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
