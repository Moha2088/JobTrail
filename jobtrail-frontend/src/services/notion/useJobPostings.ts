import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { JobPostingData } from "./types"
import { getSession } from "../session/getSession"
import { edenClient } from "@/app/api/apiClients"


export function useJobPostings(): UseQueryResult<JobPostingData[], Error> {
    return useQuery({
        queryKey: ["jobPostings"],
        queryFn: async() => {
            const session = await getSession()
            const { data } = await edenClient.api.jobPostings.get({
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })

            return data as JobPostingData[]
        }
    })
}