"use client"

import { createContext, useContext } from "react"
import { SessionData } from "@/app/api/login/types"


export const SessionContext = createContext<SessionData | undefined>(undefined)

export function useSessionContext(): SessionData {
    try {
        const session = useContext(SessionContext)
        return session!
    }

    catch (err) {
        throw new Error((err as Error).message)
    }
}