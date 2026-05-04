import { ConnectionOptions, Queue } from "bullmq"
import { UserQueueJobs } from "./events/users/jobTypes"
import { ApplicationQueueJobs } from "./events/applications/jobTypes"

export const applicationsQueueName = "applications"
export const usersQueueName = "users"

const isProduction = process.env.NODE_ENV === "production"

export const connection: ConnectionOptions = {
    host: isProduction ? process.env.UPSTASH_HOST : "localhost",
    port: 6379,
    password: process.env.UPSTASH_PASSWORD,
    tls: {}
}


export const applicationsQueue = new Queue<ApplicationQueueJobs>(applicationsQueueName, {
    connection
})

export const usersQueue = new Queue<UserQueueJobs>(usersQueueName, {
    connection
})