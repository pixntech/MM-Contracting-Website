import { useEffect, useState, useCallback } from 'react'
import api from '../../api/axios'
import { compressImage } from '../../utils/compressImage'

const CATEGORIES = [
  { en: 'Residential Buildings', ar: 'مباني سكنية' },
  { en: 'Commercial & Administrative', ar: 'مباني تجارية وإدارية' },
  { en: 'Infrastructure & Networks', ar: 'أعمال البنية التحتية والشبكات' },
  { en: 'Industrial Projects & Warehouses', ar: 'مشاريع صناعية ومستودعات' },
  { en: 'Fit-outs & Interior Design', ar: 'التشطيبات والديكور الداخلي' },
  { en: 'Other', ar: 'أخرى' },
]

function downloadJson(data: any[], filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const res = await api.get('/projects')
      setProjects(res.data)
    } catch {
      setProjects([])
    }
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const handleSave = async (formData: Record<string, string>, images: string[]) => {
    setSaving(true)
    try {
      const payload = { ...formData, images }
      if (editing) {
        await api.put(`/projects/${editing._id}`, payload)
      } else {
        await api.post('/projects', payload)
      }
      setShowForm(false)
      setEditing(null)
      await refresh()
    } catch {
      alert('فشل حفظ المشروع')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (project: any) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) return
    try {
      await api.delete(`/projects/${project._id}`)
      await refresh()
    } catch {
      alert('فشل حذف المشروع')
    }
  }

  const handleExport = () => downloadJson(projects, 'projects_updated.json')
  const openEdit = (project: any) => { setEditing(project); setShowForm(true) }
  const openAdd = () => { setEditing(null); setShowForm(true) }

  return (
    <div dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white font-arabic">إدارة المشاريع</h1>
          <p className="text-sm text-white/40 mt-1 font-arabic">إدارة محفظة المشاريع الخاصة بك</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 font-arabic">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            تصدير البيانات
          </button>
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 bg-gradient-to-br from-primary/90 to-primary/70 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] font-arabic">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            إضافة مشروع
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-12 text-center"><p className="text-white/40 text-sm font-arabic">لا توجد مشاريع بعد</p></div>
        ) : (
          <div className="p-2">
            {projects.map((project: any, i: number) => (
              <div key={project._id || project.id} className="group flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-transparent hover:border-emerald-500/20 transition-all duration-300 mb-2 last:mb-0 hover:shadow-[0_0_15px_rgba(52,211,153,0.06)]" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-white/80 font-arabic">{project.title_ar || project.title || '—'}</span>
                    <span className="text-xs text-white/30">/</span>
                    <span className="text-sm text-white/50">{project.title_en || project.title || '—'}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-white/40 font-arabic">{project.category_ar || project.category || '—'}</span>
                    <span className="text-xs text-white/20">·</span>
                    <span className="text-xs text-white/40">{project.location_en || project.location_ar || project.location || '—'}</span>
                    <span className="text-xs text-white/20">·</span>
                    <span className="text-xs text-white/40">{project.year || '—'}</span>
                    <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${project.status === 'completed' ? 'bg-primary/15 text-primary border border-primary/20' : 'bg-accent/15 text-accent border border-accent/20'}`}>
                      {project.status === 'completed' ? 'منتهي' : 'قيد التنفيذ'}
                    </span>
                    {(project.images?.length > 0 || project.image) && (
                      <span className="text-xs text-white/30 font-arabic">· {project.images?.length || 1} صورة</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => openEdit(project)} className="px-3.5 py-2 text-xs font-medium rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(65,157,240,0.1)] transition-all duration-300 font-arabic">تعديل</button>
                  <button onClick={() => handleDelete(project)} className="px-3.5 py-2 text-xs font-medium rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all duration-300 font-arabic">حذف</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <ProjectFormModal
          project={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          saving={saving}
        />
      )}
    </div>
  )
}

interface ModalProps {
  project?: any | null
  onSave: (data: Record<string, string>, images: string[]) => void
  onCancel: () => void
  saving?: boolean
}

const DEFAULT_FORM = {
  title_en: '', title_ar: '', description_en: '', description_ar: '',
  category_en: '', category_ar: '', location_en: '', location_ar: '',
  year: new Date().getFullYear().toString(), status: 'ongoing',
}

function ProjectFormModal({ project, onSave, onCancel, saving }: ModalProps) {
  const [form, setForm] = useState(() => project ? {
    title_en: project.title_en || project.title || '',
    title_ar: project.title_ar || project.title || '',
    description_en: project.description_en || project.description || '',
    description_ar: project.description_ar || '',
    category_en: project.category_en || project.category || '',
    category_ar: project.category_ar || project.category || '',
    location_en: project.location_en || project.location || '',
    location_ar: project.location_ar || project.location || '',
    year: project.year?.toString() || new Date().getFullYear().toString(),
    status: project.status || 'ongoing',
  } : { ...DEFAULT_FORM })

  const [images, setImages] = useState<string[]>(project?.images || (project?.image ? [project.image] : []))
  const [compressing, setCompressing] = useState(false)
  const [compressStatus, setCompressStatus] = useState('')
  const [selectedCategoryAr, setSelectedCategoryAr] = useState(() => {
    if (!project) return ''
    const cat = project.category_ar || project.category || ''
    const found = CATEGORIES.find(c => c.ar === cat || c.en === cat)
    return found ? found.ar : cat
  })
  const [customCategoryAr, setCustomCategoryAr] = useState('')
  const [customCategoryEn, setCustomCategoryEn] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { ...form }
    if (selectedCategoryAr === 'أخرى') {
      payload.category_ar = customCategoryAr
      payload.category_en = customCategoryEn
    }
    onSave(payload, images)
  }

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryAr(value)
    if (value === 'أخرى') {
      setForm(prev => ({ ...prev, category_en: '', category_ar: '' }))
    } else {
      const found = CATEGORIES.find(c => c.ar === value)
      if (found) setForm(prev => ({ ...prev, category_en: found.en, category_ar: found.ar }))
    }
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setCompressing(true)
    setCompressStatus('جاري ضغط ومعالجة الصورة...')
    const compressed: string[] = []
    for (let i = 0; i < files.length; i++) {
      try { compressed.push(await compressImage(files[i])) }
      catch { setCompressStatus(`فشل ضغط: ${files[i].name}`); await new Promise(r => setTimeout(r, 1200)) }
    }
    setImages(prev => [...prev, ...compressed])
    setCompressing(false)
    setCompressStatus('')
  }

  const removeImage = (index: number) => setImages(prev => prev.filter((_, i) => i !== index))
  const isOther = selectedCategoryAr === 'أخرى'

  return (
    <div className="fixed inset-0 z-50 min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-sm overflow-y-auto" onClick={onCancel}>
      <div className="relative w-full max-w-3xl bg-[#0D2B45] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-up my-auto" onClick={e => e.stopPropagation()}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/5 pointer-events-none" />
        <div className="relative">
          <h2 className="text-xl font-bold text-white mb-1 font-arabic">{project ? 'تعديل المشروع' : 'إضافة مشروع جديد'}</h2>
          <p className="text-sm text-white/40 mb-6 font-arabic">{project ? 'قم بتحديث بيانات المشروع أدناه' : 'املأ بيانات المشروع الجديد'}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="اسم المشروع بالإنجليزي" value={form.title_en} onChange={v => update('title_en', v)} />
              <InputField label="اسم المشروع بالعربي" value={form.title_ar} onChange={v => update('title_ar', v)} />

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">التصنيف (قائمة منسدلة)</label>
                <div className="relative">
                  <select value={selectedCategoryAr} onChange={e => handleCategoryChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none font-arabic cursor-pointer">
                    <option value="" disabled className="bg-[#0D2B45] text-white/40">-- اختر التصنيف --</option>
                    {CATEGORIES.map(cat => (<option key={cat.en} value={cat.ar} className="bg-[#0D2B45] py-2">{cat.ar} — {cat.en}</option>))}
                  </select>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-out ${isOther ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">اسم التصنيف الجديد بالعربي</label>
                      <input type="text" value={customCategoryAr} onChange={e => setCustomCategoryAr(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-right font-arabic" placeholder="أدخل اسم التصنيف بالعربي" dir="rtl" required={isOther} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/60 mb-1.5">New Category Name (English)</label>
                      <input type="text" value={customCategoryEn} onChange={e => setCustomCategoryEn(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300" placeholder="Enter category name in English" required={isOther} />
                    </div>
                  </div>
                </div>
              </div>

              <InputField label="الموقع بالإنجليزي" value={form.location_en} onChange={v => update('location_en', v)} />
              <InputField label="الموقع بالعربي" value={form.location_ar} onChange={v => update('location_ar', v)} />
              <InputField label="السنة" type="number" value={form.year} onChange={v => update('year', v)} />
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">الحالة</label>
                <div className="relative">
                  <select value={form.status} onChange={e => update('status', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none font-arabic cursor-pointer">
                    <option value="ongoing" className="bg-[#0D2B45]">قيد التنفيذ</option>
                    <option value="completed" className="bg-[#0D2B45]">منتهي</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextAreaField label="الوصف بالإنجليزي" value={form.description_en} onChange={v => update('description_en', v)} />
              <TextAreaField label="الوصف بالعربي" value={form.description_ar} onChange={v => update('description_ar', v)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">الصور</label>
              <input type="file" multiple accept="image/*" onChange={e => handleFiles(e.target.files)} disabled={compressing} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/60 file:ml-3 file:mr-0 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-40 cursor-pointer" />
              {compressing && (
                <div className="flex items-center gap-3 mt-3 bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 animate-fade-in">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
                  <span className="text-xs text-primary font-arabic">{compressStatus}</span>
                </div>
              )}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                  {images.map((base64, idx) => (
                    <div key={idx} className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_12px_rgba(52,211,153,0.08)]">
                      <img src={base64} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <button type="button" onClick={() => removeImage(idx)} className="opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/80 text-white hover:bg-red-500 backdrop-blur-sm">حذف</button>
                      </div>
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-[10px] text-white/70 font-arabic">{((base64.length * 3) / 4 / 1024).toFixed(0)} كيلوبايت</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-medium rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 font-arabic">إلغاء</button>
              <button type="submit" disabled={saving || compressing} className="px-6 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 bg-gradient-to-br from-primary/90 to-primary/70 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 font-arabic">
                {(saving || compressing) && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {project ? 'تحديث' : 'إضافة'}
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
