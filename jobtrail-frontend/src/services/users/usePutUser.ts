import { elysiaApi } from "@/app/api/elysiaApi"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PutUser } from "./types"
import { useUserCache } from "./useUserCache"


export function usePutUser(userId: number): UseMutationResult<void, Error, PutUser> {
    const userCache = useUserCache()
    
    return useMutation({
        mutationKey: ["users", userId],
        mutationFn: async(variables) => {
            await elysiaApi.api.users({ id: userId }).put(variables)
        },

        onSuccess: () => {
            userCache.invalidateUser(userId)
        }
    })
}