import { useState, useEffect } from 'react'

interface ProjectFormProps {
  project?: any | null
  onSave: (data: Record<string, string | number>, files: FileList | null) => Promise<void>
  onCancel: () => void
  saving?: boolean
}

export function ProjectForm({ project, onSave, onCancel, saving }: ProjectFormProps) {
  const [form, setForm] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    category_en: '',
    category_ar: '',
    location_en: '',
    location_ar: '',
    year: new Date().getFullYear().toString(),
    status: 'ongoing' as string,
  })
  const [imageFiles, setImageFiles] = useState<FileList | null>(null)

  useEffect(() => {
    if (project) {
      setForm({
        title_en: project.title_en || '',
        title_ar: project.title_ar || '',
        description_en: project.description_en || '',
        description_ar: project.description_ar || '',
        category_en: project.category_en || '',
        category_ar: project.category_ar || '',
        location_en: project.location_en || '',
        location_ar: project.location_ar || '',
        year: project.year?.toString() || new Date().getFullYear().toString(),
        status: project.status || 'ongoing',
      })
    }
  }, [project])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form, imageFiles)
  }

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onCancel}>
      <div className="relative w-full max-w-2xl bg-gray-950 border border-white/10 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none" />

        <div className="relative">
          <h2 className="text-xl font-bold text-white mb-1">
            {project ? 'Edit Project' : 'Add Project'}
          </h2>
          <p className="text-sm text-white/40 mb-6">
            {project ? 'Update the project details below' : 'Fill in the details for the new project'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Title (EN)" value={form.title_en} onChange={(v) => update('title_en', v)} />
              <InputField label="Title (AR)" value={form.title_ar} onChange={(v) => update('title_ar', v)} />
              <InputField label="Category (EN)" value={form.category_en} onChange={(v) => update('category_en', v)} />
              <InputField label="Category (AR)" value={form.category_ar} onChange={(v) => update('category_ar', v)} />
              <InputField label="Location (EN)" value={form.location_en} onChange={(v) => update('location_en', v)} />
              <InputField label="Location (AR)" value={form.location_ar} onChange={(v) => update('location_ar', v)} />
              <InputField label="Year" type="number" value={form.year} onChange={(v) => update('year', v)} />
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5 tracking-wide uppercase">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => update('status', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-300 appearance-none"
                >
                  <option value="ongoing" className="bg-gray-900">Ongoing</option>
                  <option value="completed" className="bg-gray-900">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextAreaField label="Description (EN)" value={form.description_en} onChange={(v) => update('description_en', v)} />
              <TextAreaField label="Description (AR)" value={form.description_ar} onChange={(v) => update('description_ar', v)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/60 mb-1.5 tracking-wide uppercase">Images</label>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImageFiles(e.target.files)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/60 file:mr-3 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 text-sm font-medium rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 bg-gradient-to-br from-emerald-500/90 to-teal-600/70 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
              >
                {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {project ? 'Update' : 'Create'}
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
      <label className="block text-xs font-semibold text-white/60 mb-1.5 tracking-wide uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-300"
        required
      />
    </div>
  )
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/60 mb-1.5 tracking-wide uppercase">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-300 resize-none"
      />
    </div>
  )
}
