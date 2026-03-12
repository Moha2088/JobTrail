import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { elysiaApi } from "@/app/api/apiClients"
import { useApplicationCache } from "./useApplicationCache"
import axios from "axios"
import { getSession } from "@/services/session/getSession"


export function usePostApplication(): UseMutationResult<void, Error, PostApplication> {
    const applicationCache = useApplicationCache()

    return useMutation({
        mutationKey: ["applications"],
        mutationFn: async (variables) => {
            // await apiClients.api.applications.post(variables)

            const session = await getSession()

            await axios.post("http://localhost:3003/api/applications", variables, {
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