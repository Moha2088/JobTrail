import { JobsOptions } from "bullmq";
import { applicationsQueue } from "../../queue";


export function requestDeletionJob(applicationId: number, userId: number, jobOptions: Partial<JobsOptions> = { }) {
    console.log("Entered requestDeletionJob with applicationId: " + applicationId)

        applicationsQueue.add(`delete_application/${applicationId}`, {
        type: "delete_application",
        applicationId,
        userId
    }, {
        delay: 60000,
        ...jobOptions
    })
}