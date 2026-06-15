import { keepPreviousData, useQuery, UseQueryResult } from "@tanstack/react-query"
import { edenClient } from "@/app/api/apiClients"
import { getSession } from "@/services/session/getSession"
import { ApplicationData } from "./types"

interface UseApplicationParams {
    page: number
}

export function useApplications(params: UseApplicationParams): UseQueryResult<ApplicationData | undefined> {
    const { page } = params

    return useQuery({
        queryKey: ["applications", page],
        placeholderData: keepPreviousData,
        queryFn: async() => {
            const session = await getSession()

            const { data }  = await edenClient.api.applications.get({
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                },
                query: {
                    page,
                    limit: 5
                }
            })

            return data as ApplicationData
        }
    })
}