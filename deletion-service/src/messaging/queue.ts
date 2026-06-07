import { ConnectionOptions, Queue } from "bullmq"
import Redis from "ioredis"
import { UserQueueJobs } from "./events/users/jobTypes"

export const usersQueueName = "users"


if(!process.env.RAILWAY_REDIS_PRIVATE_ENDPOINT || !process.env.RAILWAY_REDIS_PASSWORD) {
    throw new Error("Redis host and password is required!")
}

export const connection: ConnectionOptions = {
    host: process.env.RAILWAY_REDIS_PRIVATE_ENDPOINT ? process.env.RAILWAY_REDIS_PRIVATE_ENDPOINT : "localhost",
    port: 6379,
    ...(process.env.RAILWAY_REDIS_PRIVATE_ENDPOINT ? {
        password: process.env.RAILWAY_REDIS_PASSWORD
    }
    : {})
}


export const usersQueue = new Queue<UserQueueJobs>(usersQueueName, {
    connection
})