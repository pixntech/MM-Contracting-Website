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

  const statusLabel: Record<string, string> = {
    active: t('certificates.statusActive'),
    expiring: t('certificates.statusExpiring'),
    expired: t('certificates.statusExpired'),
  }

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

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={certificate.title}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 end-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              aria-label={t('certificates.closeModal')}
            >
              <Icon name="X" size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto min-h-[300px] bg-section">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {certificate.organization}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-title mb-4 leading-snug">
                  {certificate.title}
                </h2>

                <p className="text-body text-sm leading-relaxed mb-6">
                  {certificate.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{t('certificates.issueDate')}</span>
                    <span className="font-semibold text-title">{certificate.issueDate}</span>
                  </div>
                  {certificate.expiryDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">{t('certificates.expiryDate')}</span>
                      <span className="font-semibold text-title">{certificate.expiryDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-muted">{t('certificates.status')}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle[certificate.status]}`}
                    >
                      {statusLabel[certificate.status]}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">{t('certificates.category')}</span>
                    <span className="font-semibold text-title capitalize">{certificate.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                  {onPrev && (
                    <button
                      onClick={onPrev}
                      disabled={!hasPrev}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
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
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
