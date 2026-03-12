import { elysiaApi } from "@/app/api/apiClients"
import { useMutation } from "@tanstack/react-query"
import { useUserCache } from "./useUserCache"


export function useDeleteUser(userId: number) {
    const userCache = useUserCache()
    
    return useMutation({
        mutationKey: ["users", userId],
        mutationFn: async() => {
            await elysiaApi.api.users({ id: userId }).delete()
        },

        onSuccess: () => {
            userCache.invalidateUser(userId)
        }
    })
}