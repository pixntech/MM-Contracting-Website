import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import { connectDB } from './config/db'
import { seedAdmin } from './config/seed'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'
import newsRoutes from './routes/newsRoutes'
import certificateRoutes from './routes/certificateRoutes'
import serviceRoutes from './routes/serviceRoutes'

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors({
  origin: /http:\/\/localhost:\d+$/,
  credentials: true,
}))
app.use(mongoSanitize())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/services', serviceRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

async function start() {
  await connectDB()
  await seedAdmin()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

start()
