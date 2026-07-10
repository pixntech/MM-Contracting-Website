import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'
import { mainNavigation } from '../../data/navigation'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (!isHome) {
        return
      }
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  const navKeyMap: Record<string, string> = {
    'Home': 'nav.home',
    'About': 'nav.about',
    'Services': 'nav.services',
    'Projects': 'nav.projects',
    'Industries': 'nav.industries',
    'News': 'nav.news',
    'Certificates': 'nav.certificates',
    'Partners': 'nav.partners',
    'Gallery': 'nav.gallery',
    'Contact': 'nav.contact',
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="content-container">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label={t('header.ariaLabel')}
          >
            {!isHome ?
              <img
              src="/Logo.png"
              alt={t('header.altLogo')}
              className="h-20 md:h-20 w-auto object-contain"
              />
              :
              scrolled ?
              <img
                src="/Logo.png"
                alt={t('header.altLogo')}
                className="h-20 md:h-20 w-auto object-contain"
              />
              :
              <img
                src="/LogoWhite.png"
                alt={t('header.altLogo')}
                className="h-20 md:h-20 w-auto object-contain"
              />
            }

          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label={t('header.navAria')}>
              {mainNavigation.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    scrolled || !isHome
                      ? 'text-body hover:text-primary hover:bg-primary/5'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {t(navKeyMap[link.label] || link.label)}
                </Link>
              ))}
              <Button
                size="sm"
                href={isHome ? '/#contact' : '/contact'}
                className="ms-4"
                onClick={() => handleNavClick('/#contact')}
              >
                {t('header.getInTouch')}
              </Button>
            </nav>

            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                scrolled || !isHome
                  ? 'text-title hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('header.closeMenu') : t('header.openMenu')}
              aria-expanded={isOpen}
            >
              <Icon name={isOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <nav className="content-container py-6 flex flex-col gap-2" role="navigation" aria-label={t('header.mobileNavAria')}>
              {mainNavigation.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-3 text-body hover:text-primary hover:bg-primary/5 rounded-lg font-medium transition-colors"
                >
                  {t(navKeyMap[link.label] || link.label)}
                </Link>
              ))}
              <Button href="/contact" className="mt-4" onClick={() => setIsOpen(false)}>
                {t('header.getInTouch')}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
