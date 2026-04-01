import { useQuery, UseQueryResult } from "@tanstack/react-query"
import axios from "axios"
import { User } from "@/services/users/types"
import { getSession } from "../session/getSession"


export function useUser(id: number): UseQueryResult<User> {
    return useQuery({
        queryKey: ["users"],
        queryFn: async() => {
            const session = await getSession()
            const { data } = await axios.get(`http://localhost:3003/api/users/${id}`, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
            return data
        }
    })
}