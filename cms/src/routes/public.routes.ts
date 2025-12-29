import { Router } from 'express'
import { pageService } from '../services/pageService.js'
import { contentService } from '../services/contentService.js'

const router = Router()

/**
 * GET /api/pages/:slug
 * Get published page by slug
 */
router.get('/pages/:slug', (req, res) => {
    try {
        const page = pageService.getBySlug(req.params.slug)

        if (!page || !page.isPublished) {
            return res.status(404).json({
                success: false,
                error: 'Page not found',
            })
        }

        res.json({
            success: true,
            data: {
                slug: page.slug,
                title: page.title,
                content: page.content,
                metaDescription: page.metaDescription,
            },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * GET /api/content
 * Get all content blocks as object
 */
router.get('/content', (req, res) => {
    try {
        const keys = req.query.keys
            ? (req.query.keys as string).split(',')
            : undefined

        const content = contentService.getAsObject(keys)
        res.json({
            success: true,
            data: content,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

/**
 * GET /api/content/:key
 * Get single content block
 */
router.get('/content/:key', (req, res) => {
    try {
        const block = contentService.getByKey(req.params.key)

        if (!block) {
            return res.status(404).json({
                success: false,
                error: 'Content not found',
            })
        }

        res.json({
            success: true,
            data: {
                key: block.key,
                title: block.title,
                content: block.content,
                type: block.type,
            },
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        })
    }
})

export default router
