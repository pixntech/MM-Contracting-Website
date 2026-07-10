import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
