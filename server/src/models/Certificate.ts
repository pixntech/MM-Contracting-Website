import mongoose from 'mongoose'

const certificateSchema = new mongoose.Schema({
  title_en: { type: String, required: true },
  title_ar: { type: String, required: true },
  organization_en: { type: String, default: '' },
  organization_ar: { type: String, default: '' },
  description_en: { type: String, default: '' },
  description_ar: { type: String, default: '' },
  category_en: { type: String, default: '' },
  category_ar: { type: String, default: '' },
  issueDate: { type: String, default: '' },
  expiryDate: { type: String, default: '' },
  status: { type: String, enum: ['active', 'expiring', 'expired'], default: 'active' },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('Certificate', certificateSchema)
