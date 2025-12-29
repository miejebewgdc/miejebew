import { db } from '../lib/db.js'
import { storeInfo, type NewStoreInfo } from '../db/schema/index.js'
import { eq } from 'drizzle-orm'

export const storeInfoService = {
    /**
     * Get all store info as key-value object
     */
    async getAll() {
        const results = await db.select().from(storeInfo)
        return results.reduce((acc, item) => {
            acc[item.key] = item.value
            return acc
        }, {} as Record<string, string>)
    },

    /**
     * Get single store info by key
     */
    async getByKey(key: string) {
        const result = await db
            .select()
            .from(storeInfo)
            .where(eq(storeInfo.key, key))
            .limit(1)
        return result[0]?.value || null
    },

    /**
     * Set store info (upsert)
     */
    async set(key: string, value: string) {
        const existing = await db
            .select()
            .from(storeInfo)
            .where(eq(storeInfo.key, key))
            .limit(1)

        if (existing[0]) {
            const result = await db
                .update(storeInfo)
                .set({ value, updatedAt: new Date() })
                .where(eq(storeInfo.key, key))
                .returning()
            return result[0]
        }

        const result = await db
            .insert(storeInfo)
            .values({ key, value, updatedAt: new Date() })
            .returning()
        return result[0]
    },

    /**
     * Delete store info
     */
    async delete(key: string) {
        return db.delete(storeInfo).where(eq(storeInfo.key, key))
    },
}
