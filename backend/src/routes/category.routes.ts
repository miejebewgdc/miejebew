import { Router } from 'express'
import { categoryService } from '../services/categoryService.js'
import { requireAuth, requireAdmin } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { createCategorySchema, updateCategorySchema } from '../validators/schemas.js'

const router = Router()

/**
 * GET /api/categories
 * Get all active categories
 */
router.get('/', async (req, res, next) => {
    try {
        const categories = await categoryService.getAll()
        res.json({ success: true, data: categories })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/categories/:slug
 * Get category by slug
 */
router.get('/:slug', async (req, res, next) => {
    try {
        const category = await categoryService.getBySlug(req.params.slug)
        if (!category) {
            return res.status(404).json({ success: false, error: 'Category not found' })
        }
        res.json({ success: true, data: category })
    } catch (error) {
        next(error)
    }
})

/**
 * POST /api/categories
 * Create new category (admin only)
 */
router.post('/', requireAuth, requireAdmin, validate(createCategorySchema), async (req, res, next) => {
    try {
        const category = await categoryService.create(req.body)
        res.status(201).json({ success: true, data: category })
    } catch (error) {
        next(error)
    }
})

/**
 * PUT /api/categories/:id
 * Update category (admin only)
 */
router.put('/:id', requireAuth, requireAdmin, validate(updateCategorySchema), async (req, res, next) => {
    try {
        const category = await categoryService.update(Number(req.params.id), req.body)
        if (!category) {
            return res.status(404).json({ success: false, error: 'Category not found' })
        }
        res.json({ success: true, data: category })
    } catch (error) {
        next(error)
    }
})

/**
 * DELETE /api/categories/:id
 * Delete category (admin only)
 */
router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
    try {
        await categoryService.delete(Number(req.params.id))
        res.json({ success: true, message: 'Category deleted' })
    } catch (error) {
        next(error)
    }
})

export default router
