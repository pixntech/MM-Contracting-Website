import { lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { partners } from '../data/partners'

const SectionTitle = lazy(() =>
  import('../components/ui/SectionTitle').then((m) => ({ default: m.SectionTitle }))
)
const ScrollReveal = lazy(() =>
  import('../components/ui/ScrollReveal').then((m) => ({ default: m.ScrollReveal }))
)

export function PartnersPage() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.resolvedLanguage?.startsWith('ar') ?? false

  const sorted = [...partners].sort((a, b) => a.order - b.order)

  return (
    <div className="pt-28 pb-24">
      <div className="content-container">
        <SectionTitle
          subtitle={t('partners.pageSubtitle')}
          title={t('partners.pageTitle')}
          description={t('partners.description')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {sorted.map((partner, index) => {
            const label = isArabic && partner.nameAr ? partner.nameAr : partner.name

            return (
              <ScrollReveal key={partner.id} delay={index * 0.03}>
                <div className="group h-full rounded-2xl border border-border/70 bg-white px-5 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="mt-0.5 inline-flex h-3 w-3 shrink-0 rounded-full bg-primary/75 shadow-[0_0_0_6px_rgba(65,157,240,0.08)]" />
                    <h3 className="text-base md:text-lg font-bold leading-snug text-title">
                      {label}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </div>
  )
}
