import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 20 }),
    emailVerified: timestamp('email_verified'),
    image: text('image'),
    role: varchar('role', { length: 20 }).default('customer').notNull(), // customer | admin
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
