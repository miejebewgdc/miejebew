import { Router } from 'express'
import { toNodeHandler } from 'better-auth/node'
import { auth } from '../lib/auth.js'

import categoryRoutes from './category.routes.js'
import menuRoutes from './menu.routes.js'
import orderRoutes from './order.routes.js'
import storeRoutes from './store.routes.js'

const router = Router()

// Better Auth handler - handles all /api/auth/* routes
router.all('/auth/*', toNodeHandler(auth))

// API Routes
router.use('/categories', categoryRoutes)
router.use('/menu', menuRoutes)
router.use('/orders', orderRoutes)
router.use('/store', storeRoutes)

// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Mie Jebew GDC API is running',
        timestamp: new Date().toISOString(),
    })
})

export default router
