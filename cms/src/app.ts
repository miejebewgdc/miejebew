import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { env } from './config/env.js'
import routes from './routes/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// CORS
app.use(cors({
    origin: [env.FRONTEND_URL, 'http://localhost:3002'],
    credentials: true,
}))

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve admin panel static files
app.use('/admin', express.static(path.join(__dirname, 'admin')))

// API routes
app.use('/api', routes)

// Root redirect to admin
app.get('/', (req, res) => {
    res.redirect('/admin')
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Not found',
    })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err)
    res.status(500).json({
        success: false,
        error: 'Internal server error',
    })
})

export default app
