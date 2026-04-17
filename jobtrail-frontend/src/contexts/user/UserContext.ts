import { User } from "@/services/users/types"
import { createContext, useContext } from "react"


interface UserContextValue {
    user: User
}

export const UserContext = createContext<UserContextValue | undefined>(undefined)

export function useUserContext(): UserContextValue {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("Out of scope!")
    }

    return context
}