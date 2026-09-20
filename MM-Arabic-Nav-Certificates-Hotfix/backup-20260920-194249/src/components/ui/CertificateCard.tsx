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

  const pageCount = certificate.pages?.length ?? 1

  return (
    <article
      className={`group bg-white rounded-xl border border-border overflow-hidden transition-all duration-300 ${
        variant === 'grid' ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''
      }`}
    >
      <div className="relative h-52 overflow-hidden bg-[#f5f7fa] border-b border-border/70">
        <img
          src={certificate.image}
          alt={title}
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute top-3 start-3">
          <Badge variant={statusVariant[certificate.status]}>{statusLabel[certificate.status]}</Badge>
        </div>
        {pageCount > 1 && (
          <span className="absolute top-3 end-3 rounded-full bg-[#0D2B45]/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {isArabic ? `${pageCount} صفحات` : `${pageCount} pages`}
          </span>
        )}
      </div>

      <div className="p-5">
        <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wider mb-2 line-clamp-1">
          {organization}
        </span>
        <h3 className="text-base font-bold text-title mb-2 leading-snug line-clamp-2">{title}</h3>
        <p className="text-sm text-body leading-relaxed line-clamp-2 mb-3">{description}</p>

        <div className="flex items-center justify-between gap-3 text-xs text-muted min-h-5">
          {certificate.referenceNumber ? (
            <span>
              {isArabic ? 'رقم المرجع:' : 'Ref:'} {certificate.referenceNumber}
            </span>
          ) : (
            <span />
          )}
          {certificate.issueDate && <span>{t('certificates.issued', { date: certificate.issueDate })}</span>}
        </div>

        {onView && (
          <button
            onClick={(event) => {
              event.stopPropagation()
              onView(certificate)
            }}
            className="mt-4 w-full py-2.5 text-sm font-semibold text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
            aria-label={t('certificates.viewDetails', { title })}
          >
            {t('certificates.viewCertificate')}
          </button>
        )}
      </div>
    </article>
  )
}
