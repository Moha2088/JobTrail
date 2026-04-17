import { eq } from "drizzle-orm";
import { db } from "../../../../db/db";
import { applicationsTable } from "../../../../db/schema";
import { logger } from "../../../../logger";
import { getApplication } from "../../../../utils/applications";
import { deleteFile } from "../../../../utils/r2";

export async function deleteApplication(applicationId: number, userId: number) {
    const application = await getApplication(applicationId)
    const { key } = application
    
    await db.delete(applicationsTable)
        .where(eq(applicationsTable.id, applicationId))

    if (key) {
        await deleteFile(key)
    }

    logger.info("Deleted application with id: " + applicationId + " for user with id: " + userId)
}