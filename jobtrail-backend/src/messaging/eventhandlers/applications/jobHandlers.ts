import { QueueEvents, Worker } from "bullmq";
import { applicationsQueueName, connection, usersQueueName } from "../../queue"
import { deleteApplication } from "../../events/applications/deleteApplication/deleteApplication"
import { ApplicationQueueJobs } from "../../events/applications/jobTypes"
import { logger } from "../../../logger";


const applicationQueueEvents = new QueueEvents(applicationsQueueName, { connection })
const applicationQueueWorker = new Worker<ApplicationQueueJobs>(applicationsQueueName, async job => { }, { connection })

applicationQueueEvents.on("active", async job => {
    logger.info("[QueueEvents] --- Processing job with id: " + job.jobId)
})

applicationQueueEvents.on("delayed", async job => {
    logger.warn(`Job with id: ${job.jobId} is now delayed and due for deletion in 1 minute!`)
})

applicationQueueWorker.on("completed", async job => {
    const { type, applicationId, userId } = job.data

    switch(type) {
        case "delete_application":
            await deleteApplication(applicationId, userId)
    }
})

applicationQueueEvents.on("failed", async job => {
    logger.error(`Job with id: ${job.jobId} has failed!`)
})