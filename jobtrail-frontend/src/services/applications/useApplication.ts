import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { elysiaApi } from "@/app/api/elysiaApi"
import axios from "axios"
import { Application } from "./types"




export function useApplication(applicationId: number): UseQueryResult<Application> {
    return useQuery({
        queryKey: ["applications", applicationId],
        queryFn: async() => {
            // const { data } = await elysiaApi.api.applications({ id: applicationId }).get()
            const { data } = await axios.get("http://localhost:3003/api/applications/" + applicationId)
            return data
        }
    })
}