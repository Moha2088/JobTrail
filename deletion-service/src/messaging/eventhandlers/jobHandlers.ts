import { QueueEvents, Worker } from "bullmq"


import { UserQueueJobs } from "../events/users/jobTypes"
import { connection, usersQueueName } from "../queue"
import { deleteUser } from "./users/deleteUser/deleteUser"


const userQueueEvents = new QueueEvents(usersQueueName, { connection })
const userQueueWorker = new Worker<UserQueueJobs>(usersQueueName, async job => { }, { connection })


userQueueEvents.on("active", async job => {
    console.log(`User queue job with id: ${job.jobId} is being processed!`)
})

userQueueWorker.on("completed", async job => {
    const { type, userId } = job.data
    
    switch (type) {
        case "delete_user":
            await deleteUser(userId)
    }
})