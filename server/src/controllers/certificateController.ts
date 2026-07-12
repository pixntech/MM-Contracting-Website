import { Response } from 'express'
import Certificate from '../models/Certificate'
import { AuthRequest } from '../middleware/authMiddleware'

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const items = await Certificate.find().sort({ order: 1, createdAt: -1 })
    return res.json(items)
  } catch (err) {
    console.error('❌ getAll certificates error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function getById(req: AuthRequest, res: Response) {
  try {
    const item = await Certificate.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Certificate not found' })
    return res.json(item)
  } catch (err) {
    console.error('❌ getById certificate error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const doc = new Certificate(req.body)
    const saved = await doc.save()
    console.log('💾 Certificate saved to MongoDB Atlas:', saved._id)
    return res.status(201).json(saved)
  } catch (err) {
    console.error('❌ create certificate error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ message: 'Certificate not found' })
    console.log('💾 Certificate updated in MongoDB Atlas:', item._id)
    return res.json(item)
  } catch (err) {
    console.error('❌ update certificate error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const item = await Certificate.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Certificate not found' })
    console.log('🗑️ Certificate deleted from MongoDB Atlas:', req.params.id)
    return res.json({ message: 'Certificate deleted' })
  } catch (err) {
    console.error('❌ remove certificate error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
