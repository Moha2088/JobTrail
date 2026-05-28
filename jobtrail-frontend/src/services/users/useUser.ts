import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getSession } from "../session/getSession"
import { edenClient } from "@/app/api/apiClients"
import { User } from "@/services/users/types"


export function useUser(id: number): UseQueryResult<User, Error> {
    return useQuery({
        queryKey: ["users", id],
        queryFn: async() => {
            const session = await getSession()
            
            const { data } = await edenClient.api.users({ id: id }).get({
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })

            return data as User
        }
    })
}