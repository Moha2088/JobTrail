import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { elysiaApi } from "@/app/api/apiClients"
import axios from "axios"
import { Application } from "./types"
import { getSession } from "@/services/session/getSession"
import { router } from "next/client"




export function useApplication(applicationId: number): UseQueryResult<Application> {
    return useQuery({
        queryKey: ["applications", applicationId],
        queryFn: async() => {
            const session = await getSession()
            const { data, status } = await axios.get("http://localhost:3003/api/applications/" + applicationId, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
            return data
        }
    })
}