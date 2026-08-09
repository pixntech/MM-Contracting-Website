export const COMPANY = {
  name: 'MM Contracting & Supplying Co.',
  shortName: 'MM',
  tagline: 'Contracting & Supplying Co.',
  description:
    'MM Contracting & Supplying Co. is a Cairo-based contracting and supplying company headquartered in Sheraton Heliopolis.',
  phone: '+20 2 2266 2332',
  phoneHref: '+20222662332',
  fax: '+20 2 2266 2331',
  email: 'info@mm-contracting.com',
  address: '1 Khaled Ibn El Walid St. – First Floor – Sheraton Heliopolis – Cairo – Egypt',
  commercialRegister: '415939',
  taxCardId: '313274-584',
  federationMembership: '63029',
  federationMembershipYear: '2017',
  mapsQuery:
    '1 Khaled Ibn El Walid St, First Floor, Sheraton Heliopolis, Cairo, Egypt',
} as const

export const getDirectionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(COMPANY.mapsQuery)}`

export const getMapEmbedUrl = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.mapsQuery)}&output=embed`

export const METADATA = {
  title: 'MM Contracting & Supplying Co. - Cairo, Egypt',
  description:
    'MM Contracting & Supplying Co. — contracting and supplying company based in Sheraton Heliopolis, Cairo, Egypt.',
  url: 'https://mm-contracting.com',
} as const
