import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../config/env.js'
import * as schema from '../db/schema/index.js'

// Create postgres connection
const client = postgres(env.DATABASE_URL)

// Create drizzle instance with schema
export const db = drizzle(client, { schema })

export type Database = typeof db
