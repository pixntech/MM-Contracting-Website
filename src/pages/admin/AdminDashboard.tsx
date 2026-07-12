import { useState, useEffect } from 'react'
import api from '../../api/axios'

export function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, news: 0, certs: 0, services: 0 })
  const [latestProject, setLatestProject] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      api.get('/projects').then(r => { setStats(s => ({ ...s, projects: r.data.length })); setLatestProject(r.data[0]?.title_ar || r.data[0]?.title_en || null) }).catch(() => {}),
      api.get('/news').then(r => setStats(s => ({ ...s, news: r.data.length }))).catch(() => {}),
      api.get('/certificates').then(r => setStats(s => ({ ...s, certs: r.data.length }))).catch(() => {}),
      api.get('/services').then(r => setStats(s => ({ ...s, services: r.data.length }))).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'إجمالي المشاريع', value: stats.projects, icon: '🏗️' },
    { label: 'إجمالي الأخبار', value: stats.news, icon: '📰' },
    { label: 'إجمالي الشهادات', value: stats.certs, icon: '📜' },
    { label: 'إجمالي الخدمات', value: stats.services, icon: '⚙️' },
    { label: 'آخر مشروع', value: latestProject ?? '—', icon: '📌' },
  ]

  return (
    <div dir="rtl">
      <h1 className="text-2xl font-bold text-white mb-2 font-arabic">لوحة التحكم</h1>
      <p className="text-sm text-white/40 mb-8 font-arabic">نظرة عامة على المحتوى الخاص بك</p>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((card) => (
            <div
              key={card.label}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <p className="text-sm text-white/50 mb-1 font-arabic">{card.label}</p>
                <p className="text-xl font-bold text-white truncate">{String(card.value)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
