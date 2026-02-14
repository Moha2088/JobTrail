import { elysiaApi } from "@/app/api/elysiaApi"
import { useMutation } from "@tanstack/react-query"
import { useApplicationCache } from "./useApplicationCache"


export function useDeleteApplication(applicationId: number) {
    const applicationCache = useApplicationCache()

    return useMutation({
        mutationKey: ["applications", applicationId],
        mutationFn: async() => {
            await elysiaApi.api.applications({ id: applicationId }).delete()
        },

        onSuccess: () => {
            applicationCache.invalidateApplications()
        }
    })
}