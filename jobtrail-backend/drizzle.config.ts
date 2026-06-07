import { defineConfig } from "drizzle-kit"
import { connectionString } from "./src/db/db"


export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: connectionString
    }
})