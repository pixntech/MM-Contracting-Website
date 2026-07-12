import bcrypt from 'bcryptjs'
import Admin from '../models/Admin'

export async function seedAdmin() {
  const existing = await Admin.findOne({ email: 'admin@gmail.com' })
  if (existing) {
    console.log('Admin user already exists, skipping seed')
    return
  }
  const hashedPassword = await bcrypt.hash('Karim@2005', 12)
  await Admin.create({
    email: 'admin@gmail.com',
    password: hashedPassword,
    name: 'Administrator',
  })
  console.log('Default admin user seeded (admin@gmail.com / Karim@2005)')
}
