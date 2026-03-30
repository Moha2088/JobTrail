
export interface Application {
    id: number
    companyName: string
    email: string;
    applicationStatus: string
    position: string
    content: string | null
    key?: string
}