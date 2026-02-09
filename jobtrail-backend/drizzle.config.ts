import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        host: "localhost",
        port: 5430,
        user: "postgres",
        password: "password",
        database: "postgres",
        ssl: false
    }
})