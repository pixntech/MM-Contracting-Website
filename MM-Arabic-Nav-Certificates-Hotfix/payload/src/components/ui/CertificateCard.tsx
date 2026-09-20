import { useTranslation } from 'react-i18next'
import { Badge } from './Badge'
import { Icon } from './Icon'
import type { Certificate } from '../../types'

interface CertificateCardProps {
  certificate: Certificate
  onView?: (certificate: Certificate) => void
  variant?: 'grid' | 'carousel'
}

const statusVariant = {
  active: 'primary' as const,
  expiring: 'accent' as const,
  expired: 'outline' as const,
}

const categoryIcon: Record<string, string> = {
  tax: 'ShieldCheck',
  registration: 'Building2',
  membership: 'Award',
  legal: 'Briefcase',
}

export function CertificateCard({
  certificate,
  onView,
  variant = 'grid',
}: CertificateCardProps) {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const title = isArabic && certificate.titleAr ? certificate.titleAr : certificate.title
  const organization =
    isArabic && certificate.organizationAr ? certificate.organizationAr : certificate.organization
  const description =
    isArabic && certificate.descriptionAr ? certificate.descriptionAr : certificate.description

  const statusLabel: Record<string, string> = {
    active: t('certificates.statusActive'),
    expiring: t('certificates.statusExpiring'),
    expired: t('certificates.statusExpired'),
  }

  return (
    <article
      className={`group h-full rounded-2xl border border-border bg-white p-6 md:p-7 transition-all duration-300 ${
        variant === 'grid'
          ? 'hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl cursor-pointer'
          : 'shadow-lg'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon name={categoryIcon[certificate.category] || 'ShieldCheck'} size={26} className="text-primary" />
        </div>
        <Badge variant={statusVariant[certificate.status]}>{statusLabel[certificate.status]}</Badge>
      </div>

      <span className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
        {organization}
      </span>
      <h3 className="text-lg md:text-xl font-bold text-title mb-3 leading-snug">{title}</h3>
      <p className="text-sm text-body leading-relaxed mb-5">{description}</p>

      <div className="pt-4 border-t border-border/80 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-muted">
        {certificate.referenceNumber ? (
          <span>
            {isArabic ? 'رقم المرجع:' : 'Ref:'}{' '}
            <bdi className="font-semibold text-title">{certificate.referenceNumber}</bdi>
          </span>
        ) : (
          <span />
        )}
        {certificate.issueDate && (
          <span>{t('certificates.issued', { date: certificate.issueDate })}</span>
        )}
      </div>

      {onView && (
        <button
          onClick={(event) => {
            event.stopPropagation()
            onView(certificate)
          }}
          className="mt-5 w-full py-2.5 text-sm font-semibold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
          aria-label={t('certificates.viewDetails', { title })}
        >
          {t('certificates.viewCertificate')}
        </button>
      )}
    </article>
  )
}
