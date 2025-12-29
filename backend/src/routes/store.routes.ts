import { Router } from 'express'
import { storeInfoService } from '../services/storeInfoService.js'
import { requireAuth, requireAdmin } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { updateStoreInfoSchema } from '../validators/schemas.js'

const router = Router()

/**
 * GET /api/store
 * Get all store info
 */
router.get('/', async (req, res, next) => {
    try {
        const info = await storeInfoService.getAll()
        res.json({ success: true, data: info })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/store/:key
 * Get specific store info by key
 */
router.get('/:key', async (req, res, next) => {
    try {
        const value = await storeInfoService.getByKey(req.params.key)
        if (value === null) {
            return res.status(404).json({ success: false, error: 'Key not found' })
        }
        res.json({ success: true, data: { key: req.params.key, value } })
    } catch (error) {
        next(error)
    }
})

/**
 * PUT /api/store/:key
 * Set store info (admin only)
 */
router.put('/:key', requireAuth, requireAdmin, validate(updateStoreInfoSchema), async (req, res, next) => {
    try {
        const info = await storeInfoService.set(req.params.key, req.body.value)
        res.json({ success: true, data: info })
    } catch (error) {
        next(error)
    }
})

/**
 * DELETE /api/store/:key
 * Delete store info (admin only)
 */
router.delete('/:key', requireAuth, requireAdmin, async (req, res, next) => {
    try {
        await storeInfoService.delete(req.params.key)
        res.json({ success: true, message: 'Store info deleted' })
    } catch (error) {
        next(error)
    }
})

export default router
