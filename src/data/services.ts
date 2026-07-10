import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'infrastructure',
    title: 'Infrastructure Development',
    description:
      'Design and construction of critical infrastructure including highways, bridges, utilities, and transportation networks.',
    icon: 'Road',
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    features: [
      'Highways & Roads',
      'Bridge Construction',
      'Utility Networks',
      'Tunneling',
      'Railway Systems',
      'Ports & Harbors',
    ],
  },
  {
    id: 'industrial',
    title: 'Industrial Projects',
    description:
      'Specialized industrial facilities designed for efficiency, safety, and compliance with international standards.',
    icon: 'Factory',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    features: [
      'Manufacturing Plants',
      'Warehouses & Logistics',
      'Power Plants',
      'Oil & Gas Facilities',
      'Chemical Plants',
      'Processing Facilities',
    ],
  },
  {
    id: 'designBuild',
    title: 'Design & Build',
    description:
      'Integrated design-build solutions that streamline project delivery through single-point accountability.',
    icon: 'PenTool',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    features: [
      'Architectural Design',
      'Structural Engineering',
      'MEP Engineering',
      'Interior Design',
      'Sustainable Design',
      'BIM Services',
    ],
  },
]
