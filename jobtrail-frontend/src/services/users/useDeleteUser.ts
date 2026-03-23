import { elysiaApi } from "@/app/api/apiClients"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "../session/useSession"


export function useDeleteUser(userId: number) {
    const { data } = useSession()
    
    return useMutation({
        mutationKey: ["users", userId],
        mutationFn: async() => {
            await axios.delete("../../api/users/" + data?.userId, {
                headers: {
                    Authorization: "Bearer " + data?.accessToken
                }
            })
        }
    })
}