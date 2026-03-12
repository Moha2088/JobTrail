import { elysiaApi } from "@/app/api/apiClients"
import { useMutation } from "@tanstack/react-query"
import { useApplicationCache } from "./useApplicationCache"
import axios from "axios"
import { getSession } from "@/services/session/getSession"


export function useDeleteApplication(applicationId: number) {
    const applicationCache = useApplicationCache()

    return useMutation({
        mutationKey: ["applications", applicationId],
        mutationFn: async() => {
            const session = await getSession()

            await axios.delete(`http://localhost:3003/api/applications/${applicationId}`, {
                headers: {
                    Authorization: "Bearer " + session?.accessToken
                }
            })
        },

        onSuccess: async() => {
            await applicationCache.invalidateApplications()
        }
    })
}