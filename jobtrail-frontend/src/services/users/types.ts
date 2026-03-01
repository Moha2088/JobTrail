import { Application } from "../applications/types"



export interface User {
    id: number
    name: string
    email: string
    applications: Application[]
}

export type PostUser = Omit<User, "id" | "applications"> & {
    password: string
}

export type PutUser = Omit<User, "id" | "applications"> & {
    password: string
}

export type MeUserData = Omit<User, "applications">