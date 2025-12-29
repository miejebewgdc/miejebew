import { v4 as uuidv4 } from 'uuid'
import { db, type ContentBlock } from '../db/index.js'

export const contentService = {
    // Get all content blocks
    getAll() {
        const database = db.get()
        return database.contentBlocks
    },

    // Get content by key
    getByKey(key: string) {
        const database = db.get()
        return database.contentBlocks.find(b => b.key === key) || null
    },

    // Get multiple content blocks by keys
    getByKeys(keys: string[]) {
        const database = db.get()
        return database.contentBlocks.filter(b => keys.includes(b.key))
    },

    // Get as key-value object
    getAsObject(keys?: string[]) {
        const database = db.get()
        const blocks = keys
            ? database.contentBlocks.filter(b => keys.includes(b.key))
            : database.contentBlocks

        return blocks.reduce((acc, block) => {
            acc[block.key] = {
                title: block.title,
                content: block.content,
                type: block.type,
            }
            return acc
        }, {} as Record<string, { title: string; content: string; type: string }>)
    },

    // Create or update content block
    upsert(key: string, data: { title?: string; content: string; type?: 'text' | 'markdown' | 'html' }) {
        const database = db.get()
        const index = database.contentBlocks.findIndex(b => b.key === key)

        if (index === -1) {
            // Create new
            const block: ContentBlock = {
                id: uuidv4(),
                key,
                title: data.title || key,
                content: data.content,
                type: data.type || 'markdown',
                updatedAt: new Date().toISOString(),
            }
            database.contentBlocks.push(block)
            db.save(database)
            return block
        }

        // Update existing
        database.contentBlocks[index] = {
            ...database.contentBlocks[index],
            ...data,
            updatedAt: new Date().toISOString(),
        }
        db.save(database)
        return database.contentBlocks[index]
    },

    // Delete content block
    delete(key: string) {
        const database = db.get()
        const index = database.contentBlocks.findIndex(b => b.key === key)

        if (index === -1) return false

        database.contentBlocks.splice(index, 1)
        db.save(database)
        return true
    },
}
