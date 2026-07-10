import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
       <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/drtdhohen/video/upload/f_auto,q_auto/HeroVideo_z7vq0z.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D2B45]/95 via-[#0D2B45]/80 to-transparent" />
      </div>

      <div className="content-container relative z-10 pt-32 pb-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-block text-accent font-semibold text-sm md:text-base tracking-[0.2em] uppercase mb-6">
              {t('hero.tagline')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8"
          >
            {t('hero.title')}{' '}
            <span className="text-primary">{t('hero.titleHighlight')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mb-12 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" href="/#projects">
              {t('hero.ctaProjects')}
              <Icon name="ArrowRight" size={20} />
            </Button>
            <Button size="lg" variant="outline" href="/contact" className="border-white/30 text-white hover:bg-white hover:text-secondary">
              {t('hero.ctaContact')}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a
          href="/#about"
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
          aria-label={t('hero.scrollAria')}
        >
          <span className="text-xs tracking-widest uppercase">{t('hero.scrollLabel')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Icon name="ChevronDown" size={20} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  )
}
