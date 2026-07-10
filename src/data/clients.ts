import type { Client } from '../types'

export const clients: Client[] = [
  { id: 'client-1', name: 'Abu Dhabi National Oil Company', logo: '' },
  { id: 'client-2', name: 'Saudi Aramco', logo: '' },
  { id: 'client-3', name: 'QatarEnergy', logo: '' },
  { id: 'client-4', name: 'Dubai Holding', logo: '' },
  { id: 'client-5', name: 'Kuwait Petroleum Corporation', logo: '' },
  { id: 'client-6', name: 'Oman Oil & Gas', logo: '' },
]

export const testimonials: Client[] = [
  {
    id: 'testimonial-1',
    name: 'Saudi Aramco',
    logo: '',
    testimonial:
      'MM Contracting delivered our largest refinery expansion project ahead of schedule and under budget. Their engineering expertise and project management capabilities are world-class.',
    author: 'Ahmed Al-Rashid',
    role: 'Senior VP, Projects',
  },
  {
    id: 'testimonial-2',
    name: 'Dubai Holding',
    logo: '',
    testimonial:
      'The quality of work delivered on the Al Noor Tower exceeded our expectations. MM Contracting demonstrated exceptional attention to detail and commitment to excellence.',
    author: 'Sarah Al-Maktoum',
    role: 'CEO, Real Estate Division',
  },
  {
    id: 'testimonial-3',
    name: 'QatarEnergy',
    logo: '',
    testimonial:
      'We have partnered with MM Contracting on multiple projects over the past decade. Their reliability, safety record, and technical capability make them a trusted strategic partner.',
    author: 'Khalid Al-Thani',
    role: 'Director of Projects',
  },
]
