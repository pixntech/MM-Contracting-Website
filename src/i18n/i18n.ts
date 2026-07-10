import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ar from './locales/ar.json'

const savedLanguage = localStorage.getItem('app-language') || 'ar'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLanguage,
  fallbackLng: 'ar',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('app-language', lng)
  document.documentElement.lang = lng
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.style.fontFamily =
    lng === 'ar'
      ? "'IBM Plex Sans Arabic', 'Tajawal', sans-serif"
      : "'Plus Jakarta Sans', sans-serif"
})

export default i18n
