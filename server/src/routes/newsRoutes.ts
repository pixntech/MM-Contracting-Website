import { Router } from 'express'
import * as newsController from '../controllers/newsController'
import { authMiddleware } from '../middleware/authMiddleware'
import { newsValidation, mongoIdValidation, handleValidation } from '../middleware/validation'

const router = Router()

router.get('/', newsController.getAll)
router.get('/:id', mongoIdValidation, handleValidation, newsController.getById)
router.post('/', authMiddleware, newsValidation, handleValidation, newsController.create)
router.put('/:id', authMiddleware, mongoIdValidation, newsValidation, handleValidation, newsController.update)
router.delete('/:id', authMiddleware, mongoIdValidation, handleValidation, newsController.remove)

export default router
