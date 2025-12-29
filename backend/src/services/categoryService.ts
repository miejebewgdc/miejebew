import { db } from '../lib/db.js'
import { categories, type NewCategory } from '../db/schema/index.js'
import { eq } from 'drizzle-orm'

export const categoryService = {
    /**
     * Get all active categories
     */
    async getAll() {
        return db
            .select()
            .from(categories)
            .where(eq(categories.isActive, true))
            .orderBy(categories.sortOrder)
    },

    /**
     * Get category by slug
     */
    async getBySlug(slug: string) {
        const result = await db
            .select()
            .from(categories)
            .where(eq(categories.slug, slug))
            .limit(1)
        return result[0] || null
    },

    /**
     * Get category by ID
     */
    async getById(id: number) {
        const result = await db
            .select()
            .from(categories)
            .where(eq(categories.id, id))
            .limit(1)
        return result[0] || null
    },

    /**
     * Create new category (admin)
     */
    async create(data: NewCategory) {
        const result = await db.insert(categories).values(data).returning()
        return result[0]
    },

    /**
     * Update category (admin)
     */
    async update(id: number, data: Partial<NewCategory>) {
        const result = await db
            .update(categories)
            .set(data)
            .where(eq(categories.id, id))
            .returning()
        return result[0]
    },

    /**
     * Delete category (admin)
     */
    async delete(id: number) {
        return db.delete(categories).where(eq(categories.id, id))
    },
}
