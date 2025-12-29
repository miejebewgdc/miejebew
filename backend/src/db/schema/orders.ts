import { pgTable, uuid, serial, varchar, integer, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users.js'
import { menuItems } from './menuItems.js'

export const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id), // nullable for guest orders
    customerName: varchar('customer_name', { length: 200 }).notNull(),
    customerPhone: varchar('customer_phone', { length: 20 }).notNull(),
    status: varchar('status', { length: 20 }).default('pending').notNull(),
    // pending | confirmed | preparing | ready | completed | cancelled
    totalAmount: integer('total_amount').notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
    menuItemId: integer('menu_item_id').references(() => menuItems.id).notNull(),
    quantity: integer('quantity').notNull(),
    unitPrice: integer('unit_price').notNull(),
    subtotal: integer('subtotal').notNull(),
})

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert
export type OrderItem = typeof orderItems.$inferSelect
export type NewOrderItem = typeof orderItems.$inferInsert
