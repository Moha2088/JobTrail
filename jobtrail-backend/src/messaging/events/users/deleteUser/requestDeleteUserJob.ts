import { JobsOptions } from "bullmq";
import { usersQueue } from "../../../queue";

export async function requestDeleteUserJob(userId: number, jobOptions: Partial<JobsOptions> = { }) {
    await usersQueue.add("delete_user/" + userId, {
        type: "delete_user",
        userId
    }, {
        delay: 86400000,
        jobId: "delete_user_" + userId,
        ...jobOptions
    })
}