import { pgTable, serial, varchar, integer, text, boolean, timestamp } from 'drizzle-orm/pg-core'
import { categories } from './categories.js'

export const menuItems = pgTable('menu_items', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 200 }).notNull(),
    slug: varchar('slug', { length: 200 }).notNull().unique(),
    categoryId: integer('category_id').references(() => categories.id),
    price: integer('price').notNull(), // in IDR (smallest unit)
    description: text('description'),
    imageUrl: text('image_url'),
    spiceLevel: integer('spice_level').default(0), // 0-5
    isDrink: boolean('is_drink').default(false).notNull(),
    badge: varchar('badge', { length: 50 }),
    badgeIcon: varchar('badge_icon', { length: 50 }),
    isAvailable: boolean('is_available').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type MenuItem = typeof menuItems.$inferSelect
export type NewMenuItem = typeof menuItems.$inferInsert
