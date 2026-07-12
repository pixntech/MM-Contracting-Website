import { Router } from 'express'
import * as projectController from '../controllers/projectController'
import { authMiddleware } from '../middleware/authMiddleware'
import { projectValidation, mongoIdValidation, handleValidation } from '../middleware/validation'

const router = Router()

router.get('/', projectController.getAll)
router.get('/:id', mongoIdValidation, handleValidation, projectController.getById)
router.post('/', authMiddleware, projectValidation, handleValidation, projectController.create)
router.put('/:id', authMiddleware, mongoIdValidation, projectValidation, handleValidation, projectController.update)
router.delete('/:id', authMiddleware, mongoIdValidation, handleValidation, projectController.remove)

export default router
