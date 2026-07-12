import type { ReactNode } from 'react'

interface Column {
  key: string
  header: string
  render?: (item: any) => ReactNode
}

interface AdminTableProps {
  columns: Column[]
  data: any[]
  loading?: boolean
  error?: string | null
  onEdit?: (item: any) => void
  onDelete?: (item: any) => void
  keyExtractor: (item: any) => string
}

export function AdminTable({
  columns,
  data,
  loading,
  error,
  onEdit,
  onDelete,
  keyExtractor,
}: AdminTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-5 text-red-400 text-sm">
        {error}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
        <p className="text-white/40 text-sm">No items found</p>
      </div>
    )
  }

  return (
    <div className="p-1">
      {data.map((item) => (
        <div
          key={keyExtractor(item)}
          className="group flex items-center gap-4 px-5 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all duration-300 mb-2 last:mb-0"
        >
          {columns.map((col) => (
            <div key={col.key} className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-1 md:hidden">
                {col.header}
              </div>
              <div className="text-sm text-white/80 truncate">
                {col.render ? col.render(item) : String(item[col.key] ?? '')}
              </div>
            </div>
          ))}
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-2 shrink-0">
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="px-3.5 py-2 text-xs font-medium rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)] transition-all duration-300"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(item)}
                  className="px-3.5 py-2 text-xs font-medium rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all duration-300"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
