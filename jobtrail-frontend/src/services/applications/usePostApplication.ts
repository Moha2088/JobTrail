import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { PostApplication } from "./types";
import { elysiaApi } from "@/app/api/elysiaApi";
import { useApplicationCache } from "./useApplicationInvalidator";


type Options = Partial<UseMutationOptions<PostApplication, Error>>

export function usePostApplication(options: Options = { }): UseMutationResult<void, Error, PostApplication> {
    return useMutation({
        mutationKey: ["applications"],
        mutationFn: async(variables) => {
            await elysiaApi.api.applications.post(variables)
        },
        onSuccess: () => {
            const applicationCache = useApplicationCache()
            applicationCache.invalidateApplications()
        }
    })
}