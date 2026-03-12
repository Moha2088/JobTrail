"use client"

import { ReactNode } from "react"
import { useSession } from "@/services/session/useSession"
import { SessionContext } from "@/contexts/SessionContext"


interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
    const { children } = props

    const { data } = useSession()

    return (
        <SessionContext value={data}>
            {children}
        </SessionContext>
    )
}