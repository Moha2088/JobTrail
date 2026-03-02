import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { elysiaApi } from "@/app/api/elysiaApi"
import { useApplicationCache } from "./useApplicationCache"

type PutApplication = Omit<PostApplication, "id">

export function usePutApplication(applicationId: never): UseMutationResult<void, Error, PutApplication> {
    const applicationCache = useApplicationCache()

    return useMutation({
        mutationKey: ["applications", applicationId],
        mutationFn: async(variables) => {
            await elysiaApi.api.applications({ id: applicationId }).put(variables)
        },

        onSuccess: () => {
            applicationCache.invalidateApplication(applicationId)
        }
    })
}