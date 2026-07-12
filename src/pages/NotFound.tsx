import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function NotFound() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const isRtl = i18n.language === 'ar'

  return (
    <div className="relative min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div
        className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12 md:p-16 text-center max-w-lg w-full shadow-2xl"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="text-8xl md:text-9xl font-bold text-emerald-400/30 select-none mb-4">
          404
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('notFound.title')}
        </h1>

        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          {t('notFound.description')}
        </p>

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.97]"
        >
          <svg
            className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18m-9-9 9 9-9 9" />
          </svg>
          {t('notFound.cta')}
        </button>
      </div>
    </div>
  )
}
