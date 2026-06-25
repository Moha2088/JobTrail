import { db } from "../../src/db/db"
import { usersTable } from "../../src/db/schema"
import { eq } from "drizzle-orm"
import { createAccessToken } from "./createAccessToken"

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
        id
    }
}

export async function removeUser(email: string) {
    await db.delete(usersTable).where(eq(usersTable.email, email))
}

export async function removeAll() {
    await db.delete(usersTable)
}
