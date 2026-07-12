import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import Project from '../src/models/Project'
import News from '../src/models/News'
import Certificate from '../src/models/Certificate'
import Service from '../src/models/Service'

const MONGODB_URI = process.env.MONGO_URI || ''

const legacyProjects = [
  { id: 'al-noor-tower', title: 'Al Noor Business Tower', category: 'Commercial', location: 'Dubai, UAE', description: 'A 65-story commercial skyscraper featuring state-of-the-art office spaces, premium retail outlets, and world-class amenities. The tower stands as a landmark of modern engineering excellence.', images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', 'https://images.unsplash.com/photo-1541888946425-d81bb4b88d9b?w=800&q=80'], year: 2024, client: 'Al Noor Holdings', value: '$450M', status: 'completed' },
  { id: 'pearl-residences', title: 'Pearl Luxury Residences', category: 'Residential', location: 'Abu Dhabi, UAE', description: 'An exclusive residential development featuring 250 luxury apartments with panoramic ocean views, private beaches, and world-class amenities.', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'], year: 2023, client: 'Pearl Developments', value: '$280M', status: 'completed' },
  { id: 'gulf-highway', title: 'Gulf Coastal Highway', category: 'Infrastructure', location: 'Eastern Province, KSA', description: 'A 180-kilometer coastal highway connecting major industrial cities, featuring 12 interchanges, 8 bridges, and advanced traffic management systems.', images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80'], year: 2024, client: 'Ministry of Transport', value: '$1.2B', status: 'ongoing' },
  { id: 'green-city', title: 'Green City Sustainable Community', category: 'Residential', location: 'Riyadh, KSA', description: 'A sustainable smart city development with 5,000 residential units, powered entirely by renewable energy, featuring integrated green spaces and smart infrastructure.', images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'], year: 2025, client: 'Green City Initiative', value: '$2.1B', status: 'ongoing' },
  { id: 'industrial-park', title: 'Al Taawun Industrial Park', category: 'Industrial', location: 'Jubail, KSA', description: 'A 2-million-square-meter industrial park housing 40 manufacturing facilities with shared utility infrastructure, logistics hubs, and worker accommodation.', images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'], year: 2023, client: 'Saudi Industrial Development Fund', value: '$890M', status: 'completed' },
  { id: 'grand-hotel', title: 'Grand Horizon Hotel & Resort', category: 'Commercial', location: 'Doha, Qatar', description: 'A 5-star luxury hotel with 450 rooms, convention center, spa facilities, and private beach access. The architectural design blends modern luxury with local heritage.', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'], year: 2024, client: 'Horizon Hospitality Group', value: '$620M', status: 'completed' },
]

const legacyNews = [
  { id: 'news-1', title: 'MM Contracting Awarded $1.2B Gulf Coastal Highway Project', excerpt: 'The company secures its largest infrastructure contract to date, spanning 180 kilometers along the eastern coast.', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', date: 'March 15, 2025', category: 'Projects' },
  { id: 'news-2', title: 'Green City Sustainable Community Reaches Construction Milestone', excerpt: 'Phase one of the 5,000-unit sustainable smart city development is now 60% complete, ahead of schedule.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', date: 'February 28, 2025', category: 'Sustainability' },
  { id: 'news-3', title: 'MM Contracting Achieves ISO 45001:2025 Certification', excerpt: 'The company demonstrates its commitment to occupational health and safety with the latest international certification.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', date: 'January 20, 2025', category: 'Achievements' },
  { id: 'news-4', title: 'Grand Horizon Hotel Wins International Architecture Award', excerpt: 'The recently completed luxury resort in Doha receives recognition for its innovative design and sustainable features.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', date: 'December 10, 2024', category: 'Awards' },
  { id: 'news-5', title: 'MM Contracting Expands Operations into Southeast Asia', excerpt: 'New regional headquarters in Singapore marks the company\'s strategic expansion into the rapidly growing ASEAN market.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', date: 'November 5, 2024', category: 'Corporate' },
  { id: 'news-6', title: 'Innovation in Construction: MM Contracting Launches BIM Center', excerpt: 'A state-of-the-art Building Information Modeling center to drive digital transformation across all projects.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', date: 'October 18, 2024', category: 'Innovation' },
]

const legacyCertificates = [
  { id: 'cert-1', title: 'ISO 9001:2025 Quality Management System', organization: 'International Organization for Standardization', description: 'Certifies that MM Contracting operates a comprehensive quality management system meeting international standards for construction project delivery, ensuring consistent quality across all operations.', category: 'iso', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', issueDate: 'January 2025', expiryDate: 'January 2028', status: 'active', order: 1 },
  { id: 'cert-2', title: 'ISO 14001:2025 Environmental Management', organization: 'International Organization for Standardization', description: 'Demonstrates our commitment to environmental stewardship through a certified environmental management system that minimizes our ecological footprint across all project sites.', category: 'environmental', image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80', issueDate: 'March 2025', expiryDate: 'March 2028', status: 'active', order: 2 },
  { id: 'cert-3', title: 'ISO 45001:2025 Occupational Health & Safety', organization: 'International Organization for Standardization', description: 'Confirms our industry-leading occupational health and safety management system, designed to prevent workplace injuries and create a safe environment for our 12,000+ workforce.', category: 'safety', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', issueDate: 'February 2025', expiryDate: 'February 2028', status: 'active', order: 3 },
  { id: 'cert-4', title: 'ISO 27001:2025 Information Security', organization: 'International Organization for Standardization', description: 'Validates our information security management system, ensuring that client data, project documentation, and corporate information are protected to the highest international standards.', category: 'iso', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', issueDate: 'April 2025', expiryDate: 'April 2028', status: 'active', order: 4 },
  { id: 'cert-5', title: 'SA 8000 Social Accountability', organization: 'Social Accountability International', description: 'Certifies our adherence to social accountability standards including fair labor practices, ethical workplace conditions, and respect for worker rights across all operations.', category: 'other', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80', issueDate: 'June 2024', expiryDate: 'June 2027', status: 'active', order: 5 },
  { id: 'cert-6', title: 'ISO 50001:2025 Energy Management', organization: 'International Organization for Standardization', description: 'Recognizes our systematic approach to energy management, enabling continuous improvement in energy performance, efficiency, and reduction of greenhouse gas emissions.', category: 'environmental', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80', issueDate: 'May 2025', expiryDate: 'May 2028', status: 'active', order: 6 },
  { id: 'cert-7', title: 'AWS D1.1 Structural Welding Certification', organization: 'American Welding Society', description: 'Certifies our structural welding capabilities to the AWS D1.1 code, ensuring all welded structures in our projects meet rigorous industry standards for strength and integrity.', category: 'engineering', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', issueDate: 'August 2024', status: 'active', order: 7 },
  { id: 'cert-8', title: 'NACE CP Corrosion Protection Certification', organization: 'NACE International', description: 'Validates our expertise in corrosion prevention and control for critical infrastructure, ensuring long-term durability of metal structures in harsh environments.', category: 'engineering', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', issueDate: 'September 2024', expiryDate: 'September 2027', status: 'active', order: 8 },
  { id: 'cert-9', title: 'LEED Accredited Professional', organization: 'U.S. Green Building Council', description: 'Demonstrates our capability to design and construct environmentally sustainable buildings that meet the rigorous LEED certification standards for green construction.', category: 'environmental', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', issueDate: 'January 2024', expiryDate: 'January 2027', status: 'active', order: 9 },
  { id: 'cert-10', title: 'Six Sigma Black Belt Certification', organization: 'American Society for Quality', description: 'Certifies our process improvement expertise, enabling data-driven decision-making and waste reduction across all project management and construction processes.', category: 'quality', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', issueDate: 'March 2024', expiryDate: 'March 2027', status: 'active', order: 10 },
  { id: 'cert-11', title: 'PMI Project Management Professional', organization: 'Project Management Institute', description: 'Demonstrates our project managers hold the globally recognized PMP certification, ensuring world-class project governance, risk management, and delivery excellence.', category: 'quality', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', issueDate: 'Ongoing', status: 'active', order: 11 },
  { id: 'cert-12', title: 'OHSAS 18001 Occupational Health & Safety', organization: 'British Standards Institution', description: 'Precursor certification to ISO 45001, confirming our long-standing commitment to occupational health and safety management in the construction industry.', category: 'safety', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', issueDate: '2018', expiryDate: '2025', status: 'expiring', order: 12 },
]

const legacyServices = [
  { id: 'infrastructure', title: 'Infrastructure Development', description: 'Design and construction of critical infrastructure including highways, bridges, utilities, and transportation networks.', icon: 'Road', features: ['Highways & Roads', 'Bridge Construction', 'Utility Networks', 'Tunneling', 'Railway Systems', 'Ports & Harbors'] },
  { id: 'industrial', title: 'Industrial Projects', description: 'Specialized industrial facilities designed for efficiency, safety, and compliance with international standards.', icon: 'Factory', features: ['Manufacturing Plants', 'Warehouses & Logistics', 'Power Plants', 'Oil & Gas Facilities', 'Chemical Plants', 'Processing Facilities'] },
  { id: 'designBuild', title: 'Design & Build', description: 'Integrated design-build solutions that streamline project delivery through single-point accountability.', icon: 'PenTool', features: ['Architectural Design', 'Structural Engineering', 'MEP Engineering', 'Interior Design', 'Sustainable Design', 'BIM Services'] },
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    const projectDocs = legacyProjects.map(p => ({
      title_en: p.title, title_ar: p.title,
      description_en: p.description, description_ar: '',
      category_en: p.category, category_ar: '',
      location_en: p.location, location_ar: '',
      year: String(p.year), status: p.status,
      images: p.images,
    }))
    await Project.deleteMany({})
    await Project.insertMany(projectDocs)
    console.log(`Seeded ${projectDocs.length} projects`)

    const newsDocs = legacyNews.map(n => ({
      title_en: n.title, title_ar: n.title,
      excerpt_en: n.excerpt, excerpt_ar: '',
      content_en: '', content_ar: '',
      category_en: n.category, category_ar: '',
      date: n.date, image: n.image,
    }))
    await News.deleteMany({})
    await News.insertMany(newsDocs)
    console.log(`Seeded ${newsDocs.length} news items`)

    const certDocs = legacyCertificates.map(c => ({
      title_en: c.title, title_ar: c.title,
      organization_en: c.organization, organization_ar: '',
      description_en: c.description, description_ar: '',
      category_en: c.category, category_ar: '',
      issueDate: c.issueDate || '',
      expiryDate: c.expiryDate || '',
      status: c.status || 'active',
      image: c.image || '', order: c.order || 0,
    }))
    await Certificate.deleteMany({})
    await Certificate.insertMany(certDocs)
    console.log(`Seeded ${certDocs.length} certificates`)

    const serviceDocs = legacyServices.map(s => ({
      title_en: s.title, title_ar: s.title,
      description_en: s.description, description_ar: '',
      icon: s.icon, features: s.features || [],
    }))
    await Service.deleteMany({})
    await Service.insertMany(serviceDocs)
    console.log(`Seeded ${serviceDocs.length} services`)

    console.log('Seed complete!')
    process.exit(0)
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()
