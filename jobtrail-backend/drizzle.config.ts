import { defineConfig } from "drizzle-kit"
import { isProduction } from "./src/db/db"


export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: isProduction ? process.env.NEON_DB_URL! : process.env.DB_URL!
    }
})