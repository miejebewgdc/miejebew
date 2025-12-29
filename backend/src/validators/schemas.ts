import { z } from 'zod'

// Category schemas
export const createCategorySchema = z.object({
    name: z.string().min(1).max(100),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
    icon: z.string().max(50).optional(),
    sortOrder: z.number().int().optional(),
    isActive: z.boolean().optional(),
})

export const updateCategorySchema = createCategorySchema.partial()

// Menu item schemas
export const createMenuItemSchema = z.object({
    name: z.string().min(1).max(200),
    slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
    categoryId: z.number().int().positive(),
    price: z.number().int().positive(),
    description: z.string().optional(),
    imageUrl: z.string().url().optional(),
    spiceLevel: z.number().int().min(0).max(5).optional(),
    isDrink: z.boolean().optional(),
    badge: z.string().max(50).optional(),
    badgeIcon: z.string().max(50).optional(),
    isAvailable: z.boolean().optional(),
})

export const updateMenuItemSchema = createMenuItemSchema.partial()

// Order schemas
export const createOrderSchema = z.object({
    customerName: z.string().min(1).max(200),
    customerPhone: z.string().min(10).max(20),
    notes: z.string().max(500).optional(),
    items: z.array(z.object({
        menuItemId: z.number().int().positive(),
        quantity: z.number().int().positive().max(100),
    })).min(1),
})

export const updateOrderStatusSchema = z.object({
    status: z.enum(['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']),
})

// Store info schemas
export const updateStoreInfoSchema = z.object({
    value: z.string().min(1),
})

// Query schemas
export const menuQuerySchema = z.object({
    category: z.string().optional(),
})

export const orderQuerySchema = z.object({
    status: z.string().optional(),
})
