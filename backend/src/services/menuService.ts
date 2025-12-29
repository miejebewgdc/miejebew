import { db } from '../lib/db.js'
import { menuItems, categories, type NewMenuItem } from '../db/schema/index.js'
import { eq, and } from 'drizzle-orm'

// Helper to format price display
function formatPriceDisplay(price: number): string {
    if (price >= 1000) {
        return `${Math.floor(price / 1000)}k`
    }
    return price.toString()
}

export const menuService = {
    /**
     * Get all available menu items with category
     */
    async getAll(categorySlug?: string) {
        let query = db
            .select({
                id: menuItems.id,
                name: menuItems.name,
                slug: menuItems.slug,
                categoryId: menuItems.categoryId,
                price: menuItems.price,
                description: menuItems.description,
                imageUrl: menuItems.imageUrl,
                spiceLevel: menuItems.spiceLevel,
                isDrink: menuItems.isDrink,
                badge: menuItems.badge,
                badgeIcon: menuItems.badgeIcon,
                isAvailable: menuItems.isAvailable,
                category: {
                    id: categories.id,
                    name: categories.name,
                    slug: categories.slug,
                    icon: categories.icon,
                },
            })
            .from(menuItems)
            .leftJoin(categories, eq(menuItems.categoryId, categories.id))
            .where(eq(menuItems.isAvailable, true))
            .$dynamic()

        if (categorySlug && categorySlug !== 'all') {
            query = query.where(
                and(
                    eq(menuItems.isAvailable, true),
                    eq(categories.slug, categorySlug)
                )
            )
        }

        const results = await query

        // Add priceDisplay to each item
        return results.map(item => ({
            ...item,
            priceDisplay: formatPriceDisplay(item.price),
        }))
    },

    /**
     * Get single menu item by slug
     */
    async getBySlug(slug: string) {
        const result = await db
            .select({
                id: menuItems.id,
                name: menuItems.name,
                slug: menuItems.slug,
                categoryId: menuItems.categoryId,
                price: menuItems.price,
                description: menuItems.description,
                imageUrl: menuItems.imageUrl,
                spiceLevel: menuItems.spiceLevel,
                isDrink: menuItems.isDrink,
                badge: menuItems.badge,
                badgeIcon: menuItems.badgeIcon,
                isAvailable: menuItems.isAvailable,
                category: {
                    id: categories.id,
                    name: categories.name,
                    slug: categories.slug,
                    icon: categories.icon,
                },
            })
            .from(menuItems)
            .leftJoin(categories, eq(menuItems.categoryId, categories.id))
            .where(eq(menuItems.slug, slug))
            .limit(1)

        if (!result[0]) return null

        return {
            ...result[0],
            priceDisplay: formatPriceDisplay(result[0].price),
        }
    },

    /**
     * Get single menu item by ID
     */
    async getById(id: number) {
        const result = await db
            .select()
            .from(menuItems)
            .where(eq(menuItems.id, id))
            .limit(1)
        return result[0] || null
    },

    /**
     * Create new menu item (admin)
     */
    async create(data: NewMenuItem) {
        const result = await db.insert(menuItems).values({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning()
        return result[0]
    },

    /**
     * Update menu item (admin)
     */
    async update(id: number, data: Partial<NewMenuItem>) {
        const result = await db
            .update(menuItems)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(eq(menuItems.id, id))
            .returning()
        return result[0]
    },

    /**
     * Delete menu item (admin)
     */
    async delete(id: number) {
        return db.delete(menuItems).where(eq(menuItems.id, id))
    },

    /**
     * Toggle availability (admin)
     */
    async toggleAvailability(id: number) {
        const item = await this.getById(id)
        if (!item) return null

        const result = await db
            .update(menuItems)
            .set({
                isAvailable: !item.isAvailable,
                updatedAt: new Date(),
            })
            .where(eq(menuItems.id, id))
            .returning()
        return result[0]
    },
}
