import { eq } from "drizzle-orm";
import { db } from "../../../../db/db";
import { applicationsTable } from "../../../../db/schema";
import { logger } from "../../../../logger";

export async function deleteApplication(applicationId: number, userId: number) {
    await db.delete(applicationsTable)
        .where(eq(applicationsTable.id, applicationId))

        logger.info("Deleted application with id: " + applicationId + " for user with id: " + userId)
}