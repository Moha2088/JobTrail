import { eq } from "drizzle-orm"
import { db } from "../../../../db/db"
import { usersTable } from "../../../../db/schema"

export async function deleteUser(userId: number) {
    await db.delete(usersTable)
        .where(eq(usersTable.id, userId))
}