import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'
import { mainNavigation } from '../../data/navigation'
import { Icon } from '../ui/Icon'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

const NAV_EXCLUDE = ['Contact']

const HOME_SECTIONS = [
  { id: 'about', href: '/#about' },
  { id: 'partners', href: '/partners' },
  { id: 'certificates', href: '/certificates' },
  { id: 'gallery', href: '/gallery' },
  { id: 'services', href: '/#services' },
  { id: 'industries', href: '/#industries' },
  { id: 'news', href: '/#news' },
  { id: 'contact', href: '/contact' },
] as const

export function Header() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState('/')
  const location = useLocation()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (!isHome) {
      if (location.pathname.startsWith('/gallery') || location.pathname.startsWith('/projects')) {
        setActiveHref('/gallery')
      } else if (location.pathname.startsWith('/certificates')) {
        setActiveHref('/certificates')
      } else if (location.pathname.startsWith('/partners')) {
        setActiveHref('/partners')
      } else if (location.pathname.startsWith('/contact')) {
        setActiveHref('/contact')
      } else {
        setActiveHref('')
      }
      return
    }

    const updateActiveSection = () => {
      const marker = window.scrollY + 150
      let current = '/'

      for (const section of HOME_SECTIONS) {
        const element = document.getElementById(section.id)
        if (element && element.offsetTop <= marker) {
          current = section.href
        }
      }

      setActiveHref(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [isHome, location.pathname])

  useEffect(() => {
    if (!isHome || !location.hash) return

    const id = location.hash.slice(1)
    const scrollToHash = () => {
      const element = document.getElementById(id)
      if (!element) return

      const headerOffset = window.innerWidth >= 768 ? 112 : 96
      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }

    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToHash)
    })

    return () => window.cancelAnimationFrame(firstFrame)
  }, [isHome, location.hash])

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#') && isHome) {
      const id = href.slice(2)
      const element = document.getElementById(id)
      if (element) {
        const headerOffset = window.innerWidth >= 768 ? 112 : 96
        const top = element.getBoundingClientRect().top + window.scrollY - headerOffset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  const navKeyMap: Record<string, string> = {
    Home: 'nav.home',
    About: 'nav.about',
    Services: 'nav.services',
    Projects: 'nav.projects',
    Industries: 'nav.industries',
    News: 'nav.news',
    Certificates: 'nav.certificates',
    Partners: 'nav.partners',
    Gallery: 'nav.gallery',
  }

  const visibleNav = mainNavigation.filter((link) => !NAV_EXCLUDE.includes(link.label))
  const contactActive = activeHref === '/contact'

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="content-container">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label={t('header.ariaLabel')}
          >
            {!isHome ? (
              <img
                src="/Logo.png"
                alt={t('header.altLogo')}
                className="h-20 md:h-20 w-auto object-contain"
              />
            ) : scrolled ? (
              <img
                src="/Logo.png"
                alt={t('header.altLogo')}
                className="h-20 md:h-20 w-auto object-contain"
              />
            ) : (
              <img
                src="/LogoWhite.png"
                alt={t('header.altLogo')}
                className="h-20 md:h-20 w-auto object-contain"
              />
            )}
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <nav
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label={t('header.navAria')}
            >
              {visibleNav.map((link) => {
                const active = activeHref === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    aria-current={active ? 'location' : undefined}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      active
                        ? scrolled || !isHome
                          ? 'text-primary bg-primary/10 shadow-sm'
                          : 'text-white bg-white/15 shadow-sm'
                        : scrolled || !isHome
                          ? 'text-body hover:text-primary hover:bg-primary/5'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {t(navKeyMap[link.label] || link.label)}
                  </Link>
                )
              })}
            </nav>

            <Link
              to={isHome ? '/#contact' : '/contact'}
              onClick={() => handleNavClick('/#contact')}
              className={cn(
                'hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300',
                'backdrop-blur-md border bg-gradient-to-br from-primary/90 to-primary/70',
                'text-white shadow-lg',
                'hover:scale-105 hover:shadow-xl hover:shadow-primary/30 active:scale-95',
                contactActive ? 'ring-2 ring-white/80 ring-offset-2 ring-offset-transparent' : '',
                scrolled || !isHome
                  ? 'border-white/20 hover:border-white/40 shadow-primary/20'
                  : 'border-white/30 hover:border-white/60 shadow-primary/10'
              )}
              aria-label={t('header.getInTouch')}
              aria-current={contactActive ? 'location' : undefined}
            >
              <Icon name="Phone" size={16} />
              {t('header.getInTouch')}
            </Link>

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
            <nav
              className="content-container py-6 flex flex-col gap-2"
              role="navigation"
              aria-label={t('header.mobileNavAria')}
            >
              {visibleNav.map((link) => {
                const active = activeHref === link.href
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    aria-current={active ? 'location' : undefined}
                    className={cn(
                      'px-4 py-3 rounded-lg font-medium transition-colors',
                      active
                        ? 'text-primary bg-primary/10'
                        : 'text-body hover:text-primary hover:bg-primary/5'
                    )}
                  >
                    {t(navKeyMap[link.label] || link.label)}
                  </Link>
                )
              })}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={cn(
                  'mt-2 flex items-center justify-center gap-2 w-full px-5 py-3.5 text-sm font-semibold rounded-xl transition-all duration-300 backdrop-blur-md border bg-gradient-to-br from-primary/90 to-primary/70 text-white shadow-lg border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]',
                  contactActive ? 'ring-2 ring-primary/30' : ''
                )}
                aria-label={t('header.getInTouch')}
                aria-current={contactActive ? 'location' : undefined}
              >
                <Icon name="Phone" size={16} />
                {t('header.getInTouch')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
