import { lazy } from 'react'

const Hero = lazy(() => import('../sections/Hero').then((m) => ({ default: m.Hero })))
const About = lazy(() => import('../sections/About').then((m) => ({ default: m.About })))
// const VisionMission = lazy(() => import('../sections/VisionMission').then((m) => ({ default: m.VisionMission })))
const Statistics = lazy(() => import('../sections/Statistics').then((m) => ({ default: m.Statistics })))
const Services = lazy(() => import('../sections/Services').then((m) => ({ default: m.Services })))
const FeaturedProjects = lazy(() => import('../sections/FeaturedProjects').then((m) => ({ default: m.FeaturedProjects })))
const WhyChooseUs = lazy(() => import('../sections/WhyChooseUs').then((m) => ({ default: m.WhyChooseUs })))
const CompanyHistory = lazy(() => import('../sections/CompanyHistory').then((m) => ({ default: m.CompanyHistory })))
const Industries = lazy(() => import('../sections/Industries').then((m) => ({ default: m.Industries })))
const Partners = lazy(() => import('../sections/Partners').then((m) => ({ default: m.Partners })))
const Clients = lazy(() => import('../sections/Clients').then((m) => ({ default: m.Clients })))
const LatestNews = lazy(() => import('../sections/LatestNews').then((m) => ({ default: m.LatestNews })))
const Certificates = lazy(() => import('../sections/Certificates').then((m) => ({ default: m.Certificates })))
const Gallery = lazy(() => import('../sections/Gallery').then((m) => ({ default: m.Gallery })))
const Contact = lazy(() => import('../sections/Contact').then((m) => ({ default: m.Contact })))
const Map = lazy(() => import('../sections/Map').then((m) => ({ default: m.Map })))

export function Home() {
  return (
    <>
      <Hero />
      <About />
      {/* <VisionMission /> */}
      <Partners />
      <Statistics />
      <Certificates /> 
      <Gallery />
      <CompanyHistory />
      <Services />
      <FeaturedProjects />
      <WhyChooseUs />
      <Industries />
      <Clients />
      <LatestNews />
      <Contact />
      <Map />
    </>
  )
}
