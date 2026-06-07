import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg"


export const isCI = process.env.NODE_ENV == "CI"

export const connectionString = isCI ? process.env.RAILWAY_PUBLIC_DATABASE_URL! : process.env.DATABASE_URL! ? process.env.DATABASE_URL! : process.env.DB_URL!

const pool = new Pool({
    connectionString: connectionString ,
    ssl: process.env.DATABASE_URL ? false : isCI ? { rejectUnauthorized: false } : false,
    statement_timeout: 5000
})

export const db = drizzle(pool)