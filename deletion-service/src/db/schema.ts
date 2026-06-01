import {
    pgTable,
    varchar,
    timestamp,
    integer,
    boolean
} from 'drizzle-orm/pg-core'


export const usersTable = pgTable("users", {
    id: integer("Id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("Name", { length: 30 }).notNull(),
    email: varchar("Email", { length: 30 }).notNull().unique(),
    password: varchar("Password").notNull(),
    createdAt: timestamp("CreatedAt").defaultNow(),
    pendingDeletion: boolean("PendingDeletion").notNull().default(false)
})