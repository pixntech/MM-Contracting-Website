import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AuthProvider } from './context/AuthContext'

const Layout = lazy(() =>
  import('./components/layout/Layout').then((m) => ({ default: m.Layout }))
)
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage }))
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
)
const CertificatesPage = lazy(() =>
  import('./pages/CertificatesPage').then((m) => ({ default: m.CertificatesPage }))
)
const PartnersPage = lazy(() =>
  import('./pages/PartnersPage').then((m) => ({ default: m.PartnersPage }))
)

const AdminLogin = lazy(() =>
  import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin }))
)
const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
)
const ProjectsManager = lazy(() =>
  import('./pages/admin/ProjectsManager').then((m) => ({ default: m.ProjectsManager }))
)
const AdminNews = lazy(() =>
  import('./pages/admin/AdminNews').then((m) => ({ default: m.AdminNews }))
)
const AdminCertificates = lazy(() =>
  import('./pages/admin/AdminCertificates').then((m) => ({ default: m.AdminCertificates }))
)
const AdminServices = lazy(() =>
  import('./pages/admin/AdminServices').then((m) => ({ default: m.AdminServices }))
)
const AdminLayout = lazy(() =>
  import('./components/admin/AdminLayout').then((m) => ({ default: m.AdminLayout }))
)
const ProtectedRoute = lazy(() =>
  import('./components/admin/ProtectedRoute').then((m) => ({ default: m.ProtectedRoute }))
)

const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound }))
)

function PageLoading() {
  const { t } = useTranslation()
  return(
    <div
      style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'#ffffff',zIndex:9999,transition:'opacity 0.3s ease-out'}}>
      <img src="/Logo_Loading.gif" alt={t('common.loading')} style={{maxWidth:'30%',maxHeight:'30%',aspectRatio:'auto'}} />
    </div>
  );
}

function MetaUpdater() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('site.title')
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', t('site.description'))
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', t('site.ogTitle'))
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', t('site.ogDescription'))
  }, [t, i18n.language])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoading />}>
          <MetaUpdater />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/projects" element={<ProjectsManager />} />
                <Route path="/admin/news" element={<AdminNews />} />
                <Route path="/admin/certificates" element={<AdminCertificates />} />
                <Route path="/admin/services" element={<AdminServices />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}
