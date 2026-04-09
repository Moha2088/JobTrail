import { useQuery } from "@tanstack/react-query"
import { getSession } from "../session/getSession"
import { elysiaApi } from "@/app/api/apiClients"


export function useUser(id: number) {
    return useQuery({
        queryKey: ["users", id],
        queryFn: async() => {
            const session = await getSession()
            
            const { data } = await elysiaApi.api.users({ id: id }).get({
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })

            return data
        }
    })
}