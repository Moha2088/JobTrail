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
    applicationStatus: varchar("ApplicationStatus").notNull(),
    position: varchar("Position", { length: 40 }).notNull()
}, (table => [
        index("CompanyName_idx").on(table.companyName),
        index("Email_idx").on(table.email),
        index("Status_idx").on(table.applicationStatus),
        index("Position_idx").on(table.position)
]))

export const usersTable = pgTable("users", {
    id: integer("Id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("Name", { length: 30 }).notNull(),
    email: varchar("Email", { length: 30 }).notNull().unique(),
    password: varchar("Password", { length: 100 }).notNull(),
    createdAt: timestamp("CreatedAt").defaultNow(),
    applicationId: integer("ApplicationId").references(() => applicationsTable.id)
})