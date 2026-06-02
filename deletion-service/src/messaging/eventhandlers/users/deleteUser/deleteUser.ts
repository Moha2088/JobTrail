import { and, eq } from "drizzle-orm";
import { db } from "../../../../db/db";
import { usersTable } from "../../../../db/schema";


export async function deleteUser(id: number) {
        const user = await db.select().from(usersTable)
        .where(and(eq(usersTable.id, id), eq(usersTable.pendingDeletion, true)))

        if(user.length === 0) {
            throw new Error(`User with id: ${id} is not pending deletion or does not exist!`)
        }

        await db.delete(usersTable).where(eq(usersTable.id, id))

        console.log(`User with id: ${id} has been deleted!`)
}