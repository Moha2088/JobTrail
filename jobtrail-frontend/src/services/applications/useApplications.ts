import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { edenClient } from "@/app/api/apiClients"
import { getSession } from "@/services/session/getSession"
import { ApplicationData } from "./types"

export function useApplications(): UseQueryResult<ApplicationData | undefined> {
    return useQuery({
        queryKey: ["applications"],
        queryFn: async() => {
            const session = await getSession()

            const { data }  = await edenClient.api.applications.get({
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
            
            if (data != null) {
                return data as ApplicationData
            }
        }
    })
}