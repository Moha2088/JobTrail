import { ConnectionOptions, Queue } from "bullmq"
import { UserQueueJobs } from "./events/users/jobTypes"

export const usersQueueName = "users"

const isProduction = process.env.NODE_ENV === "production"

if(isProduction && (!process.env.RAILWAY_REDIS_PRIVATE_ENDPOINT || !process.env.RAILWAY_REDIS_PASSWORD)) {
    throw new Error("Redis host and password is required!")
}

export const connection: ConnectionOptions = {
    host: isProduction ? process.env.RAILWAY_REDIS_PRIVATE_ENDPOINT : "localhost",
    port: 6379,
    ...(isProduction ? {
        password: process.env.RAILWAY_REDIS_PASSWORD
    }
    : {})
}


export const usersQueue = new Queue<UserQueueJobs>(usersQueueName, {
    connection
})