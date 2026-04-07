import { QueueEvents, Worker } from "bullmq";
import { connection, queueName } from "../../queue";
import { deleteApplication } from "./deleteApplication";
import { ApplicationQueueJobs } from "../../jobs";

const applicationQueueEvents = new QueueEvents(queueName, { connection })

const applicationQueueWorker = new Worker<ApplicationQueueJobs>(queueName, async job => {
    console.log("Processing job with id: " + job.id)
}, { connection })

applicationQueueWorker.on("active", async job => {
    const { type, applicationId, userId } = job.data
    console.log("Processing job with id: " + job.id)
})

applicationQueueEvents.on("delayed", async job => {
    console.log(`Job with id: ${job.jobId} is now delayed!`)
})

applicationQueueWorker.on("completed", async job => {
    const { type, applicationId, userId } = job.data

    switch(type) {
        case "delete_application":
            await deleteApplication(applicationId, userId)
    }
})