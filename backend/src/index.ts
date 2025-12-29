import app from './app.js'
import { env } from './config/env.js'

const PORT = env.PORT

app.listen(PORT, () => {
    console.log(`
🍜 ============================================
   Mie Jebew GDC Backend API
   ============================================
   Server running on: http://localhost:${PORT}
   Environment: ${env.NODE_ENV}
   ============================================
   
   Endpoints:
   - Health:      GET  /api/health
   - Categories:  GET  /api/categories
   - Menu:        GET  /api/menu
   - Orders:      POST /api/orders
   - Auth:        POST /api/auth/sign-up
                  POST /api/auth/sign-in
   ============================================
  `)
})
