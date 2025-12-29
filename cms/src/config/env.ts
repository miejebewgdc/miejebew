import 'dotenv/config'

export const env = {
    PORT: process.env.PORT || 3002,
    NODE_ENV: process.env.NODE_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@miejebew.com',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
    JWT_SECRET: process.env.JWT_SECRET || 'cms-secret-key',
}
