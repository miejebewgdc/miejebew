import { db } from '../lib/db.js'
import { orders, orderItems, menuItems, type NewOrder } from '../db/schema/index.js'
import { eq, desc } from 'drizzle-orm'

interface CreateOrderInput {
    userId?: string
    customerName: string
    customerPhone: string
    notes?: string
    items: Array<{
        menuItemId: number
        quantity: number
    }>
}

export const orderService = {
    /**
     * Create new order
     */
    async create(data: CreateOrderInput) {
        // Get menu items to calculate prices
        const menuItemIds = data.items.map(i => i.menuItemId)
        const menuItemsData = await db
            .select()
            .from(menuItems)
            .where(eq(menuItems.isAvailable, true))

        const menuItemMap = new Map(menuItemsData.map(m => [m.id, m]))

        // Calculate order items with prices
        let totalAmount = 0
        const orderItemsData = data.items.map(item => {
            const menuItem = menuItemMap.get(item.menuItemId)
            if (!menuItem) {
                throw new Error(`Menu item ${item.menuItemId} not found or unavailable`)
            }
            const subtotal = menuItem.price * item.quantity
            totalAmount += subtotal
            return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                unitPrice: menuItem.price,
                subtotal,
            }
        })

        // Create order
        const [order] = await db.insert(orders).values({
            userId: data.userId,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            notes: data.notes,
            totalAmount,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        }).returning()

        // Create order items
        await db.insert(orderItems).values(
            orderItemsData.map(item => ({
                ...item,
                orderId: order.id,
            }))
        )

        return this.getById(order.id)
    },

    /**
     * Get order by ID with items
     */
    async getById(id: string) {
        const order = await db
            .select()
            .from(orders)
            .where(eq(orders.id, id))
            .limit(1)

        if (!order[0]) return null

        const items = await db
            .select({
                id: orderItems.id,
                quantity: orderItems.quantity,
                unitPrice: orderItems.unitPrice,
                subtotal: orderItems.subtotal,
                menuItem: {
                    id: menuItems.id,
                    name: menuItems.name,
                    imageUrl: menuItems.imageUrl,
                },
            })
            .from(orderItems)
            .leftJoin(menuItems, eq(orderItems.menuItemId, menuItems.id))
            .where(eq(orderItems.orderId, id))

        return {
            ...order[0],
            items,
        }
    },

    /**
     * Get orders by user ID
     */
    async getByUserId(userId: string) {
        return db
            .select()
            .from(orders)
            .where(eq(orders.userId, userId))
            .orderBy(desc(orders.createdAt))
    },

    /**
     * Get all orders (admin)
     */
    async getAll(status?: string) {
        let query = db
            .select()
            .from(orders)
            .orderBy(desc(orders.createdAt))
            .$dynamic()

        if (status) {
            query = query.where(eq(orders.status, status))
        }

        return query
    },

    /**
     * Update order status (admin)
     */
    async updateStatus(id: string, status: string) {
        const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid status: ${status}`)
        }

        const result = await db
            .update(orders)
            .set({
                status,
                updatedAt: new Date(),
            })
            .where(eq(orders.id, id))
            .returning()

        return result[0]
    },

    /**
     * Cancel order
     */
    async cancel(id: string, userId?: string) {
        const order = await db
            .select()
            .from(orders)
            .where(eq(orders.id, id))
            .limit(1)

        if (!order[0]) return null

        // Check if user owns this order (if userId provided)
        if (userId && order[0].userId !== userId) {
            throw new Error('Not authorized to cancel this order')
        }

        // Can only cancel pending orders
        if (order[0].status !== 'pending') {
            throw new Error('Can only cancel pending orders')
        }

        return this.updateStatus(id, 'cancelled')
    },
}
