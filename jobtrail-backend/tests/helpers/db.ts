import { db } from "../../src/db/db"
import { applicationsTable, usersTable } from "../../src/db/schema"
import { eq } from "drizzle-orm"
import { createAccessToken } from "./createAccessToken"

interface GetTestUserParams {
    id?: number
    email?: string
}

interface CreateTestApplicationParams {
    companyName: string
    email: string
    applicationStatus: string
    position: string
    content: string
    userId: number
}

// Users
export async function createTestUser(email: string, name: string, password: string) {
    const hashed = await Bun.password.hash(password)
    const result = await db.insert(usersTable).values({
        name,
        email,
        password: hashed,
    }).returning({ id: usersTable.id })

    const id = result[0].id.toString()

    const { accessToken } = await createAccessToken({
        sub: id,
        name,
        email
    })

    return {
        accessToken,
        id: Number(id)
    }
}

export async function removeUser(email: string) {
    await db.delete(usersTable).where(eq(usersTable.email, email))
}

export async function getTestUser(params: GetTestUserParams) {
    const { id, email } = params
    
    const result = await db.select().from(usersTable)
        .where(id ? eq(usersTable.id, id) : eq(usersTable.email, email!))
        .leftJoin(applicationsTable, eq(applicationsTable.userId, usersTable.id))      

    return {
        id: result[0].users.id,
        name: result[0].users.name,
        email: result[0].users.email,
        applications: result.map(s => s.applications)

    }
}

export async function removeAll() {
    await db.delete(usersTable)
}







// Applications
export async function createTestApplication(params: CreateTestApplicationParams) {
    const { companyName, email, applicationStatus, position, content, userId } = params
    
    const result = await db.insert(applicationsTable)
        .values({
            companyName, 
            email, 
            applicationStatus, 
            position, 
            content,
            userId
        }).returning({ id: applicationsTable.id })

    return {
        id: Number(result[0].id)
    }
}