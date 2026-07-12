import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  title_en: { type: String, required: true },
  title_ar: { type: String, required: true },
  description_en: { type: String, default: '' },
  description_ar: { type: String, default: '' },
  icon: { type: String, default: 'Building2' },
  features: [{ type: String }],
}, { timestamps: true })

export default mongoose.model('Service', serviceSchema)
