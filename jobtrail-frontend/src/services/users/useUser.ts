import { useQuery, UseQueryResult } from "@tanstack/react-query"
import axios from "axios"
import { User } from "@/services/users/types"
import { useSession } from "@/services/session/useSession"


export function useUser(id: number): UseQueryResult<User> {
    const { data } = useSession()
    if(!data) throw new Error("User not found!")

    const { accessToken } = data

    return useQuery({
        meta: {
            errorMessage: "Failed to fetch user data!"
        },
        queryKey: ["users"],
        queryFn: async() => {
            const { data } = await axios.get(`http://localhost:3003/api/users/${id}`, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            })
            return data
        }
    })
}