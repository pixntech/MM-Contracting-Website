import { Response } from 'express'
import Project from '../models/Project'
import { AuthRequest } from '../middleware/authMiddleware'

export async function getAll(req: AuthRequest, res: Response) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    return res.json(projects)
  } catch (err) {
    console.error('❌ getAll projects error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function getById(req: AuthRequest, res: Response) {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })
    return res.json(project)
  } catch (err) {
    console.error('❌ getById project error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function create(req: AuthRequest, res: Response) {
  try {
    const doc = new Project(req.body)
    const saved = await doc.save()
    console.log('💾 Project saved to MongoDB Atlas:', saved._id)
    return res.status(201).json(saved)
  } catch (err) {
    console.error('❌ create project error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function update(req: AuthRequest, res: Response) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ message: 'Project not found' })
    console.log('💾 Project updated in MongoDB Atlas:', project._id)
    return res.json(project)
  } catch (err) {
    console.error('❌ update project error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })
    console.log('🗑️ Project deleted from MongoDB Atlas:', req.params.id)
    return res.json({ message: 'Project deleted' })
  } catch (err) {
    console.error('❌ remove project error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
