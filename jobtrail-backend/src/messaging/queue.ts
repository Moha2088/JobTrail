import { ConnectionOptions, DefaultJobOptions, Queue, QueueOptions } from "bullmq"
import { UserQueueJobs } from "./events/users/jobTypes"
import Redis from "ioredis"

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

const defaultJobOptions: DefaultJobOptions = {
    removeOnComplete: true,
    removeOnFail: true
}

export const usersQueue = new Queue<UserQueueJobs>(usersQueueName, {
    connection,
    defaultJobOptions
})