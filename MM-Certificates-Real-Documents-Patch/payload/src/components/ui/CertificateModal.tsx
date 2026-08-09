import { useEffect, useCallback, useState } from 'react'
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
  const [pageIndex, setPageIndex] = useState(0)

  const pages = certificate?.pages?.length ? certificate.pages : certificate ? [certificate.image] : []
  const pageCount = pages.length

  useEffect(() => {
    setPageIndex(0)
  }, [certificate?.id])

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

  if (!certificate) return null

  const title = isRtl && certificate.titleAr ? certificate.titleAr : certificate.title
  const organization =
    isRtl && certificate.organizationAr ? certificate.organizationAr : certificate.organization
  const description =
    isRtl && certificate.descriptionAr ? certificate.descriptionAr : certificate.description

  const prevPage = () => setPageIndex((current) => (current - 1 + pageCount) % pageCount)
  const nextPage = () => setPageIndex((current) => (current + 1) % pageCount)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 end-4 z-30 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
            aria-label={t('certificates.closeModal')}
          >
            <Icon name="X" size={20} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
            <div className="relative min-h-[360px] md:min-h-[560px] bg-[#eef2f6] flex items-center justify-center p-4 md:p-6">
              <img
                src={pages[pageIndex]}
                alt={`${title} — ${isRtl ? 'صفحة' : 'page'} ${pageIndex + 1}`}
                className="max-h-[72vh] w-full object-contain rounded-lg"
              />

              {pageCount > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPage}
                    className="absolute start-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-title hover:bg-primary hover:text-white transition-colors"
                    aria-label={isRtl ? 'الصفحة السابقة' : 'Previous page'}
                  >
                    <Icon name="ChevronRight" size={18} className={isRtl ? '' : 'rotate-180'} />
                  </button>
                  <button
                    type="button"
                    onClick={nextPage}
                    className="absolute end-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-title hover:bg-primary hover:text-white transition-colors"
                    aria-label={isRtl ? 'الصفحة التالية' : 'Next page'}
                  >
                    <Icon name="ChevronRight" size={18} className={isRtl ? 'rotate-180' : ''} />
                  </button>

                  <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rounded-full bg-[#0D2B45]/90 px-3 py-1.5 text-xs font-semibold text-white">
                    {isRtl
                      ? `صفحة ${pageIndex + 1} من ${pageCount}`
                      : `Page ${pageIndex + 1} of ${pageCount}`}
                  </div>
                </>
              )}
            </div>

            <div className="p-6 md:p-8 flex flex-col">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 pe-10">
                {organization}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-title mb-4 leading-snug">{title}</h2>

              <p className="text-body text-sm leading-relaxed mb-6">{description}</p>

              <div className="space-y-3 mb-6">
                {certificate.referenceNumber && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-muted">{isRtl ? 'رقم المرجع' : 'Reference No.'}</span>
                    <span className="font-semibold text-title" dir="ltr">{certificate.referenceNumber}</span>
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
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle[certificate.status]}`}
                  >
                    {statusLabel[certificate.status]}
                  </span>
                </div>
                {pageCount > 1 && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-muted">{isRtl ? 'عدد الصفحات' : 'Document pages'}</span>
                    <span className="font-semibold text-title">{pageCount}</span>
                  </div>
                )}
              </div>

              {pageCount > 1 && (
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {pages.map((page, index) => (
                    <button
                      type="button"
                      key={page}
                      onClick={() => setPageIndex(index)}
                      className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 bg-[#f5f7fa] transition-colors ${
                        pageIndex === index ? 'border-primary' : 'border-border hover:border-primary/50'
                      }`}
                      aria-label={isRtl ? `عرض الصفحة ${index + 1}` : `View page ${index + 1}`}
                    >
                      <img src={page} alt="" className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}

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
    </AnimatePresence>
  )
}
