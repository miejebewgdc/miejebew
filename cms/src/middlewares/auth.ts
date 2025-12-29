import type { Request, Response, NextFunction } from 'express'
import { authService } from '../services/authService.js'

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
                name: string
                role: string
            }
        }
    }
}

/**
 * Require authentication middleware
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized - No token provided',
        })
    }

    const token = authHeader.substring(7)
    const user = authService.validateSession(token)

    if (!user) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized - Invalid or expired token',
        })
    }

    req.user = user
    next()
}

/**
 * Require admin role middleware
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
        })
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Forbidden - Admin access required',
        })
    }

    next()
}
