import { useState, useEffect } from 'react'

interface NewsFormProps {
  newsItem?: any | null
  onSave: (data: Record<string, string>) => void
  onCancel: () => void
  saving?: boolean
}

export function NewsForm({ newsItem, onSave, onCancel, saving }: NewsFormProps) {
  const [form, setForm] = useState({
    title_en: '',
    title_ar: '',
    excerpt_en: '',
    excerpt_ar: '',
    category_en: '',
    category_ar: '',
    date: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (newsItem) {
      setForm({
        title_en: newsItem.title_en || '',
        title_ar: newsItem.title_ar || '',
        excerpt_en: newsItem.excerpt_en || '',
        excerpt_ar: newsItem.excerpt_ar || '',
        category_en: newsItem.category_en || '',
        category_ar: newsItem.category_ar || '',
        date: newsItem.date?.split('T')[0] || new Date().toISOString().split('T')[0],
      })
    }
  }, [newsItem])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onCancel}>
      <div className="relative w-full max-w-3xl bg-[#0D2B45] border border-white/10 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/5 pointer-events-none" />

        <div className="relative">
          <h2 className="text-xl font-bold text-white mb-1 font-arabic">
            {newsItem ? 'تعديل الخبر' : 'إضافة خبر جديد'}
          </h2>
          <p className="text-sm text-white/40 mb-6 font-arabic">
            {newsItem ? 'قم بتحديث بيانات الخبر أدناه' : 'املأ بيانات الخبر الجديد'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="عنوان الخبر بالإنجليزي" value={form.title_en} onChange={(v) => update('title_en', v)} />
              <InputField label="عنوان الخبر بالعربي" value={form.title_ar} onChange={(v) => update('title_ar', v)} />
              <InputField label="التصنيف بالإنجليزي" value={form.category_en} onChange={(v) => update('category_en', v)} />
              <InputField label="التصنيف بالعربي" value={form.category_ar} onChange={(v) => update('category_ar', v)} />
              <InputField label="التاريخ" type="date" value={form.date} onChange={(v) => update('date', v)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextAreaField label="الملخص بالإنجليزي" value={form.excerpt_en} onChange={(v) => update('excerpt_en', v)} />
              <TextAreaField label="الملخص بالعربي" value={form.excerpt_ar} onChange={(v) => update('excerpt_ar', v)} />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 text-sm font-medium rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 font-arabic"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 bg-gradient-to-br from-primary/90 to-primary/70 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 font-arabic"
              >
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {newsItem ? 'تحديث' : 'إضافة'}
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
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 text-right"
        required
        dir={label.includes('بالعربي') ? 'rtl' : 'ltr'}
      />
    </div>
  )
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/60 mb-1.5 font-arabic">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none text-right"
        dir={label.includes('بالعربي') ? 'rtl' : 'ltr'}
      />
    </div>
  )
}
