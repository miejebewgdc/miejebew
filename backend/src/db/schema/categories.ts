import { pgTable, serial, varchar, integer, boolean } from 'drizzle-orm/pg-core'

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull().unique(),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    icon: varchar('icon', { length: 50 }),
    sortOrder: integer('sort_order').default(0),
    isActive: boolean('is_active').default(true).notNull(),
})

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
