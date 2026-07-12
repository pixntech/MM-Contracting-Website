import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title_en: { type: String, required: true },
  title_ar: { type: String, required: true },
  description_en: { type: String, default: '' },
  description_ar: { type: String, default: '' },
  category_en: { type: String, default: '' },
  category_ar: { type: String, default: '' },
  location_en: { type: String, default: '' },
  location_ar: { type: String, default: '' },
  year: { type: String, default: '' },
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
  images: [{ type: String }],
}, { timestamps: true })

export default mongoose.model('Project', projectSchema)
