import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg"


export const isProduction = process.env.NODE_ENV == "production"
export const isCI = process.env.NODE_ENV == "CI"

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : isCI ? process.env.RAILWAY_PUBLIC_DATABASE_URL : process.env.DB_URL,
    ssl: isProduction ? { rejectUnauthorized: true } : false,
})

export const db = drizzle(pool)