import { db } from "../db/db"
import { applicationsTable } from "../db/schema"
import { eq } from "drizzle-orm"


export async function getApplication(applicationId: number) {
    const result = await db.select()
        .from(applicationsTable)
        .where(eq(applicationsTable.id, applicationId))

    return result[0]
}