import { Response } from 'express'
import Service from '../models/Service'
import { AuthRequest } from '../middleware/authMiddleware'

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const items = await Service.find().sort({ createdAt: -1 })
    return res.json(items)
  } catch (err) {
    console.error('❌ getAll services error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function getById(req: AuthRequest, res: Response) {
  try {
    const item = await Service.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Service not found' })
    return res.json(item)
  } catch (err) {
    console.error('❌ getById service error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const doc = new Service(req.body)
    const saved = await doc.save()
    console.log('💾 Service saved to MongoDB Atlas:', saved._id)
    return res.status(201).json(saved)
  } catch (err) {
    console.error('❌ create service error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const item = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!item) return res.status(404).json({ message: 'Service not found' })
    console.log('💾 Service updated in MongoDB Atlas:', item._id)
    return res.json(item)
  } catch (err) {
    console.error('❌ update service error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const item = await Service.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Service not found' })
    console.log('🗑️ Service deleted from MongoDB Atlas:', req.params.id)
    return res.json({ message: 'Service deleted' })
  } catch (err) {
    console.error('❌ remove service error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
