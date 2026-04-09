import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { getSession } from "@/services/session/getSession"


export function useDeleteUser(userId: number) {
    return useMutation({
        mutationKey: ["users", userId],
        mutationFn: async() => {
            console.log("Entering delete user mutation function with user id: ", userId)
            const session = await getSession()
            await axios.delete("../../api/users/" + userId, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        }
    })
}