import { elysiaApi } from "@/app/api/elysiaApi"
import { useMutation } from "@tanstack/react-query"
import { useApplicationCache } from "./useApplicationCache"
import axios from "axios"


export function useDeleteApplication(applicationId: number) {
    const applicationCache = useApplicationCache()

    return useMutation({
        mutationKey: ["applications", applicationId],
        mutationFn: async() => {
            // await elysiaApi.api.applications({ id: applicationId }).delete()
            await axios.delete(`http://localhost:3003/api/applications/${applicationId}`)
        },

        onSuccess: () => {
            applicationCache.invalidateApplications()
        }
    })
}