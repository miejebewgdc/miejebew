import type { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError, ZodIssue } from 'zod'

/**
 * Validation middleware factory
 * Validates request body against Zod schema
 */
export function validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: error.issues.map((e: ZodIssue) => ({
                        field: e.path.join('.'),
                        message: e.message,
                    })),
                })
            }
            next(error)
        }
    }
}

/**
 * Validate query parameters
 */
export function validateQuery(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse(req.query)
            // Don't reassign req.query directly
            Object.assign(req.query, parsed)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid query parameters',
                    details: error.issues.map((e: ZodIssue) => ({
                        field: e.path.join('.'),
                        message: e.message,
                    })),
                })
            }
            next(error)
        }
    }
}
