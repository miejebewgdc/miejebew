import type { Request, Response, NextFunction } from 'express'
import { auth } from '../lib/auth.js'

// Extend Express Request with user/session
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
                name: string
                role: string
            }
            session?: {
                id: string
                userId: string
                expiresAt: Date
            }
        }
    }
}

/**
 * Middleware: Require authentication
 * Blocks request if not authenticated
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const session = await auth.api.getSession({
            headers: new Headers(req.headers as Record<string, string>),
        })

        if (!session) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized - Please login',
            })
        }

        req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: (session.user as any).role || 'customer',
        }
        req.session = {
            id: session.session.id,
            userId: session.session.userId,
            expiresAt: session.session.expiresAt,
        }

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Authentication failed',
        })
    }
}

/**
 * Middleware: Require admin role
 * Must be used after requireAuth
 */
export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
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

/**
 * Middleware: Optional authentication
 * Attaches user if authenticated, but doesn't block
 */
export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const session = await auth.api.getSession({
            headers: new Headers(req.headers as Record<string, string>),
        })

        if (session) {
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: (session.user as any).role || 'customer',
            }
            req.session = {
                id: session.session.id,
                userId: session.session.userId,
                expiresAt: session.session.expiresAt,
            }
        }
    } catch {
        // Ignore errors, proceed without auth
    }

    next()
}
