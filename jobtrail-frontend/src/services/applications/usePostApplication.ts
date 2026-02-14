import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { elysiaApi } from "@/app/api/elysiaApi"
import { useApplicationCache } from "./useApplicationCache"


export function usePostApplication(): UseMutationResult<void, Error, PostApplication> {
    const applicationCache = useApplicationCache()

    return useMutation({
        mutationKey: ["applications"],
        mutationFn: async(variables) => {
            await elysiaApi.api.applications.post(variables)
        },
        
        onSuccess: () => {
            applicationCache.invalidateApplications()
        }
    })
}