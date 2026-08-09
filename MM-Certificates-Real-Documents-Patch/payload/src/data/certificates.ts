import type { Certificate } from '../types'

export const certificateCategories = [
  { id: 'all', label: 'All' },
  { id: 'tax', label: 'Tax' },
  { id: 'registration', label: 'Registration' },
  { id: 'membership', label: 'Membership' },
  { id: 'legal', label: 'Legal' },
] as const

export const certificates: Certificate[] = [
  {
    id: 'tax-card-313-274-584',
    title: 'Taxation Card No. 313-274-584',
    titleAr: 'البطاقة الضريبية رقم 313-274-584',
    organization: 'Egyptian Tax Authority',
    organizationAr: 'مصلحة الضرائب المصرية',
    description:
      'Official taxation card issued for MM Contracting & Supplying Co., documenting the company tax registration and declared business activity.',
    descriptionAr:
      'البطاقة الضريبية الرسمية لشركة إم إم للمقاولات والتوريدات، وتوضح بيانات التسجيل الضريبي والنشاط المسجل للشركة.',
    category: 'tax',
    image: '/certificates/tax-card.webp',
    pages: ['/certificates/tax-card.webp'],
    referenceNumber: '313-274-584',
    issueDate: '2017',
    status: 'active',
    order: 1,
  },
  {
    id: 'vat-registration',
    title: 'Value Added Tax Registration Certificate',
    titleAr: 'شهادة تسجيل الضريبة على القيمة المضافة',
    organization: 'Egyptian Tax Authority',
    organizationAr: 'مصلحة الضرائب المصرية',
    description:
      'Official certificate confirming the company registration under the Egyptian Value Added Tax system.',
    descriptionAr:
      'شهادة رسمية تثبت تسجيل الشركة لدى مصلحة الضرائب المصرية ضمن نظام الضريبة على القيمة المضافة.',
    category: 'tax',
    image: '/certificates/vat-registration.webp',
    pages: ['/certificates/vat-registration.webp'],
    referenceNumber: '313-274-584',
    status: 'active',
    order: 2,
  },
  {
    id: 'efcbc-membership-63029',
    title: 'Egyptian Federation for Construction & Building Contractors Membership',
    titleAr: 'عضوية الاتحاد المصري لمقاولي التشييد والبناء',
    organization: 'Egyptian Federation for Construction & Building Contractors',
    organizationAr: 'الاتحاد المصري لمقاولي التشييد والبناء',
    description:
      'Official contractor membership and classification documents for MM Contracting & Supplying Co. The company profile identifies the membership as First Category Integrated.',
    descriptionAr:
      'مستندات العضوية والتصنيف الرسمية لشركة إم إم للمقاولات والتوريدات لدى الاتحاد المصري لمقاولي التشييد والبناء، ومذكور بملف الشركة أنها من الفئة الأولى المتكاملة.',
    category: 'membership',
    image: '/certificates/federation-membership.webp',
    pages: [
      '/certificates/federation-membership.webp',
      '/certificates/federation-classification.webp',
    ],
    referenceNumber: '63029',
    issueDate: '2017',
    status: 'active',
    order: 3,
  },
  {
    id: 'commercial-register-415939',
    title: 'Commercial Register No. 415939',
    titleAr: 'السجل التجاري رقم 415939',
    organization: 'Commercial Registration Authority — Egypt',
    organizationAr: 'مصلحة التسجيل التجاري — مصر',
    description:
      'Official commercial register extracts for MM Contracting & Supplying Co., including the registered company activity and related record pages.',
    descriptionAr:
      'مستخرجات السجل التجاري الرسمية لشركة إم إم للمقاولات والتوريدات، وتشمل بيانات النشاط المسجل والصفحات المرتبطة بالسجل.',
    category: 'registration',
    image: '/certificates/commercial-register-1.webp',
    pages: [
      '/certificates/commercial-register-1.webp',
      '/certificates/commercial-register-2.webp',
      '/certificates/commercial-register-3.webp',
    ],
    referenceNumber: '415939',
    status: 'active',
    order: 4,
  },
  {
    id: 'partnership-contract-al-gedrawi',
    title: 'Partnership Contract — Rezaik Abdallah Al-Gedrawi & Co. for Contracting',
    titleAr: 'عقد شراكة — شركة رزيق عبد الله الجدراوي وشركاه للمقاولات',
    organization: 'MM Contracting & Supplying Co. / Rezaik Abdallah Al-Gedrawi & Co.',
    organizationAr: 'إم إم للمقاولات والتوريدات / شركة رزيق عبد الله الجدراوي وشركاه',
    description:
      'Documented partnership agreement covering cooperation between MM Contracting & Supplying Co. and Rezaik Abdallah Al-Gedrawi & Co. for Contracting.',
    descriptionAr:
      'اتفاقية شراكة موثقة لتنظيم التعاون بين شركة إم إم للمقاولات والتوريدات وشركة رزيق عبد الله الجدراوي وشركاه للمقاولات.',
    category: 'legal',
    image: '/certificates/partnership-contract-1.webp',
    pages: [
      '/certificates/partnership-contract-1.webp',
      '/certificates/partnership-contract-2.webp',
    ],
    status: 'active',
    order: 5,
  },
]
