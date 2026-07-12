import { useEffect, useState, useCallback } from 'react'
import api from '../../api/axios'
import * as LucideIcons from 'lucide-react'

const AVAILABLE_ICONS = [
  'Building2', 'Road', 'Home', 'Store', 'Factory', 'PenTool',
  'Trophy', 'ShieldCheck', 'HardHat', 'Lightbulb', 'Clock',
  'Globe', 'Fuel', 'Zap', 'Train', 'Droplets', 'Hammer',
  'HeartPulse', 'Users', 'Building', 'Award', 'Briefcase',
  'Target', 'Eye', 'Search', 'Star', 'MapPin',
]

function downloadJson(data: any[], filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export function AdminServices() {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const refresh = useCallback(async () => {
    try { const res = await api.get('/services'); setItems(res.data) }
    catch { setItems([]) }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const handleSave = async (formData: Record<string, string>) => {
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/services/${editing._id}`, formData)
      } else {
        await api.post('/services', formData)
      }
      setShowForm(false); setEditing(null); await refresh()
    } catch { alert('فشل حفظ الخدمة') } finally { setSaving(false) }
  }

  const handleDelete = async (item: any) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return
    try { await api.delete(`/services/${item._id}`); await refresh() }
    catch { alert('فشل حذف الخدمة') }
  }

  const handleExport = () => downloadJson(items, 'services_updated.json')
  const openEdit = (item: any) => { setEditing(item); setShowForm(true) }
  const openAdd = () => { setEditing(null); setShowForm(true) }

  return (
    <div dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white font-arabic">إدارة الخدمات</h1>
          <p className="text-sm text-white/40 mt-1 font-arabic">إدارة الخدمات التي تقدمها الشركة</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 font-arabic">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            تصدير البيانات
          </button>
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 bg-gradient-to-br from-primary/90 to-primary/70 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] font-arabic">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            إضافة خدمة
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center"><p className="text-white/40 text-sm font-arabic">لا توجد خدمات بعد</p></div>
        ) : (
          <div className="p-2">
            {items.map((item: any, i: number) => (
              <div key={item._id || item.id} className="group flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-transparent hover:border-emerald-500/20 transition-all duration-300 mb-2 last:mb-0 hover:shadow-[0_0_15px_rgba(52,211,153,0.06)]" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                  {(() => {
                    const IconComp = (LucideIcons as any)[item.icon]
                    return IconComp ? <IconComp className="w-5 h-5 text-primary" /> : <span className="text-primary text-sm">{item.icon?.[0]}</span>
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-white/80 font-arabic">{item.title_ar || item.title || '—'}</span>
                    <span className="text-xs text-white/30">/</span>
                    <span className="text-sm text-white/50">{item.title_en || item.title || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/40 font-arabic">{(item.description_ar || item.description_en || item.description || '').slice(0, 60)}...</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => openEdit(item)} className="px-3.5 py-2 text-xs font-medium rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(65,157,240,0.1)] transition-all duration-300 font-arabic">تعديل</button>
                  <button onClick={() => handleDelete(item)} className="px-3.5 py-2 text-xs font-medium rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all duration-300 font-arabic">حذف</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ServiceFormModal
          item={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          saving={saving}
        />
      )}
    </div>
  )
}

interface ModalProps {
  item?: any | null
  onSave: (data: Record<string, string>) => void
  onCancel: () => void
  saving?: boolean
}

function ServiceFormModal({ item, onSave, onCancel, saving }: ModalProps) {
  const [form, setForm] = useState(() => item ? {
    title_en: item.title_en || item.title || '',
    title_ar: item.title_ar || item.title || '',
    description_en: item.description_en || item.description || '',
    description_ar: item.description_ar || '',
    icon: item.icon || 'Building2',
  } : { title_en: '', title_ar: '', description_en: '', description_ar: '', icon: 'Building2' })

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(form) }
  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="fixed inset-0 z-50 min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-sm overflow-y-auto" onClick={onCancel}>
      <div className="relative w-full max-w-3xl bg-[#0D2B45] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-up my-auto" onClick={e => e.stopPropagation()}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/5 pointer-events-none" />
        <div className="relative">
          <h2 className="text-xl font-bold text-white mb-1 font-arabic">{item ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</h2>
          <p className="text-sm text-white/40 mb-6 font-arabic">{item ? 'قم بتحديث بيانات الخدمة أدناه' : 'املأ بيانات الخدمة الجديدة'}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="عنوان الخدمة بالإنجليزي" value={form.title_en} onChange={v => update('title_en', v)} />
              <InputField label="عنوان الخدمة بالعربي" value={form.title_ar} onChange={v => update('title_ar', v)} />

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">الأيقونة</label>
                <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2">
                  {AVAILABLE_ICONS.map(iconName => {
                    const IconComp = (LucideIcons as any)[iconName]
                    const isSelected = form.icon === iconName
                    return (
                      <button key={iconName} type="button" onClick={() => update('icon', iconName)} className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-200 ${isSelected ? 'bg-primary/15 border-primary/40 text-primary shadow-[0_0_10px_rgba(65,157,240,0.1)]' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}>
                        {IconComp && <IconComp className="w-4 h-4" />}
                        <span className="text-[8px] font-arabic leading-tight text-center truncate w-full">{iconName}</span>
                      </button>
                    )
                  })}
                </div>
                {form.icon && (
                  <div className="flex items-center gap-2 mt-3 text-xs text-white/40 font-arabic">
                    الأيقونة المختارة:
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                      {(() => { const Ic = (LucideIcons as any)[form.icon]; return Ic ? <Ic className="w-3.5 h-3.5" /> : null })()}
                      {form.icon}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextAreaField label="الوصف بالإنجليزي" value={form.description_en} onChange={v => update('description_en', v)} />
              <TextAreaField label="الوصف بالعربي" value={form.description_ar} onChange={v => update('description_ar', v)} />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-medium rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 font-arabic">إلغاء</button>
              <button type="submit" disabled={saving} className="px-6 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 bg-gradient-to-br from-primary/90 to-primary/70 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 font-arabic">
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {item ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-right" required dir={label.includes('بالعربي') ? 'rtl' : 'ltr'} />
    </div>
  )
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-right" dir={label.includes('بالعربي') ? 'rtl' : 'ltr'} />
    </div>
  )
}
