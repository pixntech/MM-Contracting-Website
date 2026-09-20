import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'
import type { Certificate } from '../../types'

interface CertificateModalProps {
  certificate: Certificate | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

const statusStyle = {
  active: 'bg-green-100 text-green-700',
  expiring: 'bg-amber-100 text-amber-700',
  expired: 'bg-gray-100 text-gray-500',
}

const categoryIcon: Record<string, string> = {
  tax: 'ShieldCheck',
  registration: 'Building2',
  membership: 'Award',
  legal: 'Briefcase',
}

export function CertificateModal({
  certificate,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: CertificateModalProps) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (isRtl) {
        if (e.key === 'ArrowLeft' && onNext) onNext()
        if (e.key === 'ArrowRight' && onPrev) onPrev()
      } else {
        if (e.key === 'ArrowLeft' && onPrev) onPrev()
        if (e.key === 'ArrowRight' && onNext) onNext()
      }
    },
    [onClose, onPrev, onNext, isRtl]
  )

  useEffect(() => {
    if (certificate) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [certificate, handleKeyDown])

  if (!certificate) return null

  const title = isRtl && certificate.titleAr ? certificate.titleAr : certificate.title
  const organization =
    isRtl && certificate.organizationAr ? certificate.organizationAr : certificate.organization
  const description =
    isRtl && certificate.descriptionAr ? certificate.descriptionAr : certificate.description

  const statusLabel: Record<string, string> = {
    active: t('certificates.statusActive'),
    expiring: t('certificates.statusExpiring'),
    expired: t('certificates.statusExpired'),
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 10 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 end-4 z-30 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
            aria-label={t('certificates.closeModal')}
          >
            <Icon name="X" size={20} />
          </button>

          <div className="bg-secondary text-white rounded-t-3xl p-7 md:p-9 pe-16 relative overflow-hidden">
            <div className="absolute w-48 h-48 rounded-full border border-white/10 -top-24 -end-16 pointer-events-none" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                <Icon
                  name={categoryIcon[certificate.category] || 'ShieldCheck'}
                  size={27}
                  className="text-primary"
                />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {organization}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">{title}</h2>
              </div>
            </div>
          </div>

          <div className="p-7 md:p-9">
            <p className="text-body leading-relaxed mb-7">{description}</p>

            <div className="rounded-2xl bg-surface border border-border p-5 space-y-4">
              {certificate.referenceNumber && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted">{isRtl ? 'رقم المرجع' : 'Reference No.'}</span>
                  <bdi className="font-semibold text-title">{certificate.referenceNumber}</bdi>
                </div>
              )}
              {certificate.issueDate && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted">{t('certificates.issueDate')}</span>
                  <span className="font-semibold text-title">{certificate.issueDate}</span>
                </div>
              )}
              {certificate.expiryDate && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-muted">{t('certificates.expiryDate')}</span>
                  <span className="font-semibold text-title">{certificate.expiryDate}</span>
                </div>
              )}
              <div className="flex justify-between gap-4 text-sm items-center">
                <span className="text-muted">{t('certificates.status')}</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[certificate.status]}`}
                >
                  {statusLabel[certificate.status]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-7 pt-5 border-t border-border">
              {onPrev && (
                <button
                  onClick={onPrev}
                  disabled={!hasPrev}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    hasPrev
                      ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                      : 'bg-gray-50 text-muted cursor-not-allowed'
                  }`}
                  aria-label={t('certificates.prevCertificateAria')}
                >
                  {isRtl ? (
                    <Icon name="ChevronRight" size={16} />
                  ) : (
                    <Icon name="ChevronRight" size={16} className="rotate-180" />
                  )}
                  {t('certificates.previous')}
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  disabled={!hasNext}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    hasNext
                      ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                      : 'bg-gray-50 text-muted cursor-not-allowed'
                  }`}
                  aria-label={t('certificates.nextCertificateAria')}
                >
                  {t('certificates.next')}
                  {isRtl ? (
                    <Icon name="ChevronRight" size={16} className="rotate-180" />
                  ) : (
                    <Icon name="ChevronRight" size={16} />
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
