import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/i18n'
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const savedLanguage = localStorage.getItem('app-language') || 'ar'
document.documentElement.lang = savedLanguage
document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)

const loader = document.getElementById('app-loader')
if (loader) {
  loader.addEventListener('transitionend', () => loader.remove(), { once: true })
  loader.style.opacity = '0'
}
