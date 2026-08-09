import { useTranslation } from 'react-i18next'
import { Icon } from '../components/ui/Icon'
import { COMPANY, getDirectionsUrl, getMapEmbedUrl } from '../constants'

export function Map() {
  const { t } = useTranslation()

  return (
    <section className="bg-section pb-24 md:pb-32">
      <div className="content-container">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-white min-h-[420px] md:min-h-[500px]">
          <iframe
            title={t('map.title')}
            src={getMapEmbedUrl()}
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-secondary/25 via-transparent to-transparent pointer-events-none" />

          <div className="absolute z-20 start-5 end-5 bottom-5 md:start-8 md:end-auto md:bottom-8 md:w-[420px] rounded-2xl bg-white/95 backdrop-blur-md border border-white/70 p-5 md:p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name="MapPin" size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary mb-1">{t('map.officeLabel')}</p>
                <h3 className="text-xl font-bold text-title mb-2">{COMPANY.name}</h3>
                <p className="text-body text-sm leading-relaxed">{COMPANY.address}</p>
              </div>
            </div>

            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3 font-semibold text-white hover:bg-primary transition-colors"
              aria-label={t('map.openDirectionsAria')}
            >
              <Icon name="MapPin" size={18} />
              {t('map.getDirections')}
              <Icon name="ArrowUpRight" size={17} />
            </a>
            <p className="mt-3 text-xs text-muted text-center">{t('map.clickHint')}</p>
          </div>

          <a
            href={getDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute z-10 inset-0"
            aria-label={t('map.openDirectionsAria')}
          >
            <span className="sr-only">{t('map.getDirections')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
