import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { usersTable } from "../../db/schema";

export async function emailExists(email: string): Promise<boolean> {
    const result = await db.select()
        .from(usersTable)
        .where(eq(usersTable.email, email))

    return result.length > 0
}