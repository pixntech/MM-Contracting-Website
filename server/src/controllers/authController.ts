import { Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'
import { AuthRequest } from '../middleware/authMiddleware'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export async function login(req: AuthRequest, res: Response) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }
    const admin = await Admin.findOne({ email: email.toLowerCase() })
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '24h' })
    return res.json({
      token,
      admin: { name: admin.name, email: admin.email },
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function verify(req: AuthRequest, res: Response) {
  try {
    const admin = await Admin.findById(req.adminId).select('-password')
    if (!admin) return res.status(404).json({ message: 'Admin not found' })
    return res.json({ admin: { name: admin.name, email: admin.email } })
  } catch (err) {
    return res.status(500).json({ message: 'Server error' })
  }
}
