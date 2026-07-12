import { Router } from 'express'
import { login, verify } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'
import { loginValidation, handleValidation } from '../middleware/validation'

const router = Router()

router.post('/login', loginValidation, handleValidation, login)
router.get('/verify', authMiddleware, verify)

export default router
