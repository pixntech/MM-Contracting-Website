import { useTranslation } from 'react-i18next'
import { SectionTitle } from '../components/ui/SectionTitle'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { Icon } from '../components/ui/Icon'
import { COMPANY, getDirectionsUrl } from '../constants'

export function Contact() {
  const { t } = useTranslation()

  const contactItems = [
    {
      icon: 'MapPin',
      label: t('contact.officeAddress'),
      value: COMPANY.address,
      href: getDirectionsUrl(),
      external: true,
    },
    {
      icon: 'Phone',
      label: t('contact.phone'),
      value: COMPANY.phone,
      href: `tel:${COMPANY.phoneHref}`,
      external: false,
    },
    {
      icon: 'Phone',
      label: t('contact.fax'),
      value: COMPANY.fax,
      href: undefined,
      external: false,
    },
    {
      icon: 'Mail',
      label: t('contact.email'),
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
      external: false,
    },
  ] as const

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-start">
          <ScrollReveal direction="left">
            <SectionTitle
              subtitle={t('contact.subtitle')}
              title={t('contact.title')}
              description={t('contact.description')}
              align="left"
              className="mb-8"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={item.icon} size={22} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-muted mb-1">{item.label}</p>
                      <p className="text-title font-semibold leading-relaxed break-words">{item.value}</p>
                    </div>
                  </>
                )

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="rounded-xl border border-border bg-surface p-5 flex items-start gap-4 hover:border-primary/40 hover:bg-primary/[0.03] transition-colors"
                    >
                      {content}
                    </a>
                  )
                }

                return (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border bg-surface p-5 flex items-start gap-4"
                  >
                    {content}
                  </div>
                )
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-2xl bg-secondary text-white p-7 md:p-9 overflow-hidden relative">
              <div className="absolute w-64 h-64 rounded-full border border-white/10 -top-32 -end-24 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-primary font-semibold text-sm uppercase tracking-[0.16em] mb-3">
                  {t('contact.companyDetails')}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-7">
                  {COMPANY.name}
                </h3>

                <dl className="space-y-5">
                  <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
                    <dt className="text-white/60">{t('contact.commercialRegister')}</dt>
                    <dd className="font-semibold text-white text-end">{COMPANY.commercialRegister}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
                    <dt className="text-white/60">{t('contact.taxCard')}</dt>
                    <dd className="font-semibold text-white text-end">{COMPANY.taxCardId}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
                    <dt className="text-white/60">{t('contact.federationMembership')}</dt>
                    <dd className="font-semibold text-white text-end">{COMPANY.federationMembership}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-6">
                    <dt className="text-white/60">{t('contact.membershipYear')}</dt>
                    <dd className="font-semibold text-white text-end">{COMPANY.federationMembershipYear}</dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={getDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-hover transition-colors"
                  >
                    <Icon name="MapPin" size={18} />
                    {t('contact.getDirections')}
                  </a>
                  <a
                    href={`tel:${COMPANY.phoneHref}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    <Icon name="Phone" size={18} />
                    {t('contact.callUs')}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
