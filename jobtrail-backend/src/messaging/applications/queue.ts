import { ConnectionOptions, Queue } from "bullmq"
import { Redis } from "ioredis"
import { ApplicationQueueJobs } from "./jobs"

export const queueName = "applications"


export const connection: ConnectionOptions= {
    host: "localhost",
    port: 6379
}


export const applicationsQueue = new Queue<ApplicationQueueJobs>(queueName, {
    connection
})