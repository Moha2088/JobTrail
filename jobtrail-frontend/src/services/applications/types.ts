
export interface Application {
    id: number,
    companyName: string,
    email: string,
    applicationStatus: string,
    position: string,
}

export type PostApplication = Omit<Application, "id">