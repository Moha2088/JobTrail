import { defineConfig } from "drizzle-kit"
import { isCI, isProduction } from "./src/db/db"


export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: isProduction ? process.env.DATABASE_URL! : isCI ? process.env.RAILWAY_PUBLIC_DATABASE_URL! : process.env.DB_URL!
    }
})