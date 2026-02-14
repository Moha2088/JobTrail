import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostUser } from "./types"
import { elysiaApi } from "@/app/api/elysiaApi"
import { useUserCache } from "./useUserCache"


export function usePostUser(): UseMutationResult<void, Error, PostUser> {
    const usersCache = useUserCache()

    return useMutation({
        mutationKey: ["users"],
        mutationFn: async(variables) => {
            await elysiaApi.api.users.post(variables)
        },

        onSuccess: () => {
            usersCache.invalidateUsers()
        }
    })
}