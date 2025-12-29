import type { Request, Response, NextFunction } from 'express'
import { env } from '../config/env.js'

interface AppError extends Error {
    statusCode?: number
    isOperational?: boolean
}

/**
 * Global error handler middleware
 */
export function errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    // Log error in development
    if (env.NODE_ENV === 'development') {
        console.error('Error:', {
            message: err.message,
            stack: err.stack,
            statusCode,
        })
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    })
}

/**
 * 404 handler for undefined routes
 */
export function notFoundHandler(req: Request, res: Response) {
    res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.originalUrl} not found`,
    })
}

/**
 * Create custom error with status code
 */
export function createError(message: string, statusCode: number = 500): AppError {
    const error: AppError = new Error(message)
    error.statusCode = statusCode
    error.isOperational = true
    return error
}
