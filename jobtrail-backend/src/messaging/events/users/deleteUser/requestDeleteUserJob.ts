import { JobsOptions } from "bullmq";
import { usersQueue } from "../../../queue";

export async function requestDeleteUserJob(userId: number, jobOptions: Partial<JobsOptions> = { }) {
    const jobId = "delete_user_" + userId
    const delay = 86400000

    await usersQueue.add("delete_user/" + userId, {
        type: "delete_user",
        userId
    }, {
        delay,
        jobId,
        ...jobOptions
    })
}