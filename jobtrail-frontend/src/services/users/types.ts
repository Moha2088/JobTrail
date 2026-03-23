import { Application } from "../applications/types"


export interface User {
    id: number
    name: string
    email: string
    createdAt: Date
    applications: Application[]
}

export type PostUser = Omit<User, "id" | "applications"> & {
    password: string
}

export type PutUser = PostUser

export type MeUserData = Omit<User, "applications">