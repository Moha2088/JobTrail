import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(Bun.env.DB_URL)