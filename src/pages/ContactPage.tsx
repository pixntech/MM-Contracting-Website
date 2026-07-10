import { lazy } from 'react'

const Contact = lazy(() => import('../sections/Contact').then((m) => ({ default: m.Contact })))
const Map = lazy(() => import('../sections/Map').then((m) => ({ default: m.Map })))

export function ContactPage() {
  return (
    <div className="pt-28">
      <Contact />
      <Map />
    </div>
  )
}
