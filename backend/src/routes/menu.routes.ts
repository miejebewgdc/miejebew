import { Router } from 'express'
import { menuService } from '../services/menuService.js'
import { requireAuth, requireAdmin } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { createMenuItemSchema, updateMenuItemSchema } from '../validators/schemas.js'

const router = Router()

/**
 * GET /api/menu
 * Get all available menu items
 * Query: ?category=mie
 */
router.get('/', async (req, res, next) => {
    try {
        const { category } = req.query
        const items = await menuService.getAll(category as string | undefined)
        res.json({ success: true, data: items })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/menu/:slug
 * Get single menu item by slug
 */
router.get('/:slug', async (req, res, next) => {
    try {
        const item = await menuService.getBySlug(req.params.slug)
        if (!item) {
            return res.status(404).json({ success: false, error: 'Menu item not found' })
        }
        res.json({ success: true, data: item })
    } catch (error) {
        next(error)
    }
})

/**
 * POST /api/menu
 * Create new menu item (admin only)
 */
router.post('/', requireAuth, requireAdmin, validate(createMenuItemSchema), async (req, res, next) => {
    try {
        const item = await menuService.create(req.body)
        res.status(201).json({ success: true, data: item })
    } catch (error) {
        next(error)
    }
})

/**
 * PUT /api/menu/:id
 * Update menu item (admin only)
 */
router.put('/:id', requireAuth, requireAdmin, validate(updateMenuItemSchema), async (req, res, next) => {
    try {
        const item = await menuService.update(Number(req.params.id), req.body)
        if (!item) {
            return res.status(404).json({ success: false, error: 'Menu item not found' })
        }
        res.json({ success: true, data: item })
    } catch (error) {
        next(error)
    }
})

/**
 * PATCH /api/menu/:id/availability
 * Toggle menu item availability (admin only)
 */
router.patch('/:id/availability', requireAuth, requireAdmin, async (req, res, next) => {
    try {
        const item = await menuService.toggleAvailability(Number(req.params.id))
        if (!item) {
            return res.status(404).json({ success: false, error: 'Menu item not found' })
        }
        res.json({ success: true, data: item })
    } catch (error) {
        next(error)
    }
})

/**
 * DELETE /api/menu/:id
 * Delete menu item (admin only)
 */
router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
    try {
        await menuService.delete(Number(req.params.id))
        res.json({ success: true, message: 'Menu item deleted' })
    } catch (error) {
        next(error)
    }
})

export default router
