import { logger } from "../../../../logger";
import { applicationsQueue } from "../../../queue";

export async function cancelApplicationDeletion(applicationId: number) {
    const jobId = "delete_application-" + applicationId

    const job = await applicationsQueue.getJob(jobId)

    if(!job) {
        logger.error("Failed to find job with id: " + jobId)
        return
    }

    await job.remove()
    logger.info("Cancelled deletion of application with id: " + applicationId)
}