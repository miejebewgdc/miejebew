import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import routes from './routes/index.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'

const app = express()

// CORS configuration
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/api', routes)

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'Mie Jebew GDC API',
        version: '1.0.0',
        docs: '/api/health',
    })
})

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

export default app
