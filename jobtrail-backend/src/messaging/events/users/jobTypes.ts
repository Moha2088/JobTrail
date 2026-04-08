export type UserQueueJobs = DeleteUserJob

interface DeleteUserJob {
    type: "delete_user"
    userId: number
}