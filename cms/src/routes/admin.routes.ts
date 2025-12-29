import { Router } from 'express'
import { authService } from '../services/authService.js'
import { pageService } from '../services/pageService.js'
import { contentService } from '../services/contentService.js'
import { requireAuth, requireAdmin } from '../middlewares/auth.js'

const router = Router()

// ============================================
// AUTH ROUTES
// ============================================

/**
 * POST /api/admin/login
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password required',
            })
        }

        const result = await authService.login(email, password)

        if (!result) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password',
            })
        }

        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * POST /api/admin/logout
 */
router.post('/logout', requireAuth, (req, res) => {
    try {
        const token = req.headers.authorization?.substring(7) || ''
        authService.logout(token)
        res.json({ success: true, message: 'Logged out' })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * GET /api/admin/me
 */
router.get('/me', requireAuth, (req, res) => {
    res.json({
        success: true,
        data: req.user,
    })
})

// ============================================
// PAGE ROUTES
// ============================================

/**
 * GET /api/admin/pages
 */
router.get('/pages', requireAuth, (req, res) => {
    try {
        const pages = pageService.getAll()
        res.json({
            success: true,
            data: pages,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * GET /api/admin/pages/:id
 */
router.get('/pages/:id', requireAuth, (req, res) => {
    try {
        const page = pageService.getById(req.params.id)

        if (!page) {
            return res.status(404).json({
                success: false,
                error: 'Page not found',
            })
        }

        res.json({
            success: true,
            data: page,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * POST /api/admin/pages
 */
router.post('/pages', requireAuth, (req, res) => {
    try {
        const { slug, title, content, metaDescription, isPublished } = req.body

        if (!slug || !title) {
            return res.status(400).json({
                success: false,
                error: 'Slug and title required',
            })
        }

        const page = pageService.create({
            slug,
            title,
            content: content || '',
            metaDescription: metaDescription || '',
            isPublished: isPublished ?? false,
        })

        res.status(201).json({
            success: true,
            data: page,
        })
    } catch (error: any) {
        if (error.message === 'Slug already exists') {
            return res.status(400).json({
                success: false,
                error: error.message,
            })
        }
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * PUT /api/admin/pages/:id
 */
router.put('/pages/:id', requireAuth, (req, res) => {
    try {
        const page = pageService.update(req.params.id, req.body)

        if (!page) {
            return res.status(404).json({
                success: false,
                error: 'Page not found',
            })
        }

        res.json({
            success: true,
            data: page,
        })
    } catch (error: any) {
        if (error.message === 'Slug already exists') {
            return res.status(400).json({
                success: false,
                error: error.message,
            })
        }
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * PATCH /api/admin/pages/:id/publish
 */
router.patch('/pages/:id/publish', requireAuth, (req, res) => {
    try {
        const page = pageService.togglePublish(req.params.id)

        if (!page) {
            return res.status(404).json({
                success: false,
                error: 'Page not found',
            })
        }

        res.json({
            success: true,
            data: page,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * DELETE /api/admin/pages/:id
 */
router.delete('/pages/:id', requireAuth, requireAdmin, (req, res) => {
    try {
        const deleted = pageService.delete(req.params.id)

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Page not found',
            })
        }

        res.json({
            success: true,
            message: 'Page deleted',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

// ============================================
// CONTENT ROUTES
// ============================================

/**
 * GET /api/admin/content
 */
router.get('/content', requireAuth, (req, res) => {
    try {
        const blocks = contentService.getAll()
        res.json({
            success: true,
            data: blocks,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * PUT /api/admin/content/:key
 */
router.put('/content/:key', requireAuth, (req, res) => {
    try {
        const { title, content, type } = req.body

        if (!content) {
            return res.status(400).json({
                success: false,
                error: 'Content required',
            })
        }

        const block = contentService.upsert(req.params.key, { title, content, type })
        res.json({
            success: true,
            data: block,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * DELETE /api/admin/content/:key
 */
router.delete('/content/:key', requireAuth, requireAdmin, (req, res) => {
    try {
        const deleted = contentService.delete(req.params.key)

        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Content not found',
            })
        }

        res.json({
            success: true,
            message: 'Content deleted',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

export default router
