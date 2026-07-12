import { useState, useMemo, useEffect, lazy } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CertificateCard } from '../components/ui/CertificateCard'
import { Icon } from '../components/ui/Icon'
import type { Certificate } from '../types'

const CertificateModal = lazy(() =>
  import('../components/ui/CertificateModal').then((m) => ({ default: m.CertificateModal }))
)

const ScrollReveal = lazy(() =>
  import('../components/ui/ScrollReveal').then((m) => ({ default: m.ScrollReveal }))
)

const CERT_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'iso', label: 'ISO' },
  { id: 'safety', label: 'Safety' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'construction', label: 'Construction' },
  { id: 'quality', label: 'Quality' },
  { id: 'environmental', label: 'Environmental' },
  { id: 'other', label: 'Other' },
]

function mapApiCert(c: any, lang: string): Certificate {
  return {
    id: c._id || c.id,
    title: lang === 'ar' ? c.title_ar || c.title : c.title_en || c.title,
    organization: lang === 'ar' ? c.organization_ar || c.organization : c.organization_en || c.organization,
    description: lang === 'ar' ? c.description_ar || c.description : c.description_en || c.description,
    category: lang === 'ar' ? c.category_ar || c.category : c.category_en || c.category,
    image: c.image || '',
    issueDate: c.issueDate || '',
    expiryDate: c.expiryDate || '',
    status: c.status || 'active',
    order: c.order || 0,
  }
}

export function CertificatesPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [raw, setRaw] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selected, setSelected] = useState<Certificate | null>(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/certificates')
      .then(r => r.json())
      .then(data => setRaw(data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))))
      .catch(() => setRaw([]))
  }, [])

  const items = useMemo(() => raw.map(c => mapApiCert(c, lang)), [raw, lang])

  const filtered = useMemo(() => {
    let result = items
    if (activeCategory !== 'all') {
      result = result.filter((c) => c.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.organization.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeCategory, searchQuery, items, lang])

  const handlePrev = () => {
    const idx = filtered.findIndex((c) => c.id === selected?.id)
    if (idx > 0) setSelected(filtered[idx - 1])
    else setSelected(filtered[filtered.length - 1])
  }

  const handleNext = () => {
    const idx = filtered.findIndex((c) => c.id === selected?.id)
    if (idx < filtered.length - 1) setSelected(filtered[idx + 1])
    else setSelected(filtered[0])
  }

  const catLabelKeys: Record<string, string> = {
    'all': 'certificates.categories.all',
    'iso': 'certificates.categories.iso',
    'safety': 'certificates.categories.safety',
    'engineering': 'certificates.categories.engineering',
    'construction': 'certificates.categories.construction',
    'quality': 'certificates.categories.quality',
    'environmental': 'certificates.categories.environmental',
    'other': 'certificates.categories.other',
  }

  return (
    <div className="pt-28 pb-24">
      <div className="relative py-20 md:py-28 bg-cover bg-center mb-16" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-[#0D2B45]/90" />
        <div className="content-container relative z-10 text-center">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block text-accent font-semibold text-sm tracking-[0.2em] uppercase mb-4">{t('certificates.pageSubtitle')}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t('certificates.pageTitle')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/70 text-lg max-w-2xl mx-auto">{t('certificates.pageDescription')}</motion.p>
        </div>
      </div>

      <div className="content-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {CERT_CATEGORIES.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeCategory === cat.id ? 'bg-primary text-white' : 'bg-surface text-body hover:bg-primary/10 hover:text-primary border border-border'}`} aria-pressed={activeCategory === cat.id}>
                {t(catLabelKeys[cat.id] || cat.label)}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('certificates.searchPlaceholder')} className="w-full ps-10 pe-4 py-2.5 rounded-lg border border-border bg-white text-sm text-title focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" aria-label={t('certificates.searchAria')} />
            <Icon name="Search" size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20"><p className="text-muted text-lg">{t('certificates.noResults')}</p></div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((cert, index) => (
              <ScrollReveal key={cert.id} delay={index * 0.05}>
                <div onClick={() => setSelected(cert)} className="cursor-pointer">
                  <CertificateCard certificate={cert} onView={setSelected} />
                </div>
              </ScrollReveal>
            ))}
          </motion.div>
        )}
      </div>

      {selected && (
        <CertificateModal
          certificate={selected}
          onClose={() => setSelected(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={filtered.length > 1}
          hasNext={filtered.length > 1}
        />
      )}
    </div>
  )
}
