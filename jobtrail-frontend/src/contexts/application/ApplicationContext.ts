import { Application } from "@/services/applications"
import { createContext, useContext } from "react"


export const ApplicationContext = createContext<ApplicationContextValue| undefined>(undefined)

interface ApplicationContextValue {
    application: Application
}

export function useApplicationContext(): ApplicationContextValue {
    const context = useContext(ApplicationContext)

    if (!context) {
        throw new Error("Out of scope!")
    }

    return context

}