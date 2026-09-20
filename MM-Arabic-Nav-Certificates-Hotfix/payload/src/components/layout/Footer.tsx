import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { COMPANY, getDirectionsUrl } from '../../constants'
import { mainNavigation } from '../../data/navigation'
import { services } from '../../data/services'
import { Icon } from '../ui/Icon'
import { ScrollReveal } from '../ui/ScrollReveal'

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const navKeyMap: Record<string, string> = {
    'Home': 'nav.home',
    'About': 'nav.about',
    'Services': 'nav.services',
    'Projects': 'nav.projects',
    'Industries': 'nav.industries',
    'News': 'nav.news',
    'Certificates': 'nav.certificates',
    'Partners': 'nav.partners',
    'Gallery': 'nav.gallery',
    'Contact': 'nav.contact',
  }

  return (
    <footer className="bg-secondary text-white">
      <div className="content-container pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <ScrollReveal delay={0}>
            <div>
              <Link to="/" className="inline-flex mb-6">
                <img src="/Logo.png" alt={t('header.altLogo')} className="h-10 w-auto object-contain" />
              </Link>
              <p className="text-white/60 leading-relaxed mb-6">
                {t('company.description')}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white/80 hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon name="Phone" size={16} />
                  {COMPANY.phone}
                </a>
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white/80 hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon name="MapPin" size={16} />
                  {t('contact.getDirections')}
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="text-lg font-bold mb-6" style={{color:"white"}}>{t('footer.quickLinks')}</h3>
              <ul className="space-y-3">
                {mainNavigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {t(navKeyMap[link.label] || link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="text-lg font-bold mb-6" style={{color:"white"}}>{t('footer.ourServices')}</h3>
              <ul className="space-y-3">
                {services.slice(0, 5).map((service) => (
                  <li key={service.id}>
                    <Link
                      to="/#services"
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {t(`services.${service.id}.title`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div>
              <h3 className="text-lg font-bold mb-6" style={{color:"white"}}>{t('footer.contactUs')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Icon name="MapPin" size={18} className="text-primary mt-1 shrink-0" />
                  <a
                    href={getDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {t('company.address')}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="Phone" size={18} className="text-primary shrink-0" />
                  <a
                    href={`tel:${COMPANY.phoneHref}`}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {COMPANY.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="Mail" size={18} className="text-primary shrink-0" />
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {COMPANY.email}
                  </a>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-white/40 text-sm text-center md:text-start">
            {currentYear} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
