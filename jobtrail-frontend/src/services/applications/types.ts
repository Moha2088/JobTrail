
export interface Application {
    id: number,
    companyName: string,
    email: string,
    applicationStatus: string,
    position: string,
}

export interface ApplicationData {
    applications: Application[]
    metrics: {
        rejectedCount: number
        pendingCount: number
        acceptedCount: number
    }
}

export type PostApplication = Omit<Application, "id">