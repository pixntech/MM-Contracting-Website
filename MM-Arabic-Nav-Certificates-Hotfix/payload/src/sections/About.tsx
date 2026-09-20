import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { COMPANY, getDirectionsUrl } from '../constants'

const credentials = [
  {
    icon: 'Building2',
    labelKey: 'about.commercialRegister',
    value: COMPANY.commercialRegister,
  },
  {
    icon: 'ShieldCheck',
    labelKey: 'about.taxCard',
    value: COMPANY.taxCardId,
  },
  {
    icon: 'Award',
    labelKey: 'about.federationMembership',
    value: COMPANY.federationMembership,
  },
  {
    icon: 'Calendar',
    labelKey: 'about.membershipYear',
    value: COMPANY.federationMembershipYear,
  },
] as const

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 lg:gap-16 items-stretch">
          <ScrollReveal direction="left">
            <div className="h-full min-h-[440px] rounded-2xl overflow-hidden bg-secondary relative p-8 md:p-10 flex flex-col justify-between">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute w-64 h-64 rounded-full border border-white/20 -top-24 -end-20" />
                <div className="absolute w-96 h-96 rounded-full border border-white/10 -bottom-52 -start-24" />
              </div>

              <div className="relative z-10">
                <img
                  src="/LogoWhite.png"
                  alt={t('header.altLogo')}
                  className="w-full max-w-[420px] h-auto object-contain object-left"
                />
              </div>

              <div className="relative z-10">
                <p className="text-white/60 text-sm font-semibold tracking-[0.18em] uppercase mb-3">
                  {t('about.headOffice')}
                </p>
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-white hover:text-primary transition-colors"
                >
                  <Icon name="MapPin" size={22} className="mt-1 shrink-0 text-primary" />
                  <span className="text-lg leading-relaxed">{t('company.address')}</span>
                  <Icon
                    name="ArrowUpRight"
                    size={18}
                    className="mt-1.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="h-full flex flex-col justify-center">
              <SectionTitle
                subtitle={t('about.subtitle')}
                title={t('about.title')}
                description=""
                align="left"
                className="mb-0"
              />

              <p className="text-body text-lg leading-relaxed mb-4">
                {t('about.description1')}
              </p>
              <p className="text-body text-lg leading-relaxed mb-8">
                {t('about.description2')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {credentials.map((item) => (
                  <div
                    key={item.labelKey}
                    className="rounded-xl border border-border bg-surface px-5 py-5 flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={21} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                        {t(item.labelKey)}
                      </p>
                      <p className="text-xl font-bold text-title">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
