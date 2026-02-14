import { elysiaApi } from "@/app/api/elysiaApi";
import { useMutation } from "@tanstack/react-query";
import { useApplicationCache } from "./useApplicationInvalidator";


export function useDeleteApplication(applicationId: number) {    
    return useMutation({
        mutationKey: ["applications", applicationId],
        mutationFn: async() => {
            await elysiaApi.api.applications({ id: applicationId}).delete()
        },

        onSuccess: () => {
            const applicationCache = useApplicationCache()
            applicationCache.invalidateApplications()
        }
    })
}