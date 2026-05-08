import { eq } from "drizzle-orm";
import { db } from "../../../../db/db";
import { usersTable } from "../../../../db/schema";
import { logger } from "../../../../logger";
import { usersQueue } from "../../../queue";


export async function cancelUserDeletion(userId: number) {
  const jobId = "delete_user_" + userId;
  const job = await usersQueue.getJob(jobId);  

  if (!job) {
    logger.error("Could not find job with id: " + jobId);
    return;
  }

  const state = await job.getState()

  if(state == "active") {
    throw new Error("Failed to cancel deletion! Job is being processed!")
  }

  await job.remove();

  await db
    .update(usersTable)
    .set({ pendingDeletion: false })
    .where(eq(usersTable.id, userId));

  logger.info(`Job with id: ${jobId} has been removed from queue!`);
}