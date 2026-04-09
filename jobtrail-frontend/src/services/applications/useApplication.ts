import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { elysiaApi } from "@/app/api/apiClients"
import axios from "axios"
import { Application } from "./types"
import { getSession } from "@/services/session/getSession"


export function useApplication(applicationId: number) {
    return useQuery({
        queryKey: ["applications", applicationId],
        queryFn: async() => {
            const session = await getSession()

            const { data } = await elysiaApi.api.applications({ id: applicationId }).get({
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })

            return data
        }
    })
}