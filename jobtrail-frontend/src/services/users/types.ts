import { Application } from "../applications/types"


export interface User {
    id: number
    name: string
    email: string
    createdAt: Date
    pendingDeletion: boolean,
    applications: Application[]
}

export type PostUser = Omit<User, "id" | "applications" | "createdAt" | "pendingDeletion"> & {
    password: string
}

export type PutUser = PostUser

export type MeUserData = Omit<User, "applications">