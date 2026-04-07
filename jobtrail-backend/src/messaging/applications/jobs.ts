export type ApplicationQueueJobs = DeleteApplicationJob

export interface DeleteApplicationJob {
    type: "delete_application"
    applicationId: number
    userId: number
}