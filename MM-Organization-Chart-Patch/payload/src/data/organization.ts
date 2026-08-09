export interface OrganizationRole {
  id: string
  titleEn: string
  titleAr: string
  icon?: string
  children?: OrganizationRole[]
}

export const organizationChairman: OrganizationRole = {
  id: 'chairman',
  titleEn: 'Chairman of the Board',
  titleAr: 'رئيس مجلس الإدارة',
  icon: 'Building2',
}

export const organizationDepartments: OrganizationRole[] = [
  {
    id: 'finance-admin',
    titleEn: 'Financial & Administrative Manager',
    titleAr: 'المدير المالي و الإداري',
    icon: 'Briefcase',
    children: [
      {
        id: 'systems-information',
        titleEn: 'Systems & Information',
        titleAr: 'النظم والمعلومات',
      },
      {
        id: 'procurement',
        titleEn: 'Procurement',
        titleAr: 'مشتريات',
      },
      {
        id: 'accounts-manager',
        titleEn: 'Accounts Manager',
        titleAr: 'مدير الحسابات',
        children: [
          {
            id: 'treasury',
            titleEn: 'Treasury',
            titleAr: 'الخزينة',
          },
          {
            id: 'general-accountant',
            titleEn: 'General Accountant',
            titleAr: 'محاسب عام',
          },
          {
            id: 'senior-accountant',
            titleEn: 'Senior Accountant',
            titleAr: 'محاسب أول',
          },
          {
            id: 'contractors-suppliers-head',
            titleEn: 'Head of Contractors & Suppliers',
            titleAr: 'رئيس قسم المقاولين والموردين',
            children: [
              {
                id: 'site-accountant',
                titleEn: 'Site Accountant',
                titleAr: 'محاسب موقع',
              },
              {
                id: 'contractors-accountant',
                titleEn: 'Contractors Accountant',
                titleAr: 'محاسب مقاولين',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'technical-office',
    titleEn: 'Technical Office Department',
    titleAr: 'إدارة المكتب الفني',
    icon: 'PenTool',
    children: [
      {
        id: 'data-coordinator',
        titleEn: 'Data Coordinator',
        titleAr: 'منسق البيانات',
      },
      {
        id: 'architectural-department',
        titleEn: 'Architectural Department',
        titleAr: 'القسم المعماري',
        children: [
          {
            id: 'designs',
            titleEn: 'Design',
            titleAr: 'التصميمات',
          },
        ],
      },
      {
        id: 'civil-concrete-department',
        titleEn: 'Civil & Concrete Department',
        titleAr: 'القسم المدني والخرسانات',
        children: [
          {
            id: 'technical-office-engineer',
            titleEn: 'Technical Office Engineer',
            titleAr: 'مهندس مكتب فني',
          },
        ],
      },
    ],
  },
  {
    id: 'human-resources',
    titleEn: 'Human Resources Manager',
    titleAr: 'مدير الموارد البشرية',
    icon: 'Users',
    children: [
      {
        id: 'hr-recruiter-od',
        titleEn: 'HR Recruiter & OD',
        titleAr: 'HR Recruiter & OD',
      },
      {
        id: 'hr-admin-assistant',
        titleEn: 'HR Admin Assistant',
        titleAr: 'HR Admin assistant',
      },
      {
        id: 'driver',
        titleEn: 'Driver',
        titleAr: 'سائق',
      },
      {
        id: 'office-attendant',
        titleEn: 'Office Attendant',
        titleAr: 'عامل بوفيه',
      },
      {
        id: 'cleaner',
        titleEn: 'Cleaner',
        titleAr: 'عامل نظافة',
      },
    ],
  },
  {
    id: 'electromechanical',
    titleEn: 'Electromechanical Department Manager',
    titleAr: 'مدير إدارة الكهرو ميكانيكا',
    icon: 'Zap',
    children: [
      {
        id: 'mechanical-head',
        titleEn: 'Head of Mechanical Section',
        titleAr: 'رئيس قسم الميكانيكا',
      },
      {
        id: 'electrical-head',
        titleEn: 'Head of Electrical Section',
        titleAr: 'رئيس قسم الكهرباء',
      },
    ],
  },
  {
    id: 'tenders-contracts',
    titleEn: 'Tenders & Contracts Manager',
    titleAr: 'مدير العطاءات والتعاقدات',
    icon: 'Award',
    children: [
      {
        id: 'quantity-surveying-payments',
        titleEn: 'Quantity Surveying & Payment Certificates',
        titleAr: 'الحصر و المستخلصات',
      },
    ],
  },
  {
    id: 'projects',
    titleEn: 'Projects Manager',
    titleAr: 'مدير مشروعات',
    icon: 'HardHat',
    children: [
      {
        id: 'projects-admin-manager',
        titleEn: 'Projects Administration Manager',
        titleAr: 'مدير اداري مشروعات',
      },
      {
        id: 'project-manager',
        titleEn: 'Project Manager',
        titleAr: 'مدير مشروع',
        children: [
          {
            id: 'site-engineer',
            titleEn: 'Site Engineer',
            titleAr: 'مهندس موقع',
          },
          {
            id: 'general-supervisor',
            titleEn: 'General Supervisor',
            titleAr: 'مشرف عام',
          },
          {
            id: 'architectural-supervisor',
            titleEn: 'Architectural Supervisor',
            titleAr: 'مشرف معماري',
          },
          {
            id: 'senior-surveyor',
            titleEn: 'Senior Surveyor',
            titleAr: 'مساح أول',
          },
        ],
      },
    ],
  },
]

export function countOrganizationRoles(nodes: OrganizationRole[]): number {
  return nodes.reduce(
    (total, node) => total + 1 + countOrganizationRoles(node.children ?? []),
    0
  )
}
