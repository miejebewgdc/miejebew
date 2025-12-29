import { Router } from 'express'
import { orderService } from '../services/orderService.js'
import { requireAuth, requireAdmin, optionalAuth } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate.js'
import { createOrderSchema, updateOrderStatusSchema } from '../validators/schemas.js'

const router = Router()

/**
 * POST /api/orders
 * Create new order (guest or authenticated)
 */
router.post('/', optionalAuth, validate(createOrderSchema), async (req, res, next) => {
    try {
        const order = await orderService.create({
            ...req.body,
            userId: req.user?.id, // undefined for guests
        })
        res.status(201).json({ success: true, data: order })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/orders
 * Get current user's orders
 */
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const orders = await orderService.getByUserId(req.user!.id)
        res.json({ success: true, data: orders })
    } catch (error) {
        next(error)
    }
})

/**
 * GET /api/orders/:id
 * Get order detail
 */
router.get('/:id', optionalAuth, async (req, res, next) => {
    try {
        const order = await orderService.getById(req.params.id)
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' })
        }

        // Check authorization (user owns order or is admin)
        if (req.user) {
            const isOwner = order.userId === req.user.id
            const isAdmin = req.user.role === 'admin'
            if (!isOwner && !isAdmin) {
                return res.status(403).json({ success: false, error: 'Not authorized' })
            }
        }

        res.json({ success: true, data: order })
    } catch (error) {
        next(error)
    }
})

/**
 * POST /api/orders/:id/cancel
 * Cancel order (user's own order only)
 */
router.post('/:id/cancel', requireAuth, async (req, res, next) => {
    try {
        const order = await orderService.cancel(req.params.id, req.user!.id)
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' })
        }
        res.json({ success: true, data: order })
    } catch (error: any) {
        if (error.message === 'Not authorized to cancel this order') {
            return res.status(403).json({ success: false, error: error.message })
        }
        if (error.message === 'Can only cancel pending orders') {
            return res.status(400).json({ success: false, error: error.message })
        }
        next(error)
    }
})

// ============================================
// ADMIN ROUTES
// ============================================

/**
 * GET /api/admin/orders
 * Get all orders (admin only)
 */
router.get('/admin/all', requireAuth, requireAdmin, async (req, res, next) => {
    try {
        const { status } = req.query
        const orders = await orderService.getAll(status as string | undefined)
        res.json({ success: true, data: orders })
    } catch (error) {
        next(error)
    }
})

/**
 * PATCH /api/admin/orders/:id/status
 * Update order status (admin only)
 */
router.patch('/admin/:id/status', requireAuth, requireAdmin, validate(updateOrderStatusSchema), async (req, res, next) => {
    try {
        const order = await orderService.updateStatus(req.params.id, req.body.status)
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' })
        }
        res.json({ success: true, data: order })
    } catch (error: any) {
        if (error.message.includes('Invalid status')) {
            return res.status(400).json({ success: false, error: error.message })
        }
        next(error)
    }
})

export default router
