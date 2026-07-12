require('dotenv').config()
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI || ''

const projectSchema = new mongoose.Schema({ title_en: String, title_ar: String, description_en: String, description_ar: String, category_en: String, category_ar: String, location_en: String, location_ar: String, year: String, status: String, images: [String], client: String, value: String }, { timestamps: true })
const newsSchema = new mongoose.Schema({ title_en: String, title_ar: String, excerpt_en: String, excerpt_ar: String, content_en: String, content_ar: String, category_en: String, category_ar: String, date: String, image: String }, { timestamps: true })
const certificateSchema = new mongoose.Schema({ title_en: String, title_ar: String, organization_en: String, organization_ar: String, description_en: String, description_ar: String, category_en: String, category_ar: String, issueDate: String, expiryDate: String, status: { type: String, default: 'active' }, image: String, order: { type: Number, default: 0 } }, { timestamps: true })
const serviceSchema = new mongoose.Schema({ title_en: String, title_ar: String, description_en: String, description_ar: String, icon: String, features: [String] }, { timestamps: true })
const adminSchema = new mongoose.Schema({ email: { type: String, required: true, unique: true }, password: { type: String, required: true }, name: { type: String, default: 'Admin' } }, { timestamps: true })

const Project = mongoose.model('Project', projectSchema)
const News = mongoose.model('News', newsSchema)
const Certificate = mongoose.model('Certificate', certificateSchema)
const Service = mongoose.model('Service', serviceSchema)
const Admin = mongoose.model('Admin', adminSchema)

const projects = [
  { title_en: 'Al Noor Business Tower', title_ar: 'برج النور للأعمال', description_en: 'A 65-story commercial skyscraper in Dubai.', description_ar: '', category_en: 'Commercial', category_ar: 'تجاري', location_en: 'Dubai, UAE', location_ar: 'دبي، الإمارات', year: '2024', status: 'completed', images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'] },
  { title_en: 'Pearl Luxury Residences', title_ar: 'مساكن اللؤلؤ الفاخرة', description_en: '250 luxury apartments with ocean views.', description_ar: '', category_en: 'Residential', category_ar: 'سكني', location_en: 'Abu Dhabi, UAE', location_ar: 'أبوظبي، الإمارات', year: '2023', status: 'completed', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'] },
  { title_en: 'Gulf Coastal Highway', title_ar: 'طريق الخليج الساحلي', description_en: '180km coastal highway with 12 interchanges.', description_ar: '', category_en: 'Infrastructure', category_ar: 'بنية تحتية', location_en: 'Eastern Province, KSA', location_ar: 'المنطقة الشرقية، السعودية', year: '2024', status: 'ongoing', images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80'] },
  { title_en: 'Green City Sustainable Community', title_ar: 'المدينة الخضراء المستدامة', description_en: '5,000-unit sustainable smart city.', description_ar: '', category_en: 'Residential', category_ar: 'سكني', location_en: 'Riyadh, KSA', location_ar: 'الرياض، السعودية', year: '2025', status: 'ongoing', images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'] },
  { title_en: 'Al Taawun Industrial Park', title_ar: 'مجمع التعاون الصناعي', description_en: '2M sqm industrial park with 40 facilities.', description_ar: '', category_en: 'Industrial', category_ar: 'صناعي', location_en: 'Jubail, KSA', location_ar: 'الجبيل، السعودية', year: '2023', status: 'completed', images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'] },
  { title_en: 'Grand Horizon Hotel & Resort', title_ar: 'فندق ومنتجع جراند هورايزن', description_en: '5-star luxury hotel with 450 rooms.', description_ar: '', category_en: 'Commercial', category_ar: 'تجاري', location_en: 'Doha, Qatar', location_ar: 'الدوحة، قطر', year: '2024', status: 'completed', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'] },
]

const news = [
  { title_en: 'MM Contracting Awarded $1.2B Gulf Coastal Highway Project', title_ar: 'MM كونتراكتينج تحصل على مشروع طريق الخليج الساحلي', excerpt_en: 'The company secures its largest infrastructure contract.', excerpt_ar: '', content_en: '', content_ar: '', category_en: 'Projects', category_ar: 'مشاريع', date: 'March 15, 2025', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80' },
  { title_en: 'Green City Reaches Construction Milestone', title_ar: 'المدينة الخضراء تصل لمرحلة بناء هامة', excerpt_en: 'Phase one is now 60% complete ahead of schedule.', excerpt_ar: '', content_en: '', content_ar: '', category_en: 'Sustainability', category_ar: 'استدامة', date: 'February 28, 2025', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { title_en: 'MM Contracting Achieves ISO 45001:2025 Certification', title_ar: 'MM كونتراكتينج تحصل على شهادة الآيزو', excerpt_en: 'Commitment to occupational health and safety.', excerpt_ar: '', content_en: '', content_ar: '', category_en: 'Achievements', category_ar: 'إنجازات', date: 'January 20, 2025', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80' },
  { title_en: 'Grand Horizon Hotel Wins International Award', title_ar: 'فندق جراند هورايزن يفوز بجائزة دولية', excerpt_en: 'Recognition for innovative design.', excerpt_ar: '', content_en: '', content_ar: '', category_en: 'Awards', category_ar: 'جوائز', date: 'December 10, 2024', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
  { title_en: 'MM Contracting Expands into Southeast Asia', title_ar: 'MM كونتراكتينج تتوسع في جنوب شرق آسيا', excerpt_en: 'New regional HQ in Singapore.', excerpt_ar: '', content_en: '', content_ar: '', category_en: 'Corporate', category_ar: 'شركة', date: 'November 5, 2024', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { title_en: 'MM Contracting Launches BIM Center', title_ar: 'MM كونتراكتينج تطلق مركز BIM', excerpt_en: 'State-of-the-art Building Information Modeling.', excerpt_ar: '', content_en: '', content_ar: '', category_en: 'Innovation', category_ar: 'ابتكار', date: 'October 18, 2024', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80' },
]

const certificates = [
  { title_en: 'ISO 9001:2025 Quality Management', title_ar: 'آيزو 9001:2025 إدارة الجودة', organization_en: 'International Organization for Standardization', organization_ar: '', description_en: 'Comprehensive QMS for construction.', description_ar: '', category_en: 'iso', category_ar: 'آيزو', issueDate: 'Jan 2025', expiryDate: 'Jan 2028', status: 'active', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', order: 1 },
  { title_en: 'ISO 14001:2025 Environmental Management', title_ar: 'آيزو 14001:2025 الإدارة البيئية', organization_en: 'International Organization for Standardization', organization_ar: '', description_en: 'Environmental management system certification.', description_ar: '', category_en: 'environmental', category_ar: 'بيئي', issueDate: 'Mar 2025', expiryDate: 'Mar 2028', status: 'active', image: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=800&q=80', order: 2 },
  { title_en: 'ISO 45001:2025 Health & Safety', title_ar: 'آيزو 45001:2025 الصحة والسلامة', organization_en: 'International Organization for Standardization', organization_ar: '', description_en: 'Occupational health and safety management.', description_ar: '', category_en: 'safety', category_ar: 'سلامة', issueDate: 'Feb 2025', expiryDate: 'Feb 2028', status: 'active', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', order: 3 },
  { title_en: 'ISO 27001:2025 Information Security', title_ar: 'آيزو 27001:2025 أمن المعلومات', organization_en: 'International Organization for Standardization', organization_ar: '', description_en: 'Information security management system.', description_ar: '', category_en: 'iso', category_ar: 'آيزو', issueDate: 'Apr 2025', expiryDate: 'Apr 2028', status: 'active', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', order: 4 },
  { title_en: 'SA 8000 Social Accountability', title_ar: 'SA 8000 المساءلة الاجتماعية', organization_en: 'Social Accountability International', organization_ar: '', description_en: 'Social accountability standards certification.', description_ar: '', category_en: 'other', category_ar: 'أخرى', issueDate: 'Jun 2024', expiryDate: 'Jun 2027', status: 'active', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80', order: 5 },
  { title_en: 'ISO 50001:2025 Energy Management', title_ar: 'آيزو 50001:2025 إدارة الطاقة', organization_en: 'International Organization for Standardization', organization_ar: '', description_en: 'Energy management system certification.', description_ar: '', category_en: 'environmental', category_ar: 'بيئي', issueDate: 'May 2025', expiryDate: 'May 2028', status: 'active', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80', order: 6 },
  { title_en: 'AWS D1.1 Structural Welding', title_ar: 'AWS D1.1 اللحام الهيكلي', organization_en: 'American Welding Society', organization_ar: '', description_en: 'Structural welding capabilities certification.', description_ar: '', category_en: 'engineering', category_ar: 'هندسي', issueDate: 'Aug 2024', status: 'active', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', order: 7 },
  { title_en: 'NACE CP Corrosion Protection', title_ar: 'NACE CP الحماية من التآكل', organization_en: 'NACE International', organization_ar: '', description_en: 'Corrosion prevention certification.', description_ar: '', category_en: 'engineering', category_ar: 'هندسي', issueDate: 'Sep 2024', expiryDate: 'Sep 2027', status: 'active', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', order: 8 },
  { title_en: 'LEED Accredited Professional', title_ar: 'LEED محترف معتمد', organization_en: 'U.S. Green Building Council', organization_ar: '', description_en: 'Green building certification capability.', description_ar: '', category_en: 'environmental', category_ar: 'بيئي', issueDate: 'Jan 2024', expiryDate: 'Jan 2027', status: 'active', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80', order: 9 },
  { title_en: 'Six Sigma Black Belt', title_ar: 'Six Sigma الحزام الأسود', organization_en: 'American Society for Quality', organization_ar: '', description_en: 'Process improvement expertise certification.', description_ar: '', category_en: 'quality', category_ar: 'جودة', issueDate: 'Mar 2024', expiryDate: 'Mar 2027', status: 'active', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', order: 10 },
  { title_en: 'PMP Project Management Professional', title_ar: 'PMP إدارة المشاريع الاحترافية', organization_en: 'Project Management Institute', organization_ar: '', description_en: 'Project management certification.', description_ar: '', category_en: 'quality', category_ar: 'جودة', issueDate: 'Ongoing', status: 'active', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', order: 11 },
  { title_en: 'OHSAS 18001 Health & Safety', title_ar: 'OHSAS 18001 الصحة والسلامة', organization_en: 'British Standards Institution', organization_ar: '', description_en: 'Occupational health and safety certification.', description_ar: '', category_en: 'safety', category_ar: 'سلامة', issueDate: '2018', expiryDate: '2025', status: 'expiring', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80', order: 12 },
]

const services = [
  { title_en: 'Infrastructure Development', title_ar: 'تطوير البنية التحتية', description_en: 'Design and construction of critical infrastructure.', description_ar: '', icon: 'Road', features: ['Highways & Roads', 'Bridge Construction', 'Utility Networks', 'Tunneling', 'Railway Systems', 'Ports & Harbors'] },
  { title_en: 'Industrial Projects', title_ar: 'المشاريع الصناعية', description_en: 'Specialized industrial facilities.', description_ar: '', icon: 'Factory', features: ['Manufacturing Plants', 'Warehouses & Logistics', 'Power Plants', 'Oil & Gas Facilities', 'Chemical Plants', 'Processing Facilities'] },
  { title_en: 'Design & Build', title_ar: 'التصميم والبناء', description_en: 'Integrated design-build solutions.', description_ar: '', icon: 'PenTool', features: ['Architectural Design', 'Structural Engineering', 'MEP Engineering', 'Interior Design', 'Sustainable Design', 'BIM Services'] },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    await Project.deleteMany({}); await Project.insertMany(projects)
    console.log(`Seeded ${projects.length} projects`)

    await News.deleteMany({}); await News.insertMany(news)
    console.log(`Seeded ${news.length} news items`)

    await Certificate.deleteMany({}); await Certificate.insertMany(certificates)
    console.log(`Seeded ${certificates.length} certificates`)

    await Service.deleteMany({}); await Service.insertMany(services)
    console.log(`Seeded ${services.length} services`)

    console.log('Seed complete!')
    process.exit(0)
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()
