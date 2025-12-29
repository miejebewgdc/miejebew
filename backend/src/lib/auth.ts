import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db.js'
import { env } from '../config/env.js'
import * as schema from '../db/schema/index.js'

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {
            user: schema.users,
            session: schema.sessions,
            account: schema.accounts,
            verification: schema.verifications,
        },
    }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [env.FRONTEND_URL],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // Set true for production
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: 'customer',
            },
            phone: {
                type: 'string',
                required: false,
            },
        },
    },
})

export type Auth = typeof auth
