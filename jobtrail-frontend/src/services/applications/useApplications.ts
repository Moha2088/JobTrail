import { useQuery } from "@tanstack/react-query"
import { elysiaApi } from "@/app/api/elysiaApi"
import axios from "axios"
import { Application } from "./types"

axios.defaults.withCredentials = true

export function useApplications() {
    return useQuery({
        queryKey: ["applications"],
        queryFn: async() => {
            const { data }  = await axios.get<Application[]>("http://localhost:3003/api/applications")
            // const { data }  = await elysiaApi.api.applications.get()
            return data
        }
    })
}