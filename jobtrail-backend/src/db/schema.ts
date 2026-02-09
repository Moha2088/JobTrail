import {
    pgTable,
    varchar,
    timestamp,
    integer,
    index
} from 'drizzle-orm/pg-core'


export type ApplicationStatus = "PENDING" | "REJECTED" | "INTERVIEW" | "ACCEPTED"


export const applicationsTable = pgTable("applications", {
    id: integer("Id").primaryKey().generatedAlwaysAsIdentity(),
    companyName: varchar("CompanyName", { length: 30 }).notNull(),
    email: varchar("Email", { length: 30 }).notNull(),
    applicationStatus: varchar("ApplicationStatus").notNull()
}, (table => [
        index("CompanyName_idx").on(table.companyName),
        index("Email_idx").on(table.email),
        index("Status_idx").on(table.applicationStatus)
]))

export const usersTable = pgTable("users", {
    id: integer("Id").primaryKey(),
    name: varchar("Name", { length: 30 }).notNull(),
    email: varchar("Email", { length: 30 }).notNull().unique(),
    password: varchar("Password", { length: 100 }).notNull(),
    createdAt: timestamp("CreatedAt").defaultNow(),
    applicationId: integer("ApplicationId").references(() => applicationsTable.id)
})