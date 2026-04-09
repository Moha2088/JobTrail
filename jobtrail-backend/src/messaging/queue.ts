import { ConnectionOptions, Queue } from "bullmq"
import { UserQueueJobs } from "./events/users/jobTypes"
import { ApplicationQueueJobs } from "./events/applications/jobTypes"

export const applicationsQueueName = "applications"
export const usersQueueName = "users"


export const connection: ConnectionOptions = {
    host: "localhost",
    port: 6379
}


export const applicationsQueue = new Queue<ApplicationQueueJobs>(applicationsQueueName, {
    connection
})

export const usersQueue = new Queue<UserQueueJobs>(usersQueueName, {
    connection
})