import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2]
if (!root) throw new Error('Project root is required')

const typesPath = path.join(root, 'src', 'types', 'index.ts')
let types = fs.readFileSync(typesPath, 'utf8')
const projectInterface = `export interface Project {
  id: string
  title: string
  category: string
  location?: string
  description: string
  image?: string
  images?: string[]
  year?: number
  client?: string
  value?: string
  status?: 'completed' | 'ongoing'
}`
const projectPattern = /export interface Project \{[\s\S]*?\n\}/
if (!projectPattern.test(types)) {
  throw new Error('Could not locate Project interface in src/types/index.ts')
}
types = types.replace(projectPattern, projectInterface)
fs.writeFileSync(typesPath, types, 'utf8')

const translations = {
  en: {
    featuredProjects: {
      subtitle: 'Selected Projects',
      title: 'Building Projects Delivered by MM Contracting',
      description: 'A selection of industrial, educational, residential, administrative and commercial building projects listed in the company profile.',
      completed: 'Completed',
      ongoing: 'Ongoing',
      viewAll: 'View Project Gallery',
      profileLabel: 'Company Profile',
      profileStatement: 'MM Contracting has successfully executed building works across multiple sectors, working as both a main contractor and a subcontractor.',
      siteImageAlt: 'MM Contracting building construction works at night',
      siteImageCaption: 'Building construction works',
      factoryImageAlt: 'MMK Pack Factory for Cartons industrial facility',
      factoryImageCaption: 'MMK Pack Factory for Cartons',
      portfolioLabel: 'Project Portfolio',
      portfolioSummary: 'Projects listed in the supplied company profile across four building sectors.',
      projectsCount: 'projects',
      categories: {
        industrial: 'Industrial Buildings',
        educational: 'Educational Buildings',
        residential: 'Residential Buildings',
        commercial: 'Commercial & Administrative Buildings'
      }
    },
    projects: {
      mmkPackFactory: { title: 'MMK Pack Factory for Cartons' },
      palmHillsDatesFactory: { title: 'Palm Hills Factory for Dates' },
      mansouraAzharInstitute: { title: 'Mansoura Azhar Institute' },
      luxorAzharInstitute: { title: 'Luxor Azhar Institute' },
      hadaekElAsema: { title: "Hada'ek El Asema (16 Buildings)" },
      rivanCompound: { title: 'Rivan Compound' },
      rivanTower: { title: 'Rivan Tower' },
      rivanSquare: { title: 'Rivan Square' },
      altameerArabianSalesOffice: { title: 'AlTameer Arabian Sales Office' }
    },
    gallery: {
      subtitle: 'Project Gallery',
      title: 'Real Project Images',
      description: 'Project images supplied in the official MM Contracting company profile.',
      pageTitle: 'MM Contracting Project Gallery',
      noImages: 'No images found in this category.',
      viewFull: 'View Full Gallery',
      categories: {
        all: 'All Projects',
        construction: 'Construction',
        industrial: 'Industrial'
      },
      items: {
        buildingSiteWorks: {
          title: 'Building Construction Works',
          alt: 'MM Contracting construction works at night with concrete pumping equipment'
        },
        mmkPackFactory: {
          title: 'MMK Pack Factory for Cartons',
          alt: 'Industrial production facility at MMK Pack Factory for Cartons'
        }
      }
    }
  },
  ar: {
    featuredProjects: {
      subtitle: 'مشاريع مختارة',
      title: 'مشروعات المباني المنفذة بواسطة MM Contracting',
      description: 'مجموعة من المشروعات الصناعية والتعليمية والسكنية والإدارية والتجارية الواردة في الملف التعريفي الرسمي للشركة.',
      completed: 'مكتمل',
      ongoing: 'قيد التنفيذ',
      viewAll: 'عرض معرض المشاريع',
      profileLabel: 'الملف التعريفي للشركة',
      profileStatement: 'نفذت MM Contracting أعمال مبانٍ في عدة قطاعات، سواء كمقاول رئيسي أو كمقاول من الباطن.',
      siteImageAlt: 'أعمال إنشاءات مباني تابعة لشركة MM Contracting ليلاً',
      siteImageCaption: 'أعمال إنشاءات مباني',
      factoryImageAlt: 'منشأة مصنع MMK Pack للكرتون',
      factoryImageCaption: 'مصنع MMK Pack للكرتون',
      portfolioLabel: 'محفظة المشاريع',
      portfolioSummary: 'المشروعات المذكورة في الملف التعريفي المقدم من الشركة موزعة على أربعة قطاعات للمباني.',
      projectsCount: 'مشروعات',
      categories: {
        industrial: 'المباني الصناعية',
        educational: 'المباني التعليمية',
        residential: 'المباني السكنية',
        commercial: 'المباني التجارية والإدارية'
      }
    },
    projects: {
      mmkPackFactory: { title: 'مصنع MMK Pack للكرتون' },
      palmHillsDatesFactory: { title: 'مصنع Palm Hills للتمور' },
      mansouraAzharInstitute: { title: 'معهد المنصورة الأزهري' },
      luxorAzharInstitute: { title: 'معهد الأقصر الأزهري' },
      hadaekElAsema: { title: 'حدائق العاصمة (16 مبنى)' },
      rivanCompound: { title: 'كمبوند Rivan' },
      rivanTower: { title: 'Rivan Tower' },
      rivanSquare: { title: 'Rivan Square' },
      altameerArabianSalesOffice: { title: 'مكتب مبيعات AlTameer Arabian' }
    },
    gallery: {
      subtitle: 'معرض المشاريع',
      title: 'صور حقيقية من أعمال الشركة',
      description: 'صور المشاريع الواردة في الملف التعريفي الرسمي لشركة MM Contracting.',
      pageTitle: 'معرض مشاريع MM Contracting',
      noImages: 'لا توجد صور في هذه الفئة.',
      viewFull: 'عرض المعرض الكامل',
      categories: {
        all: 'جميع المشاريع',
        construction: 'الإنشاءات',
        industrial: 'صناعي'
      },
      items: {
        buildingSiteWorks: {
          title: 'أعمال إنشاءات مباني',
          alt: 'أعمال إنشاءات لشركة MM Contracting ليلاً باستخدام معدات ضخ الخرسانة'
        },
        mmkPackFactory: {
          title: 'مصنع MMK Pack للكرتون',
          alt: 'منشأة إنتاج صناعية داخل مصنع MMK Pack للكرتون'
        }
      }
    }
  }
}

for (const lang of ['en', 'ar']) {
  const localePath = path.join(root, 'src', 'i18n', 'locales', `${lang}.json`)
  const data = JSON.parse(fs.readFileSync(localePath, 'utf8'))
  data.featuredProjects = translations[lang].featuredProjects
  data.projects = translations[lang].projects
  data.gallery = translations[lang].gallery
  fs.writeFileSync(localePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}
