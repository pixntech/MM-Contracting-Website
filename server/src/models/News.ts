import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  title_en: { type: String, required: true },
  title_ar: { type: String, required: true },
  excerpt_en: { type: String, default: '' },
  excerpt_ar: { type: String, default: '' },
  category_en: { type: String, default: '' },
  category_ar: { type: String, default: '' },
  date: { type: String, default: '' },
  image: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('News', newsSchema)
