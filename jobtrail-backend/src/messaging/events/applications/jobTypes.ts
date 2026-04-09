export type ApplicationQueueJobs = DeleteApplicationJob

interface DeleteApplicationJob {
    type: "delete_application"
    applicationId: number
    userId: number
}