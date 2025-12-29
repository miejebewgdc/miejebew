import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { db, type CmsUser, type Session } from '../db/index.js'

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export const authService = {
    // Login
    async login(email: string, password: string) {
        const database = db.get()
        const user = database.users.find(u => u.email === email)

        if (!user) {
            return null
        }

        const isValid = await bcrypt.compare(password, user.passwordHash)
        if (!isValid) {
            return null
        }

        // Create session
        const session: Session = {
            id: uuidv4(),
            userId: user.id,
            token: uuidv4(),
            expiresAt: new Date(Date.now() + SESSION_DURATION).toISOString(),
            createdAt: new Date().toISOString(),
        }

        database.sessions.push(session)
        db.save(database)

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token: session.token,
            expiresAt: session.expiresAt,
        }
    },

    // Logout
    logout(token: string) {
        const database = db.get()
        const index = database.sessions.findIndex(s => s.token === token)

        if (index !== -1) {
            database.sessions.splice(index, 1)
            db.save(database)
        }
        return true
    },

    // Validate session
    validateSession(token: string) {
        const database = db.get()
        const session = database.sessions.find(s => s.token === token)

        if (!session) return null

        // Check expiration
        if (new Date(session.expiresAt) < new Date()) {
            // Remove expired session
            const index = database.sessions.findIndex(s => s.token === token)
            database.sessions.splice(index, 1)
            db.save(database)
            return null
        }

        const user = database.users.find(u => u.id === session.userId)
        if (!user) return null

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        }
    },

    // Get user by ID
    getUserById(id: string) {
        const database = db.get()
        const user = database.users.find(u => u.id === id)
        if (!user) return null

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        }
    },

    // Create user (admin only)
    async createUser(data: { email: string; password: string; name: string; role: 'admin' | 'editor' }) {
        const database = db.get()

        if (database.users.find(u => u.email === data.email)) {
            throw new Error('Email already exists')
        }

        const passwordHash = await bcrypt.hash(data.password, 10)
        const user: CmsUser = {
            id: uuidv4(),
            email: data.email,
            passwordHash,
            name: data.name,
            role: data.role,
            createdAt: new Date().toISOString(),
        }

        database.users.push(user)
        db.save(database)

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        }
    },

    // Clean expired sessions
    cleanExpiredSessions() {
        const database = db.get()
        const now = new Date()
        const before = database.sessions.length

        database.sessions = database.sessions.filter(
            s => new Date(s.expiresAt) > now
        )

        if (database.sessions.length !== before) {
            db.save(database)
        }

        return before - database.sessions.length
    },
}
