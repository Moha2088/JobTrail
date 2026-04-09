import { JobsOptions } from "bullmq";
import { applicationsQueue, usersQueue } from "../../../queue";

export async function requestDeleteUserJob(userId: number, jobOptions: Partial<JobsOptions> = { }) {
    await usersQueue.add("delete_user/" + userId, {
        type: "delete_user",
        userId
    }, {
        delay: 60000,
        ...jobOptions
    })
}