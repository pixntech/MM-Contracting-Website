import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Badge } from '../components/ui/Badge'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { projects } from '../data/projects'

const projectTranslationKeys: Record<string, string> = {
  'al-noor-tower': 'alNoorTower',
  'pearl-residences': 'pearlResidences',
  'gulf-highway': 'gulfHighway',
  'green-city': 'greenCity',
  'industrial-park': 'industrialPark',
  'grand-hotel': 'grandHotel',
}

export function FeaturedProjects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <SectionTitle
          subtitle={t('featuredProjects.subtitle')}
          title={t('featuredProjects.title')}
          description={t('featuredProjects.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, index) => {
            const key = projectTranslationKeys[project.id]
            const title = key ? t(`projects.${key}.title`) : project.title
            const category = key ? t(`projects.${key}.category`) : project.category
            const location = key ? t(`projects.${key}.location`) : project.location
            const description = key ? t(`projects.${key}.description`) : project.description

            return (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <article className="group cursor-pointer">
                  <div className="relative h-72 rounded-xl overflow-hidden mb-5">
                    <img
                      src={project.images?.[0] || project.image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 start-3">
                      <Badge variant={project.status === 'completed' ? 'primary' : 'accent'}>
                        {project.status === 'completed'
                          ? t('featuredProjects.completed')
                          : t('featuredProjects.ongoing')}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 start-3 end-3">
                      <p className="text-white/80 text-sm font-medium">{location}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-title mb-2 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted text-sm mb-2">{category}</p>
                  <p className="text-body leading-relaxed line-clamp-2">{description}</p>
                </article>
              </ScrollReveal>
            )
          })}
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
