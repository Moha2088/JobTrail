import { eq } from "drizzle-orm";
import { db } from "../../../../db/db";
import { applicationsTable } from "../../../../db/schema";

export async function deleteApplication(applicationId: number, userId: number) {
    await db.delete(applicationsTable)
        .where(eq(applicationsTable.id, applicationId))

        console.log("Deleted application with id: " + applicationId)
}