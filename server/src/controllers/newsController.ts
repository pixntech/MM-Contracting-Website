import { Response } from 'express'
import News from '../models/News'
import { AuthRequest } from '../middleware/authMiddleware'

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const items = await News.find().sort({ createdAt: -1 })
    return res.json(items)
  } catch (err) {
    console.error('❌ getAll news error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function getById(req: AuthRequest, res: Response) {
  try {
    const item = await News.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'News not found' })
    return res.json(item)
  } catch (err) {
    console.error('❌ getById news error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const doc = new News(req.body)
    const saved = await doc.save()
    console.log('💾 News saved to MongoDB Atlas:', saved._id)
    return res.status(201).json(saved)
  } catch (err) {
    console.error('❌ create news error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const item = await News.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ message: 'News not found' })
    console.log('💾 News updated in MongoDB Atlas:', item._id)
    return res.json(item)
  } catch (err) {
    console.error('❌ update news error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const item = await News.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'News not found' })
    console.log('🗑️ News deleted from MongoDB Atlas:', req.params.id)
    return res.json({ message: 'News deleted' })
  } catch (err) {
    console.error('❌ remove news error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
