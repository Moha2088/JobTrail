import { useQuery } from "@tanstack/react-query"
import { getSession } from "../session/getSession"
import axios from "axios"
import { elysiaApi } from "@/app/api/apiClients"


export function useSearchContent(searchQuery: string) {
    return useQuery({
        queryKey: ["applications", searchQuery],
        queryFn: async() => {
            const session = await getSession()
            
            const { data } = await elysiaApi.api.applications.search.get({
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                },

                query: {
                    q: searchQuery
                },
            })

            return data
        }
    })
}