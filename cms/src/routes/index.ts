import { Router } from 'express'
import publicRoutes from './public.routes.js'
import adminRoutes from './admin.routes.js'

const router = Router()

// Public API
router.use('/', publicRoutes)

// Admin API
router.use('/admin', adminRoutes)

// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'CMS API is running',
        timestamp: new Date().toISOString(),
    })
})

export default router
