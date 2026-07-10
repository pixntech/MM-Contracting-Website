export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  image: string
  features: string[]
}

export interface Project {
  id: string
  title: string
  category: string
  location: string
  description: string
  image: string
  images: string[]
  year: number
  client: string
  value: string
  status: 'completed' | 'ongoing'
}

export interface Industry {
  id: string
  title: string
  description: string
  icon: string
  image: string
}

export interface Partner {
  id: string
  name: string
  logo: string
  description?: string
  industry?: string
  website?: string
  partnershipType?: string
  order: number
}

export interface Client {
  id: string
  name: string
  logo: string
  testimonial?: string
  author?: string
  role?: string
}

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  slug: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
  width: number
  height: number
  title?: string
  order: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
}

export interface CompanyInfo {
  name: string
  tagline: string
  description: string
  phone: string
  email: string
  address: string
  coordinates: [number, number]
  founded: number
  employees: string
  projectsDelivered: number
}

export interface VisionMission {
  vision: {
    title: string
    description: string
  }
  mission: {
    title: string
    description: string
  }
}

export interface WhyChooseUsItem {
  id: string
  title: string
  description: string
  icon: string
}

export interface Certificate {
  id: string
  title: string
  organization: string
  description: string
  category: string
  image: string
  issueDate: string
  expiryDate?: string
  status: 'active' | 'expiring' | 'expired'
  order: number
}

export interface MilestoneStat {
  value: string
  label: string
}

export interface HistoryMilestone {
  id: string
  year: number
  title: string
  description: string
  image?: string
  icon?: string
  achievement?: string
  order: number
  highlight?: string
  stats?: MilestoneStat[]
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  honeypot?: string
}
