import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '../../data')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Type definitions
export interface Page {
    id: string
    slug: string
    title: string
    content: string // markdown
    metaDescription: string
    isPublished: boolean
    createdAt: string
    updatedAt: string
}

export interface ContentBlock {
    id: string
    key: string
    title: string
    content: string // markdown
    type: 'text' | 'markdown' | 'html'
    updatedAt: string
}

export interface CmsUser {
    id: string
    email: string
    passwordHash: string
    name: string
    role: 'admin' | 'editor'
    createdAt: string
}

export interface Session {
    id: string
    userId: string
    token: string
    expiresAt: string
    createdAt: string
}

interface Database {
    pages: Page[]
    contentBlocks: ContentBlock[]
    users: CmsUser[]
    sessions: Session[]
}

const DB_FILE = path.join(DATA_DIR, 'cms.json')

// Initialize empty database if not exists
function initDb(): Database {
    return {
        pages: [],
        contentBlocks: [],
        users: [],
        sessions: [],
    }
}

// Load database
export function loadDb(): Database {
    try {
        if (fs.existsSync(DB_FILE)) {
            const data = fs.readFileSync(DB_FILE, 'utf-8')
            return JSON.parse(data)
        }
    } catch (error) {
        console.error('Error loading database:', error)
    }
    return initDb()
}

// Save database
export function saveDb(db: Database): void {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8')
    } catch (error) {
        console.error('Error saving database:', error)
        throw error
    }
}

// Get database instance
export const db = {
    get: loadDb,
    save: saveDb,
}
