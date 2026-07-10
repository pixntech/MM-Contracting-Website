import 'leaflet/dist/leaflet.css'
import { COMPANY } from '../constants'
import { MapView } from '../components/ui/MapView'

export function Map() {
  return (
    <section className="h-96 md:h-[450px] relative">
      <MapView
        center={COMPANY.coordinates as [number, number]}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      />
    </section>
  )
}
