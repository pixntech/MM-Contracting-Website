import { createContext, useState, useEffect, type ReactNode } from 'react'
import type { AxiosResponse } from 'axios'
import api from '../api/axios'

const SESSION_KEY = 'admin_session'
const TOKEN_KEY = 'admin_token'

interface AdminUser {
  name: string
  email: string
}

interface AuthContextType {
  admin: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>({
  admin: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setLoading(false)
      return
    }
    api.get('/auth/verify')
      .then((res: AxiosResponse) => {
        setAdmin(res.data.admin)
        localStorage.setItem(SESSION_KEY, 'true')
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(SESSION_KEY)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem(TOKEN_KEY, res.data.token)
      localStorage.setItem(SESSION_KEY, 'true')
      setAdmin(res.data.admin)
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'فشل تسجيل الدخول'
      throw new Error(msg)
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(SESSION_KEY)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider
      value={{ admin, loading, login, logout, isAuthenticated: !!admin }}
    >
      {children}
    </AuthContext.Provider>
  )
}
