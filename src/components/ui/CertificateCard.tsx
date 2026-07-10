import { useTranslation } from 'react-i18next'
import { Badge } from './Badge'
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

export function CertificateCard({
  certificate,
  onView,
  variant = 'grid',
}: CertificateCardProps) {
  const { t } = useTranslation()

  const statusLabel: Record<string, string> = {
    active: t('certificates.statusActive'),
    expiring: t('certificates.statusExpiring'),
    expired: t('certificates.statusExpired'),
  }

  return (
    <article
      className={`group bg-white rounded-xl border border-border overflow-hidden transition-all duration-300 ${
        variant === 'grid'
          ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
          : ''
      }`}
    >
      <div className="relative h-48 overflow-hidden bg-section">
        <img
          src={certificate.image}
          alt={certificate.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 start-3">
          <Badge variant={statusVariant[certificate.status]}>
            {statusLabel[certificate.status]}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          {certificate.organization}
        </span>
        <h3 className="text-base font-bold text-title mb-2 leading-snug line-clamp-2">
          {certificate.title}
        </h3>
        <p className="text-sm text-body leading-relaxed line-clamp-2 mb-3">
          {certificate.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{t('certificates.issued', { date: certificate.issueDate })}</span>
          {certificate.expiryDate && <span>{t('certificates.expires', { date: certificate.expiryDate })}</span>}
        </div>
        {onView && (
          <button
            onClick={() => onView(certificate)}
            className="mt-4 w-full py-2.5 text-sm font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            aria-label={t('certificates.viewDetails', { title: certificate.title })}
          >
            {t('certificates.viewCertificate')}
          </button>
        )}
      </div>
    </article>
  )
}
