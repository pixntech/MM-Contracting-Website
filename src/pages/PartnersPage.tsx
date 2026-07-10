import { lazy, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SectionTitle = lazy(() =>
  import('../components/ui/SectionTitle').then((m) => ({ default: m.SectionTitle }))
)
const ScrollReveal = lazy(() =>
  import('../components/ui/ScrollReveal').then((m) => ({ default: m.ScrollReveal }))
)
const Icon = lazy(() =>
  import('../components/ui/Icon').then((m) => ({ default: m.Icon }))
)

import { partners } from '../data/partners'

const partnerTypes = ['All', 'Strategic Partner', 'Technology Partner', 'Design Partner', 'Supply Partner', 'Joint Venture Partner', 'Consulting Partner', 'Sustainability Partner']

const typeLabelKeys: Record<string, string> = {
  'All': 'partners.all',
  'Strategic Partner': 'partners.strategicPartner',
  'Technology Partner': 'partners.technologyPartner',
  'Design Partner': 'partners.designPartner',
  'Supply Partner': 'partners.supplyPartner',
  'Joint Venture Partner': 'partners.jointVenturePartner',
  'Consulting Partner': 'partners.consultingPartner',
  'Sustainability Partner': 'partners.sustainabilityPartner',
}

function LogoPlaceholder({ name }: { name: string }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 3)
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl">
      <span className="text-lg font-bold text-secondary/40 tracking-wider select-none">{initials}</span>
    </div>
  )
}

export function PartnersPage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? partners
        : partners.filter((p) => p.partnershipType === filter),
    [filter]
  )

  const sorted = [...filtered].sort((a, b) => a.order - b.order)

  return (
    <div className="pt-28 pb-24">
      <div className="content-container">
        <SectionTitle
          subtitle={t('partners.pageSubtitle')}
          title={t('partners.pageTitle')}
          description={t('partners.description')}
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {partnerTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                filter === type
                  ? 'bg-primary text-white'
                  : 'bg-surface text-body hover:bg-primary/10 hover:text-primary border border-border'
              }`}
              aria-pressed={filter === type}
            >
              {t(typeLabelKeys[type] || type)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((partner, index) => (
            <ScrollReveal key={partner.id} delay={index * 0.04}>
              <div className="bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-500 group h-full flex flex-col">
                <div className="h-40 flex items-center justify-center p-8 border-b border-border/40">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-sm">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <LogoPlaceholder name={partner.name} />
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-title leading-snug">
                      {partner.name}
                    </h3>
                    {partner.partnershipType && (
                      <span className="shrink-0 text-[10px] font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {t(typeLabelKeys[partner.partnershipType] || partner.partnershipType)}
                      </span>
                    )}
                  </div>

                  {partner.description && (
                    <p className="text-sm text-body leading-relaxed mb-4 flex-1">
                      {partner.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    {partner.industry && (
                      <span className="text-xs text-muted">{partner.industry}</span>
                    )}
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                        aria-label={t('partners.visitAria', { name: partner.name })}
                      >
                        {t('partners.visitWebsite')}
                        <Icon name="ArrowUpRight" size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {sorted.length === 0 && (
          <p className="text-center text-muted py-16">
            {t('partners.noPartnersFound')}
          </p>
        )}
      </div>
    </div>
  )
}
