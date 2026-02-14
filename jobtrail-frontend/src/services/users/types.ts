import { Application } from "../applications/types"


export interface User {
    id: number
    name: string
    email: string
    applications: Application[]
}

export interface PostUser {
    name: string
    email: string
    password: string
}