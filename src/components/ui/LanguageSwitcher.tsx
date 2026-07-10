import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  const toggleLanguage = () => {
    const newLang = isArabic ? 'en' : 'ar'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 border border-border hover:bg-primary hover:text-white hover:border-primary"
      aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      {isArabic ? 'English' : 'العربية'}
    </button>
  )
}
