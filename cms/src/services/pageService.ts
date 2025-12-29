import { v4 as uuidv4 } from 'uuid'
import { db, type Page } from '../db/index.js'

export const pageService = {
    // Get all pages
    getAll(publishedOnly = false) {
        const database = db.get()
        if (publishedOnly) {
            return database.pages.filter(p => p.isPublished)
        }
        return database.pages
    },

    // Get page by slug
    getBySlug(slug: string) {
        const database = db.get()
        return database.pages.find(p => p.slug === slug) || null
    },

    // Get page by ID
    getById(id: string) {
        const database = db.get()
        return database.pages.find(p => p.id === id) || null
    },

    // Create page
    create(data: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) {
        const database = db.get()

        // Check slug uniqueness
        if (database.pages.find(p => p.slug === data.slug)) {
            throw new Error('Slug already exists')
        }

        const page: Page = {
            id: uuidv4(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        database.pages.push(page)
        db.save(database)
        return page
    },

    // Update page
    update(id: string, data: Partial<Omit<Page, 'id' | 'createdAt'>>) {
        const database = db.get()
        const index = database.pages.findIndex(p => p.id === id)

        if (index === -1) return null

        // Check slug uniqueness if changing
        if (data.slug && data.slug !== database.pages[index].slug) {
            if (database.pages.find(p => p.slug === data.slug)) {
                throw new Error('Slug already exists')
            }
        }

        database.pages[index] = {
            ...database.pages[index],
            ...data,
            updatedAt: new Date().toISOString(),
        }

        db.save(database)
        return database.pages[index]
    },

    // Delete page
    delete(id: string) {
        const database = db.get()
        const index = database.pages.findIndex(p => p.id === id)

        if (index === -1) return false

        database.pages.splice(index, 1)
        db.save(database)
        return true
    },

    // Toggle publish status
    togglePublish(id: string) {
        const database = db.get()
        const page = database.pages.find(p => p.id === id)

        if (!page) return null

        page.isPublished = !page.isPublished
        page.updatedAt = new Date().toISOString()

        db.save(database)
        return page
    },
}
