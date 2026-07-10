import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'al-noor-tower',
    title: 'Al Noor Business Tower',
    category: 'Commercial',
    location: 'Dubai, UAE',
    description:
      'A 65-story commercial skyscraper featuring state-of-the-art office spaces, premium retail outlets, and world-class amenities. The tower stands as a landmark of modern engineering excellence.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d81bb4b88d9b?w=800&q=80',
    ],
    year: 2024,
    client: 'Al Noor Holdings',
    value: '$450M',
    status: 'completed',
  },
  {
    id: 'pearl-residences',
    title: 'Pearl Luxury Residences',
    category: 'Residential',
    location: 'Abu Dhabi, UAE',
    description:
      'An exclusive residential development featuring 250 luxury apartments with panoramic ocean views, private beaches, and world-class amenities.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    ],
    year: 2023,
    client: 'Pearl Developments',
    value: '$280M',
    status: 'completed',
  },
  {
    id: 'gulf-highway',
    title: 'Gulf Coastal Highway',
    category: 'Infrastructure',
    location: 'Eastern Province, KSA',
    description:
      'A 180-kilometer coastal highway connecting major industrial cities, featuring 12 interchanges, 8 bridges, and advanced traffic management systems.',
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    ],
    year: 2024,
    client: 'Ministry of Transport',
    value: '$1.2B',
    status: 'ongoing',
  },
  {
    id: 'green-city',
    title: 'Green City Sustainable Community',
    category: 'Residential',
    location: 'Riyadh, KSA',
    description:
      'A sustainable smart city development with 5,000 residential units, powered entirely by renewable energy, featuring integrated green spaces and smart infrastructure.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    year: 2025,
    client: 'Green City Initiative',
    value: '$2.1B',
    status: 'ongoing',
  },
  {
    id: 'industrial-park',
    title: 'Al Taawun Industrial Park',
    category: 'Industrial',
    location: 'Jubail, KSA',
    description:
      'A 2-million-square-meter industrial park housing 40 manufacturing facilities with shared utility infrastructure, logistics hubs, and worker accommodation.',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    ],
    year: 2023,
    client: 'Saudi Industrial Development Fund',
    value: '$890M',
    status: 'completed',
  },
  {
    id: 'grand-hotel',
    title: 'Grand Horizon Hotel & Resort',
    category: 'Commercial',
    location: 'Doha, Qatar',
    description:
      'A 5-star luxury hotel with 450 rooms, convention center, spa facilities, and private beach access. The architectural design blends modern luxury with local heritage.',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    ],
    year: 2024,
    client: 'Horizon Hospitality Group',
    value: '$620M',
    status: 'completed',
  },
]
