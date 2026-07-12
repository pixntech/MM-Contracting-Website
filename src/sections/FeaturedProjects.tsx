import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Badge } from '../components/ui/Badge'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'

export function FeaturedProjects() {
  const { t, i18n } = useTranslation()
  const [projects, setProjects] = useState<any[]>([])
  const lang = i18n.language

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(r => r.json())
      .then(data => setProjects(data))
      .catch(() => setProjects([]))
  }, [])

  if (projects.length === 0) return null

  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <SectionTitle
          subtitle={t('featuredProjects.subtitle')}
          title={t('featuredProjects.title')}
          description={t('featuredProjects.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <ScrollReveal key={project._id || project.id} delay={index * 0.1}>
              <article className="group cursor-pointer">
                <div className="relative h-72 rounded-xl overflow-hidden mb-5">
                  <img
                    src={project.images?.[0] || project.image || ''}
                    alt={lang === 'ar' ? project.title_ar || project.title : project.title_en || project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-3 start-3">
                    <Badge variant={project.status === 'completed' ? 'primary' : 'accent'}>
                      {project.status === 'completed' ? t('featuredProjects.completed') : t('featuredProjects.ongoing')}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 start-3 end-3">
                    <p className="text-white/80 text-sm font-medium">
                      {lang === 'ar' ? project.location_ar || project.location : project.location_en || project.location || ''}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-title mb-2 group-hover:text-primary transition-colors">
                  {lang === 'ar' ? project.title_ar || project.title : project.title_en || project.title}
                </h3>
                <p className="text-muted text-sm mb-2">
                  {lang === 'ar' ? project.category_ar || project.category : project.category_en || project.category}
                </p>
                <p className="text-body leading-relaxed line-clamp-2">
                  {lang === 'ar' ? project.description_ar || project.description : project.description_en || project.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-16">
          <Button href="/gallery" variant="outline" size="lg">
            {t('featuredProjects.viewAll')}
            <Icon name="ArrowRight" size={20} />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
