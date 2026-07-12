import { Router } from 'express'
import * as certificateController from '../controllers/certificateController'
import { authMiddleware } from '../middleware/authMiddleware'
import { certificateValidation, mongoIdValidation, handleValidation } from '../middleware/validation'

const router = Router()

router.get('/', certificateController.getAll)
router.get('/:id', mongoIdValidation, handleValidation, certificateController.getById)
router.post('/', authMiddleware, certificateValidation, handleValidation, certificateController.create)
router.put('/:id', authMiddleware, mongoIdValidation, certificateValidation, handleValidation, certificateController.update)
router.delete('/:id', authMiddleware, mongoIdValidation, handleValidation, certificateController.remove)

export default router
