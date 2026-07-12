import { body, param, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const handleValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export const loginValidation = [
  body('email').isEmail().normalizeEmail().trim(),
  body('password').notEmpty().isLength({ min: 4 }),
]

export const projectValidation = [
  body('title_en').trim().notEmpty().withMessage('English title is required'),
  body('title_ar').trim().notEmpty().withMessage('Arabic title is required'),
  body('category_en').trim().escape(),
  body('category_ar').trim().escape(),
  body('location_en').trim().escape(),
  body('location_ar').trim().escape(),
  body('description_en').trim().escape(),
  body('description_ar').trim().escape(),
  body('year').trim().escape(),
  body('status').isIn(['ongoing', 'completed']).optional(),
]

export const newsValidation = [
  body('title_en').trim().notEmpty().withMessage('English title is required'),
  body('title_ar').trim().notEmpty().withMessage('Arabic title is required'),
  body('excerpt_en').trim().escape(),
  body('excerpt_ar').trim().escape(),
  body('category_en').trim().escape(),
  body('category_ar').trim().escape(),
  body('date').trim().escape(),
]

export const certificateValidation = [
  body('title_en').trim().notEmpty().withMessage('English title is required'),
  body('title_ar').trim().notEmpty().withMessage('Arabic title is required'),
  body('organization_en').trim().escape(),
  body('organization_ar').trim().escape(),
  body('description_en').trim().escape(),
  body('description_ar').trim().escape(),
  body('category_en').trim().escape(),
  body('category_ar').trim().escape(),
  body('issueDate').trim().escape(),
  body('expiryDate').trim().escape(),
  body('status').isIn(['active', 'expiring', 'expired']).optional(),
]

export const serviceValidation = [
  body('title_en').trim().notEmpty().withMessage('English title is required'),
  body('title_ar').trim().notEmpty().withMessage('Arabic title is required'),
  body('description_en').trim().escape(),
  body('description_ar').trim().escape(),
  body('icon').trim().escape(),
]

export const mongoIdValidation = [
  param('id').isMongoId().withMessage('Invalid ID format'),
]
