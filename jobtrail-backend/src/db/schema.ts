import {
    pgTable,
    varchar,
    timestamp,
    integer,
    index,
    boolean
} from 'drizzle-orm/pg-core'


export const applicationsTable = pgTable("applications", {
    id: integer("Id").primaryKey().generatedAlwaysAsIdentity(),
    companyName: varchar("CompanyName", { length: 30 }).notNull(),
    email: varchar("Email", { length: 254 }).notNull(),
    applicationStatus: varchar("ApplicationStatus").notNull(),
    position: varchar("Position", { length: 70 }).notNull(),
    createdAt: timestamp("CreatedAt").defaultNow(),
    content: varchar("Content"),
    key: varchar("Key", { length: 100 }),
    userId: integer("UserId").references(() => usersTable.id, { onDelete: "cascade" })
}, (table => [
        index("CompanyName_idx").on(table.companyName),
        index("Email_idx").on(table.email),
        index("Status_idx").on(table.applicationStatus),
        index("Position_idx").on(table.position),
        index("CreatedAt_idx").on(table.createdAt),
        index("Content_idx").on(table.content)
]))

export const usersTable = pgTable("users", {
    id: integer("Id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("Name", { length: 30 }).notNull(),
    email: varchar("Email", { length: 30 }).notNull().unique(),
    password: varchar("Password").notNull(),
    createdAt: timestamp("CreatedAt").defaultNow(),
    pendingDeletion: boolean("PendingDeletion").notNull().default(false)
})