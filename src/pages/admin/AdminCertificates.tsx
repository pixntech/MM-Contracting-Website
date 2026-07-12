import { useEffect, useState, useCallback } from 'react'
import api from '../../api/axios'
import { compressImage } from '../../utils/compressImage'

const CERT_CATEGORIES = [
  { en: 'ISO', ar: 'أيزو' },
  { en: 'Safety', ar: 'سلامة' },
  { en: 'Engineering', ar: 'هندسة' },
  { en: 'Construction', ar: 'إنشاءات' },
  { en: 'Quality', ar: 'جودة' },
  { en: 'Environmental', ar: 'بيئة' },
  { en: 'Other', ar: 'أخرى' },
]

function downloadJson(data: any[], filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export function AdminCertificates() {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const res = await api.get('/certificates')
      setItems(res.data)
    } catch { setItems([]) }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const handleSave = async (formData: Record<string, string>, image: string) => {
    setSaving(true)
    try {
      const payload = { ...formData, image }
      if (editing) {
        await api.put(`/certificates/${editing._id}`, payload)
      } else {
        await api.post('/certificates', payload)
      }
      setShowForm(false); setEditing(null); await refresh()
    } catch { alert('فشل حفظ الشهادة') } finally { setSaving(false) }
  }

  const handleDelete = async (item: any) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الشهادة؟')) return
    try { await api.delete(`/certificates/${item._id}`); await refresh() }
    catch { alert('فشل حذف الشهادة') }
  }

  const handleExport = () => downloadJson(items, 'certificates_updated.json')
  const openEdit = (item: any) => { setEditing(item); setShowForm(true) }
  const openAdd = () => { setEditing(null); setShowForm(true) }

  return (
    <div dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white font-arabic">إدارة الشهادات</h1>
          <p className="text-sm text-white/40 mt-1 font-arabic">إدارة الشهادات والاعتمادات</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 font-arabic">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            تصدير البيانات
          </button>
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 bg-gradient-to-br from-primary/90 to-primary/70 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] font-arabic">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            إضافة شهادة
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center"><p className="text-white/40 text-sm font-arabic">لا توجد شهادات بعد</p></div>
        ) : (
          <div className="p-2">
            {items.map((item: any, i: number) => (
              <div key={item._id || item.id} className="group flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-transparent hover:border-emerald-500/20 transition-all duration-300 mb-2 last:mb-0 hover:shadow-[0_0_15px_rgba(52,211,153,0.06)]" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-white/80 font-arabic">{item.title_ar || item.title || '—'}</span>
                    <span className="text-xs text-white/30">/</span>
                    <span className="text-sm text-white/50">{item.title_en || item.title || '—'}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/40">{item.organization_en || item.organization || '—'}</span>
                    <span className="text-xs text-white/20">·</span>
                    <span className="text-xs text-white/40 font-arabic">{item.category_ar || item.category || '—'}</span>
                    <span className="text-xs text-white/20">·</span>
                    <span className="text-xs text-white/40">{item.issueDate || '—'}</span>
                    <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${item.status === 'active' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' : item.status === 'expiring' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'bg-red-500/15 text-red-400 border border-red-500/20'}`}>
                      {item.status === 'active' ? 'نشط' : item.status === 'expiring' ? 'ينتهي قريباً' : 'منتهي'}
                    </span>
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
        <CertificateFormModal
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
  onSave: (data: Record<string, string>, image: string) => void
  onCancel: () => void
  saving?: boolean
}

function CertificateFormModal({ item, onSave, onCancel, saving }: ModalProps) {
  const [form, setForm] = useState(() => item ? {
    title_en: item.title_en || item.title || '',
    title_ar: item.title_ar || item.title || '',
    organization_en: item.organization_en || item.organization || '',
    organization_ar: item.organization_ar || '',
    description_en: item.description_en || item.description || '',
    description_ar: item.description_ar || '',
    category_en: item.category_en || item.category || '',
    category_ar: item.category_ar || item.category || '',
    issueDate: item.issueDate || '',
    expiryDate: item.expiryDate || '',
    status: item.status || 'active',
  } : {
    title_en: '', title_ar: '', organization_en: '', organization_ar: '',
    description_en: '', description_ar: '', category_en: '', category_ar: '',
    issueDate: '', expiryDate: '', status: 'active',
  })
  const [image, setImage] = useState(item?.image || '')
  const [selectedCatAr, setSelectedCatAr] = useState(() => {
    if (!item) return ''
    const cat = item.category_ar || item.category || ''
    const found = CERT_CATEGORIES.find(c => c.ar === cat || c.en === cat)
    return found ? found.ar : ''
  })
  const [compressing, setCompressing] = useState(false)
  const [compressStatus, setCompressStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { ...form }
    const preset = CERT_CATEGORIES.find(c => c.ar === selectedCatAr)
    if (preset) { payload.category_en = preset.en; payload.category_ar = preset.ar }
    onSave(payload, image)
  }

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleImage = async (files: FileList | null) => {
    if (!files || !files.length) return
    setCompressing(true); setCompressStatus('جاري ضغط ومعالجة الصورة...')
    try { setImage(await compressImage(files[0])) }
    catch { setCompressStatus('فشل ضغط الصورة'); await new Promise(r => setTimeout(r, 1200)) }
    setCompressing(false); setCompressStatus('')
  }

  return (
    <div className="fixed inset-0 z-50 min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-sm overflow-y-auto" onClick={onCancel}>
      <div className="relative w-full max-w-3xl bg-[#0D2B45] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-up my-auto" onClick={e => e.stopPropagation()}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/5 pointer-events-none" />
        <div className="relative">
          <h2 className="text-xl font-bold text-white mb-1 font-arabic">{item ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}</h2>
          <p className="text-sm text-white/40 mb-6 font-arabic">{item ? 'قم بتحديث بيانات الشهادة أدناه' : 'املأ بيانات الشهادة الجديدة'}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="اسم الشهادة بالإنجليزي" value={form.title_en} onChange={v => update('title_en', v)} />
              <InputField label="اسم الشهادة بالعربي" value={form.title_ar} onChange={v => update('title_ar', v)} />
              <InputField label="الجهة المانحة بالإنجليزي" value={form.organization_en} onChange={v => update('organization_en', v)} />
              <InputField label="الجهة المانحة بالعربي" value={form.organization_ar} onChange={v => update('organization_ar', v)} />

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">التصنيف</label>
                <div className="relative">
                  <select value={selectedCatAr} onChange={e => setSelectedCatAr(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none font-arabic cursor-pointer">
                    <option value="" disabled className="bg-[#0D2B45] text-white/40">-- اختر التصنيف --</option>
                    {CERT_CATEGORIES.map(c => (<option key={c.en} value={c.ar} className="bg-[#0D2B45] py-2">{c.ar} — {c.en}</option>))}
                  </select>
                </div>
              </div>

              <InputField label="تاريخ الإصدار" type="text" value={form.issueDate} onChange={v => update('issueDate', v)} placeholder="مثال: January 2025" />
              <InputField label="تاريخ الانتهاء" type="text" value={form.expiryDate} onChange={v => update('expiryDate', v)} placeholder="مثال: January 2028" />

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">الحالة</label>
                <div className="relative">
                  <select value={form.status} onChange={e => update('status', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none font-arabic cursor-pointer">
                    <option value="active" className="bg-[#0D2B45]">نشط</option>
                    <option value="expiring" className="bg-[#0D2B45]">ينتهي قريباً</option>
                    <option value="expired" className="bg-[#0D2B45]">منتهي</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextAreaField label="الوصف بالإنجليزي" value={form.description_en} onChange={v => update('description_en', v)} />
              <TextAreaField label="الوصف بالعربي" value={form.description_ar} onChange={v => update('description_ar', v)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">صورة الشهادة</label>
              <input type="file" accept="image/*" onChange={e => handleImage(e.target.files)} disabled={compressing} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/60 file:ml-3 file:mr-0 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-40 cursor-pointer" />
              {compressing && (
                <div className="flex items-center gap-3 mt-3 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 animate-fade-in">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
                  <span className="text-xs text-primary font-arabic">{compressStatus}</span>
                </div>
              )}
              {image && !compressing && (
                <div className="mt-3">
                  <div className="relative inline-block group aspect-[4/3] w-44 rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white/70 font-arabic">{((image.length * 3) / 4 / 1024).toFixed(0)} كيلوبايت</div>
                    <button type="button" onClick={() => setImage('')} className="absolute top-1 left-1 px-2 py-0.5 text-[10px] font-medium rounded-md bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">حذف</button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-medium rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 font-arabic">إلغاء</button>
              <button type="submit" disabled={saving || compressing} className="px-6 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 bg-gradient-to-br from-primary/90 to-primary/70 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 font-arabic">
                {(saving || compressing) && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {item ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-right" required dir={label.includes('بالعربي') ? 'rtl' : 'ltr'} />
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
