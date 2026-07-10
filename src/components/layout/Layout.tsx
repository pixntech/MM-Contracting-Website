import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [pathname, hash])

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full max-w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
