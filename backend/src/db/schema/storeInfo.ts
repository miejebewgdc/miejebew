import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const storeInfo = pgTable('store_info', {
    id: serial('id').primaryKey(),
    key: varchar('key', { length: 100 }).notNull().unique(),
    value: text('value').notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type StoreInfo = typeof storeInfo.$inferSelect
export type NewStoreInfo = typeof storeInfo.$inferInsert
