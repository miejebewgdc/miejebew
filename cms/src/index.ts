import app from './app.js'
import { env } from './config/env.js'

const PORT = env.PORT

app.listen(PORT, () => {
    console.log(`
📝 ============================================
   Mie Jebew GDC - CMS
   ============================================
   Server: http://localhost:${PORT}
   Admin:  http://localhost:${PORT}/admin
   API:    http://localhost:${PORT}/api
   ============================================
   
   Default credentials:
   Email:    ${env.ADMIN_EMAIL}
   Password: ${env.ADMIN_PASSWORD}
   ============================================
  `)
})
