import { db } from "../../db/db"
import { usersTable } from "../../db/schema"
import { eq } from "drizzle-orm"


export async function getUser(userId: number) {
    const result = await db.select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))

    return {
        sub: result[0].id,
        name: result[0].name

    }
}