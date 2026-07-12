import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/admin/dashboard', label: 'لوحة التحكم', icon: '📊' },
  { to: '/admin/projects', label: 'المشاريع', icon: '🏗️' },
  { to: '/admin/news', label: 'الأخبار', icon: '📰' },
  { to: '/admin/certificates', label: 'الشهادات', icon: '📜' },
  { to: '/admin/services', label: 'الخدمات', icon: '⚙️' },
]

export function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0D2B45] flex" dir="rtl">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -left-20 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <aside className="relative w-64 bg-white/5 backdrop-blur-md border-l border-white/10 flex flex-col shrink-0 z-10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(65,157,240,0.08)]">
              <span className="text-sm font-bold text-primary">MM</span>
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-l from-primary to-primary/70 bg-clip-text text-transparent font-arabic">
                لوحة التحكم
              </h1>
              <p className="text-xs text-white/40 font-arabic">{admin?.name || 'المسؤول'}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 font-arabic relative ${
                  isActive
                    ? 'bg-gradient-to-l from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(65,157,240,0.08)]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full shadow-[0_0_6px_rgba(65,157,240,0.5)]" />
                  )}
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 mt-auto">
          <div className="border-t border-white/10 pt-3">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 font-arabic group"
            >
              <span className="text-lg">🚪</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="relative flex-1 p-8 overflow-auto z-10" key={location.pathname}>
        <div className="animate-fade-up">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
