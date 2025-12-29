import 'dotenv/config'

export const env = {
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL!,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || 'http://localhost:3001',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
}

// Validate required env vars
const requiredEnvVars = ['DATABASE_URL', 'BETTER_AUTH_SECRET']
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.warn(`⚠️  Warning: ${envVar} is not set in environment variables`)
    }
}
