import { Router } from 'express'
import * as serviceController from '../controllers/serviceController'
import { authMiddleware } from '../middleware/authMiddleware'
import { serviceValidation, mongoIdValidation, handleValidation } from '../middleware/validation'

const router = Router()

router.get('/', serviceController.getAll)
router.get('/:id', mongoIdValidation, handleValidation, serviceController.getById)
router.post('/', authMiddleware, serviceValidation, handleValidation, serviceController.create)
router.put('/:id', authMiddleware, mongoIdValidation, serviceValidation, handleValidation, serviceController.update)
router.delete('/:id', authMiddleware, mongoIdValidation, handleValidation, serviceController.remove)

export default router
