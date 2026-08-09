import type { HistoryMilestone } from '../types'

export const milestones: HistoryMilestone[] = [
  {
    id: 'founded',
    year: 1991,
    title: 'Foundation of MM Contracting',
    description:
      'MM Contracting was established with a vision to become a leading force in the construction industry. Starting with a small team of 20 engineers, the company undertook its first residential project in Dubai.',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb4b88d9b?w=800&q=80',
    icon: 'Building2',
    achievement: 'Founded',
    order: 1,
  },
  {
    id: 'first-major',
    year: 2002,
    title: 'First Major Infrastructure Project',
    description:
      'Awarded our first large-scale infrastructure contract — a 45 km highway project connecting key economic zones. This marked MM Contracting\'s entry into the infrastructure sector and established our reputation for delivery excellence.',
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    icon: 'Road',
    achievement: '45 KM',
    highlight: 'First infrastructure contract awarded in the northern region',
    order: 2,
  },
  {
    id: 'international',
    year: 2006,
    title: 'International Expansion',
    description:
      'Opened regional offices in Saudi Arabia and Qatar, expanding operations beyond the UAE. Within two years, we secured contracts worth $500M across the GCC region, establishing a truly international footprint.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    icon: 'Globe',
    achievement: '3 Countries',
    order: 3,
  },
  {
    id: 'landmark',
    year: 2010,
    title: 'Landmark Tower Completion',
    description:
      'Completed our first super-tall building — a 65-story commercial tower in the heart of the business district. This project showcased our capability to deliver complex high-rise structures to international standards.',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
    icon: 'Building',
    achievement: '65 Stories',
    stats: [
      { value: '65', label: 'Stories' },
      { value: '280m', label: 'Height' },
    ],
    order: 4,
  },
  {
    id: 'diversification',
    year: 2014,
    title: 'Diversification into Industrial Sector',
    description:
      'Entered the industrial construction sector with a $1.2B petrochemical plant contract. This strategic move diversified our portfolio, reduced market risk, and positioned us as a key player in the energy sector.',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    icon: 'Factory',
    achievement: '$1.2B',
    highlight: 'Largest single contract in company history',
    order: 5,
  },
  {
    id: 'workforce',
    year: 2017,
    title: 'Workforce Expansion to 10,000+',
    description:
      'Our workforce grew to over 10,000 professionals across 15 countries. We invested heavily in training programs, safety protocols, and state-of-the-art construction technology to support our expanding operations.',
    image:
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    icon: 'Users',
    achievement: '10,000+',
    stats: [
      { value: '10,000+', label: 'Employees' },
      { value: '15', label: 'Countries' },
    ],
    order: 6,
  },
  {
    id: 'sustainability',
    year: 2021,
    title: 'Sustainability & Innovation Leadership',
    description:
      'Launched our Green Building Division and achieved ISO 14001 certification. We completed our first net-zero carbon project and committed to sustainable construction practices across all operations globally.',
    image:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    icon: 'Award',
    achievement: 'Net Zero',
    order: 7,
  },
  {
    id: 'present',
    year: 2025,
    title: 'Global Engineering Powerhouse',
    description:
      'Today, MM Contracting stands as one of the region\'s most respected engineering and construction companies with 12,000+ employees, 1,500+ projects delivered, and operations across 25+ countries worldwide.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    icon: 'Trophy',
    achievement: '1,500+ Projects',
    stats: [
      { value: '12,000+', label: 'Professionals' },
      { value: '1,500+', label: 'Projects' },
      { value: '25+', label: 'Countries' },
    ],
    order: 8,
  },
]
