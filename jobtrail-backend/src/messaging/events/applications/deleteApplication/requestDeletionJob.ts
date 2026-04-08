import { JobsOptions } from "bullmq";
import { applicationsQueue } from "../../../queue";


export async function requestDeletionJob(applicationId: number, userId: number, jobOptions: Partial<JobsOptions> = { }) {
        await applicationsQueue.add(`delete_application/${applicationId}`, {
            type: "delete_application",
            applicationId,
            userId
        }, {
            delay: 60000,
            ...jobOptions
        })
}