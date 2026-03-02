import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { PostApplication } from "./types"
import { elysiaApi } from "@/app/api/elysiaApi"
import { useApplicationCache } from "./useApplicationCache"
import axios from "axios"


export function usePostApplication(): UseMutationResult<void, Error, PostApplication> {
    const applicationCache = useApplicationCache()

    return useMutation({
        mutationKey: ["applications"],
        mutationFn: async (variables) => {
            // await elysiaApi.api.applications.post(variables)
            await axios.post("http://localhost:3003/api/applications", variables)
        },

        onSuccess: () => {
            applicationCache.invalidateApplications()
        }
    })
}